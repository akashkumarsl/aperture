"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  MotionConfig,
  useReducedMotion as useFmReducedMotion,
} from "framer-motion";
import { cn } from "@/lib/utils";
import { SLIDES } from "@/lib/deck";
import { DeckAudit } from "@/components/deck/DeckAudit";

const STAGE_W = 1280;
const STAGE_H = 720;

export function DeckShell({ slides }: { slides: React.ReactNode[] }) {
  const count = slides.length;
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const [scale, setScale] = useState(1);
  const [overview, setOverview] = useState(false);
  const [chrome, setChrome] = useState(true);
  const [audit, setAudit] = useState(false);
  const [help, setHelp] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useFmReducedMotion();
  const isDev = process.env.NODE_ENV === "development";

  /* Fit the fixed 16:9 stage to the viewport (letterbox). */
  useEffect(() => {
    const fit = () => {
      const s = Math.min(window.innerWidth / STAGE_W, window.innerHeight / STAGE_H);
      setScale(s);
    };
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, []);

  const goTo = useCallback(
    (i: number, d = 1) => {
      const nextIndex = Math.max(0, Math.min(count - 1, i));
      setDir(d);
      setIndex(nextIndex);
      // Write the hash only in response to navigation so it never races the
      // initial deep-link read on mount.
      const id = SLIDES[nextIndex]?.id;
      if (id && typeof window !== "undefined") {
        history.replaceState(null, "", `#${id}`);
      }
    },
    [count],
  );
  const next = useCallback(() => goTo(index + 1, 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1, -1), [goTo, index]);

  /* Hash sync (deep-linkable + browser back/forward). */
  useEffect(() => {
    const fromHash = () => {
      const raw = window.location.hash.replace("#", "");
      if (!raw) return;
      const bySlug = SLIDES.findIndex((s) => s.id === raw);
      const n = bySlug >= 0 ? bySlug : parseInt(raw, 10) - 1;
      if (!Number.isNaN(n) && n >= 0 && n < count) setIndex(n);
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, [count]);

  /* Keyboard navigation. */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowRight":
        case "ArrowDown":
        case "PageDown":
        case " ":
          e.preventDefault();
          overview ? setOverview(false) : next();
          break;
        case "ArrowLeft":
        case "ArrowUp":
        case "PageUp":
          e.preventDefault();
          prev();
          break;
        case "Home":
          e.preventDefault();
          goTo(0, -1);
          break;
        case "End":
          e.preventDefault();
          goTo(count - 1, 1);
          break;
        case "o":
        case "O":
          setOverview((v) => !v);
          break;
        case "Escape":
          setOverview(false);
          setHelp(false);
          break;
        case "f":
        case "F":
          toggleFullscreen();
          break;
        case "h":
        case "H":
          setChrome((v) => !v);
          break;
        case "v":
        case "V":
          if (isDev) setAudit((v) => !v);
          break;
        case "?":
          setHelp((v) => !v);
          break;
        default:
          break;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev, goTo, count, overview, isDev]);

  /* Wheel to advance (trackpad/mouse), debounced. */
  const wheelLock = useRef(false);
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      if (overview) return;
      const d = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      if (Math.abs(d) < 24 || wheelLock.current) return;
      wheelLock.current = true;
      d > 0 ? next() : prev();
      window.setTimeout(() => (wheelLock.current = false), 620);
    };
    window.addEventListener("wheel", onWheel, { passive: true });
    return () => window.removeEventListener("wheel", onWheel);
  }, [next, prev, overview]);

  /* Touch swipe. */
  const touch = useRef<{ x: number; y: number } | null>(null);
  useEffect(() => {
    const start = (e: TouchEvent) => {
      touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };
    const end = (e: TouchEvent) => {
      if (!touch.current || overview) return;
      const dx = e.changedTouches[0].clientX - touch.current.x;
      const dy = e.changedTouches[0].clientY - touch.current.y;
      if (Math.abs(dx) < 44 && Math.abs(dy) < 44) return;
      (Math.abs(dx) > Math.abs(dy) ? dx < 0 : dy < 0) ? next() : prev();
      touch.current = null;
    };
    window.addEventListener("touchstart", start, { passive: true });
    window.addEventListener("touchend", end, { passive: true });
    return () => {
      window.removeEventListener("touchstart", start);
      window.removeEventListener("touchend", end);
    };
  }, [next, prev, overview]);

  function toggleFullscreen() {
    const el = document.documentElement;
    if (!document.fullscreenElement) el.requestFullscreen?.().catch(() => {});
    else document.exitFullscreen?.().catch(() => {});
  }

  const dur = prefersReduced ? 0 : 0.42;
  const variants = {
    enter: (d: number) => ({ opacity: 0, x: prefersReduced ? 0 : d * 40 }),
    center: { opacity: 1, x: 0 },
    exit: (d: number) => ({ opacity: 0, x: prefersReduced ? 0 : d * -40 }),
  };

  return (
    <div
      className="deck-scope fixed inset-0 z-[80] flex items-center justify-center overflow-hidden bg-deck-paper3"
      role="application"
      aria-label="APERTURE investor deck"
    >
      {/* Letterbox backdrop (subtle, keeps focus on the 16:9 stage). */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_0%,#ffffff_0%,#f2f1ec_60%,#e9e8e2_100%)]" />

      {/* The fixed-size stage, scaled to fit. */}
      <div
        ref={stageRef}
        className="relative shrink-0 overflow-hidden bg-deck-paper shadow-deck-lift ring-1 ring-deck-line"
        style={{
          width: STAGE_W,
          height: STAGE_H,
          transform: `scale(${scale})`,
          transformOrigin: "center center",
        }}
      >
        <MotionConfig reducedMotion={prefersReduced ? "always" : "never"}>
          <AnimatePresence custom={dir} mode="popLayout" initial={false}>
            <motion.div
              key={index}
              custom={dir}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: dur, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0"
            >
              {slides[index]}
            </motion.div>
          </AnimatePresence>
        </MotionConfig>

        {/* In-frame chrome (part of the 16:9 composition; toggle with H). */}
        {chrome ? (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10">
            <div className="flex items-center justify-between px-[76px] pb-6">
              <span className="font-mono text-d-micro uppercase tracking-[0.22em] text-deck-muted">
                {"APERTURE"}
                <span className="text-deck-faint"> · data intelligence layer</span>
              </span>
              <span className="font-mono text-d-micro tracking-[0.14em] text-deck-muted">
                {String(index + 1).padStart(2, "0")}{" "}
                <span className="text-deck-faint">/ {String(count).padStart(2, "0")}</span>
                <span className="ml-3 text-deck-faint">{SLIDES[index]?.label}</span>
              </span>
            </div>
            <div className="h-[3px] w-full bg-deck-line2">
              <div
                className="h-full bg-deck-accent transition-[width] duration-500 ease-out"
                style={{ width: `${((index + 1) / count) * 100}%` }}
              />
            </div>
          </div>
        ) : null}
      </div>

      {/* Edge click zones for presenting (invisible, don't show in capture). */}
      {!overview ? (
        <>
          <button
            aria-label="Previous slide"
            onClick={prev}
            className="absolute left-0 top-0 h-full w-[8%] cursor-w-resize opacity-0"
          />
          <button
            aria-label="Next slide"
            onClick={next}
            className="absolute right-0 top-0 h-full w-[8%] cursor-e-resize opacity-0"
          />
        </>
      ) : null}

      {/* Overview grid. */}
      <AnimatePresence>
        {overview ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: prefersReduced ? 0 : 0.25 }}
            className="absolute inset-0 z-[90] overflow-auto bg-deck-paper3/95 backdrop-blur-sm"
          >
            <div className="mx-auto max-w-[1400px] px-10 py-12">
              <div className="mb-8 flex items-center justify-between">
                <span className="font-mono text-d-eyebrow uppercase tracking-[0.18em] text-deck-accentInk">
                  Overview — {count} slides
                </span>
                <span className="font-mono text-d-micro text-deck-muted">
                  Esc to close · click to jump
                </span>
              </div>
              <MotionConfig reducedMotion="always">
                <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
                  {slides.map((node, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        goTo(i, i > index ? 1 : -1);
                        setOverview(false);
                      }}
                      className={cn(
                        "group relative aspect-[16/9] overflow-hidden rounded-lg border bg-deck-paper text-left shadow-deck-card transition",
                        i === index
                          ? "border-deck-accent ring-2 ring-deck-accent/40"
                          : "border-deck-line hover:border-deck-accent/50",
                      )}
                    >
                      <div
                        className="absolute left-0 top-0 origin-top-left"
                        style={{
                          width: STAGE_W,
                          height: STAGE_H,
                          transform: "scale(0.242)",
                        }}
                      >
                        {node}
                      </div>
                      <span className="absolute bottom-1.5 left-2 font-mono text-[10px] uppercase tracking-[0.12em] text-deck-muted">
                        {String(i + 1).padStart(2, "0")} {SLIDES[i]?.label}
                      </span>
                    </button>
                  ))}
                </div>
              </MotionConfig>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* Help / shortcuts. */}
      <AnimatePresence>
        {help ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute bottom-6 left-1/2 z-[95] -translate-x-1/2 rounded-xl border border-deck-line bg-deck-paper/95 px-5 py-3 shadow-deck-lift backdrop-blur"
          >
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-d-micro text-deck-ink2">
              <span>← → navigate</span>
              <span className="text-deck-faint">·</span>
              <span>O overview</span>
              <span className="text-deck-faint">·</span>
              <span>F fullscreen</span>
              <span className="text-deck-faint">·</span>
              <span>H hide chrome</span>
              {isDev ? (
                <>
                  <span className="text-deck-faint">·</span>
                  <span>V audit</span>
                </>
              ) : null}
              <span className="text-deck-faint">·</span>
              <span>? toggle help</span>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {isDev ? <DeckAudit active={audit} index={index} stageRef={stageRef} /> : null}
    </div>
  );
}
