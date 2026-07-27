"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { RevealText } from "@/components/ui/RevealText";

const LINES = [
  { text: "Raw data is like crude oil.", tone: "gold" },
  { text: "It holds value — but alone, it is not enough.", tone: "mute" },
  { text: "The real value comes from understanding what the model actually needs.", tone: "signal" },
];

/**
 * The thesis band. A quiet, high-contrast statement of the core idea that bridges
 * the reservoir (Scene 1) and the refinery (Scene 2). Text drifts on a parallax
 * as it passes, keeping the eye moving.
 */
export function SceneThesis() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["12%", "-12%"]);

  return (
    <section aria-label="thesis" className="relative flex min-h-[85vh] items-center justify-center overflow-hidden px-6">
      <motion.div ref={ref} style={{ y }} className="relative mx-auto max-w-4xl text-center">
        {LINES.map((line, i) => (
          <RevealText
            key={i}
            text={line.text}
            as="p"
            delay={i * 0.1}
            className={`mb-6 font-display text-fluid-xl font-medium leading-tight tracking-tightest ${
              line.tone === "gold"
                ? "text-gradient-gold"
                : line.tone === "signal"
                  ? "text-gradient-signal"
                  : "text-white/65"
            }`}
          />
        ))}
      </motion.div>
    </section>
  );
}
