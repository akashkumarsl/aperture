"use client";

import { motion } from "framer-motion";
import { SceneSection } from "@/components/ui/SceneSection";
import { ApertureMark } from "@/components/ui/ApertureMark";
import { GlowOrb } from "@/components/ui/GlowOrb";
import { RevealText } from "@/components/ui/RevealText";
import { LottiePlayer } from "@/components/ui/LottiePlayer";

/**
 * FINAL SCENE — Reveal.
 * A full-bleed cinematic close: the Aperture iris opens, the wordmark blooms,
 * and the promise lands — understanding how AI learns, not just generating data.
 */
export function SceneFinal() {
  return (
    <SceneSection id="final" className="flex min-h-screen flex-col items-center justify-center py-32 text-center cine-vignette">
      <GlowOrb className="left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2" color="rgba(245,185,66,0.28)" size={720} blur={160} opacity={0.8} />

      <motion.div
        initial={{ scale: 0.6, opacity: 0, rotate: -30 }}
        whileInView={{ scale: 1, opacity: 1, rotate: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative"
      >
        <LottiePlayer
          src="/lottie/aperture-pulse.json"
          className="pointer-events-none absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 opacity-70 [mask-image:radial-gradient(circle,black,transparent_72%)]"
        />
        <ApertureMark className="relative h-20 w-20" open={0.85} />
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 30, letterSpacing: "0.2em" }}
        whileInView={{ opacity: 1, y: 0, letterSpacing: "-0.045em" }}
        viewport={{ once: true }}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
        className="text-gradient-gold mt-8 font-display text-fluid-3xl font-bold leading-[0.85] [text-shadow:0_0_100px_rgba(245,185,66,0.4)]"
      >
        APERTURE
      </motion.h2>

      <RevealText
        text="The AI Data Intelligence Layer"
        as="p"
        delay={0.4}
        className="mt-5 text-fluid-lg font-light tracking-tight text-white/75"
      />

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay: 0.8 }}
        className="mt-8 max-w-xl text-fluid-base leading-relaxed text-white/70"
      >
        Understanding how AI learns.
        <br />
        <span className="text-white/55">Not just generating data.</span>
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 1.1 }}
        className="mt-12 flex flex-col items-center gap-4 sm:flex-row"
      >
        <a
          href="mailto:hello@aperture.ai"
          className="focus-ring group relative overflow-hidden rounded-2xl bg-white px-8 py-4 font-medium text-black transition-transform hover:scale-[1.03] active:scale-95"
        >
          <span className="relative z-10">Build better AI</span>
          <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-gold-soft to-gold transition-transform duration-500 group-hover:translate-x-0" />
        </a>
        <a
          href="#top"
          className="focus-ring rounded-2xl border border-glass-line px-8 py-4 font-medium text-white/80 transition-colors hover:bg-white/5"
        >
          Replay the story
        </a>
      </motion.div>

      <p className="mt-14 max-w-md text-fluid-sm leading-relaxed text-white/55">
        Build better AI through autonomous data engineering.
      </p>
    </SceneSection>
  );
}
