"use client";

import { usePathname } from "next/navigation";

/**
 * A fixed, pointer-events-free overlay that layers fine film grain and a subtle
 * scanline over the entire experience. This is the "photochemical" finish that
 * makes the dark UI read as cinematic rather than flat.
 *
 * The `/deck` route is a pristine light-theme pitch deck built to be recorded,
 * so we skip the grain there to keep the capture perfectly clean.
 */
export function GrainOverlay() {
  const pathname = usePathname();
  if (pathname && pathname.startsWith("/deck")) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[60] overflow-hidden mix-blend-soft-light"
    >
      <div className="grain-overlay absolute inset-0" />
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(255,255,255,0.6) 0px, rgba(255,255,255,0.6) 1px, transparent 1px, transparent 3px)",
        }}
      />
    </div>
  );
}
