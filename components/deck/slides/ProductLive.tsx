import { productLive } from "@/lib/deck";
import { Slide, SlideHeader, Card, Badge } from "@/components/deck/ui";

export function SlideProductLive() {
  return (
    <Slide>
      <SlideHeader eyebrow={productLive.eyebrow} title={productLive.headline} />

      <div className="mt-auto flex flex-col gap-5">
        <div className="grid grid-cols-2 gap-5">
          {productLive.engines.map((e) => (
            <Card key={e.name} className="flex flex-col gap-4">
              <Badge tone="live">Live</Badge>
              <h3 className="font-display text-d-h2 text-deck-ink">{e.name}</h3>
              <p className="text-d-body text-deck-ink2">{e.what}</p>
              <div className="mt-auto flex items-start gap-3 rounded-xl bg-deck-paper2 p-4">
                <span className="mt-0.5 font-mono text-d-micro uppercase tracking-[0.14em] text-deck-pos">
                  Result
                </span>
                <span className="text-d-small text-deck-ink">{e.proof}</span>
              </div>
            </Card>
          ))}
        </div>
        <p className="text-d-small text-deck-muted">{productLive.footnote}</p>
      </div>
    </Slide>
  );
}
