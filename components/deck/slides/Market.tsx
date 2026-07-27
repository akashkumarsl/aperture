import { market } from "@/lib/deck";
import { Slide, SlideHeader } from "@/components/deck/ui";

const WIDTHS = ["100%", "80%", "60%"];

export function SlideMarket() {
  return (
    <Slide>
      <SlideHeader eyebrow={market.eyebrow} title={market.headline} />

      <div className="mt-auto flex flex-col gap-4">
        {market.tiers.map((t, i) => (
          <div
            key={t.label}
            style={{ width: WIDTHS[i] }}
            className="flex items-center gap-7 rounded-2xl border border-deck-line bg-deck-paper2 px-7 py-5"
          >
            <div className="w-[190px] shrink-0">
              <div className="font-mono text-d-micro uppercase tracking-[0.16em] text-deck-accentInk">
                {t.label}
              </div>
              <div className="mt-1 font-display text-d-h2 leading-none text-deck-ink">
                {t.value}
              </div>
            </div>
            <div className="text-d-small text-deck-ink2">{t.basis}</div>
          </div>
        ))}
        <p className="mt-1 max-w-[820px] text-d-small text-deck-muted">{market.note}</p>
      </div>
    </Slide>
  );
}
