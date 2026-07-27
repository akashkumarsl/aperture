import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * tailwind-merge doesn't know about our custom font-size tokens (the deck's
 * `text-d-*` scale and the cinematic site's `text-fluid-*` scale). Without
 * this, it treats e.g. `text-d-lead` and `text-deck-ink2` as the same "text-"
 * group and silently drops the size. Registering them under `font-size` keeps
 * size and colour independent so `cn("text-d-lead text-deck-ink2")` works.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: [
            "d-micro",
            "d-eyebrow",
            "d-small",
            "d-body",
            "d-lead",
            "d-h3",
            "d-h2",
            "d-h1",
            "d-display",
            "fluid-sm",
            "fluid-base",
            "fluid-lg",
            "fluid-xl",
            "fluid-2xl",
            "fluid-3xl",
          ],
        },
      ],
    },
  },
});

/** Tailwind-aware className combiner. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Clamp a number between min and max. */
export function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

/** Linear interpolation. */
export function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

/** Map a value from one range to another, clamped. */
export function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number,
  doClamp = true,
) {
  const t = (value - inMin) / (inMax - inMin);
  const v = outMin + (outMax - outMin) * t;
  return doClamp ? clamp(v, Math.min(outMin, outMax), Math.max(outMin, outMax)) : v;
}

/** Smoothstep easing for procedural animation. */
export function smoothstep(edge0: number, edge1: number, x: number) {
  const t = clamp((x - edge0) / (edge1 - edge0));
  return t * t * (3 - 2 * t);
}
