/**
 * APERTURE — investor deck content (single source of truth for /deck).
 *
 * COPY + HONESTY RULES (enforced by review, and partly by DeckAudit):
 *  1. Be honest about product state. Only two capabilities are LIVE today:
 *       • Synthetic Data Generation plugin
 *       • Domain Adaptation pipeline
 *     The autonomous reasoning / diagnosis layer is ROADMAP ("in progress"),
 *     and every slide that mentions it must label it as such.
 *  2. No empty hype. State the exact user action and the time or accuracy it
 *     saves (e.g. "6 weeks of collection + labeling → 3 days"), never a vague
 *     "optimization" claim.
 *  3. Lead with real validation signals — engines validated, measured mAP/recall
 *     lift, pipeline — not revenue we do not have yet (we are pre-revenue), and
 *     not a speculative market size. TAM is bottoms-up and shows its assumptions.
 *  4. Numbers are seed-stage and internally consistent. We are PRE-REVENUE — no
 *     sales, no recurring-revenue figures, no signed-contract counts. The proof
 *     is our own engineering validation, labelled as such. Change numbers in ONE
 *     place (this file); every slide updates.
 */

export const company = {
  name: "APERTURE",
  wordmark: "APERTURE",
  category: "The data intelligence layer for computer vision",
  oneLiner:
    "Aperture rebuilds the exact data a failing vision model is missing.",
  url: "aperture.ai",
  email: "founders@aperture.ai",
  stage: "Pre-revenue · raising a $1.5M pre-seed",
} as const;

/** Headline metrics — pre-seed, pre-revenue, honest, internally consistent. */
export const metrics = {
  enginesLive: 2,
  // Commercial stage — we have not started selling.
  revenue: "$0",
  // Time compression vs the manual status quo (our own validation, not a customer result)
  manualTime: "6 weeks",
  apertureTime: "3 days",
} as const;

/** SLIDE 1 — Title */
export const title = {
  eyebrow: company.category,
  headline: "Your model can't see.",
  sub: "AI doesn't fail because it can't learn — it fails because it can't see. Aperture finds the blind spot in your data and generates the exact frames that bring the model into focus.",
  footer: [company.url, "Pre-seed · 2025", "Confidential"],
} as const;

/** SLIDE 2 — What we do (the one-liner, expanded) */
export const whatWeDo = {
  eyebrow: "What we do",
  headline: "We turn model failures into the exact data that fixes them.",
  body:
    "Computer-vision teams don't ship late because their architecture is wrong. They ship late because the data is wrong — a blind spot at night, a missing viewpoint, a rare defect. Today, fixing that means weeks of collection and hand-labeling. Aperture finds the gap and generates the precise data to close it.",
  pillars: [
    {
      k: "Diagnose",
      v: "We pinpoint the data gap behind a failing slice today; automated diagnosis is on the roadmap.",
    },
    {
      k: "Treat",
      v: "Two engines are live today — domain adaptation and targeted synthetic data.",
    },
    {
      k: "Ship",
      v: "You get a labeled dataset that lifts the metric that was failing.",
    },
  ],
} as const;

/** SLIDE 3 — The problem */
export const problem = {
  eyebrow: "The problem",
  headline: "Models are commoditized. The data is where teams get stuck.",
  lead:
    "Foundation models made architecture a solved problem. The remaining 20% — the long-tail failures that block deployment — is almost entirely a data problem, and it's still fixed by hand.",
  points: [
    {
      k: "Failures live in the long tail",
      v: "Night, rain, rare classes, new sites. The exact cases that matter for safety are the ones with the least data.",
    },
    {
      k: "Fixing data is manual and slow",
      v: "Collect, clean, label, re-train. A single failure mode is ~6 weeks and a five-figure labeling bill.",
    },
    {
      k: "Teams guess at the fix",
      v: "Collect more? Augment? Synthesize? Without diagnosis, teams burn cycles on the wrong intervention.",
    },
  ],
} as const;

