"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SceneSection } from "@/components/ui/SceneSection";
import { SceneKicker } from "@/components/ui/SceneKicker";
import { RevealText } from "@/components/ui/RevealText";
import { GlassCard } from "@/components/ui/GlassCard";
import { GlowOrb } from "@/components/ui/GlowOrb";
import { NeuralGraph } from "@/components/visuals/NeuralGraph";
import { TELEMETRY_STREAMS } from "@/lib/content";

/**
 * SCENE 2 — Aperture.
 * Crude flows through transparent pipes into the refinery. The AI Data
 * Intelligence Layer ignites, telemetry floods in, and — crucially — Aperture
 * *analyses* rather than immediately generating synthetic data.
 */
export function SceneRefinery() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const titleY = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);

  return (
    <SceneSection ref={ref} id="refinery" className="flex flex-col justify-center py-32">
      <GlowOrb className="left-1/2 top-24 -translate-x-1/2" color="rgba(245,185,66,0.22)" size={640} blur={140} opacity={0.7} />

      <div className="mx-auto w-full max-w-6xl">
        <SceneKicker>02 — The Refinery</SceneKicker>

        <motion.div style={{ y: titleY }} className="mt-8 text-center">
          <h2 className="text-gradient-gold font-display text-fluid-3xl font-bold leading-[0.9] tracking-tightest [text-shadow:0_0_80px_rgba(245,185,66,0.35)]">
            APERTURE
          </h2>
          <RevealText
            text="The AI Data Intelligence Layer"
            as="p"
            className="mt-4 text-fluid-lg font-light tracking-tight text-white/70"
          />
        </motion.div>

        <div className="mt-20 grid items-center gap-8 lg:grid-cols-[1fr_1.1fr]">
          {/* Telemetry streaming in */}
          <div className="relative">
            <p className="mb-4 font-mono text-[11px] uppercase tracking-cinematic text-white/65">
              Everything streams into Aperture
            </p>
            <TelemetryStreams />
          </div>

          {/* The AI analyses — reasoning graph */}
          <GlassCard strong className="p-6" glow="cyan">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[11px] uppercase tracking-cinematic text-aperture-cyan/80">
                Analysing · not generating
              </span>
              <span className="flex items-center gap-2 text-fluid-sm text-white/65">
                <span className="h-2 w-2 animate-pulse-glow rounded-full bg-aperture-cyan" />
                reasoning
              </span>
            </div>
            <NeuralGraph className="mt-2 h-[240px] w-full" />
            <p className="mt-2 text-fluid-sm leading-relaxed text-white/70">
              Aperture does not immediately synthesise data. It builds a knowledge graph of the
              problem — statistics, failures, distributions — and reasons about what the model
              actually needs.
            </p>
          </GlassCard>
        </div>
      </div>
    </SceneSection>
  );
}

/** A dual-column marquee of telemetry chips flowing toward the core. */
function TelemetryStreams() {
  const col = (items: string[], dir: 1 | -1, dur: number) => (
    <div className="relative h-[300px] overflow-hidden mask-fade-y">
      <motion.div
        animate={{ y: dir === 1 ? ["0%", "-50%"] : ["-50%", "0%"] }}
        transition={{ duration: dur, repeat: Infinity, ease: "linear" }}
        className="flex flex-col gap-3"
      >
        {[...items, ...items].map((label, i) => (
          <div
            key={`${label}-${i}`}
            className="glass flex items-center gap-3 rounded-xl px-4 py-3 text-fluid-sm text-white/70"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-gold/80" />
            {label}
          </div>
        ))}
      </motion.div>
    </div>
  );

  const half = Math.ceil(TELEMETRY_STREAMS.length / 2);
  return (
    <div className="grid grid-cols-2 gap-3">
      {col([...TELEMETRY_STREAMS].slice(0, half), 1, 18)}
      {col([...TELEMETRY_STREAMS].slice(half), -1, 22)}
    </div>
  );
}
