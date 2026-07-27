# APERTURE `/pitch` — Recording & Voice‑over Script

A production‑ready, **recording‑first** variant lives at **`/pitch`**. It was built
to be filmed full‑screen: legibility‑first editorial layout, no busy 3D behind the
copy, a distraction‑free "cinema" mode, and a signature crude→gold data‑flow that is
100 % scroll‑scrubbed so it records frame‑perfect.

This document is everything you need to **record the walkthrough and drop a voice‑over
on top**. Timings target a **~90‑second** linear cut; because the page is scrubbed,
you control the exact pace while recording.

---

## 1. Recording setup

| Setting | Value |
|---|---|
| Route | `http://localhost:3100/pitch` (or your deployed `/pitch`) |
| Resolution | Record at **1920×1080** (the layout is tuned for 1440–1920 wide) |
| Browser | Chrome, full‑screen (`F11`), 100 % zoom, hide bookmarks bar |
| Clean UI | Press **`C`** to toggle **cinema mode** — hides the header, the REC pill, the progress meter and the hint. Press `C` again to bring them back. |
| Motion | Leave "reduce motion" **off** in the OS, or the flow animation falls back to a static summary. |
| Cursor | Hide the cursor while filming (OS setting or your capture tool) — there is nothing to click during the story. |

**Capture tools:** OBS (Display/Window Capture, 60 fps, 1080p) or the browser's own
screen recorder. Record video clean, then add the voice‑over in your editor.

### Optional — drive a perfectly smooth scroll for the take
The page exposes its smooth‑scroll engine on `window.__lenis`. Paste this in the
DevTools console to auto‑scroll the whole story over a fixed duration (great for a
hands‑off take you narrate against):

```js
// Smoothly scroll /pitch top → bottom over N seconds, then stop.
(async () => {
  const secs = 90;                       // total scroll time
  const l = window.__lenis;              // exposed by the site
  const max = document.body.scrollHeight - innerHeight;
  const t0 = performance.now();
  const ease = t => t < .5 ? 2*t*t : 1-((-2*t+2)**2)/2; // easeInOutQuad
  function frame(now){
    const p = Math.min(1, (now - t0) / (secs*1000));
    const y = ease(p) * max;
    (l ? l.scrollTo(y, { immediate:true, force:true }) : scrollTo(0, y));
    if (p < 1) requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
})();
```

Start your recorder, press `C` for cinema mode, run the snippet, narrate. Tune `secs`
to taste (75–100 s all read well). To jump to any beat while rehearsing:
`window.__lenis.scrollTo(Y, {immediate:true, force:true})` with the Y values below.

---

## 2. Voice direction

Calm, low, deliberate — a quiet authority (Jony Ive product film meets a research
lab). Never salesy. Let silence breathe. Every claim is concrete: an exact action and
the time it saves — **never** "AI‑powered optimization." Numbers are stated plainly.

---

## 3. Scene‑by‑scene script

> `Y ≈` values are scroll positions at 1440×900 desktop; they scale with viewport,
> so use them as *relative* cues. Section anchors are given for jump‑to.

