"use client";

import { ApertureMark } from "@/components/ui/ApertureMark";
import { scrollToSection } from "@/components/layout/SmoothScroll";
import { NAV_LINKS } from "@/lib/content";

const COLUMNS = [
  {
    title: "Platform",
    links: ["Reasoning Engine", "Synthetic Data", "Domain Adaptation", "Active Learning"],
  },
  {
    title: "Company",
    links: ["Manifesto", "Research", "Careers", "Press"],
  },
  {
    title: "Developers",
    links: ["Documentation", "API Reference", "Changelog", "Status"],
  },
];

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-glass-line bg-void-800/60 px-6 py-16 backdrop-blur-xl">
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div>
          <div className="flex items-center gap-2.5">
            <ApertureMark className="h-8 w-8" />
            <span className="font-display text-fluid-lg font-semibold text-white">Aperture</span>
          </div>
          <p className="mt-4 max-w-xs text-fluid-sm leading-relaxed text-white/65">
            The AI Data Intelligence Layer. Understanding how AI learns — not just generating data.
          </p>
          <button
            onClick={() => scrollToSection("final")}
            className="focus-ring mt-6 inline-flex items-center gap-2 rounded-xl border border-glass-line px-4 py-2 text-fluid-sm text-white/80 transition-colors hover:bg-white/5"
          >
            Build better AI <span aria-hidden>→</span>
          </button>
        </div>

        {COLUMNS.map((col) => (
          <div key={col.title}>
            <h4 className="text-[11px] uppercase tracking-cinematic text-white/55">{col.title}</h4>
            <ul className="mt-4 space-y-3">
              {col.links.map((link) => {
                const match = NAV_LINKS.find((n) => n.label === link);
                return (
                  <li key={link}>
                    <button
                      onClick={() => match && scrollToSection(match.id)}
                      className="focus-ring text-fluid-sm text-white/65 transition-colors hover:text-white"
                    >
                      {link}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      <div className="mx-auto mt-14 flex max-w-6xl flex-col items-center justify-between gap-4 border-t border-glass-line pt-6 text-fluid-sm text-white/55 sm:flex-row">
        <p>© {new Date().getFullYear()} Aperture Intelligence, Inc. All rights reserved.</p>
        <p className="font-mono text-[11px] uppercase tracking-widest">
          Observe · Diagnose · Reason · Execute · Learn
        </p>
      </div>
    </footer>
  );
}
