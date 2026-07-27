"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useMotionValueEvent, type MotionValue } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { Kicker, Headline, Lead } from "@/components/pitch/ui";
import { FLOW, CSV_ROWS } from "@/lib/pitch";
import { IMAGERY } from "@/lib/content";
import { cn } from "@/lib/utils";

/* ================================================================
 * Signature scroll piece: a barrel of crude data is ingested,
 * diagnosed, refined and poured out as a gold-grade dataset.
 * RGB tiles drift in; an annotation CSV corrects itself in place.
 * Everything is scrubbed by scroll so it can be recorded frame-perfect.
 * ================================================================ */

const PHASES = FLOW.phases;

/** A number that interpolates over a scroll window and formats itself. */
function FlowNumber({
  p,
  from,
  to,
  target,
  suffix = "",
  decimals = 0,
}: {
  p: MotionValue<number>;
  from: number;
  to: number;
  target: number;
  suffix?: string;
  decimals?: number;
}) {
  const mv = useTransform(p, [from, to], [0, target], { clamp: true });
  const [n, setN] = useState(0);
  useMotionValueEvent(mv, "change", (v) => setN(v));
  const formatted =
    decimals > 0 ? n.toFixed(decimals) : Math.round(n).toLocaleString("en-US");
  return (
    <span className="tabular-nums">
      {formatted}
      {suffix}
    </span>
  );
}

/** A floating RGB frame that streams in, gets flagged, then refined. */
function FlowTile({
  p,
  img,
  alt,
  side,
  style,
  win,
  synth = false,
}: {
  p: MotionValue<number>;
  img: string;
  alt: string;
  side: "l" | "r";
  style: React.CSSProperties;
  win: [number, number];
  synth?: boolean;
}) {
  const opacity = useTransform(p, [win[0], win[1]], [0, synth ? 1 : 0.92], { clamp: true });
  const x = useTransform(p, [win[0], win[1]], [side === "l" ? -70 : 70, 0], { clamp: true });
  const scale = useTransform(p, [win[0], win[1]], [synth ? 0.5 : 0.8, 1], { clamp: true });
  // impurity fleck: appears during diagnose, gone after refine (non-synth only)
  const fleck = useTransform(p, [0.28, 0.34, 0.62, 0.7], [0, 1, 1, 0], { clamp: true });
  // gold ring after refinement
  const ring = useTransform(p, [0.6, 0.74], [0, 1], { clamp: true });

  return (
    <motion.div style={{ opacity, x, scale, ...style }} className="pointer-events-none absolute w-20 md:w-28">
      <div className="relative aspect-[3/2] overflow-hidden rounded-lg border border-white/15 shadow-[0_12px_30px_-10px_rgba(0,0,0,0.7)]">
        <Image src={img} alt={alt} fill sizes="120px" className="object-cover" />
        {!synth && (
          <motion.span style={{ opacity: fleck }} className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500 shadow-[0_0_8px_2px_rgba(239,68,68,0.7)]" />
        )}
        <motion.span style={{ opacity: ring }} className="absolute inset-0 rounded-lg ring-2 ring-inset ring-gold/70" />
        {synth && (
          <span className="absolute bottom-1 left-1 rounded bg-gold/90 px-1 font-mono text-[8px] font-bold uppercase text-black">
            + syn
          </span>
        )}
      </div>
    </motion.div>
  );
}

/** One CSV annotation row that cross-fades from raw → refined. */
function CsvRow({ p, row, index }: { p: MotionValue<number>; row: (typeof CSV_ROWS)[number]; index: number }) {
  const start = 0.04 + index * 0.03;
  const reveal = useTransform(p, [start, start + 0.08], [0, 1], { clamp: true });
  const rawOpacity = useTransform(p, [0.52, 0.6], [1, 0], { clamp: true });
  const refinedOpacity = useTransform(p, [0.56, 0.66], [0, 1], { clamp: true });
  const flagOpacity = useTransform(p, [0.3, 0.36, 0.56, 0.62], [0, 1, 1, 0], { clamp: true });
  const y = useTransform(p, [start, start + 0.08], [8, 0], { clamp: true });

  return (
    <motion.div style={{ opacity: reveal, y }} className="relative grid grid-cols-[1fr_auto] items-center gap-2 border-b border-white/6 py-1.5 font-mono text-[11px] md:text-[12px]">
      <span className="truncate text-white/70">{row.file}</span>
      <div className="relative h-4 w-[164px] md:w-[188px] text-right">
        {/* raw */}
        <motion.span style={{ opacity: rawOpacity }} className={cn("absolute inset-0 flex items-center justify-end gap-2", row.raw.bad ? "text-red-400" : "text-white/60")}>
          <span>{row.raw.cls}</span>
          <span className="text-white/40">{row.raw.conf.toFixed(2)}</span>
          <span className="text-white/35">{row.raw.box}</span>
        </motion.span>
        {/* refined */}
        <motion.span style={{ opacity: refinedOpacity }} className="absolute inset-0 flex items-center justify-end gap-2 text-aperture-teal">
          <span>{row.refined.cls}</span>
          <span className="text-aperture-teal/80">{row.refined.conf.toFixed(2)}</span>
          <span className="text-white/45">{row.refined.box}</span>
          {row.refined.added && <span className="rounded bg-gold/90 px-1 text-[8px] font-bold uppercase text-black">new</span>}
        </motion.span>
      </div>
      <motion.span style={{ opacity: flagOpacity }} className="pointer-events-none absolute -left-3 top-1/2 -translate-y-1/2 text-red-500">•</motion.span>
    </motion.div>
  );
}