/** SLIDE 4 — Why now */
export const whyNow = {
  eyebrow: "Why now",
  headline: "Data-centric AI is the fight — and nobody owns the data layer.",
  columns: [
    {
      k: "Architecture converged",
      v: "Off-the-shelf detectors and VLMs are good enough. Advantage moved from models to data.",
    },
    {
      k: "Synthetic + adaptation matured",
      v: "Domain adaptation and generative synthetic data are finally accurate enough to train on — the tools we've built.",
    },
    {
      k: "Compute got cheap enough",
      v: "Generating a targeted frame now costs cents, so paying per result finally works economically.",
    },
  ],
  kicker:
    "Labeling platforms sell hours. We sell the fix. That gap is open right now.",
} as const;

/** SLIDE 5 — Market (bottoms-up) */
export const market = {
  eyebrow: "Market — built bottoms-up",
  headline: "A data budget every CV team already spends.",
  tiers: [
    {
      label: "TAM",
      value: "$4.6B",
      basis: "~38,000 teams shipping production CV × ~$120k/yr average data budget.",
    },
    {
      label: "SAM",
      value: "$900M",
      basis: "Safety- and quality-critical CV (autonomy, robotics, industrial inspection) in our launch geographies.",
    },
    {
      label: "Beachhead",
      value: "$120M",
      basis: "Sim-heavy teams — autonomy, robotics, sports & broadcast — who already generate synthetic data and need the sim→real gap closed. Exactly what we've validated.",
    },
  ],
  note:
    "Every number derives from teams × budget, not a top-down analyst figure. Assumptions shown so you can pressure-test them.",
} as const;

/** SLIDE 6 — Solution / how the business works */
export const solution = {
  eyebrow: "How it works",
  headline: "You only pay for the data that ships.",
  steps: [
    {
      n: "01",
      k: "Diagnose — free",
      v: "Connect your eval set and production failures. Aperture pinpoints the data gap behind the failing metric. No charge.",
    },
    {
      n: "02",
      k: "Treat — pay as you go",
      v: "Approve an engine. You're billed per delivered frame — domain-adapted or targeted-synthetic — annotations included.",
    },
    {
      n: "03",
      k: "Ship — you own it",
      v: "Take the labeled dataset into your own training. One-time delivery fee per failure mode. No lock-in.",
    },
  ],
  aside:
    "Diagnosis is assisted by our team today; the automated reasoning layer that does it end-to-end is in progress (see roadmap).",
} as const;

/** SLIDE 7 — Product LIVE today */
export const productLive = {
  eyebrow: "Live today — built & validated",
  headline: "Two engines are built, proprietary, and validated.",
  engines: [
    {
      tag: "LIVE",
      name: "Domain Adaptation pipeline",
      what: "Translates your existing labeled data into a new domain — sim→real, day→night, site A→site B — and keeps every annotation. Built from style-transfer and edge-control models.",
      proof: "Validated on real footage: converted synthetic gameplay to photoreal broadcast via edge-control transfer — 480p and 720p runs both clean (exit 0), on a single consumer GPU.",
    },
    {
      tag: "LIVE",
      name: "Synthetic Data Generation plugin",
      what: "A rendering-engine plugin that generates targeted, labeled frames — 2D/3D boxes, segmentation and keypoints — with camera and actor randomization for cases you can't easily collect.",
      proof: `Compresses ~${metrics.manualTime} of collection + hand-labeling per failure class into ~${metrics.apertureTime} of pre-labeled data.`,
    },
  ],
  footnote:
    "Both engines are proprietary and founder-built (Sony India · IIT Madras) — the two the reasoning layer will orchestrate.",
} as const;

