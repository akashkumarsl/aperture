import { whyNow } from "@/lib/deck";
import { Slide, SlideHeader, Point } from "@/components/deck/ui";

export function SlideWhyNow() {
  return (
    <Slide>
      <SlideHeader eyebrow={whyNow.eyebrow} title={whyNow.headline} />

      <div className="mt-auto flex flex-col gap-8">
        <div className="grid grid-cols-3 gap-x-10">
          {whyNow.columns.map((c, i) => (
            <div key={c.k} className="flex flex-col gap-3">
              <span className="font-mono text-d-small text-deck-accentInk">
                {String(i + 1).padStart(2, "0")}
              </span>
              <Point k={c.k} v={c.v} />
            </div>
          ))}
        </div>

        <div className="rounded-2xl bg-deck-ink px-8 py-6">
          <p className="text-d-h3 font-display" style={{ color: "#ffffff" }}>
            {whyNow.kicker}
          </p>
        </div>
      </div>
    </Slide>
  );
}
