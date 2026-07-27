"use client";

import { motion, type Variants } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ *
 * Pitch design system — disciplined, editorial, legibility-first.
 * Everything sits on solid glass panels with strong type hierarchy so
 * the page reads cleanly on a screen recording.
 * ------------------------------------------------------------------ */

const TONE: Record<string, string> = {
  gold: "text-gold-soft",
  cyan: "text-aperture-cyan",
  teal: "text-aperture-teal",
  violet: "text-aperture-violet",
  red: "text-red-400",
  white: "text-white",
};

const TONE_DOT: Record<string, string> = {
  gold: "bg-gold",
  cyan: "bg-aperture-cyan",
  teal: "bg-aperture-teal",
  violet: "bg-aperture-violet",
  red: "bg-red-400",
};

/** A full-bleed section with consistent rhythm + a centered content column. */
export function Section({
  id,
  children,
  className,
  container = true,
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
  container?: boolean;
}) {
  return (
    <section id={id} className={cn("relative w-full py-24 md:py-36", className)}>
      {container ? (
        <div className="mx-auto w-full max-w-6xl px-6 md:px-10">{children}</div>
      ) : (
        children
      )}
    </section>
  );
}

/** Mono eyebrow / kicker — small, bright enough to read, gold accent. */
export function Kicker({ children, tone = "gold" }: { children: React.ReactNode; tone?: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className={cn("h-px w-8", tone === "gold" ? "bg-gold/60" : "bg-white/30")} />
      <span className={cn("font-mono text-xs font-medium uppercase tracking-[0.28em] md:text-[13px]", TONE[tone] ?? "text-gold-soft")}>
        {children}
      </span>
    </div>
  );
}

/** Section headline — large, high-contrast, tight tracking. */
export function Headline({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <h2 className={cn("font-display text-[clamp(2rem,1.3rem+3vw,3.6rem)] font-semibold leading-[1.05] tracking-tightest text-white", className)}>
      {children}
    </h2>
  );
}

/** Lead paragraph — the one that must always be readable. */
export function Lead({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={cn("max-w-2xl text-[clamp(1.05rem,0.98rem+0.5vw,1.3rem)] leading-relaxed text-white/75", className)}>
      {children}
    </p>
  );
}

const revealV: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0 },
};

/** In-view reveal that respects reduced motion. */
export function Reveal({
  children,
  className,
  delay = 0,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "li" | "span";
}) {
  const reduced = useReducedMotion();
  const MotionTag = motion[as] as typeof motion.div;
  return (
    <MotionTag
      variants={reduced ? undefined : revealV}
      initial={reduced ? undefined : "hidden"}
      whileInView={reduced ? undefined : "show"}
      viewport={{ once: true, margin: "-12%" }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </MotionTag>
  );
}

/** A solid, readable glass panel. */
export function Panel({
  children,
  className,
  glow,
}: {
  children: React.ReactNode;
  className?: string;
  glow?: "gold" | "cyan" | "violet" | "teal";
}) {
  const glowRing =
    glow === "gold"
      ? "shadow-[0_0_60px_-20px_rgba(245,185,66,0.4)]"
      : glow === "cyan"
        ? "shadow-[0_0_60px_-20px_rgba(56,225,255,0.4)]"
        : glow === "violet"
          ? "shadow-[0_0_60px_-20px_rgba(139,92,255,0.4)]"
          : glow === "teal"
            ? "shadow-[0_0_60px_-20px_rgba(46,230,197,0.4)]"
            : "";
  return (
    <div
      className={cn(
        "rounded-2xl border border-white/10 bg-white/[0.045] p-6 backdrop-blur-xl md:p-8",
        glowRing,
        className,
      )}
    >
      {children}
    </div>
  );
}

/** Big numeric stat — tabular figures, bright value, legible label. */
export function Stat({
  value,
  label,
  tone = "gold",
  size = "md",
}: {
  value: string;
  label: string;
  tone?: string;
  size?: "sm" | "md" | "lg";
}) {
  const valSize = size === "lg" ? "text-4xl md:text-5xl" : size === "sm" ? "text-2xl md:text-3xl" : "text-3xl md:text-4xl";
  return (
    <div>
      <div className={cn("font-display font-semibold tabular-nums tracking-tight", valSize, TONE[tone] ?? "text-gold-soft")}>
        {value}
      </div>
      <div className="mt-2 text-sm leading-snug text-white/65 md:text-[15px]">{label}</div>
    </div>
  );
}

/** Small labelled dot for legends. */
export function Dot({ tone = "gold", children }: { tone?: string; children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 text-xs text-white/65">
      <span className={cn("h-2 w-2 rounded-full", TONE_DOT[tone] ?? "bg-gold")} />
      {children}
    </span>
  );
}

export { TONE, TONE_DOT };
