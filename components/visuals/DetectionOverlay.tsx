"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

export type DetState = "detected" | "missed" | "recovered";

export interface DetBox {
  /** All values are percentages of the frame (0–100). */
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  conf?: number;
  state?: DetState;
  labelBelow?: boolean;
}

const STATE_STYLES: Record<DetState, { border: string; chip: string; glow: string }> = {
  detected: {
    border: "border-aperture-cyan",
    chip: "bg-aperture-cyan/90 text-black",
    glow: "0 0 22px -4px rgba(56,225,255,0.7)",
  },
  recovered: {
    border: "border-aperture-teal",
    chip: "bg-aperture-teal/90 text-black",
    glow: "0 0 22px -4px rgba(46,230,197,0.7)",
  },
  missed: {
    border: "border-red-400",
    chip: "bg-red-500/90 text-white",
    glow: "0 0 26px -2px rgba(248,113,113,0.75)",
  },
};

/**
 * An image frame with animated detection boxes drawn on top — the visual
 * language of a perception model at work. "missed" boxes render as red dashed
 * blind spots, dramatising where a model fails; "detected"/"recovered" boxes
 * show confident labels. A scan line sweeps the frame like a live inference pass.
 */
export function DetectionOverlay({
  src,
  alt,
  boxes,
  className,
  scan = true,
  priority = false,
}: {
  src: string;
  alt: string;
  boxes: DetBox[];
  className?: string;
  scan?: boolean;
  priority?: boolean;
}) {
  const reduced = useReducedMotion();

  return (
    <div className={cn("relative aspect-[3/2] w-full overflow-hidden rounded-2xl border border-glass-line", className)}>
      <Image src={src} alt={alt} fill priority={priority} sizes="(max-width: 768px) 100vw, 640px" className="object-cover" />
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/10" />

      {/* Scanning inference sweep */}
      {scan && !reduced && (
        <motion.div
          aria-hidden
          initial={{ x: "-30%" }}
          whileInView={{ x: "130%" }}
          viewport={{ once: false, margin: "-15%" }}
          transition={{ duration: 2.4, ease: "easeInOut", repeat: Infinity, repeatDelay: 1.6 }}
          className="absolute inset-y-0 w-1/3 bg-[linear-gradient(90deg,transparent,rgba(56,225,255,0.14),rgba(56,225,255,0.28),transparent)]"
        />
      )}

      {boxes.map((b, i) => {
        const state = b.state ?? "detected";
        const s = STATE_STYLES[state];
        const missed = state === "missed";
        return (
          <motion.div
            key={`${b.label}-${i}`}
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-12%" }}
            transition={{ duration: 0.5, delay: 0.15 + i * 0.14, ease: [0.16, 1, 0.3, 1] }}
            className="absolute"
            style={{ left: `${b.x}%`, top: `${b.y}%`, width: `${b.w}%`, height: `${b.h}%` }}
          >
            <div
              className={cn(
                "relative h-full w-full rounded-[3px] border-2",
                s.border,
                missed && "border-dashed",
              )}
              style={{ boxShadow: s.glow }}
            >
              {/* corner ticks for a handcrafted HUD feel */}
              {!missed &&
                ["-top-px -left-px", "-top-px -right-px", "-bottom-px -left-px", "-bottom-px -right-px"].map((p) => (
                  <span key={p} className={cn("absolute h-1.5 w-1.5 border-white/80", p)} />
                ))}

              {missed && !reduced && (
                <motion.span
                  aria-hidden
                  className="absolute inset-0 rounded-[3px] border-2 border-red-400"
                  animate={{ opacity: [0.25, 0.8, 0.25] }}
                  transition={{ duration: 1.3, repeat: Infinity, ease: "easeInOut" }}
                />
              )}

              <span
                className={cn(
                  "absolute left-0 whitespace-nowrap rounded px-1.5 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-wide",
                  b.labelBelow ? "-bottom-[18px]" : "-top-[18px]",
                  s.chip,
                )}
              >
                {missed ? "⚠ blind spot" : b.label}
                {!missed && b.conf != null && <span className="ml-1 opacity-70">{b.conf}%</span>}
              </span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
