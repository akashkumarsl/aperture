"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from "framer-motion";
import { ApertureMark } from "@/components/ui/ApertureMark";
import { scrollToSection } from "@/components/layout/SmoothScroll";
import { useCinemaMode } from "@/hooks/useCinemaMode";
import { NAV_LINKS } from "@/lib/content";
import { cn } from "@/lib/utils";

export function Navbar() {
  const { scrollYProgress } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const cinema = useCinemaMode();

  useMotionValueEvent(scrollYProgress, "change", (v) => setScrolled(v > 0.02));

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const go = (id: string) => {
    setMenuOpen(false);
    scrollToSection(id);
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={cinema ? { y: -100, opacity: 0 } : { y: 0, opacity: 1 }}
      transition={{ duration: cinema ? 0.5 : 1, delay: cinema ? 0 : 0.4, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4",
        cinema && "pointer-events-none",
      )}
      aria-hidden={cinema}
    >
      <div
        className={cn(
          "flex w-full max-w-6xl items-center justify-between rounded-2xl px-4 py-3 transition-all duration-500",
          scrolled ? "glass-strong shadow-glass" : "border-transparent bg-transparent",
        )}
      >
        <button
          onClick={() => go("top")}
          className="focus-ring flex items-center gap-2.5"
          aria-label="Aperture — back to top"
        >
          <ApertureMark className="h-7 w-7" />
          <span className="font-display text-fluid-base font-semibold tracking-tightest text-white">
            Aperture
          </span>
        </button>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((l) => (
            <button
              key={l.id}
              onClick={() => go(l.id)}
              className="focus-ring rounded-lg px-3 py-2 text-fluid-sm text-white/60 transition-colors hover:text-white"
            >
              {l.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={() => go("final")}
            className="focus-ring group hidden items-center gap-2 rounded-xl bg-white px-4 py-2 text-fluid-sm font-medium text-black transition-transform hover:scale-[1.03] active:scale-95 sm:flex"
          >
            Start building
            <span className="transition-transform group-hover:translate-x-0.5">→</span>
          </button>

          <button
            onClick={() => setMenuOpen((s) => !s)}
            className="focus-ring flex h-10 w-10 items-center justify-center rounded-xl glass md:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            <div className="relative h-4 w-5">
              <span
                className={cn(
                  "absolute left-0 h-[1.5px] w-5 bg-white transition-all duration-300",
                  menuOpen ? "top-1/2 rotate-45" : "top-0",
                )}
              />
              <span
                className={cn(
                  "absolute left-0 top-1/2 h-[1.5px] w-5 bg-white transition-all duration-300",
                  menuOpen ? "opacity-0" : "opacity-100",
                )}
              />
              <span
                className={cn(
                  "absolute left-0 h-[1.5px] w-5 bg-white transition-all duration-300",
                  menuOpen ? "top-1/2 -rotate-45" : "bottom-0",
                )}
              />
            </div>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 top-0 z-[-1] flex flex-col items-center justify-center gap-6 bg-void/95 backdrop-blur-2xl md:hidden"
          >
            {NAV_LINKS.map((l, i) => (
              <motion.button
                key={l.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * i + 0.1 }}
                onClick={() => go(l.id)}
                className="font-display text-fluid-lg text-white/80"
              >
                {l.label}
              </motion.button>
            ))}
            <button
              onClick={() => go("final")}
              className="mt-4 rounded-xl bg-white px-6 py-3 font-medium text-black"
            >
              Start building →
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
