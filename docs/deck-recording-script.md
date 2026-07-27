# APERTURE `/deck` — Investor Deck Recording & Voice‑over Script

A light‑theme, Y‑Combinator‑style **investor deck** lives at **`/deck`**. It is 19
full‑screen **16:9 slides** on a fixed 1280×720 stage that scales to fill any display,
so it records **frame‑perfect** at 1080p with no reflow. It is built to be **read on a
call, projected in a room, or recorded with a voice‑over**.

Unlike `/pitch` (a scroll film), `/deck` is a **discrete, keyboard‑driven deck** — you
advance slide‑by‑slide, so the pace is entirely under your control while recording.

The deck is deliberately **honest about stage**: we are **pre‑revenue**. Two engines are
**live and validated** today (domain adaptation, synthetic generation); the autonomous
**reasoning / diagnosis layer is roadmap**. Nothing has been sold yet — the proof on
screen is our own engineering validation, and it says so. That candor is the pitch.

This document is everything you need to **record the walkthrough and drop a voice‑over
on top**: setup, controls, a slide‑by‑slide talk track, two cut lengths, music/SFX
cues, and the honesty guardrails that keep it out of "AI‑slop" territory.

---

## 1. Recording setup

| Setting | Value |
|---|---|
| Route | `http://localhost:3100/deck` (or your deployed `/deck`) |
| Resolution | Record at **1920×1080** — the stage is exactly 16:9, so it fills edge‑to‑edge with no letterbox |
| Browser | Chrome, full‑screen, 100 % zoom, bookmarks bar hidden |
| Clean capture | Press **`F`** for real fullscreen, then **`H`** to hide the in‑frame chrome (wordmark, slide counter, progress bar) for a bare‑slide capture. Press `H` again to bring them back. |
| Motion | Slide transitions honor OS "reduce motion." Leave it **off** for the soft cross‑fade/slide; turn it **on** if you want instant cuts. |
| Cursor | Hide the cursor while filming — there is nothing to click; you drive with the keyboard. |

**Capture tools:** OBS (Display/Window Capture, 60 fps, 1080p) or your OS recorder.
Record clean, then add the voice‑over in your editor. For a **PDF leave‑behind**, use the
browser print dialog per slide, or screenshot each `#anchor` at 1920×1080.

---

## 2. Controls (keyboard‑first)

| Key | Action |
|---|---|
| `→` `↓` `Space` `PageDn` | Next slide |
| `←` `↑` `PageUp` | Previous slide |
| `Home` / `End` | Jump to first / last slide |
| `O` | Overview grid — click any thumbnail to jump; `Esc` to close |
| `F` | Toggle fullscreen |
| `H` | Hide / show in‑frame chrome (counter + progress bar) |
| `?` | Toggle the on‑screen shortcut hint |
| `V` | *(dev only)* toggle the **DeckAudit** contract overlay — not present in production |
| Wheel / trackpad | Advances one slide (debounced) |
| Swipe | Advances one slide on touch |

**Deep‑linking / jump‑to for rehearsal:** every slide has a stable hash. Load or
`location.hash = '#…'` to jump straight to it. Anchors in order:
`#title #what #problem #why-now #market #solution #product-live #roadmap #platform
#outcomes #traction #model #pricing #competition #moat #milestones #ask #team #close`.

---

## 3. Voice direction

Calm, low, deliberate — a founder who has done the work, not a salesperson. Never
hypey. Every claim names an **exact action** and the **number or time** behind it —
**never** "AI‑powered optimization." When a slide is about the *future*, say so out loud
("this is what we're building"). The deck is deliberately honest: two engines **ship and
are validated today**; the autonomous reasoning layer is **roadmap**; and we are
**pre‑revenue** — the proof is our own engineering validation, not a customer result, and
we haven't started selling. Do not imply otherwise. That honesty is the strongest thing
in the room — lean into it.

Target lengths: a **full ~6‑minute** read (all 19), or a **fast ~3‑minute** cut
(marked ⚡ below). Hold each slide until the line lands, then advance.

---

## 4. Slide‑by‑slide script

> Format: **N. Label · `#anchor`** — what's on screen, then the spoken lines.
> ⚡ = keep this slide in the fast 3‑minute cut.

### ⚡ 1. Title · `#title` — **[0:00]**
On screen: **"Your model can't see."** · *the data intelligence layer for computer vision* · top‑right reads **Pre‑revenue · raising a $1.5M pre‑seed**.
- "Aperture is the data intelligence layer for computer vision."
- "AI doesn't fail because it can't learn — it fails because it can't see. We find the blind spot in your data and generate the exact frames that bring the model into focus."

