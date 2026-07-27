"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * A calm, fixed backdrop for the pitch variant: deep space with two soft
 * volumetric glows and a faint dot-grid. Deliberately low-contrast so every
 * panel of text on top stays crisply legible on a screen recording. The glow
 * palette drifts from cool (intelligence) at the top toward gold (refined) as
 * you scroll, mirroring the crude → gold narrative.
 */
export function PitchBackground() {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const goldY = useTransform(scrollYProgress, [0, 1], ["8%", "60%"]);
  const goldOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.12, 0.22, 0.38]);
  const coolOpacity = useTransform(scrollYProgress, [0, 0.6, 1], [0.32, 0.2, 0.1]);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-void">
      {/* base vertical wash */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#05070d_0%,#04060b_40%,#060810_100%)]" />

      {/* cool intelligence glow, upper field */}
      <motion.div
        style={reduced ? undefined : { opacity: coolOpacity }}
        className="absolute -top-[20%] left-[8%] h-[70vh] w-[70vh] rounded-full blur-[120px]"
      >
        <div className="h-full w-full rounded-full bg-[radial-gradient(circle,rgba(56,225,255,0.5),rgba(139,92,255,0.28)_45%,transparent_70%)]" />
      </motion.div>

      {/* refined gold glow, drifts down with scroll */}
      <motion.div
        style={reduced ? undefined : { top: goldY, opacity: goldOpacity }}
        className="absolute right-[4%] h-[75vh] w-[75vh] rounded-full blur-[130px]"
      >
        <div className="h-full w-full rounded-full bg-[radial-gradient(circle,rgba(245,185,66,0.55),rgba(200,135,26,0.3)_45%,transparent_70%)]" />
      </motion.div>

      {/* faint dot grid for depth + a sense of an engineered surface */}
      <div className="absolute inset-0 opacity-[0.5] [background-image:radial-gradient(rgba(255,255,255,0.07)_1px,transparent_1px)] [background-size:44px_44px] [mask-image:radial-gradient(120%_120%_at_50%_30%,#000_35%,transparent_80%)]" />

      {/* cinematic vignette to seat the content */}
      <div className="absolute inset-0 bg-[radial-gradient(130%_100%_at_50%_40%,transparent_55%,rgba(0,0,0,0.72)_100%)]" />
    </div>
  );
}
