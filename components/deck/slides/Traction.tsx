import { traction } from "@/lib/deck";
import { Slide, SlideHeader, Stat, Hairline } from "@/components/deck/ui";

const barColor: Record<string, string> = {
  done: "bg-deck-pos",
  progress: "bg-deck-accent",
  planned: "bg-deck-faint",
};
const tagColor: Record<string, string> = {
  done: "text-deck-pos",
  progress: "text-deck-accentInk",
  planned: "text-deck-faint",
};
const tagWord: Record<string, string> = {
  done: "Built",
  progress: "Building",
  planned: "Next",
};

export function SlideTraction() {
  return (
    <Slide>
      <SlideHeader eyebrow={traction.eyebrow} title={traction.headline} />

      <div className="mt-7 grid grid-cols-4 gap-6">
        {traction.kpis.map((k) => (
          <Stat key={k.k} value={k.v} label={k.k} sub={k.sub} size="h2" />
        ))}
      </div>

      <Hairline className="my-6" />

      <div className="flex flex-1 flex-col">
        <span className="mb-5 font-mono text-d-micro uppercase tracking-[0.14em] text-deck-muted">
          {traction.progressLabel}
        </span>
        <div className="flex flex-col gap-5">
          {traction.progress.map((p) => (
            <div key={p.k} className="flex items-center gap-5">
              <span className="w-[300px] shrink-0 text-d-body text-deck-ink">{p.k}</span>
              <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-deck-paper3">
                <div
                  className={"h-full rounded-full " + barColor[p.state]}
                  style={{ width: `${p.pct}%` }}
                />
              </div>
              <span
                className={
                  "w-[86px] shrink-0 text-right font-mono text-d-micro uppercase tracking-[0.12em] " +
                  tagColor[p.state]
                }
              >
                {tagWord[p.state]}
              </span>
            </div>
          ))}
        </div>
      </div>

      <p className="mt-6 text-d-small text-deck-muted">{traction.note}</p>
    </Slide>
  );
}
