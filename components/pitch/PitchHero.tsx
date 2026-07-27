"use client";

import { motion } from "framer-motion";
import { scrollToSection } from "@/components/layout/SmoothScroll";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { PITCH_HERO, HERO_STATS } from "@/lib/pitch";
import { Stat, TONE } from "@/components/pitch/ui";
import { cn } from "@/lib/utils";

const ROOT_CAUSES = [
  { label: "Night / rain blind spots", conf: 87, lift: "+6.2", tone: "cyan" },
  { label: "Class imbalance · cyclist", conf: 72, lift: "+3.1", tone: "violet" },
  { label: "Mislabeled boxes", conf: 54, lift: "+1.8", tone: "gold" },
];

/** The product artifact a user actually receives — a ranked diagnosis. */
function DiagnosisCard() {
  const reduced = useReducedMotion();
  return (
    <motion.div
      initial={reduced ? undefined : { opacity: 0, y: 30, rotateX: 8 }}
      animate={reduced ? undefined : { opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full max-w-md rounded-2xl border border-white/12 bg-void-800/80 p-5 shadow-[0_30px_80px_-24px_rgba(0,0,0,0.8)] backdrop-blur-2xl md:p-6"
    >
      <div className="absolute -inset-px -z-10 rounded-2xl bg-gradient-to-b from-aperture-cyan/20 via-transparent to-gold/20 opacity-60 blur-md" />
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 animate-pulse rounded-full bg-aperture-teal" />
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/70">Aperture · Diagnosis</span>
          <span className="rounded border border-aperture-cyan/40 bg-aperture-cyan/10 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-aperture-cyan">
            beta
          </span>
        </div>
        <span className="rounded-md border border-aperture-teal/40 bg-aperture-teal/10 px-2 py-0.5 font-mono text-[11px] text-aperture-teal">
          8 min
        </span>
      </div>
      <p className="mt-1 font-mono text-[11px] text-white/45">perception-v4 · night+rain eval · 12,480 frames</p>

      <div className="mt-5 space-y-4">
        {ROOT_CAUSES.map((r, i) => (
          <div key={r.label}>
            <div className="flex items-baseline justify-between gap-3">
              <span className="text-sm font-medium text-white/85">
                <span className="mr-1.5 font-mono text-white/40">{String(i + 1).padStart(2, "0")}</span>
                {r.label}
              </span>
              <span className="shrink-0 font-mono text-xs text-white/55">
                <span className={cn("font-semibold", TONE[r.tone])}>{r.conf}%</span> · {r.lift} mAP
              </span>
            </div>
            <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-white/8">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${r.conf}%` }}
                transition={{ duration: 1.1, delay: 0.8 + i * 0.18, ease: [0.16, 1, 0.3, 1] }}
                className={cn(
                  "h-full rounded-full",
                  r.tone === "cyan" && "bg-aperture-cyan",
                  r.tone === "violet" && "bg-aperture-violet",
                  r.tone === "gold" && "bg-gold",
                )}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-3 text-[11px] text-white/50">
        <span>Diagnosis is free</span>
        <span className="text-white/70">Treatment billed per refined sample →</span>
      </div>
    </motion.div>
  );
}

export function PitchHero() {
  const reduced = useReducedMotion();
  return (
    <section id="pitch-top" className="relative flex min-h-screen w-full flex-col pt-24 pb-6">
      <div className="flex w-full flex-1 items-center">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-10 px-6 md:px-10 lg:grid-cols-[1.1fr_0.9fr]">
        {/* left — message */}
        <div>
          <motion.div
            initial={reduced ? undefined : { opacity: 0, y: 16 }}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-3 py-1.5"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-gold" />
            <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-white/70">{PITCH_HERO.eyebrow}</span>
          </motion.div>

          <h1 className="mt-6 font-display text-[clamp(2.6rem,1.6rem+5vw,5.4rem)] font-semibold leading-[0.98] tracking-tightest text-white">
            <motion.span
              initial={reduced ? undefined : { opacity: 0, y: 24 }}
              animate={reduced ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="block"
            >
              {PITCH_HERO.headline[0]}
            </motion.span>
            <motion.span
              initial={reduced ? undefined : { opacity: 0, y: 24 }}
              animate={reduced ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="block text-gradient-gold"
            >
              {PITCH_HERO.headline[1]}
            </motion.span>
          </h1>

          <motion.p
            initial={reduced ? undefined : { opacity: 0, y: 18 }}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.34, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 max-w-xl text-[clamp(1.05rem,0.98rem+0.5vw,1.3rem)] leading-relaxed text-white/78"
          >
            {PITCH_HERO.sub}
          </motion.p>

          <motion.div
            initial={reduced ? undefined : { opacity: 0, y: 18 }}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.46, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <button
              onClick={() => scrollToSection("pitch-cta")}
              className="focus-ring group inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-base font-medium text-black transition-transform hover:scale-[1.03] active:scale-95"
            >
              {PITCH_HERO.primaryCta}
              <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </button>
            <button
              onClick={() => scrollToSection("pitch-flow")}
              className="focus-ring inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-5 py-3 text-base font-medium text-white/85 transition-colors hover:bg-white/[0.08]"
            >
              <span className="grid h-5 w-5 place-items-center rounded-full border border-white/30 text-[10px]">▶</span>
              {PITCH_HERO.secondaryCta}
            </button>
          </motion.div>
        </div>

        {/* right — the artifact */}
        <div className="flex justify-center lg:justify-end">
          <DiagnosisCard />
        </div>
        </div>
      </div>

      {/* live-signal strip */}
      <motion.div
        initial={reduced ? undefined : { opacity: 0, y: 24 }}
        animate={reduced ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto w-full max-w-6xl px-6 pb-2 md:px-10"
      >
        <div className="grid grid-cols-2 gap-x-6 gap-y-5 rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-5 backdrop-blur-xl md:grid-cols-4">
          {HERO_STATS.map((s) => (
            <Stat key={s.label} value={s.value} label={s.label} tone={s.tone} size="sm" />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
