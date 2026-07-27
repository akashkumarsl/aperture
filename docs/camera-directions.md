# APERTURE — Camera Directions

Two layers of "camera" exist in this project:

1. **The live WebGL camera** — a real `PerspectiveCamera` driven by
   `components/three/CameraRig.tsx`, moved every frame from the scroll store
   (`components/three/scrollStore.ts`). This is what the visitor actually flies
   through.
2. **The cinematic language** — the intended framing for each act, used by the
   promo film / After Effects cut. Both are documented here so the film matches
   the site.

Coordinate system: right-handed, +Y up, camera looks toward −Z. Scroll progress
`p` runs 0 → 1 across the whole page; each scene owns a band of `p`.

---

## Global rig behaviour

- **Dolly, don't cut.** The camera never hard-cuts between scenes; it eases
  through a continuous path so the seven acts read as one shot.
- **Parallax breathing.** Pointer position (`pointerX/Y`) applies a ±0.4°
  sway and a small positional offset, so the frame feels handheld and alive
  even when scroll is still.
- **Easing.** All rig moves are critically damped (lerp toward target at
  `1 - pow(0.001, dt)`), so fast scrolling never snaps the camera.
- **Reduced motion.** When `prefers-reduced-motion` is set, the rig holds a
  neutral framing and only cross-fades opacity — no dolly, no sway.

---

## Scene-by-scene

### Scene 1 — Origin · `p 0.00–0.14`
- **Move:** Slow crane **down**. Camera starts high looking slightly down at a
  void, then descends toward the reservoir as if lowering into the earth.
- **Framing:** Wide. Subject (reservoir) small and low in frame — emphasise
  scale and emptiness.
- **Lens feel:** 35mm equivalent, deep focus. Particles drift toward camera.
- **Focus pull:** From far starfield → the crude surface as the label appears.

### Scene 2 — The Refinery · `p 0.14–0.30`
- **Move:** Push **in and up** toward the blooming wordmark, then settle.
- **Framing:** Centred, symmetrical, monumental — the APERTURE logotype fills
  the upper third; telemetry enters from screen edges toward the core.
- **Lens feel:** Slight wide-angle grandeur; volumetric god-rays from behind the
  core.

### Scene 3 — Diagnose · `p 0.30–0.44`
- **Move:** Lateral **truck** with a gentle arc; camera orbits the reasoning
  core a few degrees so the intervention cards feel arrayed in 3D space.
- **Framing:** Cards on a shallow arc; active cards catch a rim light, inactive
  cards fall into shadow. Rack focus lands on the highest-confidence card.

### Scene 4 — Orchestration · `p 0.44–0.62`
- **Move:** Track **alongside** the pipeline left→right, matching the flow of
  fluid as it turns from crude to gold. A subtle speed-ramp as purity resolves.
- **Framing:** Engines in the mid-ground; the OUTPUT slab enters low; the core
  shifts to violet then gold.
- **Beat:** On "crude becomes gold," ease to a brief hold — let the colour land.

### Scene 5 — Results · `p 0.62–0.76`
- **Move:** Pull **back** to reveal the full dashboard; a slow settle as numbers
  climb, like stepping back to see the whole board.
- **Framing:** Two glass panels (chart + confusion matrix) balanced; metric
  counters as a lower band. Gold volumetric glow blooms behind the chart.

### Scene 6 — The Loop · `p 0.76–0.90`
- **Move:** Begin a slow **orbit** that never quite closes — visual rhyme for the
  infinite loop. Camera circles the ring diagram.
- **Framing:** The loop ring right-of-centre; production sources + numbered steps
  left. Core glows teal.

### Final — Reveal · `p 0.90–1.00`
- **Move:** Final **push-in** to the iris, then a gentle settle and hold. The
  aperture opens (mark `open` 0 → 0.85).
- **Framing:** Dead-centre, symmetrical, full-bleed. Vignette closes slightly to
  focus the eye. Hold 2s on the mark before fade to black.

---

## Mapping to code

| Direction | Where it lives |
|---|---|
| Camera path + damping | `components/three/CameraRig.tsx` |
| Scroll → progress/phase | `components/three/scrollStore.ts`, `useScrollStoreSync()` |
| Core colour per phase | `components/three/FloatingCore.tsx`, `ParticleField.tsx` `palette()` |
| Per-scene DOM parallax | `useScroll`/`useTransform` in each `components/scenes/Scene*.tsx` |
| Crude→gold purity ramp | GSAP ScrollTrigger in `components/scenes/SceneEngines.tsx` |