/** The vessel: liquid rises and shifts crude → amber → gold with scroll. */
function Vessel({ p }: { p: MotionValue<number> }) {
  const fill = useTransform(p, [0.03, 0.85], [14, 82], { clamp: true });
  const crudeOpacity = useTransform(p, [0.5, 0.72], [1, 0], { clamp: true });
  const goldOpacity = useTransform(p, [0.54, 0.82], [0, 1], { clamp: true });
  const scanY = useTransform(p, [0.27, 0.5], ["-6%", "104%"]);
  const scanOpacity = useTransform(p, [0.26, 0.28, 0.49, 0.51], [0, 1, 1, 0], { clamp: true });
  const pourOpacity = useTransform(p, [0.82, 0.9], [0, 1], { clamp: true });

  return (
    <div className="relative h-[340px] w-[150px] md:h-[400px] md:w-[176px]">
      {/* bottle neck */}
      <div className="absolute -top-4 left-1/2 h-5 w-12 -translate-x-1/2 rounded-t-md border border-white/18 border-b-0 bg-white/[0.04]" />
      {/* vessel body */}
      <div className="absolute inset-0 overflow-hidden rounded-[26px] border border-white/18 bg-white/[0.03] backdrop-blur-sm">
        {/* empty glass interior */}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(0,0,0,0.28))]" />
        {/* actual liquid, masked by fill height */}
        <motion.div className="absolute inset-x-0 bottom-0 overflow-hidden" style={{ height: useTransform(fill, (v) => `${v}%`) }}>
          <div className="absolute inset-0 bg-[linear-gradient(180deg,#b9791c,#6a4610)]" />
          <motion.div style={{ opacity: crudeOpacity }} className="absolute inset-0 bg-[linear-gradient(180deg,#1a150d,#050506)]" />
          <motion.div style={{ opacity: goldOpacity }} className="absolute inset-0 bg-[linear-gradient(180deg,#ffe08a,#f5b942_55%,#c8871a)]" />
          {/* surface highlight */}
          <div className="absolute inset-x-0 top-0 h-2 bg-white/30 blur-[1px]" />
        </motion.div>

        {/* diagnose scan line */}
        <motion.div style={{ y: scanY, opacity: scanOpacity }} className="absolute inset-x-0 top-0 h-8 bg-[linear-gradient(180deg,transparent,rgba(56,225,255,0.5),transparent)]" />

        {/* glass sheen */}
        <div className="pointer-events-none absolute inset-y-3 left-3 w-4 rounded-full bg-white/10 blur-[2px]" />
      </div>

      {/* spout pour of gold at the end */}
      <motion.div style={{ opacity: pourOpacity }} className="absolute -bottom-8 left-1/2 h-10 w-1.5 -translate-x-1/2 rounded-full bg-[linear-gradient(180deg,#ffd479,transparent)]" />
    </div>
  );
}

