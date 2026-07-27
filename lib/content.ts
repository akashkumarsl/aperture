/**
 * APERTURE — narrative content model.
 * All copy, metrics and scene metadata live here so the scene components stay
 * declarative and reusable. Editing the story never means touching layout code.
 */

export type SceneId =
  | "intro"
  | "refinery"
  | "diagnose"
  | "engines"
  | "training"
  | "feedback"
  | "final";

export interface SceneMeta {
  id: SceneId;
  index: number;
  label: string;
  kicker: string;
}

export const SCENES: SceneMeta[] = [
  { id: "intro", index: 0, label: "Raw Data", kicker: "01 — Origin" },
  { id: "refinery", index: 1, label: "The Refinery", kicker: "02 — Aperture" },
  { id: "diagnose", index: 2, label: "Diagnose", kicker: "03 — Reasoning" },
  { id: "engines", index: 3, label: "Engines", kicker: "04 — Orchestration" },
  { id: "training", index: 4, label: "Training", kicker: "05 — Results" },
  { id: "feedback", index: 5, label: "The Loop", kicker: "06 — Feedback" },
  { id: "final", index: 6, label: "Aperture", kicker: "07 — Reveal" },
];

/** Scene 1 — the whispered opening lines, revealed on scroll. */
export interface OpeningLine {
  text: string;
  tone: "mute" | "warn" | "signal";
}

export const OPENING_LINES: OpeningLine[] = [
  { text: "AI has transformed how models are built.", tone: "mute" },
  { text: "But a model is only as good as what it can see.", tone: "mute" },
  { text: "In the real world it goes blind — night, rain, the long tail.", tone: "warn" },
  { text: "Aperture brings the data into focus, until the model can see.", tone: "signal" },
];

/** Scene 2 — telemetry streams that flood into Aperture. */
export const TELEMETRY_STREAMS = [
  "Dataset statistics",
  "Class imbalance",
  "Exploratory analysis",
  "TensorBoard traces",
  "Loss curves",
  "Confusion matrix",
  "Per-class metrics",
  "Production failures",
  "Lighting statistics",
  "Weather distribution",
  "Bounding-box distribution",
  "Edge-case density",
] as const;

/** Scene 3 — candidate interventions with reasoned confidence. */
export interface Intervention {
  name: string;
  confidence: number;
  active: boolean;
  rationale: string;
}

export const INTERVENTIONS: Intervention[] = [
  { name: "Synthetic Data", confidence: 87, active: true, rationale: "Rare classes under-represented in tail distribution." },
  { name: "Domain Adaptation", confidence: 72, active: true, rationale: "Night + rain domains diverge from training set." },
  { name: "Active Learning", confidence: 64, active: true, rationale: "High-entropy production frames worth labelling." },
  { name: "Physics Simulation", confidence: 58, active: true, rationale: "Occlusion geometry hard to capture in the field." },
  { name: "Auto Labelling", confidence: 44, active: false, rationale: "Label noise already within tolerance." },
  { name: "Hard Negative Mining", confidence: 41, active: false, rationale: "False-positive rate not the current bottleneck." },
  { name: "Collect Real Data", confidence: 31, active: false, rationale: "Acquisition cost outweighs marginal gain." },
  { name: "Curriculum Learning", confidence: 27, active: false, rationale: "Convergence already stable." },
  { name: "Hyperparameter Tuning", confidence: 18, active: false, rationale: "Loss plateau is data-bound, not optimisation-bound." },
];

/** Scene 4 — the specialised engines Aperture orchestrates. */
export interface Engine {
  name: string;
  short: string;
  hue: string;
  output: string;
}

export const ENGINES: Engine[] = [
  { name: "Synthetic Data Engine", short: "SYN", hue: "#38e1ff", output: "Rare-class generation" },
  { name: "Domain Adaptation Engine", short: "DOM", hue: "#8b5cff", output: "Night / rain transfer" },
  { name: "Physics Engine", short: "PHY", hue: "#2ee6c5", output: "Occlusion + optics" },
  { name: "Data Balancer", short: "BAL", hue: "#f5b942", output: "Class equilibrium" },
  { name: "Annotation Engine", short: "ANN", hue: "#ff8a3d", output: "Precision labels" },
];

/** Scene 5 — training metrics that improve as gold data flows in. */
export interface Metric {
  label: string;
  from: number;
  to: number;
  unit: string;
  direction: "up" | "down";
}