### ⚡ 2. What we do · `#what` — **[0:16]**
On screen: **"We turn model failures into the exact data that fixes them."** · Diagnose / Treat / Ship.
- "Teams don't ship late because the architecture is wrong. They ship late because the data is wrong — a blind spot at night, a missing viewpoint, a rare defect."
- "You point us at a failing slice; we find the gap and generate the precise labeled data to close it. Diagnose, treat, ship — and two of those three already run on live engines."

### ⚡ 3. The problem · `#problem` — **[0:38]**
On screen: **"Models are commoditized. The data is where teams get stuck."**
- "Foundation models made architecture a solved problem. The remaining twenty percent — the long‑tail failures that block deployment — is a data problem, and it's still fixed by hand."
- "One failure mode is about six weeks of collection and labeling and a five‑figure bill. And without a diagnosis, teams guess at the fix — collect more, augment, synthesize — and burn cycles on the wrong one."

### ⚡ 4. Why now · `#why-now` — **[1:02]**
On screen: **"Data‑centric AI is the fight — and nobody owns the data layer."**
- "Three things just became true. Architecture converged — off‑the‑shelf detectors are good enough. Domain adaptation and synthetic data finally got accurate enough to train on — the tools we've built. And compute got cheap enough that a targeted frame costs cents."
- "Labeling platforms sell hours. We sell the fix. That gap is open right now."

### 5. Market · `#market` — **[1:24]**
On screen: TAM **$4.6B** · SAM **$900M** · Beachhead **$120M** — built bottoms‑up.
- "This is a budget every CV team already spends. Bottoms‑up: roughly thirty‑eight thousand teams shipping production vision, times a hundred‑and‑twenty‑thousand‑dollar average data budget — a four‑point‑six‑billion‑dollar market."
- "Serviceable today, nine hundred million in safety‑critical vision. Our beachhead is a hundred‑and‑twenty million — sim‑heavy teams in autonomy, robotics and sports broadcast who already generate synthetic data and need the sim‑to‑real gap closed. That's exactly what we've validated. Every number is teams times budget, not a top‑down analyst slide."

### ⚡ 6. How it works · `#solution` — **[1:52]**
On screen: **"You only pay for the data that ships."** — 01 Diagnose (free) · 02 Treat (PAYG) · 03 Ship (you own it).
- "The business is three steps. Diagnosis is free — connect your eval set and production failures, and we pinpoint the data gap behind the failing metric."
- "Treatment is pay‑as‑you‑go — approve an engine, and you're billed per delivered frame, annotations included. Then you ship: you own the dataset, no lock‑in."
- *(honesty)* "Diagnosis is assisted by our team today. The automated layer that does it end‑to‑end is on the roadmap — I'll show you exactly where."

### ⚡ 7. Live today · `#product-live` — **[2:22]**
On screen: two **LIVE** engines — Domain Adaptation pipeline · Synthetic Data Generation plugin — each with validation proof.
- "Two engines are built, proprietary, and validated today. The domain‑adaptation pipeline translates your labeled data into a new domain — sim to real, day to night — and keeps every annotation."
- "We validated it on real footage: we converted synthetic game‑engine footage into photoreal broadcast frames with edge‑control transfer — clean runs at four‑eighty p and seven‑twenty p, both exit zero, on a single consumer GPU."
- "The synthetic‑generation plugin builds targeted labeled frames — boxes, segmentation, keypoints — compressing about six weeks of collection and labeling per failure class into about three days. Both are founder‑built, out of Sony India and IIT Madras."

### ⚡ 8. Roadmap · `#roadmap` — **[2:56]**
On screen: **"The reasoning layer is what turns two engines into a platform."** — IN PROGRESS / PLANNED.
- "Today a human approves the intervention. The layer we're building does the diagnosis and routing automatically — reasoning layer v1 beta with design partners next quarter."
- "Planned behind it: more engines — active learning, hard‑negative mining, auto‑labeling — and a self‑serve pay‑as‑you‑go portal. We only claim what ships. The autonomous layer is roadmap, not marketing."

### 9. Platform · `#platform` — **[3:22]**
On screen: architecture map — inputs → reasoning & diagnosis layer → engines → dataset → better model → feedback loop, with a live/in‑progress/planned legend.
- "Here's the whole platform on one slide. Your signals go in — metrics, production failures, existing labels. The reasoning layer sits in the middle and routes to the engines. Green is live, amber is in progress, outline is planned."
- "The output is always the same: a labeled dataset that lifts the metric that was failing — which feeds the next diagnosis."

