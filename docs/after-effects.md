# APERTURE — After Effects / Export-Ready Scenes

How to rebuild (or finish) the promo film in After Effects, with a project
structure, per-scene comp specs, and the exact colours, type and motion values
used on the site so the film and the product stay identical.

---

## Project setup

- **Master comp:** `APERTURE_Master` — 3840×2160, 24fps, ~2:15.
- **Working space:** Rec.709 / sRGB, 16bpc, linearized blending on.
- **Frame budget:** one pre-comp per act (7) + a `Grain`, `Vignette`, and
  `Glow` adjustment stack on top.
- **Social:** duplicate `APERTURE_Master` → `APERTURE_9x16` (1080×1920) and
  `APERTURE_1x1` (1080×1080); re-anchor text to the safe area.

### Comp list
| Comp | In | Out | Notes |
|---|---|---|---|
| `01_Origin` | 0:00 | 0:21 | Reservoir + opening lines |
| `02_Refinery` | 0:22 | 0:43 | Wordmark bloom + telemetry |
| `03_Diagnose` | 0:44 | 1:03 | Intervention cards |
| `04_Engines` | 1:04 | 1:19 | Crude→gold pipeline |
| `05_Results` | 1:20 | 1:36 | Dashboard + matrix |
| `06_Loop` | 1:37 | 1:57 | Ring / flywheel |
| `07_Reveal` | 1:58 | 2:15 | Iris + logo |

---

## Brand constants (paste into an AE expression / .clr)

**Colours (hex)**
```
void      #04060b   crude-black  #0a0a0f
gold      #f5b942   gold-soft    #ffd479   gold-deep #b8801f
cyan      #38e1ff   blue         #4f7bff   violet   #8b5cff
teal      #2ee6c5   magenta      #ff5adb   amber    #ff8a3d
```

**Type**
- Display / logotype: **Space Grotesk** (700), tracking −4.5%.
- Body: **Inter**. Mono / labels: **JetBrains Mono**, uppercase, tracking +8–12%.

**Signature easing** (matches the site's `[0.16, 1, 0.3, 1]` "expo-out"):
- Keyframe Velocity → ease out ~90%, or Graph Editor bezier handles pulled to
  (0.16, 1) / (0.30, 1). Save as an animation preset `Aperture_ExpoOut`.

**Motion feel**
- Text reveals: rise 0.6em + blur 8→0, stagger 45ms per word (see
  `components/ui/RevealText.tsx`).
- Everything critically damped — no overshoot except the final logo (tiny 2%).

---

## Per-comp build notes

### 01_Origin
- Reservoir = a dark radial + Fractal Noise displaced ellipse; rim light in gold.
- Opening lines: 3 text layers, `Aperture_ExpoOut`, cross-fade, big Gaussian
  reverb-like blur on exit.
- Particle bed: **CC Particle World** or Trapcode Particular, slow downward
  drift, gold sprites, additive.

### 02_Refinery
- Logotype: scale 96→100 + tracking 0.2em→−0.045em + glow bloom.
- Telemetry: 12 label chips fly from edges to centre on staggered `ExpoOut`;
  motion-blur on.
- Knowledge graph: null-parented dots + trim-path lines (rebuild `NeuralGraph`).

### 03_Diagnose
- 9 cards on a 3×3 grid; active 4 at 100% + rim light, inactive at 35% opacity.
- Confidence bars: Linear Wipe 0→value; number counters via Slider + expression
  `Math.round(effect("Conf")("Slider"))`.

### 04_Engines
- Pipeline fluid: a gradient ramp from crude-black → gold along a mask path,
  animate `Offset`. Impurities = small dark particles fading out.
- 5 engine cards illuminate in sequence (BAL/violet accent).
- Purity meter mirrors the site's `--purity` var (0→1) via a Slider.

### 05_Results
- Line chart: Trim Paths on the mAP (cyan) + loss (gold) strokes; area = the same
  path filled at low opacity.
- Confusion matrix: 6×6 grid; diagonal cells animate to teal, off-diagonal fade
  dark. Counters roll with `ExpoOut`.

### 06_Loop
- Ring = a circle stroke (trim 0→1) with a light dot parented to a rotating null
  (0→360, loopOut). 6 labels placed by trig around the ring.
- Centre "Aperture" core breathes (scale 26↔34) — reuse `aperture-pulse.json`.

### 07_Reveal
- Iris: 6–8 blade shapes rotating open (reuse `ApertureMark` geometry / the
  Lottie). Wordmark bloom + subtitle + CTA on `ExpoOut`. Vignette closes 4%.

---

## Two ways to get "export-ready" scenes

1. **Screen-capture the live site** (fastest, pixel-perfect): run `npm run build
   && npm start`, record at 2× DPR, then conform in AE and add grade + audio.
   The site is already the animation source of truth.
2. **Rebuild in AE** using the specs above when you need 4K/ProRes control or
   print-res stills.

### Lottie bridge
- The site already ships a Lottie asset at
  `public/lottie/aperture-pulse.json` (generator: `scripts/build-lottie.mjs`).
- Design new vector animations in AE + **Bodymovin/LottieFiles** → export JSON →
  drop into `public/lottie/` → render with `components/ui/LottiePlayer.tsx`.
  This keeps AE and the website in perfect sync for icon-scale motion.
