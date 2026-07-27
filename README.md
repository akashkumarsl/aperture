# APERTURE — The AI Data Intelligence Layer

A cinematic, scroll-driven storytelling website for **Aperture**, a fictional AI
data-intelligence startup. Not a landing page — a seven-act film you scroll
through, built the way Apple, Stripe, OpenAI, Linear and Vercel build launch
experiences: dark, deep, glassmorphic, handcrafted, and fast.

> **Core message.** Raw data is like crude oil — valuable, but not enough alone.
> The real value comes from understanding what the model actually needs. Aperture
> is the intelligence layer that **observes** datasets, training runs and
> production feedback, **diagnoses** the true bottleneck, **reasons** about the
> highest-impact intervention, **orchestrates** specialised engines to refine the
> data, and **learns** from every experiment — an autonomous flywheel.

---

## ✨ Highlights

- **Seven-act cinematic scroll** — one continuous film, Raw Data → Refinery →
  Diagnose → Engines → Training → Feedback Loop → Reveal.
- **Persistent WebGL world** — a single fixed React Three Fiber canvas with a
  custom-shader particle field, a phase-tinted core, fog/volumetric lighting and
  a scroll-driven camera rig that flies through all seven acts.
- **Buttery scroll** — Lenis smooth scroll driven from the GSAP ticker; a real
  GSAP `ScrollTrigger` scrubs the signature **crude→gold** transformation.
- **Handcrafted everything** — parametric SVG iris logo, custom engine badges,
  animated neural graph, training chart, confusion matrix and flywheel. No
  generic icon packs.
- **Glassmorphism + premium type** — layered glass, soft glows, grain, vignette;
  Space Grotesk / Inter / JetBrains Mono via `next/font`.
- **120fps-minded** — animation runs on transform/opacity; 3D state lives in an
  allocation-free store read inside `useFrame`, off the React render path.
- **Accessible & responsive** — full `prefers-reduced-motion` fallbacks, keyboard
  focus rings, skip link, semantic landmarks; fluid from 360px to ultra-wide.
- **SEO + social** — rich metadata, `sitemap.xml`, `robots.txt`, JSON-LD, and a
  build-time generated Open Graph / Twitter image via `next/og`.

---

## 🧱 Tech stack

Next.js 14 (App Router) · React 18 · TypeScript · Tailwind CSS · GSAP +
ScrollTrigger · Framer Motion · Three.js · React Three Fiber · drei · Lenis ·
Lottie (`lottie-react`) · `next/font` · `next/og`.

---

## 🚀 Quick start

```bash
npm install
npm run dev      # http://localhost:3000
```

Production:

```bash
npm run build
npm start
```

Utility:

```bash
npm run lint                 # eslint (next/core-web-vitals)
node scripts/build-lottie.mjs   # regenerate the Lottie iris asset
```

Requires Node 18.17+ (developed on Node 24). No environment variables needed.

---

## 📁 Project structure

```
aperture/
├─ app/
│  ├─ layout.tsx            # fonts, SEO metadata, shell (nav/footer/scroll)
│  ├─ page.tsx              # assembles the 7 acts over the WebGL background
│  ├─ globals.css           # design tokens, glass utilities, keyframes
│  ├─ icon.svg              # aperture iris favicon
│  ├─ opengraph-image.tsx   # generated OG card (next/og, edge)
│  ├─ twitter-image.tsx     # generated Twitter card (shares lib/og.tsx)
│  ├─ robots.ts · sitemap.ts
├─ components/
│  ├─ layout/               # SmoothScroll, Navbar, Footer, ScrollProgress,
│  │                        # GrainOverlay, StructuredData (JSON-LD)
│  ├─ three/                # CanvasStage, ParticleField, FloatingCore,
│  │                        # CameraRig, scrollStore, BackgroundScene
│  ├─ scenes/               # SceneIntro, Thesis, Refinery, Diagnose, Engines,
│  │                        # Training, FeedbackLoop, Final
│  ├─ ui/                   # ApertureMark, GlassCard, RevealText, MetricCounter,
│  │                        # SceneSection, GlowOrb, ScrollCue, LottiePlayer …
│  └─ visuals/              # NeuralGraph, TrainingChart, ConfusionMatrix, LoopDiagram
├─ hooks/                   # useDeviceTier, useReducedMotion, useIsomorphicLayoutEffect
├─ lib/                     # content.ts (all copy/data), gsap.ts, utils.ts, og.tsx
├─ public/lottie/           # aperture-pulse.json (generated)
├─ scripts/build-lottie.mjs # Lottie generator
└─ docs/                    # narration, camera, sound, storyboard, AE, animation, assets
```