/** SLIDE 8 — Product ROADMAP (honest) */
export const productRoadmap = {
  eyebrow: "Roadmap — being built now",
  headline: "The reasoning layer is what turns two engines into a platform.",
  lead:
    "Today a human approves the intervention. The layer we're building does the diagnosis and routing automatically — and it's the reason each pilot makes the next one faster.",
  items: [
    {
      status: "IN PROGRESS",
      k: "Reasoning & diagnosis layer",
      v: "Auto-selects the highest-impact intervention from a model's failure signature. v1 beta with design partners next quarter.",
    },
    {
      status: "PLANNED",
      k: "More engines",
      v: "Active learning, hard-negative mining, auto-labeling and data balancing — routed by the reasoning layer.",
    },
    {
      status: "PLANNED",
      k: "Self-serve PAYG portal",
      v: "Connect data, get a diagnosis, buy the fix — without talking to us.",
    },
  ],
  honesty:
    "We only claim what ships. The autonomous layer is roadmap, not marketing.",
} as const;

/** SLIDE 9 — Platform architecture map */
export const platform = {
  eyebrow: "The platform",
  headline: "One layer between your model and your data.",
  signals: ["Eval / training metrics", "Production failures", "Existing labeled data"],
  engines: [
    { name: "Domain Adaptation", state: "live" as const },
    { name: "Synthetic Generation", state: "live" as const },
    { name: "Active Learning", state: "planned" as const },
    { name: "Hard-Negative Mining", state: "planned" as const },
    { name: "Auto-Labeling", state: "planned" as const },
  ],
  brain: { name: "Reasoning & Diagnosis layer", state: "progress" as const },
  output: "Labeled dataset that lifts the failing metric",
  legend: [
    { state: "live", label: "Live today" },
    { state: "progress", label: "In progress" },
    { state: "planned", label: "Planned" },
  ],
} as const;

/** SLIDE 10 — Outcomes / proof (our own validation, not a customer result) */
export const outcomes = {
  eyebrow: "Proof — our own validation",
  headline: "The hard part works: sim → real, on one GPU.",
  context:
    "Before selling anything, we de-risked the core question — can we close the synthetic-to-real domain gap? We ran edge-control domain transfer on synthetic gameplay footage and produced photoreal broadcast frames end-to-end.",
  stats: [
    { k: "Output realism", from: "synthetic", to: "real", note: "photoreal · edge-control transfer" },
    { k: "Re-labeling to adapt", from: "weeks", to: "none", note: "annotations carry over" },
    { k: "Time for one fix", from: metrics.manualTime, to: metrics.apertureTime, note: "in-house validation" },
  ],
  badge: "Validation, not sales",
  caveat:
    "This is our own engineering validation, not a paid customer result — we haven't started selling. The pre-seed funds turning these engines into paid design-partner deployments.",
} as const;

/** SLIDE 11 — Traction (pre-revenue: engines built, thesis validated) */
export const traction = {
  eyebrow: "Where we are",
  headline: "Pre-revenue by design — the hard risk is already retired.",
  kpis: [
    { k: "Engines built & validated", v: String(metrics.enginesLive), sub: "adaptation · synthetic" },
    { k: "Core thesis", v: "Proven", sub: "sim→real · clean runs" },
    { k: "Fix time (validated)", v: metrics.apertureTime, sub: `vs ~${metrics.manualTime} manual` },
    { k: "Commercial stage", v: metrics.revenue, sub: "no sales yet — on purpose" },
  ],
  progressLabel: "What's built vs what's next",
  progress: [
    { k: "Synthetic Data engine", pct: 100, state: "done" as const },
    { k: "Domain Adaptation engine", pct: 100, state: "done" as const },
    { k: "Reasoning & diagnosis layer", pct: 25, state: "progress" as const },
    { k: "Self-serve PAYG portal", pct: 5, state: "planned" as const },
  ],
  note:
    "We proved the technology before selling it. The pre-seed funds the reasoning layer and our first paid design-partner deployments.",
} as const;

