#!/usr/bin/env node
/* ==================================================================
 * validate-pitch.mjs — the "loop validation" guard for /pitch
 *
 * Purpose: stop AI-slop, font/scale drift, illegible contrast, and —
 * most importantly — dishonest claims from creeping into the pitch
 * surface. Run it in a tight loop while editing:
 *
 *     npm run validate        # fails (exit 1) on any ERROR
 *     npm run validate -- --strict   # also fails on WARN
 *
 * Ground truth for what is "live" lives in lib/capabilities.json.
 * Only Synthetic Data Generation + Domain Adaptation may be "live".
 * ================================================================== */

import { readFileSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join, relative } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const strict = process.argv.includes("--strict");

/* ---------------- config ---------------- */
const ALLOWED_LIVE = new Set(["Synthetic Data Generation", "Domain Adaptation"]);
const ALLOWED_LAYER_STATUS = new Set(["roadmap", "private-beta", "in-build", "designing"]);
const ALLOWED_FONT_PX = new Set([8, 9, 10, 11, 12, 13, 14, 15, 16]);
const FAINT_HARD_MIN = 20; // text-white/<=20 is illegible → hard error
const FAINT_ALPHA_MAX = 40; // text-white/<=40 counts toward the drift budget
const FAINT_BUDGET = 28; // too many faint labels = visual mush
const MAX_DISTINCT_PX = 9; // more than this many bespoke px sizes = scale drift

// Marketing-slop phrases (case-insensitive substring match).
const BANNED_PHRASES = [
  "ai-powered optimization",
  "ai powered optimization",
  "cutting-edge",
  "cutting edge",
  "game-changing",
  "game changing",
  "game changer",
  "next-generation",
  "next generation",
  "world-class",
  "world class",
  "best-in-class",
  "best in class",
  "paradigm shift",
  "one-stop shop",
  "bleeding-edge",
  "bleeding edge",
  "turnkey solution",
  "fully autonomous today",
];
// Slop single words (whole-word match).
const BANNED_WORDS = [
  "revolutionary",
  "seamless",
  "seamlessly",
  "supercharge",
  "supercharged",
  "unleash",
  "synergy",
  "synergies",
  "frictionless",
  "effortless",
  "effortlessly",
  "magical",
  "revolutionize",
];
// Never allowed anywhere — placeholders.
const PLACEHOLDERS = ["lorem", "ipsum", "todo:", "fixme", "placeholder text", "xxxx"];

/* ---------------- collect files ---------------- */
const pitchDir = join(ROOT, "components", "pitch");
const componentFiles = readdirSync(pitchDir)
  .filter((f) => f.endsWith(".tsx"))
  .map((f) => join(pitchDir, f));
const contentFiles = [
  join(ROOT, "lib", "pitch.ts"),
  join(ROOT, "app", "pitch", "page.tsx"),
];

// /deck surface — same copy hygiene + token discipline, plus its own honesty rules.
const deckDir = join(ROOT, "components", "deck");
const deckSlidesDir = join(deckDir, "slides");
const deckComponentFiles = [
  ...readdirSync(deckDir).filter((f) => f.endsWith(".tsx")).map((f) => join(deckDir, f)),
  ...readdirSync(deckSlidesDir).filter((f) => f.endsWith(".tsx")).map((f) => join(deckSlidesDir, f)),
];
const deckContentFile = join(ROOT, "lib", "deck.ts");

// Copy sources whose prose we hold to the pre-revenue honesty bar.
const copySources = [
  join(ROOT, "lib", "pitch.ts"),
  join(ROOT, "lib", "deck.ts"),
  join(ROOT, "app", "pitch", "page.tsx"),
  join(ROOT, "app", "deck", "page.tsx"),
];

const allTextFiles = [...componentFiles, ...contentFiles, ...deckComponentFiles, deckContentFile];
const tokenFiles = [...componentFiles, ...deckComponentFiles];

const errors = [];
const warns = [];
const rel = (p) => relative(ROOT, p).replace(/\\/g, "/");
const err = (file, line, msg) => errors.push({ file: rel(file), line, msg });
const warn = (file, line, msg) => warns.push({ file: rel(file), line, msg });

function eachLine(file, cb) {
  const lines = readFileSync(file, "utf8").split(/\r?\n/);
  lines.forEach((text, i) => cb(text, i + 1));
}

