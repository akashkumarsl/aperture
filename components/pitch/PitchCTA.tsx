"use client";

import { motion } from "framer-motion";
import { scrollToSection } from "@/components/layout/SmoothScroll";
import { ApertureMark } from "@/components/ui/ApertureMark";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { PITCH_CTA } from "@/lib/pitch";

export function PitchCTA() {
  const reduced = useReducedMotion();
  return (
    <section id="pitch-cta" className="relative w-full py-28 md:py-40">
      <div className="mx-auto max-w-4xl px-6 text-center md:px-10">
        <motion.div
          initial={reduced ? undefined : { opacity: 0, scale: 0.9 }}
          whileInView={reduced ? undefined : { opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mb-8 grid h-16 w-16 place-items-center rounded-2xl border border-gold/30 bg-gold/10 shadow-[0_0_60px_-12px_rgba(245,185,66,0.6)]"
        >
          <ApertureMark className="h-9 w-9" />
        </motion.div>

        <motion.div
          initial={reduced ? undefined : { opacity: 0, y: 16 }}
          whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="font-mono text-xs uppercase tracking-[0.3em] text-gold-soft"
        >
          {PITCH_CTA.eyebrow}
        </motion.div>

        <motion.h2
          initial={reduced ? undefined : { opacity: 0, y: 20 }}
          whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.08 }}
          className="mt-5 font-display text-[clamp(2rem,1.3rem+3.4vw,4rem)] font-semibold leading-[1.03] tracking-tightest text-white"
        >
          {PITCH_CTA.headline}
        </motion.h2>

        <motion.p
          initial={reduced ? undefined : { opacity: 0, y: 18 }}
          whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.16 }}
          className="mx-auto mt-6 max-w-xl text-[clamp(1.05rem,0.98rem+0.5vw,1.3rem)] leading-relaxed text-white/78"
        >
          {PITCH_CTA.body}
        </motion.p>

        <motion.div
          initial={reduced ? undefined : { opacity: 0, y: 18 }}
          whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.24 }}
          className="mt-9 flex flex-wrap items-center justify-center gap-3"
        >
          <button
            onClick={() => scrollToSection("pitch-top")}
            className="focus-ring group inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-base font-medium text-black transition-transform hover:scale-[1.03] active:scale-95"
          >
            {PITCH_CTA.primary}
            <span className="transition-transform group-hover:translate-x-0.5">→</span>
          </button>
          <button
            onClick={() => scrollToSection("pitch-platform")}
            className="focus-ring inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-6 py-3.5 text-base font-medium text-white/85 transition-colors hover:bg-white/[0.08]"
          >
            {PITCH_CTA.secondary}
          </button>
        </motion.div>

        <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.24em] text-white/40">
          Observe · Diagnose · Reason · Orchestrate · Learn
        </p>
      </div>
    </section>
  );
}