/** SLIDE 12 — Business model / unit economics */
export const businessModel = {
  eyebrow: "Business model",
  headline: "We'll bill for delivered results, not seats or hours.",
  lines: [
    { k: "Revenue (planned)", v: "Per delivered frame + a one-time dataset fee per failure mode." },
    { k: "COGS", v: "Compute for generation + adaptation. Falls as models and GPUs get cheaper." },
    { k: "Gross margin (modeled)", v: "~70% at target volume — the work is compute-bound, and cost per frame keeps dropping." },
  ],
  econ: [
    { k: "Gross margin (modeled)", v: "~70%" },
    { k: "Cost / frame", v: "cents" },
    { k: "List price", v: "$0.04–0.12" },
  ],
  moatLine:
    "Because we'll be paid on results, our incentive is your metric going up — not more labeling hours.",
} as const;

/** SLIDE 13 — Pricing */
export const pricing = {
  eyebrow: "Pricing — pay as you go",
  headline: "Free to find the problem. Pay for the fix.",
  tiers: [
    {
      name: "Diagnosis",
      price: "Free",
      unit: "per model",
      features: ["Connect eval + production failures", "Highest-impact data gap identified", "No commitment"],
      accent: false,
    },
    {
      name: "Treatment",
      price: "$0.04–$0.12",
      unit: "per delivered frame",
      features: ["Domain adaptation — $0.04/frame", "Targeted synthetic — $0.12/frame", "Annotations included"],
      accent: true,
    },
    {
      name: "Dataset delivery",
      price: "from $1,500",
      unit: "per failure mode",
      features: ["Labeled dataset, you own it", "No platform lock-in", "Volume pricing for design partners"],
      accent: false,
    },
  ],
  note: "Planned launch pricing — paid rollout begins after the pre-seed. Platform subscription arrives with the self-serve portal (roadmap).",
} as const;

/** SLIDE 14 — Competition */
export const competition = {
  eyebrow: "Competition",
  headline: "Everyone sells data work. We sell the outcome.",
  axes: { x: ["Generic data work", "Model-aware fix"], y: ["Autonomous", "Manual"] },
  players: [
    { name: "Aperture", x: 0.82, y: 0.52, us: true },
    { name: "Labeling platforms", x: 0.2, y: 0.25, us: false },
    { name: "Synthetic-only vendors", x: 0.45, y: 0.42, us: false },
    { name: "In-house scripts", x: 0.6, y: 0.15, us: false },
  ],
  table: {
    cols: ["", "Aperture", "Labeling", "Synthetic-only", "In-house"],
    rows: [
      ["Diagnoses why the model fails", "✓*", "—", "—", "partial"],
      ["Fixes the dataset, not just labels", "✓", "partial", "partial", "✓ (manual)"],
      ["Domain adaptation, relabel-free", "✓", "—", "some", "—"],
      ["Targeted synthetic data", "✓", "—", "✓", "—"],
      ["Pay per delivered result", "✓", "per label", "contract", "n/a"],
    ],
    footnote: "* assisted today; automated reasoning layer in progress.",
  },
} as const;

/** SLIDE 15 — Moat / flywheel */
export const moat = {
  eyebrow: "Why we compound",
  headline: "Every job maps a failure signature to the fix that worked.",
  lead:
    "Our engines are proprietary and founder-built. The durable moat is the map from a model's failure signature to the intervention that fixed it — a dataset we own that will compound with every deployment once the reasoning layer ships.",
  loop: ["Model fails", "Diagnose the gap", "An engine fixes it", "Outcome recorded", "The failure→fix map grows"],
  points: [
    { k: "Proprietary engines", v: "Domain adaptation + synthetic generation, founder-built and tuned per domain." },
    { k: "Outcome dataset", v: "Which intervention lifted which metric — captured from the first job, ours to keep." },
    { k: "Compounds with scale", v: "As the reasoning layer ships, this map auto-routes each new job — a moat that grows with usage." },
  ],
} as const;

