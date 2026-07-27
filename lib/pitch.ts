/* ==================================================================
 * APERTURE — "/pitch" variant content
 * A recording-first, product & traction-driven narrative.
 *
 * COPY RULES (enforced by scripts/validate-pitch.mjs):
 *   1. Show the exact user action + time saved. Never "AI-powered
 *      optimization" or generic hype adjectives.
 *   2. Lead with real validation signals — engines validated, measured mAP/recall
 *      lift, unpaid pilots, pipeline — and a bottoms-up market. We are PRE-REVENUE:
 *      no recurring-revenue figures, no realized margin, and no "a customer already
 *      pays us" claims until billing opens after the seed.
 *   3. HONESTY: only two engines ship today — Synthetic Data Generation
 *      and Domain Adaptation. The reasoning/orchestration layer is in
 *      PRIVATE BETA, and the remaining engines are ROADMAP. What is live
 *      vs. planned is defined in lib/capabilities.json and must never be
 *      overstated. The site sells the vision but is explicit about the
 *      line between shipped and coming.
 * ================================================================== */

import capabilities from "@/lib/capabilities.json";

type EngineStatus = "live" | "roadmap";
export type Engine = {
  name: string;
  status: EngineStatus;
  tone: string;
  one_liner?: string;
  input?: string;
  output?: string;
  proof?: string;
};

export const CAPABILITIES = capabilities as {
  layer: { name: string; status: string; note: string };
  engines: Engine[];
};

export const ENGINES = CAPABILITIES.engines;
export const LIVE_ENGINES = ENGINES.filter((e) => e.status === "live");
export const ROADMAP_ENGINES = ENGINES.filter((e) => e.status === "roadmap");

/* ---- Hero ---- */
export const PITCH_HERO = {
  eyebrow: "Building the AI Data Intelligence Layer",
  headline: ["Your model didn't fail.", "Your data did."],
  sub: "Two proprietary engines — synthetic data generation and domain adaptation — rebuild the exact slice of your dataset that's failing in the field. The reasoning layer that auto-diagnoses which fix to run is in private beta.",
  primaryCta: "Get a free diagnosis",
  secondaryCta: "Watch the 90-second story",
} as const;

/** Live-signal strip under the hero — honest, concrete outcomes. */
export const HERO_STATS: { value: string; label: string; tone: "gold" | "cyan" | "teal" | "violet" }[] = [
  { value: "2 engines", label: "live today — synthetic data + domain adaptation", tone: "gold" },
  { value: "+11.4 pts", label: "median mAP lift on night + rain validation evals", tone: "cyan" },
  { value: "6 wks → 3 days", label: "to fix a failure mode vs. manual collection", tone: "teal" },
  { value: "4 teams", label: "running unpaid validation pilots — AV, robotics, drones", tone: "violet" },
];

export const PROBLEM = {
  eyebrow: "01 · The cost of a blind spot",
  headline: "It passes every test — then misses a cyclist at night.",
  body: "Perception models are trained on clean daylight and graded on a test set that looks just like it. The failures live in the long tail: rain, glare, night, rare classes. You can't see them until production does — and by then it's a recall problem.",
  points: [
    { k: "3 days", v: "of manual EDA to trace a single root cause" },
    { k: "12.6%", v: "failure rate on night + rain frames" },
    { k: "2 misses", v: "per frame in the failing domain" },
  ],
  kicker: "The bottleneck was never the model. It's the data — and the person who has to fix it by hand.",
} as const;

/* ---- Live products: the two engines that actually ship today ---- */
export const PRODUCTS = {
  eyebrow: "02 · What's live today",
  headline: "Two engines, shipping now. Not a slide — a product.",
  body: "We didn't wait to build the whole intelligence layer before shipping value. These two engines are live today and validated with design partners — we haven't started charging yet, and we say so.",
  items: LIVE_ENGINES.map((e) => ({
    name: e.name,
    tone: e.tone,
    oneLiner: e.one_liner ?? "",
    input: e.input ?? "",
    output: e.output ?? "",
    proof: e.proof ?? "",
  })),
  note: "Everything below this line — automated diagnosis, orchestration, the other engines — is on the roadmap, and we say so.",
} as const;

/** Three steps = the product AND the business model, made literal. */
export const HOW_STEPS: {
  n: string;
  title: string;
  price: string;
  priceTone: "free" | "payg" | "ship";
  status: "beta" | "live";
  action: string;
  outcome: string;
  time: string;
}[] = [
  {
    n: "01",
    title: "Diagnose",
    price: "Free, always",
    priceTone: "free",
    status: "beta",
    action: "Send a failing eval run — TensorBoard logs, a COCO json, or a CSV of predictions.",
    outcome: "Today we run diagnosis hands-on with design partners and rank the root causes with the mAP each fix is worth. The self-serve reasoning layer is in private beta.",
    time: "Hours today → 8 min at GA",
  },
  {
    n: "02",
    title: "Treat",
    price: "Pay as you go",
    priceTone: "payg",
    status: "live",
    action: "Approve a fix. Synthetic Data Generation and Domain Adaptation stream refined samples back.",
    outcome: "You see the cost and the expected lift before you spend a cent. Treatment will be billed per refined sample — no seats, no lock-in.",
    time: "40-minute runs, fully automated",
  },
  {
    n: "03",
    title: "Ship the dataset",
    price: "Billed on delivery",
    priceTone: "ship",
    status: "live",
    action: "Wire the optimised training set into your pipeline through one API.",
    outcome: "Versioned, deduped, balanced, and yours to keep. You'll pay only for datasets that ship — never for promises.",
    time: "One command to retrain",
  },
];

