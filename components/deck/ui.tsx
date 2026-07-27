import { cn } from "@/lib/utils";

/**
 * Light-theme deck primitives for /deck. Everything is built ONLY from the
 * scoped design tokens (deck.* colors, d-* type scale). Slides compose these,
 * so the type scale, palette and spacing stay consistent by construction —
 * this is the first line of the "no AI slop" defense. The DeckAudit overlay is
 * the second (it verifies the rendered DOM against the same contract).
 */

/* ── Slide frame ──────────────────────────────────────────────────────── */
export function Slide({
  children,
  className,
  pad = true,
}: {
  children: React.ReactNode;
  className?: string;
  pad?: boolean;
}) {
  return (
    <div
      className={cn(
        "absolute inset-0 flex flex-col bg-deck-paper",
        pad && "px-[76px] pt-[58px] pb-[80px]",
        className,
      )}
    >
      {children}
    </div>
  );
}

/* ── Eyebrow / kicker (mono, accent tick) ─────────────────────────────── */
export function Eyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5 font-mono text-d-eyebrow uppercase text-deck-accentInk",
        className,
      )}
    >
      <span className="h-px w-6 bg-deck-accent" aria-hidden />
      {children}
    </span>
  );
}

/* ── Titles ───────────────────────────────────────────────────────────── */
type TitleSize = "display" | "h1" | "h2" | "h3";
const titleSize: Record<TitleSize, string> = {
  display: "text-d-display",
  h1: "text-d-h1",
  h2: "text-d-h2",
  h3: "text-d-h3",
};
export function Title({
  children,
  size = "h1",
  as: Tag = "h2",
  className,
}: {
  children: React.ReactNode;
  size?: TitleSize;
  as?: "h1" | "h2" | "h3";
  className?: string;
}) {
  return (
    <Tag className={cn("font-display text-deck-ink", titleSize[size], className)}>
      {children}
    </Tag>
  );
}

/* Accent word inside a title (inline-styled so it beats the scoped heading color). */
export function Accent({ children }: { children: React.ReactNode }) {
  return <span style={{ color: "#c2410c" }}>{children}</span>;
}

export function Lead({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={cn("max-w-[760px] text-d-lead text-deck-ink2", className)}>
      {children}
    </p>
  );
}

export function Body({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={cn("text-d-body text-deck-ink2", className)}>{children}</p>
  );
}

/* ── Header block used by most slides ─────────────────────────────────── */
export function SlideHeader({
  eyebrow,
  title,
  lead,
  size = "h1",
  className,
}: {
  eyebrow: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  size?: TitleSize;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <Title size={size} className="max-w-[980px]">
        {title}
      </Title>
      {lead ? <Lead className="mt-1">{lead}</Lead> : null}
    </div>
  );
}

/* ── Cards & panels ───────────────────────────────────────────────────── */
export function Card({
  children,
  className,
  accent = false,
}: {
  children: React.ReactNode;
  className?: string;
  accent?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative rounded-2xl border bg-deck-paper p-6 shadow-deck-card",
        accent ? "border-deck-accent/40 ring-1 ring-deck-accent/20" : "border-deck-line",
        className,
      )}
    >
      {accent ? (
        <span
          aria-hidden
          className="absolute inset-x-6 top-0 h-[3px] rounded-full bg-deck-accent"
        />
      ) : null}
      {children}
    </div>
  );
}

export function SoftCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-deck-line bg-deck-paper2 p-6",
        className,
      )}
    >
      {children}
    </div>
  );
}

/* ── Badge (status pill) ──────────────────────────────────────────────── */
const badgeTone: Record<string, string> = {
  live: "bg-deck-pos/10 text-deck-pos border-deck-pos/30",
  progress: "bg-deck-accentSoft text-deck-accentInk border-deck-accent/30",
  planned: "bg-deck-paper3 text-deck-muted border-deck-line",
  neutral: "bg-deck-paper2 text-deck-ink2 border-deck-line",
};
export function Badge({
  children,
  tone = "neutral",
  className,
}: {
  children: React.ReactNode;
  tone?: "live" | "progress" | "planned" | "neutral";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-d-micro uppercase tracking-[0.14em]",
        badgeTone[tone],
        className,
      )}
    >
      {tone === "live" ? (
        <span className="h-1.5 w-1.5 rounded-full bg-deck-pos" aria-hidden />
      ) : null}
      {children}
    </span>
  );
}

/* ── Stat ─────────────────────────────────────────────────────────────── */
export function Stat({
  value,
  label,
  sub,
  size = "h1",
  className,
}: {
  value: React.ReactNode;
  label: React.ReactNode;
  sub?: React.ReactNode;
  size?: "display" | "h1" | "h2";
  className?: string;
}) {
  const s =
    size === "display" ? "text-d-display" : size === "h2" ? "text-d-h2" : "text-d-h1";
  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <span className={cn("font-display leading-none text-deck-ink", s)}>{value}</span>
      <span className="font-mono text-d-micro uppercase tracking-[0.14em] text-deck-muted">
        {label}
      </span>
      {sub ? <span className="text-d-small text-deck-pos">{sub}</span> : null}
    </div>
  );
}

/* ── Labeled point (term + description) ───────────────────────────────── */
export function Point({
  k,
  v,
  className,
}: {
  k: React.ReactNode;
  v: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <span className="text-d-h3 font-display text-deck-ink">{k}</span>
      <span className="text-d-body text-deck-ink2">{v}</span>
    </div>
  );
}

/* ── Hairline divider ─────────────────────────────────────────────────── */
export function Hairline({ className }: { className?: string }) {
  return <div className={cn("h-px w-full bg-deck-line", className)} aria-hidden />;
}

/* ── Number kicker (01 / 02 / 03) ─────────────────────────────────────── */
export function StepNumber({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-mono text-d-small text-deck-accentInk">{children}</span>
  );
}

/* ── Aperture brand mark (iris) ───────────────────────────────────────── */
export function ApertureMark({
  size = 44,
  className,
}: {
  size?: number;
  className?: string;
}) {
  const R = 34;
  const pts = Array.from({ length: 6 }, (_, i) => {
    const a = (i * 60 - 90) * (Math.PI / 180);
    return [50 + R * Math.cos(a), 50 + R * Math.sin(a)];
  });
  const hex = pts.map((p) => p.join(",")).join(" ");
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      className={className}
      aria-hidden
    >
      <circle cx="50" cy="50" r="46" stroke="#0b0b0f" strokeWidth="1.5" opacity="0.18" />
      <polygon points={hex} stroke="#c2410c" strokeWidth="2" opacity="0.75" />
      {pts.map((p, i) => (
        <line
          key={i}
          x1={p[0]}
          y1={p[1]}
          x2={pts[(i + 2) % 6][0]}
          y2={pts[(i + 2) % 6][1]}
          stroke="#0b0b0f"
          strokeWidth="1"
          opacity="0.12"
        />
      ))}
      <circle cx="50" cy="50" r="8" fill="#ff5a1f" />
    </svg>
  );
}