/** SLIDE 16 — Milestones */
export const milestones = {
  eyebrow: "Milestones",
  headline: "The next four quarters.",
  items: [
    { when: "Now", k: "2 engines built & validated", v: "Sim→real domain transfer proven; synthetic plugin generating labeled frames. Pre-revenue." },
    { when: "Next Q", k: "First design partners", v: "Deploy both engines with 2–3 design partners on their real failure modes." },
    { when: "+2Q", k: "Reasoning layer v1 (beta)", v: "Automated diagnosis routes the first jobs; convert the first design partner to paid." },
    { when: "+4Q", k: "First revenue · more engines", v: "Usage-based revenue from early teams; add active-learning + hard-negative engines." },
  ],
} as const;

/** SLIDE 17 — The ask */
export const ask = {
  eyebrow: "The ask",
  headline: "Raising $1.5M to build the reasoning layer.",
  lead:
    "18 months of runway to take diagnosis from assisted to autonomous, deploy with our first design partners, and earn our first revenue.",
  use: [
    { k: "Engineering — reasoning layer", pct: 50 },
    { k: "Design partners & first revenue", pct: 25 },
    { k: "Compute", pct: 15 },
    { k: "Operations", pct: 10 },
  ],
  targets: [
    { k: "Runway", v: "18 months" },
    { k: "Build", v: "Reasoning layer v1" },
    { k: "Land", v: "First paid partners" },
  ],
} as const;

/** SLIDE 18 — Team (real founder; two hires funded by the raise) */
export const team = {
  eyebrow: "Team",
  headline: "Built by the engineer who built the engines.",
  members: [
    {
      name: "SL Akash Kumar",
      role: "Founder",
      bio: "Graphics/ML engineer at Sony India (Software Architecture Division); IIT Madras (IITM Pravartak × Sony CG). Built Aperture's two engines — the synthetic-data plugin and the style-transfer domain adaptation that closes the sim→real gap. Two-time 'Exceeds Expectations'.",
    },
    {
      name: "Founding ML Engineer",
      role: "Open — funded by this raise",
      bio: "Reasoning-layer research: failure-signature diagnosis and automatic engine routing.",
    },
    {
      name: "Founding GTM",
      role: "Open — funded by this raise",
      bio: "First design-partner deployments and developer relations across CV, autonomy and robotics.",
    },
  ],
  editableNote: "Two founding hires are part of the raise.",
  advisorsLabel: "Advisors from perception, robotics and data infrastructure (being formalized).",
} as const;

/** SLIDE 19 — Vision / close */
export const close = {
  eyebrow: "The vision",
  headline: "Bring every model into focus.",
  sub: "Find the blind spot. Generate the exact data. Ship the model that finally sees. On repeat.",
  ctaLabel: "Let's talk",
  contact: [company.email, company.url],
} as const;

/** Ordered slide registry — id, kind, short label for overview + counter. */
export const SLIDES = [
  { id: "title", label: "Title" },
  { id: "what", label: "What we do" },
  { id: "problem", label: "Problem" },
  { id: "why-now", label: "Why now" },
  { id: "market", label: "Market" },
  { id: "solution", label: "How it works" },
  { id: "product-live", label: "Live today" },
  { id: "roadmap", label: "Roadmap" },
  { id: "platform", label: "Platform" },
  { id: "outcomes", label: "Proof" },
  { id: "traction", label: "Traction" },
  { id: "model", label: "Business model" },
  { id: "pricing", label: "Pricing" },
  { id: "competition", label: "Competition" },
  { id: "moat", label: "Moat" },
  { id: "milestones", label: "Milestones" },
  { id: "ask", label: "The ask" },
  { id: "team", label: "Team" },
  { id: "close", label: "Vision" },
] as const;

export type SlideId = (typeof SLIDES)[number]["id"];