/* ---------------- 1. honesty: capabilities.json ---------------- */
(function honesty() {
  const capPath = join(ROOT, "lib", "capabilities.json");
  let cap;
  try {
    cap = JSON.parse(readFileSync(capPath, "utf8"));
  } catch (e) {
    err(capPath, 0, `capabilities.json is not valid JSON: ${e.message}`);
    return;
  }
  const engines = Array.isArray(cap.engines) ? cap.engines : [];
  const live = engines.filter((e) => e.status === "live");
  for (const e of live) {
    if (!ALLOWED_LIVE.has(e.name)) {
      err(capPath, 0, `engine "${e.name}" is marked status:"live" but only ${[...ALLOWED_LIVE].join(" + ")} may be live.`);
    }
  }
  if (live.length > ALLOWED_LIVE.size) {
    err(capPath, 0, `${live.length} engines marked live — at most ${ALLOWED_LIVE.size} may be live today.`);
  }
  for (const name of ALLOWED_LIVE) {
    if (!engines.some((e) => e.name === name && e.status === "live")) {
      warn(capPath, 0, `expected "${name}" to be present and live.`);
    }
  }
  const st = cap.layer?.status;
  if (!ALLOWED_LAYER_STATUS.has(st)) {
    err(capPath, 0, `layer.status "${st}" claims too much — must be one of ${[...ALLOWED_LAYER_STATUS].join(", ")}.`);
  }
})();

/* ---------- 1b. honesty: /deck restates the same ground truth ---------- */
(function deckHonesty() {
  let src;
  try {
    src = readFileSync(deckContentFile, "utf8");
  } catch (e) {
    err(deckContentFile, 0, `cannot read lib/deck.ts: ${e.message}`);
    return;
  }
  // Upper-bound the "live" claims. The platform.engines array has two live
  // engines; the legend contributes one more `state:"live"` label — so anything
  // above ALLOWED_LIVE.size + 1 means an extra engine was dishonestly promoted.
  const liveCount = (src.match(/state:\s*"live"/g) || []).length;
  if (liveCount > ALLOWED_LIVE.size + 1) {
    err(deckContentFile, 0, `deck marks too many engines state:"live" (${liveCount}) — only ${[...ALLOWED_LIVE].join(" + ")} may be live today.`);
  }
  // The reasoning / diagnosis layer must be in-progress, never live.
  const brain = src.match(/brain:\s*\{([^}]*)\}/);
  if (brain && /"live"/.test(brain[1])) {
    err(deckContentFile, 0, `the reasoning/diagnosis layer (brain) is marked "live" — it must be "progress" (in progress).`);
  }
  // Both live engines must actually appear.
  for (const name of ["Domain Adaptation", "Synthetic"]) {
    if (!src.includes(name)) warn(deckContentFile, 0, `expected live engine "${name}" to appear in the deck copy.`);
  }
  // Team bios ship as placeholders — remind, don't block.
  if (/Founder One|Founder Two|Placeholder bios/.test(src)) {
    warn(deckContentFile, 0, `team slide uses placeholder bios — replace with real names before sending.`);
  }
})();

/* ---------- 1c. honesty: pre-revenue — no fabricated selling signals ---------- */
(function preRevenue() {
  // Aperture has VALIDATED, not sold. Present-tense revenue / selling claims must
  // not appear in the copy. Forward-looking, clearly-labeled targets survive
  // because they are NOT in this list (e.g. "$1M ARR run-rate", the market SOM).
  // Word boundaries are deliberate: "unpaid pilots" must NOT match "paid pilots".
  const PRE_REVENUE_BANNED = [
    { re: /\bpaying (?:pilots?|customers?|teams?|users?|clients?|design partners?)\b/i, why: "pre-revenue — there are no paying customers yet" },
    { re: /\bpaid (?:pilots?|design partners?)\b/i, why: "pilots are unpaid validation — don't call them paid" },
    { re: /\bMRR\b/, why: "no recurring revenue yet — remove MRR" },
    { re: /\bweek[- ]over[- ]week\b/i, why: "no customer week-over-week growth pre-revenue" },
    { re: /\bw\/w\b/i, why: "no customer w/w growth pre-revenue" },
    { re: /\bWoW\b/, why: "no customer WoW growth pre-revenue" },
    { re: /\bpilots? renewed\b/i, why: "nothing to renew before there are paid pilots" },
    { re: /\bpayback\b/i, why: "no realized payback pre-revenue" },
    { re: /\bpaid conversion\b/i, why: "no paid conversion pre-revenue" },
    { re: /gross margin[^.\n]{0,24}\btoday\b/i, why: "margin isn't realized pre-revenue — say 'modeled', not 'today'" },
  ];
  for (const file of copySources) {
    let src;
    try {
      src = readFileSync(file, "utf8");
    } catch {
      continue;
    }
    src.split(/\r?\n/).forEach((text, i) => {
      for (const b of PRE_REVENUE_BANNED) {
        if (b.re.test(text)) err(file, i + 1, `pre-revenue over-claim ${b.re} — ${b.why}.`);
      }
    });
  }
})();

