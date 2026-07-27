"use client";

import { motion } from "framer-motion";
import { LOOP_STEPS } from "@/lib/content";

/**
 * The infinite intelligence loop. Six acts sit on a ring; a light orbits
 * endlessly; the centre pulses as the "knowledge graph" that grows with every
 * pass. Labels are real HTML (crisp, accessible) positioned by trigonometry;
 * the ring and travelling light are SVG.
 */
export function LoopDiagram({ className }: { className?: string }) {
  const R = 42; // percentage radius for label placement

  return (
    <div className={className}>
      <div className="relative mx-auto aspect-square w-full max-w-[520px]">
        <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full" fill="none">
          <defs>
            <linearGradient id="loop-ring" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#f5b942" />
              <stop offset="50%" stopColor="#38e1ff" />
              <stop offset="100%" stopColor="#8b5cff" />
            </linearGradient>
          </defs>

          <circle cx="200" cy="200" r="150" stroke="url(#loop-ring)" strokeWidth="2" opacity="0.7" strokeDasharray="2 6" />
          <circle cx="200" cy="200" r="150" stroke="url(#loop-ring)" strokeWidth="1" opacity="0.4" />

          {/* Orbiting light */}
          <motion.g animate={{ rotate: 360 }} transition={{ duration: 12, repeat: Infinity, ease: "linear" }} style={{ transformOrigin: "200px 200px" }}>
            <circle cx="200" cy="50" r="5" fill="#ffd479" />
            <circle cx="200" cy="50" r="12" fill="#ffd479" opacity="0.25" />
          </motion.g>

          {/* Central knowledge core */}
          <motion.circle
            cx="200"
            cy="200"
            r="34"
            fill="rgba(245,185,66,0.06)"
            stroke="rgba(245,185,66,0.35)"
            initial={{ r: 32, opacity: 0.7 }}
            animate={{ r: [32, 38, 32], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          />
          {[...Array(9)].map((_, i) => {
            const a = (i / 9) * Math.PI * 2;
            const rr = 14 + (i % 3) * 6;
            return (
              <circle key={i} cx={200 + Math.cos(a) * rr} cy={200 + Math.sin(a) * rr} r="1.6" fill="#ffd479" opacity="0.8" />
            );
          })}
          <text x="200" y="204" textAnchor="middle" className="fill-white font-mono text-[10px] uppercase tracking-widest">
            Aperture
          </text>
        </svg>

        {/* Step labels around the ring */}
        {LOOP_STEPS.map((step, i) => {
          const angle = (-90 + i * (360 / LOOP_STEPS.length)) * (Math.PI / 180);
          const left = 50 + Math.cos(angle) * R;
          const top = 50 + Math.sin(angle) * R;
          return (
            <motion.div
              key={step.verb}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.12 * i }}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${left}%`, top: `${top}%` }}
            >
              <div className="glass-strong flex flex-col items-center rounded-xl px-3 py-2 text-center">
                <span className="font-display text-fluid-sm font-semibold text-white">{step.verb}</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
