import { platform } from "@/lib/deck";
import { Slide, SlideHeader } from "@/components/deck/ui";

function Arrow() {
  return (
    <svg width="34" height="16" viewBox="0 0 34 16" fill="none" className="shrink-0 self-center" aria-hidden>
      <path d="M0 8H30" stroke="#c2410c" strokeWidth="1.5" />
      <path d="M27 3L32 8L27 13" stroke="#c2410c" strokeWidth="1.5" fill="none" />
    </svg>
  );
}

function ColLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="mb-3 block font-mono text-d-micro uppercase tracking-[0.16em] text-deck-muted">
      {children}
    </span>
  );
}

const dot: Record<string, string> = {
  live: "bg-deck-pos",
  progress: "bg-deck-accent",
  planned: "bg-deck-faint",
};

function Chip({ name, state }: { name: string; state: "live" | "progress" | "planned" }) {
  return (
    <div
      className={
        "flex items-center gap-2.5 rounded-lg border px-4 py-2.5 " +
        (state === "planned"
          ? "border-dashed border-deck-line bg-deck-paper"
          : "border-deck-line bg-deck-paper2")
      }
    >
      <span className={"h-2 w-2 shrink-0 rounded-full " + dot[state]} />
      <span className="text-d-small text-deck-ink">{name}</span>
    </div>
  );
}

export function SlidePlatform() {
  return (
    <Slide>
      <SlideHeader eyebrow={platform.eyebrow} title={platform.headline} />

      <div className="mt-7 flex flex-1 flex-col justify-center">
        <div className="flex items-stretch gap-4">
          {/* Signals in */}
          <div className="w-[236px]">
            <ColLabel>Signals in</ColLabel>
            <div className="flex flex-col gap-2.5">
              {platform.signals.map((s) => (
                <Chip key={s} name={s} state="live" />
              ))}
            </div>
          </div>

          <Arrow />

          {/* Reasoning layer */}
          <div className="flex-1">
            <ColLabel>Intelligence layer</ColLabel>
            <div className="flex h-[calc(100%-27px)] flex-col justify-center rounded-2xl border-2 border-dashed border-deck-accent/60 bg-deck-accentSoft p-5">
              <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-deck-accent/30 bg-deck-paper px-2.5 py-1 font-mono text-d-micro uppercase tracking-[0.14em] text-deck-accentInk">
                In progress
              </span>
              <span className="mt-3 font-display text-d-h3 text-deck-ink">
                {platform.brain.name}
              </span>
              <span className="mt-1 text-d-small text-deck-ink2">
                Reads the failure signature, picks the highest-impact engine, routes the job.
              </span>
            </div>
          </div>

          <Arrow />

          {/* Engines */}
          <div className="w-[268px]">
            <ColLabel>Engines</ColLabel>
            <div className="flex flex-col gap-2.5">
              {platform.engines.map((e) => (
                <Chip key={e.name} name={e.name} state={e.state} />
              ))}
            </div>
          </div>
        </div>

        {/* Output + legend */}
        <div className="mt-5 flex items-center justify-between gap-6 rounded-xl border border-deck-line bg-deck-paper2 px-6 py-4">
          <div className="flex items-center gap-3">
            <span className="h-2.5 w-2.5 rounded-full bg-deck-pos" />
            <span className="font-mono text-d-micro uppercase tracking-[0.14em] text-deck-pos">
              Output
            </span>
            <span className="text-d-body text-deck-ink">{platform.output}</span>
          </div>
          <span className="font-mono text-d-micro text-deck-muted">
            ↺ feedback returns to signals
          </span>
        </div>

        <div className="mt-4 flex items-center gap-6">
          {platform.legend.map((l) => (
            <span key={l.state} className="flex items-center gap-2 text-d-micro text-deck-muted">
              <span className={"h-2 w-2 rounded-full " + dot[l.state]} />
              {l.label}
            </span>
          ))}
        </div>
      </div>
    </Slide>
  );
}
