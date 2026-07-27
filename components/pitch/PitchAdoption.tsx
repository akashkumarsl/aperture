"use client";

import { motion } from "framer-motion";
import { Section, Kicker, Headline, Lead, Reveal } from "@/components/pitch/ui";
import { ADOPTION } from "@/lib/pitch";

const MEAN = 50;
const SIGMA = 15;
const BASE = 46;
const AMP = 40;
const bell = (x: number) => BASE - AMP * Math.exp(-((x - MEAN) ** 2) / (2 * SIGMA ** 2));

// Segment boundaries at -2σ,-σ,mean,+σ  →  x = 20, 35, 50, 65
const BOUNDS = [20, 35, 50, 65];
const CENTERS = [10, 27.5, 42.5, 57.5, 82.5]; // label anchors per stage

function BellCurve() {
  const xs: number[] = [];
  for (let x = 1; x <= 99; x += 1.5) xs.push(x);
  const line = xs.map((x, i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)},${bell(x).toFixed(1)}`).join(" ");
  const area = `${line} L99,46 L1,46 Z`;
  // early-majority highlight band 35..50
  const bandXs = xs.filter((x) => x >= 35 && x <= 50);
  const band =
    `M35,46 ` +
    bandXs.map((x) => `L${x.toFixed(1)},${bell(x).toFixed(1)}`).join(" ") +
    ` L50,46 Z`;

  return (
    <svg viewBox="0 0 100 52" preserveAspectRatio="none" className="h-64 w-full">
      <defs>
        <linearGradient id="bellArea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(56,225,255,0.16)" />
          <stop offset="100%" stopColor="rgba(56,225,255,0)" />
        </linearGradient>
        <linearGradient id="bellLine" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#4c7bff" />
          <stop offset="45%" stopColor="#38e1ff" />
          <stop offset="100%" stopColor="#ffd479" />
        </linearGradient>
      </defs>

      <path d={area} fill="url(#bellArea)" />
      {/* early majority band Aperture is entering */}
      <motion.path d={band} fill="rgba(245,185,66,0.18)" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.8 }} />

      {/* dividers */}
      {BOUNDS.map((x) => (
        <line key={x} x1={x} y1={bell(x)} x2={x} y2="46" stroke="rgba(255,255,255,0.14)" strokeWidth="0.4" strokeDasharray="1 1.5" />
      ))}

      <motion.path
        d={line}
        fill="none"
        stroke="url(#bellLine)"
        strokeWidth="1.4"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* chasm marker at x=35 */}
      <motion.line
        x1="35" y1="4" x2="35" y2="46"
        stroke="#ffd479" strokeWidth="0.5" strokeDasharray="1.4 1.4"
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 1.4, duration: 0.6 }}
      />
      <motion.circle
        cx="35" cy={bell(35)} r="1.6" fill="#ffd479"
        initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: 1.6, type: "spring", stiffness: 200 }}
      />
    </svg>
  );
}

export function PitchAdoption() {
  return (
    <Section id="pitch-adoption">
      <div className="max-w-2xl">
        <Reveal>
          <Kicker tone="cyan">{ADOPTION.eyebrow}</Kicker>
        </Reveal>
        <Reveal delay={0.05}>
          <Headline className="mt-5">{ADOPTION.headline}</Headline>
        </Reveal>
        <Reveal delay={0.1}>
          <Lead className="mt-6">{ADOPTION.body}</Lead>
        </Reveal>
      </div>

      <Reveal delay={0.12}>
        <div className="relative mt-12 rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl md:p-8">
          {/* "you are here" pill anchored above the chasm (x=35%) */}
          <div className="pointer-events-none absolute left-[35%] top-3 z-10 -translate-x-1/2">
            <div className="whitespace-nowrap rounded-full border border-gold/50 bg-gold/15 px-3 py-1 text-[11px] font-medium text-gold-soft shadow-[0_0_20px_-6px_rgba(245,185,66,0.6)]">
              {ADOPTION.markerLabel}
            </div>
          </div>

          <div className="pt-8">
            <BellCurve />
          </div>

          {/* stage labels */}
          <div className="relative mt-1 h-12">
            {ADOPTION.stages.map((s, i) => (
              <div key={s.label} className="absolute -translate-x-1/2 text-center" style={{ left: `${CENTERS[i]}%` }}>
                <div className="text-[12px] font-medium text-white/80 md:text-[13px]">{s.label}</div>
                <div className="font-mono text-[11px] text-white/45">{s.pct}</div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
