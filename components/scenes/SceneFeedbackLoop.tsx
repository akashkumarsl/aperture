"use client";

import { motion } from "framer-motion";
import { SceneSection } from "@/components/ui/SceneSection";
import { SceneKicker } from "@/components/ui/SceneKicker";
import { RevealText } from "@/components/ui/RevealText";
import { GlassCard } from "@/components/ui/GlassCard";
import { GlowOrb } from "@/components/ui/GlowOrb";
import { LoopDiagram } from "@/components/visuals/LoopDiagram";
import { DetectionOverlay } from "@/components/visuals/DetectionOverlay";
import { LOOP_STEPS, PRODUCTION_SOURCES, IMAGERY, PARK_DETECTIONS } from "@/lib/content";

/**
 * SCENE 6 — Feedback.
 * Models ship into cars, factories, robots and cameras. Real-world failures
 * flow back into Aperture, the knowledge graph grows, and the reasoning gets
 * stronger. Observe · Diagnose · Reason · Execute · Learn · Repeat — forever.
 */
export function SceneFeedbackLoop() {
  return (
    <SceneSection id="feedback" className="flex flex-col justify-center py-32">
      <GlowOrb className="right-1/4 top-20" color="rgba(139,92,255,0.16)" size={560} blur={150} opacity={0.6} />

      <div className="mx-auto w-full max-w-6xl">
        {/* Production feed — a live scene in the field, sending failures home. */}
        <div className="mb-14 grid items-center gap-8 lg:grid-cols-[1.1fr_1fr]">
          <div className="relative">
            <DetectionOverlay
              src={IMAGERY.parkDusk}
              alt="Dusk city-park scene watched by an edge camera, monitoring people, a jogger and a dog"
              boxes={PARK_DETECTIONS}
              className="shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9)]"
            />
            <div className="mt-3 flex items-center justify-between font-mono text-[11px] uppercase tracking-cinematic">
              <span className="flex items-center gap-2 text-aperture-teal">
                <span className="h-2 w-2 animate-pulse-glow rounded-full bg-aperture-teal" />
                Live production · edge camera
              </span>
              <span className="text-red-400">1 new failure captured</span>
            </div>
          </div>

          <div>
            <SceneKicker>06 — The Loop</SceneKicker>
            <RevealText
              text="Production returns as signal."
              className="mt-6 font-display text-fluid-2xl font-semibold leading-[1.02] tracking-tightest text-white"
            />
            <p className="mt-5 max-w-md text-fluid-base leading-relaxed text-white/70">
              Models ship into cars, factories, robots and cameras. Every real-world miss flows back
              into Aperture — the knowledge graph compounds and diagnosis sharpens.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {PRODUCTION_SOURCES.map((src) => (
                <span key={src} className="chip">
                  <span className="h-1.5 w-1.5 rounded-full bg-aperture-violet" />
                  {src}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1fr]">
          <div>
            <RevealText
              text="Every experiment makes Aperture smarter."
              className="font-display text-fluid-xl font-semibold leading-[1.05] tracking-tightest text-white"
            />
            <p className="mt-5 max-w-md text-fluid-base leading-relaxed text-white/70">
              The whole system improves itself — an autonomous flywheel that never stops learning.
            </p>

            <ol className="mt-8 space-y-3">
              {LOOP_STEPS.map((step, i) => (
                <motion.li
                  key={step.verb}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
                  className="flex items-start gap-4"
                >
                  <span className="mt-1 font-mono text-[11px] text-gold-soft">0{i + 1}</span>
                  <span>
                    <span className="font-display text-fluid-base font-semibold text-white">
                      {step.verb}
                    </span>
                    <span className="ml-2 text-fluid-sm text-white/60">{step.note}</span>
                  </span>
                </motion.li>
              ))}
            </ol>
          </div>

          <GlassCard strong glow="violet" className="p-8">
            <LoopDiagram />
            <p className="mt-4 text-center font-mono text-[11px] uppercase tracking-cinematic text-white/55">
              Infinite feedback loop
            </p>
          </GlassCard>
        </div>
      </div>
    </SceneSection>
  );
}
