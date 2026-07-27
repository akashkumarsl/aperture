import { milestones } from "@/lib/deck";
import { Slide, SlideHeader } from "@/components/deck/ui";

export function SlideMilestones() {
  return (
    <Slide>
      <SlideHeader eyebrow={milestones.eyebrow} title={milestones.headline} />

      <div className="relative mt-auto grid grid-cols-4 gap-8">
        <div className="absolute left-1 right-1 top-[7px] h-px bg-deck-line" aria-hidden />
        {milestones.items.map((it, i) => (
          <div key={it.when} className="relative flex flex-col gap-3">
            <span
              className={
                "h-3.5 w-3.5 rounded-full border-2 " +
                (i === 0
                  ? "border-deck-accent bg-deck-accent"
                  : "border-deck-accent/50 bg-deck-paper")
              }
            />
            <span className="font-mono text-d-micro uppercase tracking-[0.16em] text-deck-accentInk">
              {it.when}
            </span>
            <span className="font-display text-d-h3 leading-tight text-deck-ink">{it.k}</span>
            <span className="text-d-small text-deck-ink2">{it.v}</span>
          </div>
        ))}
      </div>
    </Slide>
  );
}
