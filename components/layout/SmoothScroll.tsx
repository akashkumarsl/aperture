"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { gsap, registerGsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * SmoothScroll wires Lenis inertial scrolling into the GSAP ticker so that
 * ScrollTrigger scrubbing, pinning and the 3D camera timeline all advance on a
 * single synchronised clock. This is the backbone of the "cinematic" feel.
 *
 * When the visitor prefers reduced motion we skip Lenis entirely and fall back
 * to native scrolling — animations still fire, just without the inertia.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    registerGsap();

    if (reduced) {
      ScrollTrigger.refresh();
      return;
    }

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.4,
      lerp: 0.09,
    });
    lenisRef.current = lenis;
    if (typeof window !== "undefined") {
      // dev/QA aid: drive scroll precisely for screenshots/recording
      (window as unknown as { __lenis?: Lenis }).__lenis = lenis;
    }

    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Expose an anchor-scroll helper for the navbar / CTAs.
    const onAnchor = (e: Event) => {
      const target = e as CustomEvent<{ id: string }>;
      const el = document.getElementById(target.detail.id);
      if (el) lenis.scrollTo(el, { offset: 0, duration: 1.4 });
    };
    window.addEventListener("aperture:scrollTo", onAnchor as EventListener);

    ScrollTrigger.refresh();

    return () => {
      window.removeEventListener("aperture:scrollTo", onAnchor as EventListener);
      gsap.ticker.remove(raf);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [reduced]);

  return <>{children}</>;
}

/** Fire a smooth scroll to a section id from anywhere in the tree. */
export function scrollToSection(id: string) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("aperture:scrollTo", { detail: { id } }));
}
