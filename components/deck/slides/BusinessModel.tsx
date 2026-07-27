import { businessModel } from "@/lib/deck";
import { Slide, SlideHeader, SoftCard, Hairline } from "@/components/deck/ui";

export function SlideBusinessModel() {
  return (
    <Slide>
      <SlideHeader eyebrow={businessModel.eyebrow} title={businessModel.headline} />

      <div className="mt-auto grid grid-cols-[1.5fr_1fr] gap-8">
        <div className="flex flex-col gap-5">
          {businessModel.lines.map((l, i) => (
            <div key={l.k} className="flex flex-col gap-5">
              {i > 0 ? <Hairline /> : null}
              <div className="grid grid-cols-[130px_1fr] items-baseline gap-5">
                <span className="font-mono text-d-micro uppercase tracking-[0.16em] text-deck-accentInk">
                  {l.k}
                </span>
                <span className="text-d-body text-deck-ink2">{l.v}</span>
              </div>
            </div>
          ))}
        </div>

        <SoftCard className="flex flex-col justify-center gap-5">
          {businessModel.econ.map((e) => (
            <div key={e.k} className="flex items-baseline justify-between gap-4">
              <span className="text-d-small text-deck-ink2">{e.k}</span>
              <span className="font-display text-d-h3 text-deck-ink">{e.v}</span>
            </div>
          ))}
        </SoftCard>
      </div>

      <div className="mt-6 rounded-xl bg-deck-ink px-6 py-4">
        <p className="text-d-body" style={{ color: "#ffffff" }}>
          {businessModel.moatLine}
        </p>
      </div>
    </Slide>
  );
}
