# APERTURE — Assets Manifest

The site is deliberately **asset-light**: almost everything is generated at
runtime (WebGL shaders, SVG, CSS gradients, `next/font`, and a generated OG
image). That keeps the repo tiny, the site fully offline-capable, and every
visual editable in code. This document lists what ships, what's procedural, and
how to drop in optional Lottie / Spline / image assets.

---

## What ships in the repo

| Asset | Path | Type | How it's made |
|---|---|---|---|
| Favicon / icon | `app/icon.svg` | SVG | Hand-authored aperture iris |
| OG image | `app/opengraph-image.tsx` | Generated PNG | `next/og` `ImageResponse` (edge) |
| Twitter image | `app/twitter-image.tsx` | Generated PNG | Shares `lib/og.tsx` renderer |
| Lottie iris scan | `public/lottie/aperture-pulse.json` | Lottie JSON | `scripts/build-lottie.mjs` |
| Fonts | via `next/font/google` | WOFF2 (self-hosted at build) | Inter · Space Grotesk · JetBrains Mono |
| `public/images/` | — | (empty) | Drop raster assets here if needed |
| `public/lottie/` | — | Lottie JSON | Additional Bodymovin exports |

No binary images are required for the experience to render.

---

## Procedural / code-generated visuals

| Visual | Source | Notes |
|---|---|---|
| Particle field | `components/three/ParticleField.tsx` | Custom GLSL, GPU points, phase-tinted |
| Floating core | `components/three/FloatingCore.tsx` | Wireframe + solid, hue by phase |
| Reservoir, pipes, refinery | `components/scenes/*` + CSS/SVG | Gradients, blur, masks |
| Neural / knowledge graph | `components/visuals/NeuralGraph.tsx` | SVG + Framer Motion |
| Training chart | `components/visuals/TrainingChart.tsx` | SVG paths, animated |
| Confusion matrix | `components/visuals/ConfusionMatrix.tsx` | CSS grid |
| Loop / flywheel | `components/visuals/LoopDiagram.tsx` | SVG + trig-placed HTML |
| Aperture logo mark | `components/ui/ApertureMark.tsx` | Parametric SVG iris (`open` prop) |
| Grain, glow, vignette | `components/layout/GrainOverlay.tsx`, `GlowOrb.tsx`, CSS | Post-style atmosphere |

"No generic icons" — every mark (nav, engine badges, iris) is hand-built SVG.

---

## Regenerating the Lottie asset

```bash
node scripts/build-lottie.mjs   # writes public/lottie/aperture-pulse.json
```

Render any Lottie with the resilient host component:

```tsx
import { LottiePlayer } from "@/components/ui/LottiePlayer";

<LottiePlayer src="/lottie/aperture-pulse.json" className="h-40 w-40" />
```

`LottiePlayer` lazy-fetches the JSON (never breaks a scene if missing), lazy-
loads `lottie-react` client-side only, and freezes to frame 0 under reduced
motion. Author new animations in After Effects → **Bodymovin/LottieFiles** →
export JSON → drop into `public/lottie/`.

---

## Optional: Spline integration

The brief lists Spline. The site delivers its 3D depth with **React Three Fiber**
(more performant, fully offline, no external runtime), but a Spline scene can be
embedded as an additional layer when you have one. It is **not** wired in by
default so the build stays dependency-light and offline.

To add it:

```bash
npm i @splinetool/react-spline @splinetool/runtime
```

```tsx
// components/three/SplineLayer.tsx
"use client";
import dynamic from "next/dynamic";
const Spline = dynamic(() => import("@splinetool/react-spline"), { ssr: false });

export function SplineLayer({ scene }: { scene: string }) {
  // scene = a published .splinecode URL, e.g. https://prod.spline.design/xxxx/scene.splinecode
  return (
    <div className="pointer-events-none fixed inset-0 -z-0">
      <Spline scene={scene} />
    </div>
  );
}
```

Mount it behind the DOM layer in `app/page.tsx` (below `z-10`). Respect
`prefers-reduced-motion` and gate it behind `useDeviceTier` so low-end devices
skip it.

> Note: keep the file **out of the build graph until the deps are installed** —
> an unresolved import fails type-check. Add the component only when you install
> the packages.

---

## Optional: raster / OG images

- Put any raster art in `public/images/` and reference as `/images/…`.
- To replace the generated social card with bespoke art, drop
  `app/opengraph-image.png` (1200×630) and delete `app/opengraph-image.tsx`.

---

## Licensing checklist (before shipping)
- Fonts: Inter (OFL), Space Grotesk (OFL), JetBrains Mono (OFL) — all clear.
- Music/SFX: source from a licensed library (see `sound-design.md`) — do **not**
  ship un-licensed tracks.
- Any stock imagery you add to `public/images/` must be licensed for web use.