export const TRAINING_METRICS: Metric[] = [
  { label: "mAP@0.5", from: 61.2, to: 89.7, unit: "%", direction: "up" },
  { label: "Recall", from: 68.4, to: 94.1, unit: "%", direction: "up" },
  { label: "Precision", from: 72.9, to: 93.5, unit: "%", direction: "up" },
  { label: "Robustness", from: 54.0, to: 88.2, unit: "%", direction: "up" },
  { label: "Val Loss", from: 0.482, to: 0.089, unit: "", direction: "down" },
  { label: "Failure rate", from: 12.6, to: 1.7, unit: "%", direction: "down" },
];

/** Scene 6 — the infinite intelligence loop. */
export const LOOP_STEPS = [
  { verb: "Observe", note: "Datasets, training runs, production feedback." },
  { verb: "Diagnose", note: "Locate the true bottleneck before acting." },
  { verb: "Reason", note: "Rank interventions by expected impact." },
  { verb: "Execute", note: "Orchestrate the specialised engines." },
  { verb: "Learn", note: "Every experiment sharpens the knowledge graph." },
  { verb: "Repeat", note: "An autonomous, compounding flywheel." },
] as const;

export const PRODUCTION_SOURCES = [
  "Autonomous vehicles",
  "Smart factories",
  "Warehouse robots",
  "Edge cameras",
  "Drones",
  "Inspection systems",
] as const;

export const NAV_LINKS = [
  { id: "refinery", label: "Refinery" },
  { id: "diagnose", label: "Reasoning" },
  { id: "engines", label: "Engines" },
  { id: "training", label: "Results" },
  { id: "feedback", label: "The Loop" },
] as const;

/* ------------------------------------------------------------------ *
 * Imagery — generated cinematic frames used across the perception     *
 * demos (domain adaptation, annotation, production feedback).         *
 * ------------------------------------------------------------------ */
export const IMAGERY = {
  streetDay: "/images/street-day.webp",
  streetNight: "/images/street-night.webp",
  parkDusk: "/images/park-dusk.webp",
} as const;

/** Scene 2b — the stakes: a model with blind spots failing in the field. */
export interface DetectionBox {
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  conf?: number;
  state?: "detected" | "missed" | "recovered";
  /** Render the label beneath the box (used to stagger tightly-clustered boxes). */
  labelBelow?: boolean;
}

/** Night / rain frame — the model, trained on clean daylight, goes blind. */
export const NIGHT_DETECTIONS: DetectionBox[] = [
  { x: 1, y: 55, w: 19, h: 30, label: "car", conf: 82, state: "detected" },
  { x: 31, y: 51, w: 13, h: 13, label: "car", conf: 71, state: "detected" },
  { x: 80, y: 55, w: 19, h: 28, label: "car", conf: 88, state: "detected" },
  { x: 25, y: 50, w: 13, h: 37, label: "cyclist", state: "missed", labelBelow: true },
  { x: 3, y: 49, w: 9, h: 18, label: "pedestrian", state: "missed", labelBelow: true },
];

/** Daylight frame after Aperture — labels recovered with high confidence. */
export const DAY_DETECTIONS: DetectionBox[] = [
  { x: 0, y: 51, w: 15, h: 24, label: "car", conf: 98, state: "recovered", labelBelow: true },
  { x: 3, y: 52, w: 9, h: 15, label: "cyclist", conf: 96, state: "recovered" },
  { x: 84, y: 53, w: 16, h: 24, label: "car", conf: 97, state: "recovered" },
  { x: 27, y: 54, w: 7, h: 9, label: "cyclist", conf: 93, state: "recovered" },
  { x: 45, y: 54, w: 8, h: 6, label: "car", conf: 95, state: "recovered" },
];

/** Production-feedback frame — a live scene monitored in the field. */
export const PARK_DETECTIONS: DetectionBox[] = [
  { x: 27, y: 52, w: 6, h: 22, label: "person", conf: 94, state: "detected" },
  { x: 33, y: 52, w: 6, h: 22, label: "person", conf: 92, state: "detected", labelBelow: true },
  { x: 40, y: 52, w: 6, h: 23, label: "jogger", conf: 90, state: "detected" },
  { x: 62, y: 66, w: 7, h: 10, label: "dog", state: "missed", labelBelow: true },
];

export const STAKES = {
  headline: "In the real world, the model goes blind.",
  body:
    "Trained on clean daylight footage, the perception model looks confident — until night, rain and fog arrive. Pedestrians and cyclists vanish into blind spots. These silent failures are the real cost of manual data engineering.",
  note: "This is the moment Aperture is built for.",
} as const;
