import { pricing } from "@/lib/deck";
import { Slide, SlideHeader, Card, Hairline } from "@/components/deck/ui";

export function SlidePricing() {
  return (
    <Slide>
      <SlideHeader eyebrow={pricing.eyebrow} title={pricing.headline} />

      <div className="mt-auto flex flex-col gap-5">
        <div className="grid grid-cols-3 gap-5">
          {pricing.tiers.map((t) => (
            <Card key={t.name} accent={t.accent} className="flex flex-col gap-4">
              <span className="font-mono text-d-micro uppercase tracking-[0.16em] text-deck-muted">
                {t.name}
              </span>
              <div className="flex items-baseline gap-2">
                <span className="font-display text-d-h2 leading-none text-deck-ink">
                  {t.price}
                </span>
                <span className="text-d-small text-deck-muted">{t.unit}</span>
              </div>
              <Hairline />
              <ul className="flex flex-col gap-2">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-d-small text-deck-ink2">
                    <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-deck-accent" />
                    {f}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
        <p className="text-d-small text-deck-muted">{pricing.note}</p>
      </div>
    </Slide>
  );
}
