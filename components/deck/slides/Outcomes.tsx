import { outcomes } from "@/lib/deck";
import { Slide, SlideHeader, Card, Badge } from "@/components/deck/ui";

export function SlideOutcomes() {
  return (
    <Slide>
      <SlideHeader eyebrow={outcomes.eyebrow} title={outcomes.headline} lead={outcomes.context} />

      <div className="mt-auto flex flex-col gap-5">
        <div className="grid grid-cols-3 gap-5">
          {outcomes.stats.map((s) => (
            <Card key={s.k} className="flex flex-col gap-3">
              <span className="font-mono text-d-micro uppercase tracking-[0.14em] text-deck-muted">
                {s.k}
              </span>
              <div className="flex items-baseline gap-3">
                <span className="font-display text-d-h3 text-deck-faint line-through">
                  {s.from}
                </span>
                <span className="font-mono text-d-small text-deck-accentInk">→</span>
                <span className="font-display text-d-h1 leading-none text-deck-ink">{s.to}</span>
              </div>
              <span className="text-d-small text-deck-pos">{s.note}</span>
            </Card>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Badge tone="neutral">{outcomes.badge}</Badge>
          <span className="text-d-small text-deck-muted">{outcomes.caveat}</span>
        </div>
      </div>
    </Slide>
  );
}
