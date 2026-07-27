import { problem, metrics } from "@/lib/deck";
import { Slide, SlideHeader, Point, Hairline } from "@/components/deck/ui";

export function SlideProblem() {
  return (
    <Slide>
      <SlideHeader eyebrow={problem.eyebrow} title={problem.headline} lead={problem.lead} />

      <div className="mt-auto grid grid-cols-[1fr_auto] items-end gap-12">
        <div className="flex flex-col gap-5">
          {problem.points.map((p, i) => (
            <div key={p.k} className="flex flex-col gap-5">
              {i > 0 ? <Hairline /> : null}
              <Point k={p.k} v={p.v} />
            </div>
          ))}
        </div>

        <div className="flex w-[300px] flex-col gap-2 rounded-2xl border border-deck-line bg-deck-paper2 p-7">
          <span className="font-mono text-d-micro uppercase tracking-[0.16em] text-deck-muted">
            One failure mode, today
          </span>
          <span className="font-display text-d-display leading-none text-deck-ink">
            {metrics.manualTime}
          </span>
          <span className="text-d-small text-deck-ink2">
            of collection, cleaning &amp; hand-labeling — plus a five-figure bill.
          </span>
        </div>
      </div>
    </Slide>
  );
}
