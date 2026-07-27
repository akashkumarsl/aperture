"use client";

import { cn } from "@/lib/utils";

/**
 * The Aperture mark — a hand-built camera-iris made of six blades rotating
 * around a luminous core. Rendered as pure SVG so it stays razor-sharp at any
 * size and can animate its aperture "opening" on demand.
 */
export function ApertureMark({
  className,
  animated = true,
  open = 0.62,
}: {
  className?: string;
  animated?: boolean;
  /** 0 = closed iris, 1 = fully open. */
  open?: number;
}) {
  const blades = Array.from({ length: 6 });
  const inner = 4 + open * 10; // aperture opening radius

  return (
    <svg
      viewBox="0 0 48 48"
      className={cn("h-8 w-8", className)}
      fill="none"
      role="img"
      aria-label="Aperture"
    >
      <defs>
        <linearGradient id="ap-blade" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffd479" />
          <stop offset="55%" stopColor="#f5b942" />
          <stop offset="100%" stopColor="#38e1ff" />
        </linearGradient>
        <radialGradient id="ap-core" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="60%" stopColor="#ffd479" />
          <stop offset="100%" stopColor="rgba(245,185,66,0)" />
        </radialGradient>
      </defs>

      <g className={animated ? "origin-center [animation:spin_18s_linear_infinite]" : ""}>
        {blades.map((_, i) => {
          const angle = (i * 360) / 6;
          return (
            <path
              key={i}
              d={`M24 24 L${24 + inner} ${24 - inner * 0.35} A${inner} ${inner} 0 0 1 ${
                24 + inner * 0.35
              } ${24 + inner} Z`}
              transform={`rotate(${angle} 24 24)`}
              stroke="url(#ap-blade)"
              strokeWidth="1.4"
              strokeLinejoin="round"
              fill="rgba(245,185,66,0.06)"
            />
          );
        })}
      </g>

      <circle cx="24" cy="24" r="20" stroke="url(#ap-blade)" strokeWidth="1.4" opacity="0.7" />
      <circle cx="24" cy="24" r={inner * 0.5} fill="url(#ap-core)" />

      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </svg>
  );
}
