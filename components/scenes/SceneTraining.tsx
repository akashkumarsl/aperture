"use client";

import { SceneSection } from "@/components/ui/SceneSection";
import { SceneKicker } from "@/components/ui/SceneKicker";
import { RevealText } from "@/components/ui/RevealText";
import { GlassCard } from "@/components/ui/GlassCard";
import { GlowOrb } from "@/components/ui/GlowOrb";
import { MetricCounter } from "@/components/ui/MetricCounter";
import { TrainingChart } from "@/components/visuals/TrainingChart";
import { ConfusionMatrix } from "@/components/visuals/ConfusionMatrix";
import { TRAINING_METRICS, type Metric } from "@/lib/content";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * SCENE 5 — Results.
 * The golden dataset powers a training engine. The dashboard comes alive: loss
 * falls, mAP / recall / precision / robustness rise, failure rate collapses, and
 * the confusion matrix resolves into a clean, balanced diagonal.
 */
export function SceneTraining() {
  return (
    <SceneSection id="training" className="flex flex-col justify-center py-32">
      <GlowOrb className="left-1/2 top-10 -translate-x-1/2" color="rgba(46,230,197,0.16)" size={620} blur={150} opacity={0.6} />

      <div className="mx-auto w-full max-w-6xl">
        <div className="max-w-2xl">
          <SceneKicker>05 — Results</SceneKicker>
          <RevealText
            text="Better data. Measurably better models."
            className="mt-6 font-display text-fluid-2xl font-semibold leading-[1.02] tracking-tightest text-white"
          />
          <p className="mt-5 text-fluid-base leading-relaxed text-white/70">
            The optimised dataset flows into training. Every curve bends the right way — not from
            more compute, but from data that finally matches what the model needs.
          </p>
        </div>

        <div className="mt-14 grid gap-4 lg:grid-cols-[1.4fr_1fr]">
          <GlassCard strong glow="cyan" className="p-6">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[11px] uppercase tracking-cinematic text-white/65">
                Training run · v-gold
              </span>
              <span className="flex items-center gap-2 text-fluid-sm text-aperture-teal">
                <span className="h-2 w-2 animate-pulse-glow rounded-full bg-aperture-teal" />
                live
              </span>
            </div>
            <TrainingChart className="mt-4 h-[200px] w-full" />
            <div className="mt-4 flex gap-6 text-fluid-sm">
              <Legend color="#38e1ff" label="mAP@0.5" />
              <Legend color="#f5b942" label="Val loss" />
            </div>
          </GlassCard>

          <GlassCard className="p-6">
            <span className="font-mono text-[11px] uppercase tracking-cinematic text-white/65">
              Confusion matrix
            </span>
            <ConfusionMatrix className="mt-4" size={6} />
          </GlassCard>
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {TRAINING_METRICS.map((m, i) => (
            <MetricTile key={m.label} metric={m} index={i} />
          ))}
        </div>
      </div>
    </SceneSection>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <span className="flex items-center gap-2 text-white/60">
      <span className="h-2 w-4 rounded-full" style={{ background: color }} />
      {label}
    </span>
  );
}

function MetricTile({ metric, index }: { metric: Metric; index: number }) {
  const up = metric.direction === "up";
  const decimals = metric.label === "Val Loss" ? 3 : 1;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.6, delay: index * 0.05 }}
    >
      <GlassCard className="p-4">
        <p className="text-[10px] uppercase tracking-wider text-white/55">{metric.label}</p>
        <p className="mt-2 font-display text-fluid-lg font-bold tabular-nums text-white">
          <MetricCounter from={metric.from} to={metric.to} decimals={decimals} suffix={metric.unit} />
        </p>
        <p className={cn("mt-1 flex items-center gap-1 text-[11px]", up ? "text-aperture-teal" : "text-gold")}>
          <span aria-hidden>{up ? "▲" : "▼"}</span>
          {up ? "improving" : "falling"}
        </p>
      </GlassCard>
    </motion.div>
  );
}