---

## 🏛 Architecture

**Hybrid 2.5D.** One fixed WebGL canvas (`z-0`, `pointer-events-none`) renders
the ambient 3D — particles, core, camera, lighting. Rich per-scene content is
DOM/SVG/Framer Motion (`z-10`) for crispness, accessibility and reliability. The
camera flies through the 3D world as you scroll, tying the DOM acts into one film
without fragile DOM-in-3D choreography.

**One clock.** Lenis is driven by the GSAP ticker so scroll, ScrollTrigger and
Framer all share a single timeline — no inter-library jitter.

**Off the render path.** `components/three/scrollStore.ts` is a mutable,
allocation-free store (progress / phase / pointer) written by window listeners
and read inside `useFrame`. Scrolling never re-renders React — the key to smooth
3D.

**Performance tiers.** `hooks/useDeviceTier.ts` scales particle count and DPR by
device capability, with a dedicated reduced-motion budget.

See `docs/animation-and-scroll.md` for the full motion reference.

---

## 🎬 The seven acts

| # | Scene | Beat |
|---|---|---|
| 1 | **Intro** | Black screen → three opening lines → descend to the crude **RAW DATA** reservoir |
| 2 | **Refinery** | **APERTURE** blooms; 12 telemetry streams flood in; it *analyses, not generates* |
| 3 | **Diagnose** | "Diagnose before acting." — 9 interventions; only high-confidence ones illuminate |
| 4 | **Engines** | 5 specialised engines execute; **crude→gold** (GSAP scrub) → Optimised Dataset |
| 5 | **Training** | Gold data trains; mAP/recall/precision ↑, loss/failure ↓; matrix cleans |
| 6 | **Feedback** | Production failures return; Observe·Diagnose·Reason·Execute·Learn·Repeat |
| 7 | **Reveal** | The iris opens; the promise lands; CTA |

All copy and numbers live in `lib/content.ts` — edit the story without touching
layout.

---

## ♿ Accessibility & 🚀 performance

- `prefers-reduced-motion`: Lenis off, camera neutral, Lottie frozen, reveals
  become calm fades.
- Keyboard-first: visible focus rings, skip-to-content link, semantic landmarks,
  `aria-hidden` on decorative layers.
- GPU-composited transforms only; WebGL canvas ignores pointer events; heavy work
  kept off React renders.

## 🔎 SEO

`app/layout.tsx` metadata (OpenGraph + Twitter), `app/sitemap.ts`,
`app/robots.ts`, JSON-LD in `components/layout/StructuredData.tsx`, and generated
social images (`app/opengraph-image.tsx`, `app/twitter-image.tsx`). Update the
canonical URL in `app/layout.tsx` (`SITE.url`) before deploying.

---

## 📦 Deliverables map

Everything requested in the brief and where to find it:

| # | Deliverable | Location |
|---|---|---|
| 1 | Full project structure | this file + the tree above |
| 2 | Complete code | `app/`, `components/`, `hooks/`, `lib/` |
| 3 | Assets | `docs/assets.md` · `public/` · `app/icon.svg` · generated OG |
| 4 | Animations | `docs/animation-and-scroll.md` · `components/three,ui,visuals` |
| 5 | Scroll interactions | `docs/animation-and-scroll.md` · `SmoothScroll.tsx` · `SceneEngines.tsx` |
| 6 | Narration script | `docs/narration-script.md` |
| 7 | Camera directions | `docs/camera-directions.md` · `components/three/CameraRig.tsx` |
| 8 | Sound-effect suggestions | `docs/sound-design.md` |
| 9 | Background-music timing | `docs/sound-design.md` (cue sheet) |
| 10 | Promo video storyboard | `docs/storyboard.md` |
| 11 | After Effects export scenes | `docs/after-effects.md` |

---

## ☁️ Deploy

Deploy to **Vercel** (zero-config for Next.js) or any Node host: `npm run build`
then `npm start`. Set the production URL in `app/layout.tsx` so metadata,
sitemap and social images resolve to absolute URLs.

---

*Aperture is a fictional brand created for this design/engineering showcase.*
