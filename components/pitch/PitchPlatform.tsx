"use client";

import { motion } from "framer-motion";
import { Section, Kicker, Headline, Lead, Reveal } from "@/components/pitch/ui";
import { PLATFORM } from "@/lib/pitch";
import { cn } from "@/lib/utils";

function LayerArrow() {
  return (
    <div className="flex justify-center py-2" aria-hidden>
      <div className="h-7 w-px bg-gradient-to-b from-white/30 to-white/10" />
    </div>
  );
}

const ENGINE_TONE: Record<string, string> = {
  gold: "text-gold-soft",
  cyan: "text-aperture-cyan",
  teal: "text-aperture-teal",
  violet: "text-aperture-violet",
};

export function PitchPlatform() {
  return (
    <Section id="pitch-platform">
      <div className="max-w-2xl">
        <Reveal>
          <Kicker>{PLATFORM.eyebrow}</Kicker>
        </Reveal>
        <Reveal delay={0.05}>
          <Headline className="mt-5">{PLATFORM.headline}</Headline>
        </Reveal>
        <Reveal delay={0.1}>
          <Lead className="mt-6">{PLATFORM.body}</Lead>
        </Reveal>
      </div>

      {/* legend */}
      <Reveal delay={0.12}>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <span className="inline-flex items-center gap-2 text-[13px] text-white/70">
            <span className="h-2.5 w-2.5 rounded-full bg-gold shadow-glow-gold" />
            Shipping today
          </span>
          <span className="inline-flex items-center gap-2 text-[13px] text-white/70">
            <span className="grid h-2.5 w-4 place-items-center rounded-full border border-dashed border-white/40" />
            On the roadmap
          </span>
        </div>
      </Reveal>

      <Reveal delay={0.14}>
        <div className="relative mt-6 rounded-3xl border border-white/10 bg-white/[0.02] p-5 md:p-8">
          {/* feedback-loop rail on the right */}
          <div aria-hidden className="pointer-events-none absolute inset-y-8 right-3 hidden w-6 md:block">
            <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 border-l border-dashed border-aperture-teal/40" />
            <motion.div
              initial={{ top: "100%" }}
              whileInView={{ top: "0%" }}
              viewport={{ once: false, margin: "-20%" }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", repeatType: "reverse" }}
              className="absolute left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-aperture-teal shadow-[0_0_10px_2px_rgba(46,230,197,0.6)]"
            />
          </div>

          {/* Layer 1 — inputs */}
          <div className="mb-2 text-center font-mono text-[11px] uppercase tracking-[0.24em] text-white/45">Inputs</div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {PLATFORM.inputs.map((n) => (
              <div key={n.label} className="rounded-xl border border-white/12 bg-white/[0.04] px-4 py-3 text-center">
                <div className="text-[15px] font-semibold text-white">{n.label}</div>
                <div className="mt-0.5 text-[12px] text-white/60">{n.note}</div>
              </div>
            ))}
          </div>

          <LayerArrow />

          {/* Layer 2 — the reasoning layer (private beta / dashed) */}
          <div className="relative overflow-hidden rounded-2xl border border-dashed border-aperture-cyan/40 bg-gradient-to-b from-aperture-cyan/[0.07] to-transparent p-5">
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-aperture-cyan/15 blur-3xl" />
            <div className="mb-3 flex flex-wrap items-center justify-center gap-2">
              <span className="h-2 w-2 rounded-full bg-aperture-cyan" />
              <span className="font-display text-lg font-semibold text-white">{PLATFORM.layer.label}</span>
              <span className="rounded-full border border-aperture-cyan/40 bg-aperture-cyan/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-aperture-cyan">
                {PLATFORM.layer.status}
              </span>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {PLATFORM.layer.core.map((c, i) => (
                <div key={c.label} className="rounded-xl border border-white/12 bg-void/50 px-4 py-3 text-center">
                  <div className="font-mono text-[10px] uppercase tracking-widest text-aperture-cyan/70">Step {i + 1}</div>
                  <div className="mt-1 text-[15px] font-semibold text-white">{c.label}</div>
                  <div className="mt-0.5 text-[12px] text-white/60">{c.note}</div>
                </div>
              ))}
            </div>
          </div>

          <LayerArrow />

          {/* Layer 3 — engines: two live, five roadmap */}
          <div className="mb-3 text-center font-mono text-[11px] uppercase tracking-[0.24em] text-white/45">
            Refinement engines
          </div>
          <div className="flex flex-wrap justify-center gap-2.5">
            {PLATFORM.engines.map((e, i) => {
              const live = e.status === "live";
              return (
                <motion.span
                  key={e.name}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[13px] font-medium",
                    live
                      ? "border border-gold/45 bg-gold/[0.08] text-white shadow-[0_0_28px_-14px_rgba(245,185,66,0.8)]"
                      : "border border-dashed border-white/18 bg-white/[0.02] text-white/55",
                  )}
                >
                  <span className={cn("text-[11px]", live ? ENGINE_TONE[e.tone] ?? "text-gold-soft" : "text-white/35")}>
                    {live ? "◆" : "◇"}
                  </span>
                  {e.name}
                  <span
                    className={cn(
                      "ml-0.5 rounded px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider",
                      live ? "bg-gold/15 text-gold-soft" : "bg-white/[0.05] text-white/45",
                    )}
                  >
                    {live ? "live" : "soon"}
                  </span>
                </motion.span>
              );
            })}
          </div>

          <LayerArrow />

          {/* Layer 4 — output → model */}
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <div className="rounded-xl border border-gold/40 bg-gold/[0.08] px-5 py-3 text-center">
              <div className="text-[15px] font-semibold text-gold-soft">{PLATFORM.output.label}</div>
              <div className="mt-0.5 text-[12px] text-white/65">{PLATFORM.output.note}</div>
            </div>
            <span className="text-white/45">→</span>
            <div className="rounded-xl border border-aperture-cyan/40 bg-aperture-cyan/[0.08] px-5 py-3 text-center">
              <div className="text-[15px] font-semibold text-aperture-cyan">Better model</div>
              <div className="mt-0.5 text-[12px] text-white/65">higher mAP · fewer misses</div>
            </div>
            <span className="hidden text-aperture-teal md:inline">⟲</span>
            <div className="rounded-lg border border-aperture-teal/30 bg-aperture-teal/[0.06] px-3 py-2 text-center text-[12px] text-aperture-teal">
              feeds production feedback back in
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <p className={cn("mt-6 text-center text-[15px] leading-relaxed text-white/70")}>{PLATFORM.footnote}</p>
      </Reveal>
    </Section>
  );
}
