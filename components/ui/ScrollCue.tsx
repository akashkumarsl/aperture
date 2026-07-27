"use client";

import { motion } from "framer-motion";

/**
 * A minimalist "scroll to begin" cue — a vertical rail with a light that falls
 * and repeats, hinting the entire story unfolds through scrolling.
 */
export function ScrollCue({ label = "Scroll to begin" }: { label?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2.4, duration: 1.2 }}
      className="flex flex-col items-center gap-3"
    >
      <span className="font-mono text-[10px] uppercase tracking-cinematic text-white/60">
        {label}
      </span>
      <span className="relative h-12 w-px overflow-hidden bg-white/15">
        <motion.span
          animate={{ y: ["-100%", "180%"] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-0 top-0 h-6 w-px bg-gradient-to-b from-transparent via-gold to-transparent"
        />
      </span>
    </motion.div>
  );
}
