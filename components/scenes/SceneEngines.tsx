"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { SceneSection } from "@/components/ui/SceneSection";
import { SceneKicker } from "@/components/ui/SceneKicker";
import { RevealText } from "@/components/ui/RevealText";
import { GlassCard } from "@/components/ui/GlassCard";
import { GlowOrb } from "@/components/ui/GlowOrb";
import { ENGINES, DAY_DETECTIONS, IMAGERY, type Engine } from "@/lib/content";
import { BeforeAfter } from "@/components/visuals/BeforeAfter";
import { DetectionOverlay } from "@/components/visuals/DetectionOverlay";
import { registerGsap } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * SCENE 4 — Orchestration.
 * Robotic engines execute the chosen interventions. Each emits a refined
 * stream; crude black oil becomes glowing gold fluid. A GSAP ScrollTrigger
 * scrubs a `--purity` variable so the transformation is physically tied to the
 * scroll position — impurities fade, quality rises.
 */
export function SceneEngines() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useIsomorphicLayoutEffect(() => {
    if (!ref.current) return;
    if (reduced) {
      ref.current.style.setProperty("--purity", "1");
      return;
    }
    const { gsap } = registerGsap();
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { "--purity": 0 },
        {
          "--purity": 1,
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 65%",
            end: "bottom 65%",
            scrub: 0.6,
          },
        },
      );
    }, ref);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <SceneSection
      ref={ref}
      id="engines"
      className="flex flex-col justify-center py-32"
      style={{ ["--purity" as string]: 0 } as React.CSSProperties}
    >
      <GlowOrb className="left-1/4 top-24" color="rgba(245,185,66,0.2)" size={560} blur={140} opacity={0.7} />

      <div className="mx-auto w-full max-w-6xl">
        <div className="max-w-2xl">
          <SceneKicker>04 — Orchestration</SceneKicker>
          <RevealText
            text="Specialised engines execute."
            className="mt-6 font-display text-fluid-2xl font-semibold leading-[1.02] tracking-tightest text-white"
          />
          <p className="mt-5 text-fluid-base leading-relaxed text-white/70">
            Aperture orchestrates a fleet of purpose-built engines. Each refines a different facet
            of the dataset — and crude black data emerges as luminous gold.
          </p>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-5">
          {ENGINES.map((engine, i) => (
            <EngineModule key={engine.name} engine={engine} index={i} />
          ))}
        </div>

        <PerceptionDemos />

        <OptimisedVessel />
      </div>
    </SceneSection>
  );
}

/**
 * The engines shown *doing their work* — a live demo panel that reads like a
 * short clip. Left: the Domain Adaptation engine converting a daylight frame
 * into the night + rain domain the model was failing on. Right: the Annotation
 * engine recovering precise, high-confidence labels on the same scene.
 */
function PerceptionDemos() {
  return (
    <div className="mt-16 grid gap-5 lg:grid-cols-2">
      <div>
        <div className="mb-3 flex items-center justify-between">
          <span className="font-mono text-[11px] uppercase tracking-cinematic text-aperture-violet">
            Domain Adaptation Engine
          </span>
          <span className="flex items-center gap-2 text-fluid-sm text-white/60">
            <span className="h-2 w-2 animate-pulse-glow rounded-full bg-aperture-violet" />
            day → night / rain
          </span>
        </div>
        <BeforeAfter
          beforeSrc={IMAGERY.streetDay}
          afterSrc={IMAGERY.streetNight}
          beforeAlt="Daylight source-domain street scene"
          afterAlt="Night and rain target-domain street scene"
          beforeLabel="Source · day"
          afterLabel="Adapted · night + rain"
        />
        <p className="mt-3 text-fluid-sm leading-relaxed text-white/60">
          One labelled frame becomes thousands across the domains the model actually fails in —
          without collecting a single new photo.
        </p>
      </div>

      <div>
        <div className="mb-3 flex items-center justify-between">
          <span className="font-mono text-[11px] uppercase tracking-cinematic text-gold-soft">
            Annotation Engine
          </span>
          <span className="flex items-center gap-2 text-fluid-sm text-white/60">
            <span className="h-2 w-2 animate-pulse-glow rounded-full bg-gold" />
            precision labels
          </span>
        </div>
        <DetectionOverlay
          src={IMAGERY.streetDay}
          alt="Daylight street scene with recovered high-confidence detections on cars and cyclists"
          boxes={DAY_DETECTIONS}
        />
        <p className="mt-3 text-fluid-sm leading-relaxed text-white/60">
          Every object is re-labelled with calibrated confidence — the blind spots from the field
          are now covered.
        </p>
      </div>
    </div>
  );
}

function EngineModule({ engine, index }: { engine: Engine; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
    >
      <GlassCard interactive className="group h-full text-center" style={{ borderColor: `${engine.hue}33` }}>
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border" style={{ borderColor: `${engine.hue}55`, background: `${engine.hue}12` }}>
          <span className="font-mono text-fluid-sm font-bold tracking-widest" style={{ color: engine.hue }}>
            {engine.short}
          </span>
        </div>

        {/* Robotic-arm activity bars */}
        <div className="mt-4 flex h-6 items-end justify-center gap-1">
          {[0, 1, 2, 3, 4].map((b) => (
            <motion.span
              key={b}
              className="w-1 rounded-full"
              style={{ background: engine.hue }}
              animate={{ height: ["20%", "100%", "35%"], opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.1, repeat: Infinity, delay: b * 0.12 + index * 0.1, ease: "easeInOut" }}
            />
          ))}
        </div>

        <h3 className="mt-4 font-display text-fluid-sm font-semibold leading-tight text-white">
          {engine.name}
        </h3>
        <p className="mt-1 text-[11px] uppercase tracking-wider text-white/55">{engine.output}</p>
      </GlassCard>
    </motion.div>
  );
}

/** The convergence vessel: crude → gold, purity scrubbed by scroll. */
function OptimisedVessel() {
  return (
    <div className="relative mt-8 overflow-hidden rounded-3xl border border-glass-line p-8">
      {/* Fluid fill driven by --purity */}
      <div
        className="absolute inset-0 opacity-90"
        style={{
          background:
            "linear-gradient(90deg, #0a0a0c 0%, color-mix(in srgb, #0a0a0c calc((1 - var(--purity)) * 100%), #f5b942) 100%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 120% at 90% 50%, rgba(245,185,66,calc(var(--purity)*0.55)), transparent 60%)",
        }}
      />

      <div className="relative flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-cinematic text-white/60">Output</p>
          <h3 className="mt-1 font-display text-fluid-xl font-bold tracking-tightest text-white [text-shadow:0_2px_30px_rgba(0,0,0,0.5)]">
            Optimised Training Dataset
          </h3>
        </div>

        <div className="w-full max-w-xs">
          <div className="flex justify-between text-[11px] uppercase tracking-wider text-white/60">
            <span>Impurity</span>
            <span>Purity</span>
          </div>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-black/50">
            <div
              className="h-full rounded-full bg-gradient-to-r from-gold-deep via-gold to-gold-soft"
              style={{ width: "calc(var(--purity) * 100%)" }}
            />
          </div>
          <p className="mt-2 text-right font-mono text-fluid-sm text-gold-soft">
            <span style={{ opacity: "var(--purity)" }}>refined</span>
          </p>
        </div>
      </div>
    </div>
  );
}
