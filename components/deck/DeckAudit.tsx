"use client";

import { useCallback, useEffect, useState } from "react";

/**
 * DeckAudit — the automated "no AI slop" guard (dev-only, toggle with V).
 *
 * It walks the currently rendered slide and checks it against the SAME design
 * contract the primitives are built from:
 *   • Font family   — only the three loaded families (Space Grotesk / Inter /
 *                     JetBrains Mono) or their declared fallbacks.
 *   • Type scale    — every text size must be one of the fixed d-* tokens.
 *   • Contrast      — every text run must clear WCAG AA against its background.
 *   • Palette       — text colours must come from the deck ink/accent palette.
 * It renders a pass/fail panel with the first offenders so violations get
 * fixed each iteration instead of accumulating.
 */

const ALLOWED_SIZES = [12, 13, 15, 18, 22, 26, 34, 52, 74];
const SIZE_TOL = 0.75;
const FONT_RE = /inter|space|grotesk|jetbrains|mono|system-ui|apple-system|segoe|sans-serif|serif|ui-monospace|menlo/i;
// Allowed text colours (sRGB) from the deck palette + white (used on accent fills).
const PALETTE = [
  [11, 11, 15], // ink
  [63, 63, 70], // ink2
  [92, 92, 102], // muted
  [111, 111, 121], // faint
  [194, 65, 12], // accentInk
  [10, 106, 71], // pos
  [192, 38, 38], // neg
  [29, 67, 201], // blueInk
  [255, 255, 255], // white (on accent)
];

type Violation = { kind: string; detail: string; snippet: string };

