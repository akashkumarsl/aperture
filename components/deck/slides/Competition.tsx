import { competition } from "@/lib/deck";
import { Slide, SlideHeader } from "@/components/deck/ui";

function Quadrant() {
  const { axes, players } = competition;
  return (
    <div className="flex flex-col">
      <span className="mb-2 self-center font-mono text-d-micro uppercase tracking-[0.14em] text-deck-muted">
        {axes.y[0]}
      </span>
      <div className="relative h-[262px] rounded-xl border border-deck-line bg-deck-paper2">
        <div className="absolute inset-x-0 top-1/2 h-px bg-deck-line" />
        <div className="absolute inset-y-0 left-1/2 w-px bg-deck-line" />
        {players.map((p) => {
          const left = 8 + p.x * 84;
          const top = 8 + (1 - p.y) * 84;
          return (
            <div
              key={p.name}
              className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1"
              style={{ left: `${left}%`, top: `${top}%` }}
            >
              <span
                className={
                  "rounded-full " +
                  (p.us ? "h-3.5 w-3.5 bg-deck-accent ring-4 ring-deck-accent/20" : "h-2.5 w-2.5 bg-deck-ink/60")
                }
              />
              <span
                className={
                  "whitespace-nowrap text-d-micro " +
                  (p.us ? "font-mono uppercase tracking-[0.12em] text-deck-accentInk" : "text-deck-muted")
                }
              >
                {p.name}
              </span>
            </div>
          );
        })}
      </div>
      <div className="mt-2 flex items-center justify-between font-mono text-d-micro text-deck-muted">
        <span>{axes.x[0]}</span>
        <span>{axes.x[1]}</span>
      </div>
      <span className="mt-1 self-center font-mono text-d-micro uppercase tracking-[0.14em] text-deck-muted">
        {axes.y[1]}
      </span>
    </div>
  );
}

function Table() {
  const { cols, rows, footnote } = competition.table;
  return (
    <div className="flex flex-col">
      <div className="overflow-hidden rounded-xl border border-deck-line">
        <div className="grid grid-cols-[1.7fr_repeat(4,1fr)] bg-deck-paper2">
          {cols.map((c, i) => (
            <div
              key={i}
              className={
                "px-3 py-2.5 font-mono text-d-micro uppercase tracking-[0.1em] " +
                (i === 1 ? "bg-deck-accentSoft text-deck-accentInk" : "text-deck-muted")
              }
            >
              {i === 0 ? "Capability" : c}
            </div>
          ))}
        </div>
        {rows.map((r, ri) => (
          <div
            key={ri}
            className="grid grid-cols-[1.7fr_repeat(4,1fr)] border-t border-deck-line"
          >
            {r.map((cell, ci) => (
              <div
                key={ci}
                className={
                  "px-3 py-2.5 text-d-small " +
                  (ci === 0
                    ? "text-deck-ink2"
                    : ci === 1
                      ? "bg-deck-accentSoft font-medium text-deck-ink"
                      : "text-deck-muted")
                }
              >
                {cell}
              </div>
            ))}
          </div>
        ))}
      </div>
      <span className="mt-2 font-mono text-d-micro text-deck-faint">{footnote}</span>
    </div>
  );
}

export function SlideCompetition() {
  return (
    <Slide>
      <SlideHeader eyebrow={competition.eyebrow} title={competition.headline} />
      <div className="mt-6 grid flex-1 grid-cols-[1.5fr_1fr] items-center gap-10">
        <Table />
        <Quadrant />
      </div>
    </Slide>
  );
}
