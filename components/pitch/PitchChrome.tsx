"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { ApertureMark } from "@/components/ui/ApertureMark";
import { scrollToSection } from "@/components/layout/SmoothScroll";
import { useCinemaMode, toggleCinemaMode } from "@/hooks/useCinemaMode";
import { PITCH_NAV } from "@/lib/pitch";
import { cn } from "@/lib/utils";

/**
 * Minimal, recording-friendly chrome for the pitch variant:
 *   • a thin top scroll meter,
 *   • a slim glass header (brand · anchors · CTA · record toggle),
 *   • a small "clean recording" hint pill.
 * All of it disappears in cinema mode (press C) so captures stay pristine.
 */
export function PitchChrome() {
  const cinema = useCinemaMode();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  return (
    <>
      {/* top progress meter */}
      <motion.div
        aria-hidden
        style={{ scaleX }}
        className={cn(
          "fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-aperture-cyan via-gold to-gold-soft transition-opacity duration-500",
          cinema ? "opacity-0" : "opacity-100",
        )}
      />

      {/* header */}
      <motion.header
        initial={{ y: -70, opacity: 0 }}
        animate={cinema ? { y: -90, opacity: 0 } : { y: 0, opacity: 1 }}
        transition={{ duration: cinema ? 0.45 : 0.9, ease: [0.16, 1, 0.3, 1] }}
        className={cn("fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4", cinema && "pointer-events-none")}
        aria-hidden={cinema}
      >
        <div className="flex w-full max-w-6xl items-center justify-between rounded-2xl glass-strong px-4 py-2.5 shadow-glass">
          <button onClick={() => scrollToSection("pitch-top")} className="focus-ring flex items-center gap-2.5" aria-label="Aperture — back to top">
            <ApertureMark className="h-7 w-7" />
            <span className="font-display text-fluid-base font-semibold tracking-tightest text-white">Aperture</span>
            <span className="hidden rounded-md border border-white/15 bg-white/5 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-widest text-white/55 sm:inline">
              Pitch
            </span>
          </button>

          <nav className="hidden items-center gap-1 lg:flex">
            {PITCH_NAV.map((l) => (
              <button
                key={l.id}
                onClick={() => scrollToSection(l.id)}
                className="focus-ring rounded-lg px-3 py-2 text-sm text-white/65 transition-colors hover:text-white"
              >
                {l.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleCinemaMode}
              className="focus-ring hidden items-center gap-2 rounded-xl border border-white/12 bg-white/[0.04] px-3 py-2 text-xs font-medium text-white/70 transition-colors hover:text-white sm:flex"
              aria-label="Toggle clean recording mode"
              title="Hide UI for a clean recording (C)"
            >
              <span className="h-2 w-2 rounded-full bg-red-500" />
              REC
              <kbd className="rounded border border-white/20 px-1 font-mono text-[10px] text-white/60">C</kbd>
            </button>
            <button
              onClick={() => scrollToSection("pitch-cta")}
              className="focus-ring group flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-medium text-black transition-transform hover:scale-[1.03] active:scale-95"
            >
              Free diagnosis
              <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </button>
          </div>
        </div>
      </motion.header>

      {/* clean-recording hint */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={cinema ? { opacity: 0, y: 10 } : { opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: cinema ? 0 : 1.4 }}
        className={cn("fixed bottom-5 left-5 z-50 flex items-center gap-2 rounded-full glass px-3 py-1.5 text-xs text-white/60", cinema && "pointer-events-none")}
        aria-hidden={cinema}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
        Press <kbd className="rounded border border-white/20 px-1 font-mono text-[10px]">C</kbd> for a clean recording
      </motion.div>
    </>
  );
}
