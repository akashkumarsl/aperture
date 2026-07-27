"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * The small monospaced act-marker that opens each scene, e.g. "03 — Reasoning".
 * A drawing hairline animates outward to anchor the eye.
 */
export function SceneKicker({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20%" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={cn("flex items-center gap-3", className)}
    >
      <span className="h-px w-8 bg-gradient-to-r from-gold to-transparent" />
      <span className="font-mono text-[11px] uppercase tracking-cinematic text-white/70">
        {children}
      </span>
    </motion.div>
  );
}
