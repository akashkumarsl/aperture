import { title, company } from "@/lib/deck";
import { Slide, Eyebrow, Title, Lead, ApertureMark } from "@/components/deck/ui";

export function SlideTitle() {
  return (
    <Slide>
      <div className="flex items-start justify-between">
        <Eyebrow>{title.eyebrow}</Eyebrow>
        <span className="font-mono text-d-micro uppercase tracking-[0.22em] text-deck-muted">
          {company.stage}
        </span>
      </div>

      <div className="flex flex-1 items-center justify-between gap-10">
        <div className="max-w-[760px]">
          <Title as="h1" size="display" className="leading-[0.98]">
            {title.headline}
          </Title>
          <Lead className="mt-6 max-w-[620px]">{title.sub}</Lead>
        </div>
        <ApertureMark size={208} className="shrink-0 opacity-90" />
      </div>

      <div className="flex items-center gap-4 font-mono text-d-micro uppercase tracking-[0.16em] text-deck-muted">
        {title.footer.map((f, i) => (
          <span key={f} className="flex items-center gap-4">
            {i > 0 ? <span className="text-deck-faint">·</span> : null}
            <span>{f}</span>
          </span>
        ))}
      </div>
    </Slide>
  );
}
