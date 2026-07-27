"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { SceneSection } from "@/components/ui/SceneSection";
import { ScrollCue } from "@/components/ui/ScrollCue";
import { GlowOrb } from "@/components/ui/GlowOrb";
import { OPENING_LINES, type OpeningLine } from "@/lib/content";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

/**
 * SCENE 1 — Origin.
 * A tall, pinned opening. As the visitor scrolls, four whispered lines fade
 * through one at a time — fully scroll-driven so they are legible at any pace
 * (and clean to screen-record). The camera then settles on an underground
 * reservoir of black crude oil, labelled RAW DATA.
 */
export function SceneIntro() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  // Reservoir reveals in the final third, after the lines have spoken.
  const reservoirOpacity = useTransform(scrollYProgress, [0.62, 0.76], [0, 1]);
  const reservoirScale = useTransform(scrollYProgress, [0.62, 1], [0.9, 1.08]);
  const reservoirY = useTransform(scrollYProgress, [0.62, 1], ["6%", "-6%"]);

  // A soft dark scrim sits behind the whispered lines so they stay legible over
  // the bright 3D oil sphere — it fades out as the reservoir takes the stage.
  const linesScrim = useTransform(scrollYProgress, [0, 0.58, 0.72], [1, 1, 0]);

  // Each line owns a scroll slot: fade-in · hold · fade-out.
  const span = 0.6 / OPENING_LINES.length;

  if (reduced) return <ReducedIntro innerRef={ref} />;

  return (
    <SceneSection ref={ref} id="intro" fill={false} clip={false} className="min-h-[320vh]">
      <div className="cine-vignette sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden">
        <GlowOrb
          className="left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          color="rgba(245,185,66,0.14)"
          size={620}
          blur={150}
          opacity={0.6}
        />

        {/* Legibility scrim behind the opening lines. */}
        <motion.div
          aria-hidden
          style={{ opacity: linesScrim }}
          className="pointer-events-none absolute inset-0 [background:radial-gradient(60%_45%_at_50%_50%,rgba(0,0,0,0.72)_0%,rgba(0,0,0,0.42)_38%,transparent_72%)]"
        />

        {/* Whispered opening lines — one at a time, driven by scroll. */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center px-6">
          {OPENING_LINES.map((line, i) => (
            <ScrollLine
              key={i}
              line={line}
              progress={scrollYProgress}
              start={i * span}
              span={span}
              first={i === 0}
            />
          ))}
        </div>

        {/* The reservoir — the camera's resting place. */}
        <motion.div style={{ opacity: reservoirOpacity }} className="relative flex w-full flex-col items-center">
          <p className="mb-10 max-w-md text-center text-fluid-base leading-relaxed text-white/70">
            Every AI model begins with raw data.
          </p>
          <Reservoir style={{ y: reservoirY, scale: reservoirScale }} />
          <div className="mt-10">
            <ScrollCue />
          </div>
        </motion.div>
      </div>
    </SceneSection>
  );
}

const TONE: Record<OpeningLine["tone"], string> = {
  mute: "text-white/90",
  warn: "text-gradient-warn [text-shadow:0_0_50px_rgba(255,138,61,0.25)]",
  signal: "text-gradient-signal [text-shadow:0_0_50px_rgba(56,225,255,0.22)]",
};

/** A single opening line whose opacity/blur/position track a scroll window. */
function ScrollLine({
  line,
  progress,
  start,
  span,
  first = false,
}: {
  line: OpeningLine;
  progress: MotionValue<number>;
  start: number;
  span: number;
  first?: boolean;
}) {
  const inEnd = start + span * 0.22;
  const holdEnd = start + span * 0.72;
  const end = start + span;

  // The first line is already fully spoken when the page loads — so it is
  // legible the instant a recording starts, before any scrolling.
  const opacity = useTransform(
    progress,
    first ? [start, holdEnd, end] : [start, inEnd, holdEnd, end],
    first ? [1, 1, 0] : [0, 1, 1, 0],
  );
  const y = useTransform(
    progress,
    first ? [start, holdEnd, end] : [start, inEnd, holdEnd, end],
    first ? [0, 0, -26] : [26, 0, 0, -26],
  );
  const blur = useTransform(
    progress,
    first ? [start, holdEnd, end] : [start, inEnd, holdEnd, end],
    first ? [0, 0, 10] : [10, 0, 0, 10],
  );
  const filter = useTransform(blur, (b) => `blur(${b}px)`);

  return (
    <motion.p
      style={{ opacity, y, filter }}
      className={cn(
        "absolute max-w-4xl text-balance text-center font-display text-fluid-xl font-medium leading-[1.1] tracking-tightest",
        TONE[line.tone],
      )}
    >
      {line.text}
    </motion.p>
  );
}

/** Reduced-motion fallback: lines stacked calmly above the reservoir, no scroll rigging. */
function ReducedIntro({ innerRef }: { innerRef: React.Ref<HTMLElement> }) {
  return (
    <SceneSection
      ref={innerRef}
      id="intro"
      className="cine-vignette flex flex-col items-center justify-center gap-16 py-32"
    >
      <div className="max-w-3xl space-y-6 text-center">
        {OPENING_LINES.map((line, i) => (
          <p
            key={i}
            className={cn(
              "font-display text-fluid-lg font-medium leading-tight tracking-tightest",
              TONE[line.tone],
            )}
          >
            {line.text}
          </p>
        ))}
      </div>
      <div className="flex flex-col items-center">
        <p className="mb-8 max-w-md text-center text-fluid-base leading-relaxed text-white/70">
          Every AI model begins with raw data.
        </p>
        <Reservoir />
      </div>
    </SceneSection>
  );
}

/** A glossy pool of black crude oil with a faint golden rim of latent value. */
function Reservoir({ style }: { style?: React.ComponentProps<typeof motion.div>["style"] }) {
  return (
    <motion.div style={style} className="relative flex flex-col items-center will-transform">
      <span className="mb-5 font-mono text-[11px] uppercase tracking-cinematic text-gold-soft">
        Raw Data
      </span>

      <div className="relative h-56 w-[min(78vw,640px)]">
        <GlowOrb className="left-1/2 top-8 -translate-x-1/2" color="rgba(245,185,66,0.28)" size={420} blur={90} opacity={0.5} />

        {/* Oil body */}
        <div className="absolute inset-x-0 bottom-0 h-40 overflow-hidden rounded-[50%] border border-gold/10 bg-[radial-gradient(80%_120%_at_50%_0%,#1a140a_0%,#0a0a0c_55%,#050506_100%)] shadow-[inset_0_20px_60px_rgba(0,0,0,0.9),0_30px_80px_-20px_rgba(0,0,0,0.9)]">
          <motion.div
            aria-hidden
            animate={{ x: ["-20%", "30%", "-20%"], opacity: [0.15, 0.4, 0.15] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-1/4 top-4 h-24 w-40 rounded-[50%] bg-[radial-gradient(circle,rgba(255,212,121,0.5),transparent_70%)] blur-2xl"
          />
          <motion.div
            aria-hidden
            animate={{ x: ["20%", "-25%", "20%"], opacity: [0.1, 0.3, 0.1] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            className="absolute right-1/4 top-10 h-20 w-32 rounded-[50%] bg-[radial-gradient(circle,rgba(76,123,255,0.35),transparent_70%)] blur-2xl"
          />
        </div>

        {/* Rim light */}
        <div className="absolute inset-x-8 bottom-[9.5rem] h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
      </div>
    </motion.div>
  );
}
