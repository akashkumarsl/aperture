"use client";

import { DetectionOverlay } from "@/components/visuals/DetectionOverlay";
import { Section, Kicker, Headline, Lead, Reveal, Panel } from "@/components/pitch/ui";
import { PROBLEM } from "@/lib/pitch";
import { IMAGERY, NIGHT_DETECTIONS } from "@/lib/content";

export function PitchProblem() {
  return (
    <Section id="pitch-problem">
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* copy */}
        <div>
          <Reveal>
            <Kicker tone="red">{PROBLEM.eyebrow}</Kicker>
          </Reveal>
          <Reveal delay={0.05}>
            <Headline className="mt-5">{PROBLEM.headline}</Headline>
          </Reveal>
          <Reveal delay={0.1}>
            <Lead className="mt-6">{PROBLEM.body}</Lead>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-8 grid grid-cols-3 gap-3">
              {PROBLEM.points.map((p) => (
                <div key={p.k} className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
                  <div className="font-display text-2xl font-semibold tabular-nums text-red-400 md:text-3xl">{p.k}</div>
                  <div className="mt-1.5 text-[13px] leading-snug text-white/65">{p.v}</div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="mt-8 border-l-2 border-gold/50 pl-4 text-lg font-medium leading-relaxed text-white/85">
              {PROBLEM.kicker}
            </p>
          </Reveal>
        </div>

        {/* evidence */}
        <Reveal delay={0.1}>
          <Panel className="p-3 md:p-3" glow="cyan">
            <DetectionOverlay
              src={IMAGERY.streetNight}
              alt="A perception model at night in the rain — cyclists and pedestrians fall into red dashed blind spots while only cars are detected."
              boxes={NIGHT_DETECTIONS}
              priority
            />
            <div className="flex items-center justify-between px-2 py-2.5 font-mono text-[11px] uppercase tracking-widest text-white/55">
              <span>perception-v4 · night + rain</span>
              <span className="text-red-400">2 objects missed</span>
            </div>
          </Panel>
        </Reveal>
      </div>
    </Section>
  );
}
