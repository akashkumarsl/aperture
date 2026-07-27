"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Section, Kicker, Headline, Lead, Reveal, Stat } from "@/components/pitch/ui";
import { TRACTION } from "@/lib/pitch";

export function PitchTraction() {
  const max = Math.max(...TRACTION.weekly);
  const n = TRACTION.weekly.length;

  /* Bars must never be permanently invisible on a recording. Drive them from a
     reliable IntersectionObserver (useInView), with a timeout safety net in case
     the observer never fires (e.g. programmatic/smooth-scroll edge cases). */
  const chartRef = useRef<HTMLDivElement>(null);
  const inView = useInView(chartRef, { once: true, margin: "-10%" });
  const [grow, setGrow] = useState(false);
  useEffect(() => {
    if (inView) setGrow(true);
  }, [inView]);
  useEffect(() => {
    const t = setTimeout(() => setGrow(true), 2200);
    return () => clearTimeout(t);
  }, []);

  return (
    <Section id="pitch-traction">
      <div className="max-w-2xl">
        <Reveal>
          <Kicker tone="teal">{TRACTION.eyebrow}</Kicker>
        </Reveal>
        <Reveal delay={0.05}>
          <Headline className="mt-5">{TRACTION.headline}</Headline>
        </Reveal>
        <Reveal delay={0.1}>
          <Lead className="mt-6">{TRACTION.body}</Lead>
        </Reveal>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-[1.4fr_1fr]">
        {/* validation-results chart */}
        <Reveal>
          <div className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl">
            <div className="flex items-start justify-between">
              <div>
                <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/55">{TRACTION.weeklyLabel}</div>
                <div className="mt-1 font-display text-3xl font-semibold text-white">
                  {TRACTION.weeklyNow} <span className="text-base font-normal text-aperture-teal">best run</span>
                </div>
              </div>
              <span className="rounded-full border border-aperture-teal/40 bg-aperture-teal/10 px-3 py-1 font-mono text-xs font-medium text-aperture-teal">
                {TRACTION.weeklyBadge}
              </span>
            </div>

            <div ref={chartRef} className="mt-8 flex h-52 items-end gap-2 md:gap-3">
              {TRACTION.weekly.map((v, i) => (
                <div key={i} className="flex h-full flex-1 flex-col items-center gap-2">
                  <div className="flex w-full flex-1 items-end">
                    <motion.div
                      initial={{ scaleY: 0, opacity: 0.45 }}
                      animate={{ scaleY: grow ? v / max : 0, opacity: grow ? 1 : 0.45 }}
                      transition={{ duration: 0.9, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                      className="h-full w-full origin-bottom rounded-t-md bg-gradient-to-t from-gold/40 via-gold to-gold-soft"
                      style={{ boxShadow: i === n - 1 ? "0 0 24px -4px rgba(245,185,66,0.7)" : undefined }}
                    />
                  </div>
                  <span className="font-mono text-[10px] text-white/40">R{i + 1}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* KPIs */}
        <Reveal delay={0.08}>
          <div className="grid h-full grid-cols-2 gap-3">
            {TRACTION.kpis.map((k) => (
              <div key={k.label} className="flex flex-col justify-center rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl">
                <Stat value={k.value} label={k.label} tone={k.tone} size="md" />
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      <Reveal delay={0.1}>
        <div className="mt-6 flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-5 py-4">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-aperture-teal/30 bg-aperture-teal/10 text-aperture-teal">↑</span>
          <p className="text-[15px] leading-relaxed text-white/75">{TRACTION.caption}</p>
        </div>
      </Reveal>

      {/* YC-style "by the numbers" — honest, internally consistent */}
      <Reveal delay={0.08}>
        <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl md:p-7">
          <div className="mb-5 font-mono text-[11px] uppercase tracking-[0.2em] text-white/55">By the numbers</div>
          <div className="grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
            {TRACTION.yc.map((m) => (
              <div key={m.k} className="border-t border-white/10 pt-3">
                <div className="font-mono text-[11px] uppercase tracking-wider text-aperture-teal/80">{m.k}</div>
                <div className="mt-1.5 text-[14px] leading-relaxed text-white/80">{m.v}</div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