export const HOW_TAGLINE = "One platform, end to end — starting with the two engines that already work.";

/* ---- The signature data-flow animation (crude → refined → gold) ---- */
export const FLOW = {
  eyebrow: "03 · Crude to gold",
  headline: "Watch raw data become a training asset.",
  body: "Every RGB frame and annotation row is ingested, checked, and refined by the two live engines. Weak labels are corrected, and the missing night and rain samples are synthesised — until the barrel of crude becomes a gold-grade dataset.",
  phases: [
    { key: "ingest", title: "Ingest", note: "RGB + annotations stream in" },
    { key: "diagnose", title: "Check", note: "impurities & weak labels flagged" },
    { key: "refine", title: "Refine", note: "domain-adapted + synthesised" },
    { key: "gold", title: "Gold", note: "optimised training dataset" },
  ],
} as const;

/** Sample annotation rows used by the flow's CSV panel (raw → refined). */
export const CSV_ROWS: {
  file: string;
  raw: { cls: string; conf: number; box: string; bad?: boolean };
  refined: { cls: string; conf: number; box: string; added?: boolean };
}[] = [
  { file: "frame_0421.png", raw: { cls: "car", conf: 0.62, box: "[418,210,96,71]", bad: true }, refined: { cls: "car", conf: 0.97, box: "[422,214,98,73]" } },
  { file: "night_1183.png", raw: { cls: "—", conf: 0.0, box: "missing", bad: true }, refined: { cls: "cyclist", conf: 0.94, box: "[512,288,64,120]", added: true } },
  { file: "rain_077.png", raw: { cls: "truck", conf: 0.51, box: "[210,180,140,90]", bad: true }, refined: { cls: "car", conf: 0.95, box: "[212,182,138,92]" } },
  { file: "dusk_0902.png", raw: { cls: "person", conf: 0.7, box: "[96,240,40,110]" }, refined: { cls: "person", conf: 0.98, box: "[96,240,40,110]" } },
  { file: "syn_night_44.png", raw: { cls: "—", conf: 0.0, box: "—" }, refined: { cls: "pedestrian", conf: 0.93, box: "[300,250,44,120]", added: true } },
];

/* ---- Platform architecture map (honest: live vs roadmap) ---- */
export const PLATFORM = {
  eyebrow: "04 · The platform, mapped",
  headline: "Two engines live. One reasoning layer, in build.",
  body: "Aperture sits between your data and your models. Today the two live engines do the refining and we drive them by hand with design partners. The reasoning layer that observes, diagnoses and orchestrates automatically is in private beta — shown here so you can see exactly where the line is.",
  inputs: [
    { label: "Datasets", note: "images, labels, metadata" },
    { label: "Training runs", note: "loss, mAP, curves" },
    { label: "Production feedback", note: "real-world misses" },
  ],
  layer: {
    label: CAPABILITIES.layer.name,
    status: "Private beta",
    core: [
      { label: "Observe", note: "continuous dataset + run telemetry" },
      { label: "Diagnose", note: "ranked root causes, expected lift" },
      { label: "Orchestrate", note: "pick, sequence & bill engines" },
    ],
  },
  engines: ENGINES.map((e) => ({ name: e.name, status: e.status, tone: e.tone })),
  output: { label: "Optimised dataset", note: "versioned · balanced · yours" },
  footnote: "Gold = live today. Dashed = on the roadmap. We show the destination, but only the two gold engines run today — and we're pre-revenue.",
} as const;

/* ---- Roadmap: Now / Next / Later ---- */
export const ROADMAP = {
  eyebrow: "05 · Where we are, honestly",
  headline: "Shipping the layer, one engine at a time.",
  body: "We're a data-centric AI company that ships. Here's exactly what's in production, what's in private beta, and what's the vision — no blurred lines.",
  columns: [
    {
      tag: "Now — in production",
      tone: "gold" as const,
      status: "Shipping",
      items: [
        "Synthetic Data Generation engine (labelled RGB, COCO/YOLO)",
        "Domain Adaptation pipeline (label-preserving, 40-min runs)",
        "Hands-on diagnosis with design partners (unpaid validation)",
        "One API to ship a versioned dataset",
      ],
    },
    {
      tag: "Next — private beta",
      tone: "cyan" as const,
      status: "In build",
      items: [
        "Reasoning layer: auto-rank root causes + expected mAP lift",
        "Self-serve diagnosis in 8 minutes (no analyst in the loop)",
        "Cost-and-lift preview before a single sample is billed",
        "Data Balancer + Auto-Labelling engines",
      ],
    },
    {
      tag: "Later — the vision",
      tone: "violet" as const,
      status: "Designing",
      items: [
        "Autonomous orchestration across every engine",
        "Physics simulation, hard-negative mining, curriculum learning",
        "Network learning that compounds across clients — data stays private",
        "Continuous production-feedback loop closes on its own",
      ],
    },
  ],
} as const;

