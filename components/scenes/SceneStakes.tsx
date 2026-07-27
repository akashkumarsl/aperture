"use client";

import { motion } from "framer-motion";
import { SceneSection } from "@/components/ui/SceneSection";
import { SceneKicker } from "@/components/ui/SceneKicker";
import { RevealText } from "@/components/ui/RevealText";
import { GlowOrb } from "@/components/ui/GlowOrb";
import { DetectionOverlay } from "@/components/visuals/DetectionOverlay";
import { IMAGERY, NIGHT_DETECTIONS, STAKES } from "@/lib/content";

/**
 * SCENE 2b — The Stakes.
 * A continuation of the Aperture act: the very first thing the intelligence
 * layer confronts is a perception model failing in the field. Trained on clean
 * daylight data, it goes blind at night and in rain — missed cyclists, missed
 * pedestrians. This is the desperate need the whole system exists to solve.
 */
export function SceneStakes() {
  return (
    <SceneSection id="stakes" className="flex flex-col justify-center py-32">
      <GlowOrb className="left-10 top-24" color="rgba(248,113,113,0.14)" size={520} blur={150} opacity={0.6} />

      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <SceneKicker>02 · Blind Spots</SceneKicker>
          <RevealText
            text={STAKES.headline}
            className="mt-6 font-display text-fluid-2xl font-semibold leading-[1.03] tracking-tightest text-white"
          />
          <p className="mt-5 max-w-md text-fluid-base leading-relaxed text-white/70">{STAKES.body}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Stat value="12.6%" label="Production failure rate" tone="bad" />
            <Stat value="2" label="Objects missed this frame" tone="bad" />
            <Stat value="Night · Rain" label="Failing domains" tone="warn" />
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
            className="mt-8 font-mono text-[11px] uppercase tracking-cinematic text-gold-soft"
          >
            {STAKES.note}
          </motion.p>
        </div>

        <div className="relative">
          <DetectionOverlay
            src={IMAGERY.streetNight}
            alt="Autonomous-vehicle night camera view in the rain, with the perception model missing a cyclist and a pedestrian"
            boxes={NIGHT_DETECTIONS}
            className="shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9)]"
          />
          <p className="mt-3 text-center font-mono text-[11px] uppercase tracking-cinematic text-white/55">
            Perception model · v-crude · night + rain
          </p>
        </div>
      </div>
    </SceneSection>
  );
}

function Stat({ value, label, tone }: { value: string; label: string; tone: "bad" | "warn" }) {
  return (
    <div className="rounded-xl border border-glass-line bg-white/[0.04] px-4 py-3">
      <p
        className={`font-display text-fluid-lg font-bold tabular-nums ${
          tone === "bad" ? "text-red-400" : "text-gold-soft"
        }`}
      >
        {value}
      </p>
      <p className="mt-0.5 text-[10px] uppercase tracking-wider text-white/55">{label}</p>
    </div>
  );
}
