# APERTURE — Sound Design & Music

A complete audio cue sheet for the linear promo film, plus optional
scroll-triggered SFX for the site. Timecodes match `narration-script.md`
(promo-cut pacing).

**Palette:** deep sub-bass drones, glassy bell tones, granular data textures,
soft mechanical servo hits. Nothing harsh. Everything sits *under* the VO. The
whole piece moves from **cold/void** → **warm/gold** → **resolved/luminous**.

Reference mood: Hans Zimmer restraint × Jon Hopkins texture × Apple film polish.

---

## Background music — cue sheet

| Cue | In | Out | Bed | Intent |
|---|---|---|---|---|
| **M1 — Void** | 0:00 | 0:21 | Sub drone (40–60 Hz), sparse glass piano, huge reverb | Emptiness, anticipation |
| **M2 — Awakening** | 0:22 | 0:43 | Add warm pad + slow pulse (~70 BPM), first bell motif | Aperture powers up |
| **M3 — Reasoning** | 0:44 | 1:03 | Muted arp / ticking granular texture, tension held | Machine thinking |
| **M4 — Transformation** | 1:04 | 1:19 | Pulse resolves to major, low brass swell, gold shimmer | Crude → gold payoff |
| **M5 — Ascent** | 1:20 | 1:36 | Full pad + rising arpeggio, confident groove | Metrics climb |
| **M6 — Flywheel** | 1:37 | 1:57 | Circular ostinato that loops seamlessly, layered builds | Infinite loop |
| **M7 — Reveal** | 1:58 | 2:15 | Themes converge, single sustained bell + sub, long tail | Logo, release |

**Timing rules**
- **Downbeat on the wordmark.** M2's first strong bell hits exactly as
  APERTURE blooms (~0:22).
- **Key change on gold.** M4 modulates to the relative major on "crude becomes
  gold" (~1:14).
- **Seamless loop.** M6's ostinato is written as a 4- or 8-bar loop so the
  "infinite loop" scene can hold indefinitely on the site without a seam.
- **Silence is a cue.** Drop the bed to near-silence for ~0.5s right before
  "Diagnose before acting" (0:44) and before the final reveal (1:58).
- **Duck under VO.** Sidechain the music −6 dB whenever narration plays.

---

## Sound effects — per scene

### Scene 1 — Origin
- `sfx_deep_impact` — one sub-bass hit as the first line appears (0:00).
- `sfx_liquid_low` — thick, slow crude gurgle when the reservoir is revealed.
- `sfx_dust_particles` — airy granular bed, panned, very low level.

### Scene 2 — The Refinery
- `sfx_power_up` — rising synth sweep + servo whine as the refinery wakes.
- `sfx_data_stream` (×12, staggered) — short glassy "tick/whoosh" as each
  telemetry stream flies into the core. Pan from screen edge → centre.
- `sfx_hologram_on` — soft shimmer when the reasoning card materialises.

### Scene 3 — Diagnose
- `sfx_ui_scan` — a light sweep as the nine cards fan out.
- `sfx_select` (×4) — a warm confirming "ping" as each active card illuminates
  (pitch rises with confidence). No sound for inactive cards.
- `sfx_reject` — a very soft, low "thunk" (optional) as dark cards settle.

### Scene 4 — Orchestration
- `sfx_servo` (×5) — mechanical arm actuation as each engine activates.
- `sfx_fluid_transform` — the signature moment: crude gurgle morphs into a
  bright, bell-like "shimmer pour" as gold emerges.
- `sfx_impurity_clear` — tiny sparkles as impurities dissolve.

### Scene 5 — Results
- `sfx_counter_tick` — subtle rising digital ticks under the metric counters.
- `sfx_chart_draw` — soft filtered sweep as each line draws.
- `sfx_matrix_lock` — clean "click" as the confusion matrix snaps to its
  diagonal.

### Scene 6 — The Loop
- `sfx_whoosh_return` — production failures fly back into Aperture.
- `sfx_beat_pulse` — one soft pulse per loop step (Observe…Repeat), locked to
  M6's ostinato.
- `sfx_graph_grow` — faint crystalline growth as the knowledge graph expands.

### Final — Reveal
- `sfx_iris_open` — a smooth mechanical aperture opening (layered blades).
- `sfx_final_bloom` — a single, wide, resonant bell — the emotional button.
- Tail: let reverb ring into silence for ~3s.

---

## Optional site audio (interactive)

If you enable sound on the site (default **off**, gated behind a mute toggle to
respect autoplay policies + accessibility):

- Trigger `sfx_data_stream` / `sfx_select` from the same scroll thresholds that
  drive `scrollStore.phase`.
- Master bus at −18 LUFS; respect `prefers-reduced-motion` **and** a persisted
  mute preference (localStorage).
- Never autoplay audio on load. Require an explicit user gesture.

### Suggested royalty-free sources
Artlist, Epidemic Sound, or Soundstripe for the bed; freesound.org (CC0) for
individual SFX. Design the `sfx_fluid_transform` and `sfx_iris_open` bespoke —
they are the two signature sounds.
