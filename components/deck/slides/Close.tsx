import { close } from "@/lib/deck";
import { Slide, Eyebrow, Title, Lead, ApertureMark } from "@/components/deck/ui";

export function SlideClose() {
  return (
    <Slide>
      <div className="flex items-start justify-between">
        <Eyebrow>{close.eyebrow}</Eyebrow>
        <ApertureMark size={52} />
      </div>

      <div className="flex flex-1 flex-col justify-center">
        <Title as="h1" size="display" className="max-w-[900px] leading-[0.98]">
          {close.headline}
        </Title>
        <Lead className="mt-6 max-w-[680px]">{close.sub}</Lead>

        <div className="mt-9 flex items-center gap-6">
          <a
            href={`mailto:${close.contact[0]}`}
            className="rounded-full bg-deck-ink px-7 py-3.5 font-display text-d-body transition hover:opacity-90"
            style={{ color: "#ffffff" }}
          >
            {close.ctaLabel}
          </a>
          <div className="flex items-center gap-4 font-mono text-d-small text-deck-ink2">
            {close.contact.map((c, i) => (
              <span key={c} className="flex items-center gap-4">
                {i > 0 ? <span className="text-deck-faint">·</span> : null}
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Slide>
  );
}
