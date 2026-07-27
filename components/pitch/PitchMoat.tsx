"use client";

import { motion } from "framer-motion";
import { Section, Kicker, Headline, Lead, Reveal } from "@/components/pitch/ui";
import { MOAT } from "@/lib/pitch";

/** Compounding curve: diagnosis accuracy rises and flattens with experiments. */
function CompoundingCurve() {
  const data = MOAT.curve;
  const max = 100;
  const min = 30;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * 100;
    const y = 60 - ((v - min) / (max - min)) * 56 - 2;
    return [x, y] as const;
  });
  const line = pts.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
  const area = `${line} L100,60 L0,60 Z`;

  return (
    <div className="relative w-full">
      <svg viewBox="0 0 100 60" preserveAspectRatio="none" className="h-56 w-full">
        <defs>
          <linearGradient id="moatArea" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(245,185,66,0.35)" />
            <stop offset="100%" stopColor="rgba(245,185,66,0)" />
          </linearGradient>
          <linearGradient id="moatLine" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#38e1ff" />
            <stop offset="100%" stopColor="#ffd479" />
          </linearGradient>
        </defs>
        {/* gridlines */}
        {[15, 30, 45].map((y) => (
          <line key={y} x1="0" y1={y} x2="100" y2={y} stroke="rgba(255,255,255,0.06)" strokeWidth="0.4" />
        ))}
        <motion.path
          d={area}
          fill="url(#moatArea)"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.6 }}
        />
        <motion.path
          d={line}
          fill="none"
          stroke="url(#moatLine)"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
        />
      </svg>
      {/* endpoint labels */}
      <div className="pointer-events-none absolute bottom-2 left-1 rounded bg-void/70 px-1.5 py-0.5 font-mono text-[11px] text-aperture-cyan">41%</div>
      <div className="pointer-events-none absolute right-1 top-1 rounded bg-void/70 px-1.5 py-0.5 font-mono text-[11px] text-gold-soft">95%</div>
      <div className="mt-2 flex justify-between font-mono text-[10px] uppercase tracking-widest text-white/40">
        <span>few experiments</span>
        <span>diagnosis accuracy →</span>
        <span>network scale</span>
      </div>
    </div>
  );
}

export function PitchMoat() {
  return (
    <Section id="pitch-moat">
      <div className="max-w-2xl">
        <Reveal>
          <Kicker tone="violet">{MOAT.eyebrow}</Kicker>
        </Reveal>
        <Reveal delay={0.05}>
          <Headline className="mt-5">{MOAT.headline}</Headline>
        </Reveal>
        <Reveal delay={0.1}>
          <Lead className="mt-6">{MOAT.body}</Lead>
        </Reveal>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-2">
        <Reveal>
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl">
            <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/55">{MOAT.curveLabel}</div>
            <div className="mt-4">
              <CompoundingCurve />
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="flex h-full flex-col gap-3">
            {MOAT.points.map((p) => (
              <div key={p.k} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl">
                <div className="text-[15px] font-semibold text-white">{p.k}</div>
                <div className="mt-1 text-[14px] leading-relaxed text-white/65">{p.v}</div>
              </div>
            ))}

            {/* flywheel loop */}
            <div className="mt-auto rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <div className="flex flex-wrap items-center justify-center gap-x-1.5 gap-y-2">
                {MOAT.loop.map((step, i) => (
                  <span key={step} className="flex items-center gap-1.5">
                    <motion.span
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.4 }}
                      className="font-mono text-[12px] uppercase tracking-wider text-white/80"
                    >
                      {step}
                    </motion.span>
                    <span className="text-white/30">{i < MOAT.loop.length - 1 ? "→" : "↺"}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
