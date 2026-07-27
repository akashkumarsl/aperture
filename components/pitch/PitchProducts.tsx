"use client";

import { Section, Kicker, Headline, Lead, Reveal } from "@/components/pitch/ui";
import { PRODUCTS } from "@/lib/pitch";
import { cn } from "@/lib/utils";

const ACCENT: Record<string, { text: string; ring: string; chip: string }> = {
  gold: { text: "text-gold-soft", ring: "border-gold/35", chip: "border-gold/40 bg-gold/10 text-gold-soft" },
  cyan: { text: "text-aperture-cyan", ring: "border-aperture-cyan/35", chip: "border-aperture-cyan/40 bg-aperture-cyan/10 text-aperture-cyan" },
};

export function PitchProducts() {
  return (
    <Section id="pitch-products">
      <div className="max-w-2xl">
        <Reveal>
          <Kicker>{PRODUCTS.eyebrow}</Kicker>
        </Reveal>
        <Reveal delay={0.05}>
          <Headline className="mt-5">{PRODUCTS.headline}</Headline>
        </Reveal>
        <Reveal delay={0.1}>
          <Lead className="mt-6">{PRODUCTS.body}</Lead>
        </Reveal>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2">
        {PRODUCTS.items.map((p, i) => {
          const a = ACCENT[p.tone] ?? ACCENT.gold;
          return (
            <Reveal key={p.name} delay={0.06 * i}>
              <div className={cn("flex h-full flex-col rounded-2xl border bg-white/[0.04] p-6 backdrop-blur-xl md:p-7", a.ring)}>
                <div className="flex items-center justify-between gap-3">
                  <span className="font-mono text-sm text-white/40">{String(i + 1).padStart(2, "0")}</span>
                  <span className={cn("inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[11px] font-medium uppercase tracking-wider", a.chip)}>
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-current" />
                    Live in production
                  </span>
                </div>

                <h3 className={cn("mt-4 font-display text-2xl font-semibold tracking-tight", a.text)}>{p.name}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-white/80">{p.oneLiner}</p>

                <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
                    <div className="font-mono text-[10px] uppercase tracking-widest text-white/45">You give</div>
                    <div className="mt-1 text-[13px] leading-snug text-white/80">{p.input}</div>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
                    <div className="font-mono text-[10px] uppercase tracking-widest text-white/45">You get</div>
                    <div className="mt-1 text-[13px] leading-snug text-white/80">{p.output}</div>
                  </div>
                </div>

                <div className="mt-auto pt-5">
                  <div className={cn("inline-flex items-center gap-2 rounded-lg border bg-white/[0.03] px-3 py-1.5 text-[13px]", a.ring)}>
                    <svg viewBox="0 0 24 24" className={cn("h-3.5 w-3.5", a.text)} fill="none" stroke="currentColor" strokeWidth="2.4">
                      <path d="M4 13l4 4L20 5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="text-white/80">{p.proof}</span>
                  </div>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>

      <Reveal delay={0.1}>
        <div className="mt-8 flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-5 py-4">
          <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-md border border-white/15 text-[12px] text-white/60">i</span>
          <p className="text-[15px] leading-relaxed text-white/70">{PRODUCTS.note}</p>
        </div>
      </Reveal>
    </Section>
  );
}
