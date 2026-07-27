"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Central GSAP configuration.
 * ScrollTrigger is registered once and re-used across every scene so that
 * pinning, scrubbing and camera timelines stay in sync with the Lenis scroller.
 */
let registered = false;

export function registerGsap() {
  if (registered || typeof window === "undefined") return { gsap, ScrollTrigger };
  gsap.registerPlugin(ScrollTrigger);

  // High-performance defaults tuned for buttery, ~120fps scrubbing.
  ScrollTrigger.config({
    ignoreMobileResize: true,
    autoRefreshEvents: "visibilitychange,DOMContentLoaded,load",
  });

  gsap.defaults({ ease: "power3.out", duration: 1 });
  registered = true;
  return { gsap, ScrollTrigger };
}

export { gsap, ScrollTrigger };
