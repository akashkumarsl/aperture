import { solution } from "@/lib/deck";
import { Slide, SlideHeader, Card, Badge } from "@/components/deck/ui";

export function SlideSolution() {
  return (
    <Slide>
      <SlideHeader eyebrow={solution.eyebrow} title={solution.headline} />

      <div className="mt-auto flex flex-col gap-5">
        <div className="grid grid-cols-3 gap-5">
          {solution.steps.map((s, i) => (
            <Card key={s.n} accent={i === 1} className="flex flex-col gap-3">
              <span className="font-mono text-d-h3 text-deck-accentInk">{s.n}</span>
              <span className="font-display text-d-h3 text-deck-ink">{s.k}</span>
              <span className="text-d-body text-deck-ink2">{s.v}</span>
            </Card>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Badge tone="progress">Roadmap</Badge>
          <span className="text-d-small text-deck-muted">{solution.aside}</span>
        </div>
      </div>
    </Slide>
  );
}