/* ---------------- 2. copy: banned slop + placeholders ---------------- */
for (const file of allTextFiles) {
  eachLine(file, (text, ln) => {
    const low = text.toLowerCase();
    for (const p of BANNED_PHRASES) {
      if (low.includes(p)) err(file, ln, `slop phrase "${p}" — say the exact action + time/number instead.`);
    }
    for (const w of BANNED_WORDS) {
      if (new RegExp(`\\b${w}\\b`, "i").test(text)) err(file, ln, `hype word "${w}" — replace with a concrete claim.`);
    }
    for (const ph of PLACEHOLDERS) {
      if (low.includes(ph)) err(file, ln, `placeholder/leftover "${ph}" must not ship.`);
    }
  });
}

/* ---------------- 3. design tokens in components ---------------- */
const HEX_IN_CLASS = /(?:bg|text|border|from|via|to|fill|stroke|ring|shadow|decoration|outline|divide|accent|caret)-\[#[0-9a-fA-F]{3,8}\]/;
const PX_FONT = /text-\[(\d+)px\]/g;
const FONT_FAMILY_ARB = /font-\[[^\]]+\]/;
const FAINT_WHITE = /text-white\/(\d{1,3})\b/g;

let faintCount = 0;
const distinctPx = new Set();

// 3a. Raw hex + arbitrary font-family are banned on BOTH surfaces (token discipline).
for (const file of tokenFiles) {
  eachLine(file, (text, ln) => {
    if (HEX_IN_CLASS.test(text)) {
      err(file, ln, `raw hex color in a class — use a design token (void / gold / aperture / deck-* / white-alpha).`);
    }
    if (FONT_FAMILY_ARB.test(text)) {
      warn(file, ln, `arbitrary font-[] — use font-sans / font-display / font-mono.`);
    }
  });
}

// 3b. px type-scale + faint white-text budget apply to the /pitch dark surface
//     only. The /deck uses the d-* light type scale and is contrast-checked at
//     runtime by DeckAudit (press V), so those rules don't transfer here.
for (const file of componentFiles) {
  eachLine(file, (text, ln) => {
    let m;
    PX_FONT.lastIndex = 0;
    while ((m = PX_FONT.exec(text))) {
      const px = Number(m[1]);
      distinctPx.add(px);
      if (!ALLOWED_FONT_PX.has(px)) {
        warn(file, ln, `off-scale font size text-[${px}px] — stick to 8–16px labels or a fluid/Headline token.`);
      }
    }
    FAINT_WHITE.lastIndex = 0;
    while ((m = FAINT_WHITE.exec(text))) {
      const a = Number(m[1]);
      if (a <= FAINT_HARD_MIN) err(file, ln, `text-white/${a} is illegible — lift contrast to /55 or higher for readable text.`);
      else if (a <= FAINT_ALPHA_MAX) faintCount++;
    }
  });
}

if (faintCount > FAINT_BUDGET) {
  err(pitchDir, 0, `${faintCount} faint white-text labels (budget ${FAINT_BUDGET}) — contrast drift, tighten it up.`);
}
if (distinctPx.size > MAX_DISTINCT_PX) {
  warn(pitchDir, 0, `${distinctPx.size} distinct bespoke px font sizes (${[...distinctPx].sort((a, b) => a - b).join(",")}) — type-scale drift.`);
}

/* ---------------- report ---------------- */
const line = "─".repeat(64);
console.log(`\n${line}\n  Aperture · /pitch + /deck validation loop\n${line}`);
console.log(`  files scanned : ${allTextFiles.length}  (pitch + deck)`);
console.log(`  faint labels  : ${faintCount}/${FAINT_BUDGET}`);
console.log(`  px font sizes : ${[...distinctPx].sort((a, b) => a - b).join(", ") || "—"}`);

const show = (list, label, mark) => {
  if (!list.length) return;
  console.log(`\n  ${mark} ${label} (${list.length})`);
  for (const it of list) console.log(`    ${it.file}:${it.line}  ${it.msg}`);
};
show(errors, "ERRORS", "✗");
show(warns, "WARNINGS", "!");

const failed = errors.length > 0 || (strict && warns.length > 0);
console.log(`\n${line}`);
if (failed) {
  console.log(`  RESULT: FAIL — ${errors.length} error(s)${strict ? `, ${warns.length} warning(s)` : ""}. Fix before recording.`);
  console.log(`${line}\n`);
  process.exit(1);
}
console.log(`  RESULT: PASS — 0 errors${warns.length ? `, ${warns.length} warning(s)` : ", 0 warnings"}. Clean to record.`);
console.log(`${line}\n`);
process.exit(0);
