"use client";

import { useMemo } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

/**
 * Twin training curves: validation loss falling, mAP climbing. The paths draw
 * themselves on first view via stroke-dashoffset for a satisfying "the model is
 * learning" moment.
 */
export function TrainingChart({ className }: { className?: string }) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });

  const { lossPath, mapPath, area } = useMemo(() => buildPaths(), []);

  return (
    <svg ref={ref} viewBox="0 0 320 180" className={className} fill="none" preserveAspectRatio="none">
      <defs>
        <linearGradient id="tc-map" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#38e1ff" />
          <stop offset="100%" stopColor="#8b5cff" />
        </linearGradient>
        <linearGradient id="tc-area" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(56,225,255,0.25)" />
          <stop offset="100%" stopColor="rgba(56,225,255,0)" />
        </linearGradient>
      </defs>

      {/* grid */}
      {[0, 1, 2, 3].map((r) => (
        <line key={r} x1="0" y1={20 + r * 45} x2="320" y2={20 + r * 45} stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
      ))}

      <motion.path
        d={area}
        fill="url(#tc-area)"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 1.4, delay: 0.6 }}
      />

      <motion.path
        d={mapPath}
        stroke="url(#tc-map)"
        strokeWidth="2.4"
        strokeLinecap="round"
        style={{ pathLength: 1 }}
        initial={{ pathLength: 0 }}
        animate={inView ? { pathLength: 1 } : {}}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.path
        d={lossPath}
        stroke="#f5b942"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="1 6"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={inView ? { pathLength: 1, opacity: 0.85 } : {}}
        transition={{ duration: 1.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      />

      <g className="text-[9px]">
        <text x="6" y="14" fill="#aab2c4" fontFamily="monospace">metric</text>
        <text x="270" y="172" fill="#aab2c4" fontFamily="monospace">epochs →</text>
      </g>
    </svg>
  );
}

function buildPaths() {
  const n = 24;
  const map: [number, number][] = [];
  const loss: [number, number][] = [];
  for (let i = 0; i < n; i++) {
    const x = (i / (n - 1)) * 320;
    // mAP: rising sigmoid with light noise
    const t = i / (n - 1);
    const rise = 1 / (1 + Math.exp(-(t * 8 - 3)));
    const my = 150 - rise * 120 + Math.sin(i) * 2;
    map.push([x, my]);
    // loss: exponential decay
    const ly = 30 + Math.exp(-t * 3.2) * 110 + Math.cos(i * 1.3) * 2;
    loss.push([x, ly]);
  }
  const toPath = (pts: [number, number][]) =>
    pts.map((p, i) => `${i === 0 ? "M" : "L"}${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(" ");
  const mapPath = toPath(map);
  const lossPath = toPath(loss);
  const area = `${mapPath} L320 180 L0 180 Z`;
  return { mapPath, lossPath, area };
}
