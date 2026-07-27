"use client";

import dynamic from "next/dynamic";

/**
 * WebGL is client-only, so we lazy-load the stage with SSR disabled. Until the
 * canvas hydrates we paint a matching radial gradient so there is never a flash
 * of empty black — the transition into 3D is seamless.
 */
const CanvasStage = dynamic(
  () => import("./CanvasStage").then((m) => m.CanvasStage),
  {
    ssr: false,
    loading: () => (
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(120%_100%_at_50%_35%,#0b0f1a_0%,#04060b_60%)]" />
        <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/20 blur-[120px]" />
      </div>
    ),
  },
);

export function BackgroundScene() {
  return <CanvasStage />;
}
