import { whatWeDo } from "@/lib/deck";
import { Slide, SlideHeader, Card, Point, StepNumber } from "@/components/deck/ui";

export function SlideWhatWeDo() {
  return (
    <Slide>
      <SlideHeader
        eyebrow={whatWeDo.eyebrow}
        title={whatWeDo.headline}
        lead={whatWeDo.body}
      />
      <div className="mt-auto grid grid-cols-3 gap-5">
        {whatWeDo.pillars.map((p, i) => (
          <Card key={p.k} className="flex flex-col gap-3">
            <StepNumber>{String(i + 1).padStart(2, "0")}</StepNumber>
            <Point k={p.k} v={p.v} />
          </Card>
        ))}
      </div>
    </Slide>
  );
}
