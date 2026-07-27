"use client";

import { useEffect, useState } from "react";

export type DeviceTier = "high" | "mid" | "low";

/**
 * Heuristically classifies the device into a performance tier so the 3D layer
 * can scale particle counts, pixel ratio and post-processing accordingly.
 * This is what keeps frame-times low on laptops and phones while still looking
 * cinematic on desktops.
 */
export function useDeviceTier(): DeviceTier {
  const [tier, setTier] = useState<DeviceTier>("high");

  useEffect(() => {
    const cores = navigator.hardwareConcurrency ?? 4;
    const mem = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 4;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const narrow = window.innerWidth < 768;

    let next: DeviceTier = "high";
    if (narrow || coarse || cores <= 4 || mem <= 4) next = "mid";
    if (cores <= 2 || mem <= 2) next = "low";
    setTier(next);
  }, []);

  return tier;
}