/* ---- Traction (honest, pre-revenue: validation results) ---- */
export const TRACTION = {
  eyebrow: "06 · Where we are — validation, not revenue",
  headline: "Pre-revenue. The engines work; the metrics move.",
  body: "We're early and we don't hide it: two engines live and validated, four teams running unpaid pilots, and a measured mAP lift on the exact slices that were failing. We haven't started selling — pricing is set and paid rollout begins after this raise.",
  // mAP points recovered per validation run (each run = one failing slice fixed)
  weekly: [3.1, 4.8, 6.2, 7.5, 9.0, 11.4],
  weeklyLabel: "mAP points recovered · per validation run",
  weeklyNow: "+11.4",
  weeklyBadge: "night + rain",
  // Honest pre-revenue signals for an early data company with 2 shipped engines.
  kpis: [
    { value: "2", label: "engines live & validated — synthetic + domain adaptation", tone: "gold" as const },
    { value: "4", label: "teams in active validation (AV · robotics · drones · retail)", tone: "teal" as const },
    { value: "+14 pts", label: "night-pedestrian recall, 0.71 → 0.85, relabel-free", tone: "cyan" as const },
    { value: "31", label: "on the reasoning-layer beta waitlist (inbound)", tone: "violet" as const },
  ],
  // A compact "by the numbers" panel — validation-stage and internally consistent.
  yc: [
    { k: "Validation", v: "2 engines live · measured mAP lift on failing slices" },
    { k: "Pilots", v: "4 teams running unpaid validation pilots" },
    { k: "Speed", v: "6-week manual fix → 3 days · 40-minute engine runs" },
    { k: "Pipeline", v: "31 teams on the reasoning-layer private-beta waitlist" },
    { k: "Pricing (set, not yet billed)", v: "free diagnosis · $0.04–0.12 / delivered frame" },
    { k: "Market (bottoms-up)", v: "~12,000 perception teams · roughly $60k/yr data budget each" },
  ],
  caption: "These are validation results, not revenue. We start billing after this raise — on datasets that ship.",
} as const;

/* ---- Moat / flywheel (framed as the thesis we're building) ---- */
export const MOAT = {
  eyebrow: "07 · The moat we're building",
  headline: "Every fix should make the next one faster.",
  body: "The thesis: as the reasoning layer trains on which diagnosis was right and which intervention actually moved mAP, each new client run sharpens the next. Today that learning happens across four validation partners by hand — the curve below is the target trajectory as the layer goes GA. Patterns are shared; your data never is.",
  // Diagnosis accuracy (%) target as the layer trains on cumulative client runs.
  curve: [41, 55, 64, 71, 77, 82, 86, 89, 91, 93, 94, 95],
  curveLabel: "Target: diagnosis accuracy vs. cumulative client runs",
  loop: ["Observe", "Diagnose", "Reason", "Orchestrate", "Learn"],
  points: [
    { k: "Proprietary engines", v: "two live and proprietary today; five more on the roadmap" },
    { k: "Compounding priors", v: "diagnosis accuracy climbs as the layer trains on real runs" },
    { k: "Privacy-preserving", v: "we share learned patterns across the network, never your data" },
  ],
} as const;

/* ---- Adoption curve ---- */
export const ADOPTION = {
  eyebrow: "08 · Where the category is",
  headline: "Data-centric AI is crossing the chasm.",
  body: "Teams have squeezed what they can out of architectures and hyperparameters. The next order-of-magnitude comes from the data — and that's the wave Aperture rides.",
  stages: [
    { label: "Innovators", pct: "2.5%" },
    { label: "Early adopters", pct: "13.5%" },
    { label: "Early majority", pct: "34%" },
    { label: "Late majority", pct: "34%" },
    { label: "Laggards", pct: "16%" },
  ],
  markerLabel: "You are here — early adopters, crossing into the early majority",
} as const;

export const PITCH_CTA = {
  eyebrow: "Start now",
  headline: "Send a failing run. Get the two fixes that move mAP.",
  body: "Diagnosis is free. You'll only pay for the refined datasets you decide to ship.",
  primary: "Get a free diagnosis",
  secondary: "Talk to an engineer",
} as const;

export const PITCH_NAV = [
  { id: "pitch-problem", label: "Problem" },
  { id: "pitch-products", label: "Live today" },
  { id: "pitch-how", label: "How it works" },
  { id: "pitch-flow", label: "Crude → Gold" },
  { id: "pitch-platform", label: "Platform" },
  { id: "pitch-roadmap", label: "Roadmap" },
  { id: "pitch-traction", label: "Traction" },
] as const;
