"use client";

import { Section, Kicker, Headline, Reveal } from "@/components/pitch/ui";
import { HOW_STEPS, HOW_TAGLINE } from "@/lib/pitch";
import { cn } from "@/lib/utils";

const PRICE_STYLE: Record<string, string> = {
  free: "border-aperture-teal/40 bg-aperture-teal/10 text-aperture-teal",
  payg: "border-aperture-cyan/40 bg-aperture-cyan/10 text-aperture-cyan",
  ship: "border-gold/40 bg-gold/10 text-gold-soft",
};

export function PitchHowItWorks() {
  return (
    <Section id="pitch-how">
      <div className="max-w-2xl">
        <Reveal>
          <Kicker>The product, and the price</Kicker>
        </Reveal>
        <Reveal delay={0.05}>
          <Headline className="mt-5">Three steps. You only pay for what ships.</Headline>
        </Reveal>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">
        {HOW_STEPS.map((s, i) => (
          <Reveal key={s.n} delay={0.06 * i}>
            <div className="group relative flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.045] p-6 backdrop-blur-xl transition-colors hover:border-white/20 md:p-7">
              <div className="flex items-center justify-between">
                <span className="font-mono text-sm text-white/40">{s.n}</span>
                <span className={cn("rounded-full border px-3 py-1 font-mono text-[11px] font-medium uppercase tracking-wider", PRICE_STYLE[s.priceTone])}>
                  {s.price}
                </span>
              </div>

              <h3 className="mt-4 font-display text-2xl font-semibold tracking-tight text-white">{s.title}</h3>
              <span
                className={cn(
                  "mt-2 inline-flex w-fit items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider",
                  s.status === "live"
                    ? "border-gold/40 bg-gold/10 text-gold-soft"
                    : "border-aperture-cyan/40 bg-aperture-cyan/10 text-aperture-cyan",
                )}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-current" />
                {s.status === "live" ? "Live today" : "Private beta"}
              </span>

              <div className="mt-4 space-y-3 text-[15px] leading-relaxed">
                <p className="text-white/80">
                  <span className="mr-1.5 font-mono text-[11px] uppercase tracking-widest text-white/40">You</span>
                  {s.action}
                </p>
                <p className="text-white/65">
                  <span className="mr-1.5 font-mono text-[11px] uppercase tracking-widest text-gold/60">Aperture</span>
                  {s.outcome}
                </p>
              </div>

              <div className="mt-auto pt-6">
                <div className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[13px] text-white/75">
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-aperture-teal" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <path d="M12 6v6l4 2" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="12" cy="12" r="9" />
                  </svg>
                  {s.time}
                </div>
              </div>

              {/* connector arrow between cards on desktop */}
              {i < HOW_STEPS.length - 1 && (
                <div className="absolute -right-3 top-1/2 z-10 hidden h-6 w-6 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-void text-white/50 md:grid">
                  →
                </div>
              )}
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1}>
        <div className="mt-10 flex items-center gap-4 rounded-2xl border border-gold/20 bg-gradient-to-r from-gold/[0.08] to-transparent px-6 py-5">
          <span className="hidden h-10 w-10 shrink-0 place-items-center rounded-xl border border-gold/30 bg-gold/10 text-gold-soft sm:grid">⌘</span>
          <p className="text-[15px] font-medium leading-relaxed text-white/85 md:text-lg">{HOW_TAGLINE}</p>
        </div>
      </Reveal>
    </Section>
  );
}