export function PitchDataFlow() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [phase, setPhase] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const next = v < 0.26 ? 0 : v < 0.5 ? 1 : v < 0.8 ? 2 : 3;
    setPhase(next);
  });

  // Static fallback for reduced motion — no pin, just the story stated plainly.
  if (reduced) {
    return (
      <section id="pitch-flow" className="relative w-full py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-6 md:px-10">
          <Kicker>{FLOW.eyebrow}</Kicker>
          <Headline className="mt-5">{FLOW.headline}</Headline>
          <Lead className="mt-6">{FLOW.body}</Lead>
          <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4">
            {PHASES.map((ph) => (
              <div key={ph.key} className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
                <div className="font-display text-lg font-semibold text-white">{ph.title}</div>
                <div className="mt-1 text-[13px] text-white/60">{ph.note}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="pitch-flow" ref={ref} className="relative w-full" style={{ height: "360vh" }}>
      <div className="sticky top-0 flex h-screen w-full flex-col overflow-hidden">
        {/* heading */}
        <div className="mx-auto w-full max-w-6xl px-6 pt-24 md:px-10 md:pt-28">
          <Kicker>{FLOW.eyebrow}</Kicker>
          <h2 className="mt-4 font-display text-[clamp(1.7rem,1.2rem+2vw,3rem)] font-semibold leading-[1.05] tracking-tightest text-white">
            {FLOW.headline}
          </h2>
        </div>

        {/* phase chips */}
        <div className="mx-auto mt-6 flex w-full max-w-6xl items-center gap-2 px-6 md:px-10">
          {PHASES.map((ph, i) => (
            <div key={ph.key} className="flex flex-1 items-center gap-2">
              <div
                className={cn(
                  "flex w-full flex-col rounded-lg border px-3 py-2 transition-colors duration-500",
                  i === phase
                    ? "border-gold/50 bg-gold/10"
                    : i < phase
                      ? "border-aperture-teal/30 bg-aperture-teal/5"
                      : "border-white/10 bg-white/[0.02]",
                )}
              >
                <span className={cn("font-mono text-[10px] uppercase tracking-widest", i === phase ? "text-gold-soft" : i < phase ? "text-aperture-teal" : "text-white/40")}>
                  {String(i + 1).padStart(2, "0")} · {ph.title}
                </span>
                <span className="mt-0.5 hidden text-[11px] text-white/55 md:block">{ph.note}</span>
              </div>
            </div>
          ))}
        </div>

        {/* stage */}
        <div className="relative mx-auto grid w-full max-w-6xl flex-1 grid-cols-1 items-center gap-8 px-6 md:grid-cols-[0.9fr_1.1fr] md:px-10">
          {/* left: vessel + counters + tiles */}
          <div className="relative flex h-full items-center justify-center">
            {/* floating RGB tiles */}
            <FlowTile p={scrollYProgress} img={IMAGERY.streetDay} alt="daylight street frame" side="l" win={[0.02, 0.12]} style={{ left: "2%", top: "14%" }} />
            <FlowTile p={scrollYProgress} img={IMAGERY.streetNight} alt="night street frame" side="r" win={[0.06, 0.16]} style={{ right: "2%", top: "10%" }} />
            <FlowTile p={scrollYProgress} img={IMAGERY.parkDusk} alt="dusk park frame" side="l" win={[0.1, 0.2]} style={{ left: "2%", bottom: "20%" }} />
            <FlowTile p={scrollYProgress} img={IMAGERY.streetNight} alt="synthesised night frame" side="l" win={[0.55, 0.66]} style={{ left: "6%", top: "44%" }} synth />
            <FlowTile p={scrollYProgress} img={IMAGERY.streetDay} alt="synthesised rain frame" side="r" win={[0.6, 0.72]} style={{ right: "4%", bottom: "16%" }} synth />

            <div className="z-10 flex flex-col items-center">
              <Vessel p={scrollYProgress} />
              <motion.div
                className="mt-10 text-center font-mono text-[11px] uppercase tracking-[0.24em]"
                animate={{ color: phase >= 3 ? "#ffd479" : phase >= 2 ? "#ffcf87" : "#9aa3b4" }}
              >
                {phase === 0 ? "Raw data · crude" : phase === 1 ? "Diagnosing" : phase === 2 ? "Refining" : "Gold dataset"}
              </motion.div>
            </div>
          </div>

          {/* right: annotation CSV + live counters */}
          <div className="z-10">
            <div className="rounded-2xl border border-white/12 bg-void-800/85 p-4 backdrop-blur-xl md:p-5">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/70">annotations.csv</span>
                <span className="font-mono text-[11px] text-white/45">file · class · conf · bbox</span>
              </div>
              <div className="mt-1">
                {CSV_ROWS.map((row, i) => (
                  <CsvRow key={row.file} p={scrollYProgress} row={row} index={i} />
                ))}
              </div>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-3">
              <div className="rounded-xl border border-white/10 bg-white/[0.04] p-3">
                <div className="font-display text-xl font-semibold text-aperture-cyan md:text-2xl">
                  <FlowNumber p={scrollYProgress} from={0.02} to={0.5} target={12480} />
                </div>
                <div className="mt-1 text-[11px] leading-snug text-white/60">frames ingested</div>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/[0.04] p-3">
                <div className="font-display text-xl font-semibold text-gold-soft md:text-2xl">
                  <FlowNumber p={scrollYProgress} from={0.5} to={0.8} target={1912} />
                </div>
                <div className="mt-1 text-[11px] leading-snug text-white/60">labels repaired</div>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/[0.04] p-3">
                <div className="font-display text-xl font-semibold text-aperture-teal md:text-2xl">
                  <FlowNumber p={scrollYProgress} from={0.8} to={0.98} target={98.6} decimals={1} suffix="%" />
                </div>
                <div className="mt-1 text-[11px] leading-snug text-white/60">dataset quality</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
