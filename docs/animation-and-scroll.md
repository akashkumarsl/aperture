# APERTURE — Animations & Scroll Interactions

The reference for every motion system in the site: what animates, which library
drives it, and where to tune it. Four systems cooperate — **Lenis** (scroll),
**the WebGL rig** (3D), **GSAP ScrollTrigger** (scrubbed transforms), and
**Framer Motion** (DOM reveals).

---

## 1. Smooth scroll — Lenis + GSAP ticker

`components/layout/SmoothScroll.tsx`

- Lenis owns the scroll. It is driven from the **GSAP ticker** (one clock for the
  whole site → no jitter between GSAP and Lenis):
  ```
  lenis.on("scroll", ScrollTrigger.update)
  gsap.ticker.add((t) => lenis.raf(t * 1000))
  gsap.ticker.lagSmoothing(0)
  ```
- Anchor nav uses a custom `scrollToSection(id)` helper (dispatches
  `aperture:scrollTo`) so the navbar buttons glide instead of jumping.
- **Reduced motion:** Lenis is disabled and native scrolling is used.

## 2. The WebGL rig — scroll-driven camera & particles

`components/three/*`

- `scrollStore.ts` is an **allocation-free** mutable store (not React state):
  `{ progress 0–1, phase 0–6, pointerX/Y }`. It is written by window listeners
  (`useScrollStoreSync`) and read inside `useFrame` every frame — so 3D updates
  never trigger React re-renders (key to staying at 120fps).
- `CameraRig.tsx` eases the camera along a path from `progress`; adds pointer
  parallax sway.
- `ParticleField.tsx` — a custom GLSL shader (`uTime`, `uPhase`, `uSize`);
  `palette()` shifts colour crude→gold→cyan→violet with `phase`. Additive
  blending, GPU-instanced points.
- `FloatingCore.tsx` — the wireframe/solid core whose hue tracks the phase.
- **Perf tiers** (`hooks/useDeviceTier.ts`): particle count 2800 / 1500 / 800
  (high/mid/low), 900 for reduced motion; DPR clamped 2 / 1.5.

## 3. GSAP ScrollTrigger — the crude→gold transformation

`components/scenes/SceneEngines.tsx`

- A real `ScrollTrigger` with `scrub` animates a CSS custom property
  `--purity` 0→1 as the section passes. Engine cards + the OUTPUT slab read
  `--purity` to interpolate from crude-black to luminous gold and to fill the
  impurity→purity meter.
- Chosen over pinning to avoid conflicts with Lenis; scrub keeps it buttery.
- `registerGsap()` (`lib/gsap.ts`) registers the plugin exactly once.

## 4. Framer Motion — DOM reveals & micro-interaction

Used in every `components/scenes/Scene*.tsx` and `components/ui/*`:

- **`RevealText`** — word-by-word rise + de-blur, 45ms stagger, `whileInView`
  with `once`. The Apple-headline cadence.
- **`useScroll` + `useTransform`** — per-scene parallax (title drift, reservoir
  scale). Targets are positioned elements; the root `<html>` is `position:
  relative` so Framer can measure scroll offsets.
- **Counters** (`MetricCounter`) — animate `from → to` when in view (mAP,
  recall, precision, robustness, loss, failure rate).
- **Cards / chips / buttons** — spring hover/scale, illuminate-on-active
  (Diagnose), staggered entrance.
- **Navbar** — glass background fades in past 2% scroll; mobile menu is an
  `AnimatePresence` overlay.
- **Lottie** — `components/ui/LottiePlayer.tsx` renders the iris scan accent in
  the finale; freezes to frame 0 under reduced motion.

---

## Scroll → scene map

| Scroll `p` | Phase | Scene | Signature interaction |
|---|---|---|---|
| 0.00–0.14 | 0 | Intro | Opening lines auto-play; reservoir scales on scroll |
| 0.14–0.30 | 1 | Refinery | Wordmark bloom; telemetry chips stream in |
| 0.30–0.44 | 2 | Diagnose | Cards illuminate by confidence |
| 0.44–0.62 | 3 | Engines | **GSAP scrub** crude→gold; purity meter |
| 0.62–0.76 | 4 | Training | Counters roll; chart draws; matrix cleans |
| 0.76–0.90 | 5 | Feedback | Loop ring orbits; graph grows |
| 0.90–1.00 | 6 | Final | Iris opens; logo blooms; Lottie scan |

---

## Accessibility & performance guarantees

- **`prefers-reduced-motion`** is honoured everywhere: Lenis off, rig neutral,
  Lottie frozen, reveals become simple fades.
- **Every animation is transform/opacity-based** (GPU-composited) — no layout
  thrash; the target is 120fps on high-tier devices.
- **No animation blocks input**; the WebGL canvas is `pointer-events-none`.
- Heavy work stays off the React render path (mutable store + `useFrame`).

## Where to tune
| Want to change… | Edit |
|---|---|
| Scroll feel / damping | `SmoothScroll.tsx` (Lenis `lerp`, `duration`) |
| Camera path | `components/three/CameraRig.tsx` |
| Particle count / colour | `ParticleField.tsx`, `useDeviceTier.ts` |
| Crude→gold ramp | `SceneEngines.tsx` (`--purity` ScrollTrigger) |
| Reveal cadence | `components/ui/RevealText.tsx` (`stagger`, ease) |
| Copy / numbers | `lib/content.ts` |
