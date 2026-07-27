// One-off generator for a valid Lottie (bodymovin) asset: concentric gold
// "aperture scan" rings that expand and fade on a loop. Run with `node`.
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(__dirname, "../public/lottie/aperture-pulse.json");

const FR = 30; // frames / second
const OP = 120; // total frames (4s loop)
const GOLD = [0.961, 0.725, 0.259, 1];
const CYAN = [0.22, 0.882, 1, 1];

const ease = { i: { x: [0.4], y: [1] }, o: { x: [0.2], y: [0] } };

/** Build one expanding ring shape layer, offset in time. */
function ring(ind, startFrame, color, maxScale, strokeW) {
  const life = 90;
  const s = startFrame;
  return {
    ddd: 0,
    ind,
    ty: 4,
    nm: `ring${ind}`,
    sr: 1,
    ks: {
      o: {
        a: 1,
        k: [
          { ...ease, t: s, s: [0] },
          { ...ease, t: s + 8, s: [70] },
          { t: s + life, s: [0] },
        ],
      },
      r: { a: 0, k: 0 },
      p: { a: 0, k: [100, 100, 0] },
      a: { a: 0, k: [0, 0, 0] },
      s: {
        a: 1,
        k: [
          { ...ease, t: s, s: [18, 18, 100] },
          { t: s + life, s: [maxScale, maxScale, 100] },
        ],
      },
    },
    ao: 0,
    shapes: [
      {
        ty: "gr",
        it: [
          { ty: "el", d: 1, s: { a: 0, k: [100, 100] }, p: { a: 0, k: [0, 0] }, nm: "e" },
          {
            ty: "st",
            c: { a: 0, k: color },
            o: { a: 0, k: 100 },
            w: { a: 0, k: strokeW },
            lc: 2,
            lj: 1,
            ml: 4,
            nm: "s",
          },
          {
            ty: "tr",
            p: { a: 0, k: [0, 0] },
            a: { a: 0, k: [0, 0] },
            s: { a: 0, k: [100, 100] },
            r: { a: 0, k: 0 },
            o: { a: 0, k: 100 },
          },
        ],
        nm: "g",
      },
    ],
    ip: 0,
    op: OP,
    st: 0,
    bm: 0,
  };
}

/** Central steady iris dot with a gentle breathing scale. */
function core(ind) {
  return {
    ddd: 0,
    ind,
    ty: 4,
    nm: "core",
    sr: 1,
    ks: {
      o: { a: 0, k: 90 },
      r: { a: 0, k: 0 },
      p: { a: 0, k: [100, 100, 0] },
      a: { a: 0, k: [0, 0, 0] },
      s: {
        a: 1,
        k: [
          { ...ease, t: 0, s: [26, 26, 100] },
          { ...ease, t: 60, s: [34, 34, 100] },
          { t: OP, s: [26, 26, 100] },
        ],
      },
    },
    ao: 0,
    shapes: [
      {
        ty: "gr",
        it: [
          { ty: "el", d: 1, s: { a: 0, k: [100, 100] }, p: { a: 0, k: [0, 0] }, nm: "e" },
          { ty: "fl", c: { a: 0, k: GOLD }, o: { a: 0, k: 60 }, r: 1, nm: "f" },
          { ty: "st", c: { a: 0, k: GOLD }, o: { a: 0, k: 100 }, w: { a: 0, k: 2 }, lc: 2, lj: 1, ml: 4, nm: "s" },
          {
            ty: "tr",
            p: { a: 0, k: [0, 0] },
            a: { a: 0, k: [0, 0] },
            s: { a: 0, k: [100, 100] },
            r: { a: 0, k: 0 },
            o: { a: 0, k: 100 },
          },
        ],
        nm: "g",
      },
    ],
    ip: 0,
    op: OP,
    st: 0,
    bm: 0,
  };
}

const data = {
  v: "5.7.4",
  fr: FR,
  ip: 0,
  op: OP,
  w: 200,
  h: 200,
  nm: "aperture-pulse",
  ddd: 0,
  assets: [],
  layers: [
    ring(1, 0, GOLD, 150, 3),
    ring(2, 40, CYAN, 130, 2),
    ring(3, 75, GOLD, 165, 2),
    core(4),
  ],
  markers: [],
};

mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, JSON.stringify(data));
console.log("Wrote", OUT, JSON.stringify(data).length, "bytes");
