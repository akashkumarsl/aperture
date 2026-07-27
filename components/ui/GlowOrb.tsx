"use client";

import { cn } from "@/lib/utils";

type GlowOrbProps = {
  className?: string;
  color?: string;
  size?: number;
  opacity?: number;
  blur?: number;
};

/**
 * Soft volumetric light source. A large, heavily-blurred radial gradient that
 * bleeds coloured light into the scene to fake atmospheric depth and god-rays
 * without the cost of real post-processing.
 */
export function GlowOrb({
  className,
  color = "rgba(245,185,66,0.5)",
  size = 480,
  opacity = 0.6,
  blur = 120,
}: GlowOrbProps) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute rounded-full will-transform", className)}
      style={{
        width: size,
        height: size,
        opacity,
        filter: `blur(${blur}px)`,
        background: `radial-gradient(circle at center, ${color}, transparent 70%)`,
      }}
    />
  );
}
