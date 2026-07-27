"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { useCinemaMode } from "@/hooks/useCinemaMode";
import { SCENES } from "@/lib/content";
import { cn } from "@/lib/utils";

/**
 * A top-edge progress meter plus a right-rail scene indicator.
 * Both are driven by the document scroll and give the visitor a constant sense
 * of place within the seven-act story. Both hide in cinema mode so screen
 * recordings stay completely clean.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  const [active, setActive] = useState(0);
  const cinema = useCinemaMode();

  useEffect(() => {
    return scrollYProgress.on("change", (v) => {
      setActive(Math.min(SCENES.length - 1, Math.floor(v * SCENES.length)));
    });
  }, [scrollYProgress]);

  return (
    <>
      <motion.div
        aria-hidden
        style={{ scaleX }}
        className={cn(
          "fixed left-0 top-0 z-[70] h-[2px] w-full origin-left bg-gradient-to-r from-gold via-aperture-cyan to-aperture-violet transition-opacity duration-500",
          cinema ? "opacity-0" : "opacity-100",
        )}
      />

      <nav
        aria-label="Scene progress"
        aria-hidden={cinema}
        className={cn(
          "fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-end gap-4 transition-opacity duration-500 md:flex",
          cinema ? "pointer-events-none opacity-0" : "opacity-100",
        )}
      >
        {SCENES.map((s, i) => (
          <div key={s.id} className="group flex items-center gap-3">
            <span
              className={`whitespace-nowrap text-[10px] uppercase tracking-cinematic transition-all duration-500 ${
                i === active ? "text-white/80 opacity-100" : "text-white/40 opacity-0 group-hover:opacity-100"
              }`}
            >
              {s.label}
            </span>
            <span
              className={`h-[6px] w-[6px] rounded-full transition-all duration-500 ${
                i === active
                  ? "scale-150 bg-gold shadow-glow-gold"
                  : "bg-white/25 group-hover:bg-white/50"
              }`}
            />
          </div>
        ))}
      </nav>
    </>
  );
}
