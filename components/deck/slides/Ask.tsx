import { ask } from "@/lib/deck";
import { Slide, SlideHeader, SoftCard } from "@/components/deck/ui";

export function SlideAsk() {
  return (
    <Slide>
      <SlideHeader eyebrow={ask.eyebrow} title={ask.headline} lead={ask.lead} />

      <div className="mt-auto grid grid-cols-[1.5fr_1fr] gap-10">
        <div className="flex flex-col gap-4">
          <span className="font-mono text-d-micro uppercase tracking-[0.16em] text-deck-muted">
            Use of funds
          </span>
          {ask.use.map((u) => (
            <div key={u.k} className="flex items-center gap-4">
              <span className="w-[230px] text-d-small text-deck-ink2">{u.k}</span>
              <div className="h-2.5 flex-1 rounded-full bg-deck-paper3">
                <div
                  className="h-full rounded-full bg-deck-accent"
                  style={{ width: `${u.pct}%` }}
                />
              </div>
              <span className="w-[44px] text-right font-mono text-d-small text-deck-accentInk">
                {u.pct}%
              </span>
            </div>
          ))}
        </div>

        <SoftCard className="flex flex-col justify-center gap-5">
          {ask.targets.map((t) => (
            <div key={t.k} className="flex flex-col gap-0.5">
              <span className="font-mono text-d-micro uppercase tracking-[0.14em] text-deck-muted">
                {t.k}
              </span>
              <span className="font-display text-d-h3 text-deck-ink">{t.v}</span>
            </div>
          ))}
        </SoftCard>
      </div>
    </Slide>
  );
}