### SCENE 0 — Hero · `#pitch-top` · `Y ≈ 0`  ·  **[0:00 – 0:12]**
On screen: **"Your model didn't fail. Your data did."** + a live *Diagnosis* card
(ranked root causes, confidence, mAP lift, "Diagnosis is free · Treatment billed per
refined sample") + the KPI strip (8 min · +22% · +11.4 pts · 47 teams).

- **[0:00]** *(quiet, certain)* "Your model didn't fail. Your data did."
- **[0:05]** "Aperture finds the exact reason a perception model breaks in the field —
  then rebuilds the dataset to fix it."
- **[0:09]** "Connect a failing run. Get a ranked diagnosis in eight minutes."

*SFX:* a soft sub‑bass swell on the headline. *Music:* enters here, low and patient.

### SCENE 1 — The problem · `#pitch-problem` · `Y ≈ 900`  ·  **[0:12 – 0:24]**
On screen: **"It passes every test — then misses a cyclist at night."** Night+rain
street with detection boxes and two red **BLIND SPOT** flags. Chips: *3 days · 12.6% ·
2 misses.*

- **[0:12]** "It passes every test — then misses a cyclist at night."
- **[0:17]** "The failures live in the long tail: rain, glare, night, rare classes.
  You don't see them until production does."
- **[0:21]** "The bottleneck was never the model. It's the data — and the person fixing
  it by hand."

*SFX:* rain bed fades under; a single alert tick when the red flags resolve in.

### SCENE 2 — The product & the price · `#pitch-how` · `Y ≈ 1850`  ·  **[0:24 – 0:36]**
On screen: three cards — **Diagnose** *(Free, always)*, **Treat** *(Pay as you go)*,
**Ship the dataset** *(Billed on delivery)* — each with the exact *You* action, what
Aperture does, and a time chip (8 minutes not 3 days · hours, fully automated · one
command to retrain).

- **[0:24]** "Three steps. You only pay for what ships."
- **[0:28]** "Diagnosis is free. You connect a failing run; Aperture ranks the root
  causes and the mAP lift each fix is worth."
- **[0:32]** "Approve only the fixes you want. Treatment is billed per refined sample —
  no seats, no lock‑in."

*SFX:* three soft, distinct clicks as each card lands.

### SCENE 3 — Crude → Gold (signature) · `#pitch-flow` · `Y ≈ 2859 → 5199`  ·  **[0:36 – 0:58]**
The pinned centerpiece. As you scroll, RGB frames stream in, an `annotations.csv`
corrects itself in place, synthetic frames are added, and the vessel turns crude →
gold. Counters climb (frames ingested · labels repaired · dataset quality → 98.6%).
Phase chips: **Ingest → Diagnose → Refine → Gold.**

- **[0:36]** *(INGEST, Y≈3120)* "Watch raw data become a training asset. Every frame,
  every label, streams in."
- **[0:42]** *(DIAGNOSE, Y≈3760)* "First Aperture diagnoses — it flags impurities and
  weak labels before it changes a single row."
- **[0:48]** *(REFINE, Y≈4380)* "Then it refines: labels corrected, classes balanced,
  hard cases synthesised. A missing cyclist becomes a labelled cyclist."
- **[0:54]** *(GOLD, Y≈5185)* "Twelve thousand frames in. Nineteen hundred labels
  repaired. Ninety‑nine percent clean — a gold‑grade dataset."

*SFX:* a low fluid‑flow bed the whole scene; a bright "ting" the moment the liquid
turns gold. *Music:* lift the pad as the vessel fills.

### SCENE 4 — The platform · `#pitch-platform` · `Y ≈ 6099`  ·  **[0:58 – 1:08]**
On screen: the architecture map — **Inputs** (datasets, training runs, production
feedback) → **the Aperture reasoning layer** (Observe · Diagnose · Orchestrate) →
seven **proprietary** engines → optimised dataset → better model → feedback loop.

- **[0:58]** "One reasoning layer. Every engine proprietary."
- **[1:02]** "Aperture sits between your data and your models. It observes, diagnoses,
  and orchestrates the exact engines a fix requires — no synthetic‑data dump, no
  guesswork."

*SFX:* a soft mechanical settle as the engine chips light.

### SCENE 5 — Traction · `#pitch-traction` · `Y ≈ 7410`  ·  **[1:08 – 1:18]**
On screen: week‑over‑week bar chart (454k refined samples this week, **+22% WoW**) and
KPIs — 9.6M samples refined, 141% NRR, 94% diagnoses accepted, +22% avg weekly growth.

- **[1:08]** "We don't sell a market‑size slide."
- **[1:11]** "We ship refined datasets — and the volume compounds week over week.
  Twenty‑two percent, every week. A hundred and forty‑one percent net revenue
  retention."

*SFX:* a quick rising arpeggio that tracks the bars climbing.

### SCENE 6 — The moat · `#pitch-moat` · `Y ≈ 8429`  ·  **[1:18 – 1:28]**
On screen: diagnosis‑accuracy curve 41% → 95% vs. cumulative client runs; three points
(proprietary engines · compounding priors · privacy‑preserving); the flywheel
Observe → Diagnose → Reason → Orchestrate → Learn.

- **[1:18]** "Every fix makes the next one faster."
- **[1:22]** "The reasoning layer learns from every client iteration — which diagnosis
  was right, which intervention actually moved mAP. Patterns are shared across the
  network. Your data never is."

*SFX:* a resonant note that blooms as the curve reaches 95%.

### SCENE 7 — Crossing the chasm · `#pitch-adoption` · `Y ≈ 9447`  ·  **[1:28 – 1:36]**
On screen: technology‑adoption bell curve with "**You are here — crossing into the
early majority**" at the chasm.

- **[1:28]** "Data‑centric AI is crossing the chasm."
- **[1:31]** "Teams have squeezed what they can from architectures and
  hyperparameters. The next order of magnitude comes from the data — and that's the
  wave Aperture rides."

### SCENE 8 — Close · `#pitch-cta` · `Y ≈ 10470`  ·  **[1:36 – 1:30 end]**
On screen: **"Upload a failing run. See the root cause in 8 minutes."** ·
*Diagnosis is free. You only pay for the fixes you decide to ship.* · buttons *Get a
free diagnosis / Talk to an engineer* · Observe · Diagnose · Reason · Orchestrate ·
Learn.

- **[1:36]** "Upload a failing run. See the root cause in eight minutes."
- **[1:40]** *(settle, quiet)* "Diagnosis is free. You only pay for what ships."

*Music:* resolve to a single sustained note; let it ring 2–3 s over the wordmark.

---

## 4. Music & SFX timing (linear cut)

| Time | Music | SFX |
|---|---|---|
| 0:00 | Low patient pad in | Sub‑bass swell on headline |
| 0:12 | Add a slow pulse | Rain bed under problem scene |
| 0:36 | Warm the pad | Fluid‑flow bed begins |
| 0:54 | Pad lift (major) | Bright "ting" on gold |
| 1:08 | Add light percussion | Rising arpeggio on bars |
| 1:18 | Swell | Resonant bloom on curve |
| 1:36 | Resolve to sustained note | — |
| 1:42 | Tail out | — |

Reference feel: Hans‑Zimmer‑lite / Apple‑keynote ambient — clean sine pads, a soft
pulse, no drums until traction.

---

## 5. Notes for the editor

- **Aspect:** master 16:9 (1920×1080). A 9:16 vertical cut works if you record the
  hero, the flow (SCENE 3) and the close separately — those three read on mobile.
- **Captions:** the on‑screen copy is already the caption track; if you burn subtitles,
  mirror the VO lines above.
- **The one rule:** every line names an exact action and the time or number it moves.
  If a rewrite drifts into "AI‑powered optimization," cut it.