### 10. Proof · `#outcomes` — **[3:46]**
On screen: **"The hard part works: sim → real, on one GPU."** — synthetic → real · re‑labeling weeks → none · 6 weeks → 3 days · badge **"Validation, not sales."**
- "Before selling anything, we de‑risked the core question — can we actually close the synthetic‑to‑real gap? We ran edge‑control domain transfer on synthetic gameplay footage and produced photoreal broadcast frames end‑to‑end."
- "Output realism went from synthetic to real. Re‑labeling to adapt, from weeks to none — the annotations carry over. Time for one fix, from six weeks to three days. To be clear: this is our own engineering validation, not a paid customer result — we haven't started selling. This round funds turning it into paid design‑partner deployments."

### ⚡ 11. Traction · `#traction` — **[4:14]**
On screen: **"Pre‑revenue by design — the hard risk is already retired."** — 2 engines built & validated · thesis **Proven** · fix time **3 days** · commercial stage **$0** · build‑progress bars.
- "Here's exactly where we are, and I'm not going to dress it up. Two engines built and validated. The core thesis — sim to real — proven, with clean runs. Validated fix time of three days, versus about six weeks by hand. And commercial stage: zero revenue — no sales yet, on purpose."
- "The bars show what's built versus what's next: both engines at a hundred percent, the reasoning‑and‑diagnosis layer about a quarter of the way, the self‑serve portal just started. We proved the technology before selling it. The pre‑seed funds the reasoning layer and our first paid deployments."

### 12. Business model · `#model` — **[4:40]**
On screen: **"We'll bill for delivered results, not seats or hours."** — modeled ~70% gross margin · cost/frame in cents · list $0.04–0.12.
- "The plan is to charge per delivered frame plus a one‑time dataset fee per failure mode. It's compute‑bound work, so we model roughly seventy‑percent gross margin at volume, as cost per frame keeps dropping."
- "Because we'll be paid on results, our incentive is your metric going up — not more labeling hours. To be clear, this is the model we'll launch; we haven't billed a customer yet."

### 13. Pricing · `#pricing` — **[5:02]**
On screen: Diagnosis **Free** · Treatment **$0.04–$0.12 / frame** · Dataset delivery **from $1,500 / failure mode**.
- "Pricing mirrors the model. Diagnosis is free, per model. Treatment is four to twelve cents a delivered frame — adaptation cheaper, targeted synthetic more. Dataset delivery starts at fifteen hundred a failure mode, and you own it. This is planned launch pricing — the paid rollout begins after the pre‑seed."

### 14. Competition · `#competition` — **[5:16]**
On screen: **"Everyone sells data work. We sell the outcome."** — capability table + positioning quadrant.
- "Labeling platforms sell labels, synthetic vendors sell frames, in‑house scripts are manual. We're the only one that diagnoses why the model fails and fixes the dataset — not just the labels — billed per delivered result."
- *(honesty)* "The diagnosis is assisted today; the asterisk is the automated reasoning layer, which is in progress."

### ⚡ 15. Moat · `#moat` — **[5:32]**
On screen: **"Every job maps a failure signature to the fix that worked."** — flywheel + proprietary engines / outcome dataset / compounds with scale.
- "The engines are proprietary and founder‑built — but the durable moat is the map from a failure signature to the intervention that actually fixed it. We capture that from the very first job, and it's ours to keep."
- "Model fails, we diagnose the gap, an engine fixes it, the outcome is recorded, and the failure‑to‑fix map grows. Once the reasoning layer ships, that map auto‑routes the next job — so it compounds with scale."

### 16. Milestones · `#milestones` — **[5:52]**
On screen: Now → Next Q → +2Q → +4Q timeline.
- "Where this goes. Today: two engines built and validated, pre‑revenue. Next quarter: deploy both engines with two to three design partners on their real failure modes. Two quarters out: reasoning layer v1 in beta, routing the first jobs — and we convert our first design partner to paid. Four quarters out: first usage‑based revenue, plus the active‑learning and hard‑negative engines."

### ⚡ 17. The ask · `#ask` — **[6:08]**
On screen: **"Raising $1.5M to build the reasoning layer."** — use of funds 50/25/15/10 · 18 months · reasoning v1 · first paid partners.
- "We're raising one‑and‑a‑half million. Half goes to engineering the reasoning layer, a quarter to landing design partners and our first revenue, the rest to compute and operations."
- "That's eighteen months of runway to take diagnosis from assisted to autonomous, deploy with our first design partners, and earn our first revenue."

