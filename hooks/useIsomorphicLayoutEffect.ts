import { useEffect, useLayoutEffect } from "react";

/**
 * useLayoutEffect that safely no-ops during SSR to avoid React warnings,
 * while still running synchronously before paint on the client (critical for
 * GSAP measurements and pin setup).
 */
export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;
