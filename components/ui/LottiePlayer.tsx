"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useReducedMotion } from "@/hooks/useReducedMotion";

// lottie-react touches `window`, so it must never render on the server.
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

type LottiePlayerProps = {
  /** Path to a bodymovin JSON file served from /public. */
  src: string;
  className?: string;
  loop?: boolean;
  /** Decorative by default — hidden from the accessibility tree. */
  ariaHidden?: boolean;
};

/**
 * Tiny, resilient Lottie host. It lazy-fetches the animation JSON, renders
 * nothing until it is ready (so a missing/blocked asset can never break a
 * scene), and freezes to the first frame when the visitor prefers reduced
 * motion. Used for handcrafted vector accents that would be wasteful in WebGL.
 */
export function LottiePlayer({ src, className, loop = true, ariaHidden = true }: LottiePlayerProps) {
  const [data, setData] = useState<Record<string, unknown> | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    let alive = true;
    fetch(src)
      .then((r) => (r.ok ? r.json() : null))
      .then((json) => {
        if (alive) setData(json);
      })
      .catch(() => {
        /* asset optional — fail silently, the scene stands without it */
      });
    return () => {
      alive = false;
    };
  }, [src]);

  if (!data) return null;

  return (
    <div className={className} aria-hidden={ariaHidden}>
      <Lottie animationData={data} loop={loop && !reduced} autoplay={!reduced} />
    </div>
  );
}