### 18. Team · `#team` — **[6:24]**
On screen: founder card + two **OPEN — funded by this raise** cards · "Advisors from perception, robotics and data infrastructure (being formalized)."
- "I'm the founder — a graphics and ML engineer at Sony India, in the Software Architecture Division, out of IIT Madras through the IITM‑Pravartak and Sony CG program. I built both of Aperture's engines: the synthetic‑data plugin, and the style‑transfer domain adaptation that closes the sim‑to‑real gap. Two‑time 'Exceeds Expectations' at Sony."
- "The two open cards — a founding ML engineer for the reasoning layer, and a founding go‑to‑market lead — are the first hires this raise funds. Advisors across perception, robotics and data infrastructure are being formalized."

### ⚡ 19. Close · `#close` — **[6:40]**
On screen: **"Bring every model into focus."** · *Find the blind spot. Generate the exact data. Ship the model that finally sees. On repeat.* · founders@aperture.ai · aperture.ai.
- "The vision is simple: bring every model into focus. Find the blind spot, generate the exact data, ship the model that finally sees — on repeat."
- *(settle, quiet)* "We'd love to build it with you."

---

## 5. Two cut lengths

- **Full investor read (~6:50):** all 19 slides, in order. Best for a recorded
  walkthrough you send after a meeting, or a data‑room asset.
- **Fast teaser (~3:00) — the ⚡ slides:** `#title → #what → #problem → #why-now →
  #product-live → #roadmap → #traction → #moat → #ask → #close`. Ten slides that carry
  the whole argument: problem, what's live and validated, what's next, why it compounds,
  the ask. Use `O` (overview) to rehearse the jumps, or deep‑link each anchor.

To pre‑stage a hands‑off take, load the deck at the first anchor and advance on a timer
(`→` every N seconds) — because slides are discrete, a metronome keeps VO and picture
locked without any scroll scrubbing.

---

## 6. Sound design (optional — a deck, not a film)

A live pitch usually runs **silent under a human voice**. For a *recorded* cut, keep
audio minimal so it never competes with the numbers:

| Beat | Music | SFX |
|---|---|---|
| `#title` | Single soft pad fades in, low and patient | — |
| `#product-live` | Add a slow, quiet pulse | One soft "set" tick as each LIVE engine reads |
| `#outcomes` | Let the pad open up (major) as "sim → real" lands | A resonant note on the badge |
| `#traction` | Hold, honest and steady | Faint tick tracking each build bar |
| `#moat` | Gentle swell | A resonant note as the flywheel closes |
| `#ask` | Hold one warm sustained chord | — |
| `#close` | Resolve; let it ring 2–3 s over the wordmark | — |

Reference feel: Apple‑keynote ambient — clean sine pads, no drums. Slide transitions are
a 0.42 s cross‑fade/slide, so time musical hits to the **arrival** of each slide, not the
key press. If you burn no music, a −60 dB room tone keeps editors from hearing hard cuts.

---

## 7. Notes for the editor & the honesty guardrail

- **Aspect / master:** 16:9, 1920×1080. The stage is fixed 1280×720 scaled up, so text
  stays razor‑sharp — export at 1080p or 1440p, not below.
- **Captions:** the on‑screen slide copy already reads as the caption track; if you burn
  subtitles, mirror the VO lines above.
- **Pre‑revenue — say it plainly.** We have **not started selling**: no revenue, no
  paying pilots, no signed contracts. The proof slide is our **own engineering
  validation**, and it's labelled "Validation, not sales." The VO must never imply a
  customer result or recurring revenue. This candor is the pitch — don't edit it out.
- **Live vs roadmap — say it out loud.** Two engines are **live and validated** (domain
  adaptation, synthetic generation). The **reasoning / diagnosis layer is roadmap** (v1
  beta next quarter). Slides 6, 8, 9 and 14 carry that caveat on screen; never imply the
  layer diagnoses autonomously *today*.
- **The one rule (same as `/pitch`):** every line names an exact action and the number or
  time it moves. If a rewrite drifts into "AI‑powered optimization," cut it.
- **Team slide is real.** `#team` shows the real founder (Sony India · IIT Madras). The
  two remaining cards are **intentionally open roles** funded by this raise — not
  placeholders. Swap in named hires as they sign.
- **Design contract:** the deck ships a dev‑only audit (press `V` in `next dev`) that
  checks every slide against the font / type‑scale / contrast (WCAG AA) / palette
  contract, and a static gate (`npm run validate`) that bans hype and checks honesty. Both
  are green. If you change copy, re‑run `npm run validate` and walk the slides with `V`.
