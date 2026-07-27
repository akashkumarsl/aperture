"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { animate, motion, useMotionValue, useTransform, type AnimationPlaybackControls } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

/**
 * A cinematic before/after comparison wipe. The divider sweeps on its own like a
 * short looping clip, and responds to hover / drag so the visitor can scrub it.
 * Used to show domain adaptation — a daylight "source" domain converted into the
 * night + rain "target" domain the model must survive.
 */
export function BeforeAfter({
  beforeSrc,
  afterSrc,
  beforeAlt,
  afterAlt,
  beforeLabel = "Source domain",
  afterLabel = "Adapted domain",
  className,
  priority = false,
}: {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt: string;
  afterAlt: string;
  beforeLabel?: string;
  afterLabel?: string;
  className?: string;
  priority?: boolean;
}) {
  const reduced = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  const pos = useMotionValue(0.5);
  const controls = useRef<AnimationPlaybackControls | null>(null);

  const clip = useTransform(pos, (v) => `inset(0 0 0 ${v * 100}%)`);
  const left = useTransform(pos, (v) => `${v * 100}%`);

  const startAuto = () => {
    if (reduced) return;
    controls.current?.stop();
    controls.current = animate(pos, [0.32, 0.68, 0.32], {
      duration: 11,
      ease: "easeInOut",
      repeat: Infinity,
    });
  };

  useEffect(() => {
    if (reduced) {
      pos.set(0.5);
      return;
    }
    startAuto();
    return () => controls.current?.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced]);

  const scrub = (clientX: number) => {
    const el = wrapRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const v = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
    pos.set(v);
  };

  return (
    <div
      ref={wrapRef}
      className={cn(
        "group relative aspect-[3/2] w-full select-none overflow-hidden rounded-2xl border border-glass-line",
        className,
      )}
      onPointerEnter={() => controls.current?.stop()}
      onPointerLeave={startAuto}
      onPointerMove={(e) => scrub(e.clientX)}
      onPointerDown={(e) => {
        controls.current?.stop();
        scrub(e.clientX);
      }}
    >
      {/* Base = "before" (source domain) */}
      <Image src={beforeSrc} alt={beforeAlt} fill priority={priority} sizes="(max-width: 768px) 100vw, 640px" className="object-cover" />

      {/* Overlay = "after" (adapted domain), revealed by the wipe */}
      <motion.div style={{ clipPath: clip }} className="absolute inset-0">
        <Image src={afterSrc} alt={afterAlt} fill sizes="(max-width: 768px) 100vw, 640px" className="object-cover" />
      </motion.div>

      {/* Divider + handle */}
      <motion.div style={{ left }} className="pointer-events-none absolute inset-y-0 z-10 -translate-x-1/2">
        <div className="h-full w-px bg-gradient-to-b from-transparent via-white/80 to-transparent shadow-[0_0_18px_rgba(255,255,255,0.5)]" />
        <div className="absolute left-1/2 top-1/2 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/70 bg-black/40 backdrop-blur-md">
          <span className="text-[10px] text-white/90">⇄</span>
        </div>
      </motion.div>

      {/* Domain labels */}
      <span className="absolute bottom-3 left-3 z-10 rounded-md bg-black/55 px-2.5 py-1 font-mono text-[10px] uppercase tracking-cinematic text-white/85 backdrop-blur-sm">
        {beforeLabel}
      </span>
      <span className="absolute bottom-3 right-3 z-10 rounded-md bg-black/55 px-2.5 py-1 font-mono text-[10px] uppercase tracking-cinematic text-gold-soft backdrop-blur-sm">
        {afterLabel}
      </span>

      {/* Framing gradient for legibility */}
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/15" />
    </div>
  );
}
