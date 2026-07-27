import { team } from "@/lib/deck";
import { Slide, SlideHeader, Card, Badge } from "@/components/deck/ui";

function initials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("");
}

export function SlideTeam() {
  return (
    <Slide>
      <SlideHeader eyebrow={team.eyebrow} title={team.headline} />

      <div className="mt-auto flex flex-col gap-5">
        <div className="grid grid-cols-3 gap-5">
          {team.members.map((m) => (
            <Card key={m.name} className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-deck-paper3 font-display text-d-h3 text-deck-accentInk">
                  {initials(m.name)}
                </span>
                <div className="flex flex-col">
                  <span className="font-display text-d-h3 text-deck-ink">{m.name}</span>
                  <span className="font-mono text-d-micro uppercase tracking-[0.14em] text-deck-accentInk">
                    {m.role}
                  </span>
                </div>
              </div>
              <p className="text-d-small text-deck-ink2">{m.bio}</p>
            </Card>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <span className="text-d-small text-deck-muted">{team.advisorsLabel}</span>
          <span className="flex items-center gap-2.5">
            <Badge tone="progress">Hiring</Badge>
            <span className="text-d-small text-deck-faint">{team.editableNote}</span>
          </span>
        </div>
      </div>
    </Slide>
  );
}
