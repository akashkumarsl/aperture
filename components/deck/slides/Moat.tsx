import { moat } from "@/lib/deck";
import { Slide, SlideHeader, Point } from "@/components/deck/ui";

function LoopArrow() {
  return (
    <svg width="26" height="14" viewBox="0 0 26 14" fill="none" className="shrink-0 self-center" aria-hidden>
      <path d="M0 7H22" stroke="#c2410c" strokeWidth="1.5" />
      <path d="M19 3L24 7L19 11" stroke="#c2410c" strokeWidth="1.5" fill="none" />
    </svg>
  );
}

export function SlideMoat() {
  return (
    <Slide>
      <SlideHeader eyebrow={moat.eyebrow} title={moat.headline} lead={moat.lead} />

      <div className="mt-7 flex items-stretch gap-2">
        {moat.loop.map((node, i) => (
          <div key={node} className="flex flex-1 items-stretch gap-2">
            <div className="flex flex-1 items-center justify-center rounded-xl border border-deck-line bg-deck-paper2 px-3 py-4 text-center text-d-small text-deck-ink">
              {node}
            </div>
            {i < moat.loop.length - 1 ? <LoopArrow /> : null}
          </div>
        ))}
      </div>
      <p className="mt-3 text-center font-mono text-d-micro uppercase tracking-[0.14em] text-deck-accentInk">
        ↺ every loop enriches the map that routes the next job
      </p>

      <div className="mt-auto grid grid-cols-3 gap-6">
        {moat.points.map((p) => (
          <Point key={p.k} k={p.k} v={p.v} />
        ))}
      </div>
    </Slide>
  );
}
