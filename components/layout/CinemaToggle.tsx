"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useCinemaMode, toggleCinemaMode } from "@/hooks/useCinemaMode";

/**
 * A tiny, unobtrusive control to enter "cinema mode" — hiding all chrome for a
 * clean screen recording. It disappears entirely once recording mode is on
 * (press C or Esc to bring the UI back), so nothing bleeds into the capture.
 */
export function CinemaToggle() {
  const cinema = useCinemaMode();
  const [hintSeen, setHintSeen] = useState(true);

  // Show a one-time hint shortly after load so the shortcut is discoverable.
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (localStorage.getItem("aperture:cinema-hint") === "1") return;
    const t = setTimeout(() => setHintSeen(false), 2600);
    return () => clearTimeout(t);
  }, []);

  const dismissHint = () => {
    setHintSeen(true);
    try {
      localStorage.setItem("aperture:cinema-hint", "1");
    } catch {
      /* ignore */
    }
  };

  if (cinema) return null;

  return (
    <div className="fixed bottom-5 left-5 z-[60] flex items-center gap-3 print:hidden">
      <button
        onClick={() => {
          dismissHint();
          toggleCinemaMode();
        }}
        className="focus-ring group flex items-center gap-2 rounded-full glass px-3.5 py-2 text-[11px] uppercase tracking-cinematic text-white/70 transition-colors hover:text-white"
        aria-label="Hide interface for recording"
        title="Hide interface for recording (press C)"
      >
        <span className="relative flex h-3.5 w-3.5 items-center justify-center">
          <span className="absolute inset-0 rounded-full border border-white/50" />
          <span className="h-1 w-1 rounded-full bg-gold shadow-glow-gold transition-transform group-hover:scale-125" />
        </span>
        Record
        <kbd className="ml-1 rounded border border-white/20 bg-white/5 px-1 font-mono text-[9px] not-italic text-white/60">
          C
        </kbd>
      </button>

      <AnimatePresence>
        {!hintSeen && (
          <motion.span
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -8 }}
            transition={{ duration: 0.5 }}
            className="pointer-events-none whitespace-nowrap text-[11px] text-white/50"
          >
            Press&nbsp;C to hide the UI for a clean recording
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}
