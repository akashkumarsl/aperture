"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { SceneSection } from "@/components/ui/SceneSection";
import { SceneKicker } from "@/components/ui/SceneKicker";
import { RevealText } from "@/components/ui/RevealText";
import { GlassCard } from "@/components/ui/GlassCard";
import { GlowOrb } from "@/components/ui/GlowOrb";
import { INTERVENTIONS, type Intervention } from "@/lib/content";
import { cn } from "@/lib/utils";

/**
 * SCENE 3 — Reasoning.
 * "Diagnose before acting." The reasoning engine scores every possible
 * intervention. Only the high-confidence, high-impact ones illuminate — the
 * visual language of genuine decision-making rather than brute-force generation.
 */
export function SceneDiagnose() {
  return (
    <SceneSection id="diagnose" className="flex flex-col justify-center py-32">
      <GlowOrb className="right-10 top-40" color="rgba(56,225,255,0.16)" size={520} blur={130} opacity={0.6} />

      <div className="mx-auto w-full max-w-6xl">
        <div className="max-w-2xl">
          <SceneKicker>03 — Diagnose before acting</SceneKicker>
          <RevealText
            text="Diagnose before acting."
            className="mt-6 font-display text-fluid-2xl font-semibold leading-[1.02] tracking-tightest text-white"
          />
          <p className="mt-5 text-fluid-base leading-relaxed text-white/70">
            The reasoning engine evaluates every candidate intervention against the diagnosed
            bottleneck. Confidence reflects expected impact — most options stay dark.
          </p>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {INTERVENTIONS.map((item, i) => (
            <InterventionCard key={item.name} item={item} index={i} />
          ))}
        </div>
      </div>
    </SceneSection>
  );
}

function InterventionCard({ item, index }: { item: Intervention; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 26 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
    >
      <GlassCard
        strong={item.active}
        glow={item.active ? "cyan" : "none"}
        interactive
        className={cn(
          "h-full",
          item.active ? "border-aperture-cyan/25" : "opacity-75 grayscale-[0.2]",
        )}
      >
        <div className="flex items-start justify-between gap-3">
          <h3
            className={cn(
              "font-display text-fluid-base font-semibold tracking-tight",
              item.active ? "text-white" : "text-white/75",
            )}
          >
            {item.name}
          </h3>
          <span
            className={cn(
              "shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider",
              item.active ? "bg-aperture-cyan/15 text-aperture-cyan" : "bg-white/5 text-white/55",
            )}
          >
            {item.active ? "selected" : "held"}
          </span>
        </div>

        <div className="mt-5 flex items-end justify-between">
          <span
            className={cn(
              "font-display text-fluid-lg font-bold tabular-nums",
              item.active ? "text-gradient-signal" : "text-white/55",
            )}
          >
            {item.confidence}%
          </span>
          <span className="text-[10px] uppercase tracking-cinematic text-white/50">confidence</span>
        </div>

        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/8">
          <motion.div
            initial={{ width: 0 }}
            animate={inView ? { width: `${item.confidence}%` } : {}}
            transition={{ duration: 1.1, delay: index * 0.06 + 0.2, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              "h-full rounded-full",
              item.active
                ? "bg-gradient-to-r from-aperture-cyan to-aperture-violet shadow-glow-cyan"
                : "bg-white/20",
            )}
          />
        </div>

        <p className="mt-4 text-fluid-sm leading-relaxed text-white/60">{item.rationale}</p>
      </GlassCard>
    </motion.div>
  );
}