function parseRgb(str: string): [number, number, number, number] {
  const m = str.match(/rgba?\(([^)]+)\)/);
  if (!m) return [0, 0, 0, 1];
  const p = m[1].split(",").map((s) => parseFloat(s.trim()));
  return [p[0], p[1], p[2], p[3] ?? 1];
}
function blend(fg: number[], bg: number[], a: number) {
  return fg.map((c, i) => c * a + bg[i] * (1 - a));
}
function lum([r, g, b]: number[]) {
  const f = (c: number) => {
    c /= 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
}
function contrast(a: number[], b: number[]) {
  const l1 = lum(a);
  const l2 = lum(b);
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
}
function effectiveBg(el: Element): number[] {
  // Composite any translucent background layers (e.g. `bg-deck-pos/10`) over
  // the first opaque ancestor background — defaulting to the white paper. This
  // yields the colour a viewer actually sees behind the text, so contrast is
  // measured truthfully instead of treating a 10%-alpha tint as full strength.
  const layers: Array<[number, number, number, number]> = [];
  let node: Element | null = el;
  let base = [255, 255, 255];
  while (node) {
    const [r, g, b, a] = parseRgb(getComputedStyle(node).backgroundColor);
    if (a >= 0.999) {
      base = [r, g, b];
      break;
    }
    if (a > 0) layers.push([r, g, b, a]);
    node = node.parentElement;
  }
  let out = base;
  for (let i = layers.length - 1; i >= 0; i--) {
    const [r, g, b, a] = layers[i];
    out = blend([r, g, b], out, a);
  }
  return out;
}
function nearPalette([r, g, b]: number[]) {
  return PALETTE.some(
    ([pr, pg, pb]) =>
      Math.abs(pr - r) + Math.abs(pg - g) + Math.abs(pb - b) <= 24,
  );
}

export function DeckAudit({
  active,
  index,
  stageRef,
}: {
  active: boolean;
  index: number;
  stageRef: React.RefObject<HTMLDivElement>;
}) {
  const [violations, setViolations] = useState<Violation[]>([]);
  const [checked, setChecked] = useState(0);

  const run = useCallback(() => {
    const root = stageRef.current;
    if (!root) return;
    const found: Violation[] = [];
    let n = 0;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT);
    let el = walker.currentNode as Element | null;
    while (el) {
      // only elements that directly render visible text
      const hasText = Array.from(el.childNodes).some(
        (c) => c.nodeType === Node.TEXT_NODE && c.textContent?.trim(),
      );
      if (hasText) {
        const cs = getComputedStyle(el);
        const text = (el.textContent || "").trim().slice(0, 32);
        n++;

        // font family
        if (!FONT_RE.test(cs.fontFamily)) {
          found.push({ kind: "font", detail: cs.fontFamily.split(",")[0], snippet: text });
        }
        // type scale
        const size = parseFloat(cs.fontSize);
        if (!ALLOWED_SIZES.some((s) => Math.abs(s - size) <= SIZE_TOL)) {
          found.push({ kind: "size", detail: `${size.toFixed(1)}px`, snippet: text });
        }
        // contrast
        const [r, g, b, a] = parseRgb(cs.color);
        const bg = effectiveBg(el);
        const fg = a < 1 ? blend([r, g, b], bg, a) : [r, g, b];
        const ratio = contrast(fg, bg);
        const bold = parseInt(cs.fontWeight, 10) >= 600;
        const large = size >= 24 || (size >= 18.66 && bold);
        const min = large ? 3 : 4.5;
        if (ratio < min) {
          found.push({
            kind: "contrast",
            detail: `${ratio.toFixed(2)}:1 (need ${min})`,
            snippet: text,
          });
        }
        // palette
        if (!nearPalette(fg)) {
          found.push({
            kind: "palette",
            detail: `rgb(${fg.map((c) => Math.round(c)).join(",")})`,
            snippet: text,
          });
        }
      }
      el = walker.nextNode() as Element | null;
    }
    setChecked(n);
    setViolations(found);
  }, [stageRef]);

  useEffect(() => {
    if (!active) return;
    const t = setTimeout(run, 520); // let the slide settle after transition
    return () => clearTimeout(t);
  }, [active, index, run]);

  if (!active) return null;

  const groups = ["font", "size", "contrast", "palette"] as const;
  const label: Record<string, string> = {
    font: "Font family",
    size: "Type scale",
    contrast: "Contrast (AA)",
    palette: "Palette",
  };
  const counts = Object.fromEntries(
    groups.map((g) => [g, violations.filter((v) => v.kind === g).length]),
  );
  const pass = violations.length === 0;

  return (
    <div className="absolute right-4 top-4 z-[120] w-[320px] rounded-xl border border-deck-line bg-deck-paper/97 p-4 font-mono text-[11px] leading-relaxed text-deck-ink2 shadow-deck-lift backdrop-blur">
      <div className="mb-2 flex items-center justify-between">
        <span className="uppercase tracking-[0.16em] text-deck-muted">Deck audit</span>
        <span
          className={
            pass
              ? "rounded bg-deck-pos/12 px-2 py-0.5 text-deck-pos"
              : "rounded bg-deck-neg/12 px-2 py-0.5 text-deck-neg"
          }
        >
          {pass ? "PASS" : `${violations.length} ISSUES`}
        </span>
      </div>
      <div className="mb-2 text-deck-faint">
        slide {index + 1} · {checked} text runs scanned
      </div>
      <div className="space-y-1">
        {groups.map((g) => (
          <div key={g} className="flex items-center justify-between">
            <span>{label[g]}</span>
            <span className={counts[g] ? "text-deck-neg" : "text-deck-pos"}>
              {counts[g] ? `${counts[g]} ✗` : "✓"}
            </span>
          </div>
        ))}
      </div>
      {violations.length ? (
        <div className="mt-3 max-h-[220px] space-y-1.5 overflow-auto border-t border-deck-line pt-2">
          {violations.slice(0, 12).map((v, i) => (
            <div key={i} className="text-[10px]">
              <span className="text-deck-neg">{v.kind}</span>{" "}
              <span className="text-deck-ink2">{v.detail}</span>
              <span className="block truncate text-deck-faint">“{v.snippet}”</span>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-3 border-t border-deck-line pt-2 text-deck-pos">
          Contract clean — fonts, scale, contrast &amp; palette all conform.
        </div>
      )}
    </div>
  );
}
