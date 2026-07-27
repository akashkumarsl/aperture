import { productRoadmap } from "@/lib/deck";
import { Slide, SlideHeader, Card, Badge } from "@/components/deck/ui";

export function SlideProductRoadmap() {
  return (
    <Slide>
      <SlideHeader
        eyebrow={productRoadmap.eyebrow}
        title={productRoadmap.headline}
        lead={productRoadmap.lead}
      />

      <div className="mt-auto flex flex-col gap-5">
        <div className="grid grid-cols-3 gap-5">
          {productRoadmap.items.map((it, i) => {
            const inProgress = it.status === "IN PROGRESS";
            return (
              <Card key={it.k} accent={inProgress} className="flex flex-col gap-3">
                <Badge tone={inProgress ? "progress" : "planned"}>{it.status}</Badge>
                <span className="font-display text-d-h3 text-deck-ink">{it.k}</span>
                <span className="text-d-body text-deck-ink2">{it.v}</span>
              </Card>
            );
          })}
        </div>
        <p className="text-d-small font-mono uppercase tracking-[0.12em] text-deck-accentInk">
          {productRoadmap.honesty}
        </p>
      </div>
    </Slide>
  );
}
