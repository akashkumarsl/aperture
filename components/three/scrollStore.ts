"use client";

import { useEffect } from "react";

/**
 * A tiny, allocation-free scroll store shared between the DOM and the WebGL
 * render loop. We deliberately avoid React state here: `useFrame` reads these
 * mutable refs every frame, so updating them must never trigger re-renders.
 */
export const scrollState = {
  /** Whole-page scroll progress, 0 → 1. */
  progress: 0,
  /** Continuous scene phase, 0 → 6 (one unit per act). */
  phase: 0,
  /** Normalised pointer position, -1 → 1 on each axis (for parallax). */
  pointerX: 0,
  pointerY: 0,
  /** Number of acts the story is divided into. */
  acts: 7,
};

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

/** Mount once (in CanvasStage) to keep the store in sync with the real scroll. */
export function useScrollStoreSync() {
  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const p = max > 0 ? clamp01(window.scrollY / max) : 0;
      scrollState.progress = p;
      scrollState.phase = p * (scrollState.acts - 1);
    };

    const onPointer = (e: PointerEvent) => {
      scrollState.pointerX = (e.clientX / window.innerWidth) * 2 - 1;
      scrollState.pointerY = (e.clientY / window.innerHeight) * 2 - 1;
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    window.addEventListener("pointermove", onPointer, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("pointermove", onPointer);
    };
  }, []);
}
