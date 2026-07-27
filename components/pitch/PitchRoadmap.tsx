"use client";

import { motion } from "framer-motion";
import { Section, Kicker, Headline, Lead, Reveal } from "@/components/pitch/ui";
import { ROADMAP } from "@/lib/pitch";
import { cn } from "@/lib/utils";

const TONE: Record<string, { dot: string; ring: string; text: string; chip: string; bar: string }> = {
  gold: {
    dot: "bg-gold",
    ring: "border-gold/35",
    text: "text-gold-soft",
    chip: "border-gold/40 bg-gold/10 text-gold-soft",
    bar: "from-gold/70 to-gold-soft",
  },
  cyan: {
    dot: "bg-aperture-cyan",
    ring: "border-aperture-cyan/30",
    text: "text-aperture-cyan",
    chip: "border-aperture-cyan/40 bg-aperture-cyan/10 text-aperture-cyan",
    bar: "from-aperture-cyan/70 to-aperture-cyan",
  },
  violet: {
    dot: "bg-aperture-violet",
    ring: "border-aperture-violet/30",
    text: "text-aperture-violet",
    chip: "border-aperture-violet/40 bg-aperture-violet/10 text-aperture-violet",
    bar: "from-aperture-violet/70 to-aperture-violet",
  },
};

export function PitchRoadmap() {
  return (
    <Section id="pitch-roadmap">
      <div className="max-w-2xl">
        <Reveal>
          <Kicker tone="cyan">{ROADMAP.eyebrow}</Kicker>
        </Reveal>
        <Reveal delay={0.05}>
          <Headline className="mt-5">{ROADMAP.headline}</Headline>
        </Reveal>
        <Reveal delay={0.1}>
          <Lead className="mt-6">{ROADMAP.body}</Lead>
        </Reveal>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
        {ROADMAP.columns.map((col, i) => {
          const t = TONE[col.tone] ?? TONE.gold;
          return (
            <Reveal key={col.tag} delay={0.07 * i}>
              <div className={cn("flex h-full flex-col rounded-2xl border bg-white/[0.04] p-6 backdrop-blur-xl", t.ring)}>
                {/* progress bar showing how far along this horizon is */}
                <div className="h-1 w-full overflow-hidden rounded-full bg-white/8">
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: i === 0 ? 1 : i === 1 ? 0.45 : 0.12 }}
                    viewport={{ once: true, margin: "-15%" }}
                    transition={{ duration: 1, delay: 0.2 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className={cn("h-full origin-left rounded-full bg-gradient-to-r", t.bar)}
                  />
                </div>

                <div className="mt-4 flex items-center justify-between gap-2">
                  <span className={cn("inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.14em]", t.text)}>
                    <span className={cn("h-2 w-2 rounded-full", t.dot)} />
                    {col.tag}
                  </span>
                  <span className={cn("rounded-full border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider", t.chip)}>
                    {col.status}
                  </span>
                </div>

                <ul className="mt-5 space-y-3">
                  {col.items.map((it) => (
                    <li key={it} className="flex items-start gap-2.5 text-[14px] leading-relaxed text-white/80">
                      <span className={cn("mt-2 h-1.5 w-1.5 shrink-0 rounded-full", t.dot)} />
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
