"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

type GlassCardProps = React.HTMLAttributes<HTMLDivElement> & {
  strong?: boolean;
  glow?: "gold" | "cyan" | "violet" | "none";
  interactive?: boolean;
};

const glowMap = {
  gold: "hover:shadow-glow-gold",
  cyan: "hover:shadow-glow-cyan",
  violet: "hover:shadow-glow-violet",
  none: "",
};

/**
 * The core surface primitive. A frosted panel with a hairline edge, an inner
 * top-light and an optional coloured bloom on hover. Used for every card,
 * hologram and metric tile across the experience.
 */
export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, strong, glow = "none", interactive, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative overflow-hidden rounded-2xl p-6",
          strong ? "glass-strong" : "glass",
          interactive && "transition-all duration-500 ease-out-expo hover:-translate-y-1",
          glowMap[glow],
          className,
        )}
        {...props}
      >
        {/* Top-edge highlight sweep */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent"
        />
        {children}
      </div>
    );
  },
);

GlassCard.displayName = "GlassCard";
