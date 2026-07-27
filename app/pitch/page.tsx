import type { Metadata } from "next";
import { PitchBackground } from "@/components/pitch/PitchBackground";
import { PitchChrome } from "@/components/pitch/PitchChrome";
import { PitchHero } from "@/components/pitch/PitchHero";
import { PitchProblem } from "@/components/pitch/PitchProblem";
import { PitchProducts } from "@/components/pitch/PitchProducts";
import { PitchHowItWorks } from "@/components/pitch/PitchHowItWorks";
import { PitchDataFlow } from "@/components/pitch/PitchDataFlow";
import { PitchPlatform } from "@/components/pitch/PitchPlatform";
import { PitchRoadmap } from "@/components/pitch/PitchRoadmap";
import { PitchTraction } from "@/components/pitch/PitchTraction";
import { PitchMoat } from "@/components/pitch/PitchMoat";
import { PitchAdoption } from "@/components/pitch/PitchAdoption";
import { PitchCTA } from "@/components/pitch/PitchCTA";

export const metadata: Metadata = {
  title: "Aperture — Diagnose why your model fails, fix the data",
  description:
    "Aperture rebuilds the exact slice of your dataset that's failing in the field. Two engines live today — synthetic data generation and domain adaptation — with a measured +11.4 median mAP lift on validation pilots. Automated diagnosis in private beta. Pre-revenue seed.",
  alternates: { canonical: "/pitch" },
};

/**
 * The "/pitch" variant — a recording-first, product & traction-driven cut of
 * the Aperture story. Self-contained chrome, legibility-first editorial layout,
 * and the signature crude → gold data-flow animation.
 */
export default function PitchPage() {
  return (
    <>
      <PitchBackground />
      <PitchChrome />

      <div className="relative z-10">
        <PitchHero />
        <PitchProblem />
        <PitchProducts />
        <PitchHowItWorks />
        <PitchDataFlow />
        <PitchPlatform />
        <PitchRoadmap />
        <PitchTraction />
        <PitchMoat />
        <PitchAdoption />
        <PitchCTA />

        <footer className="border-t border-white/8 py-10">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 text-center md:flex-row md:px-10 md:text-left">
            <p className="text-sm text-white/55">
              Aperture — The AI Data Intelligence Layer
            </p>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/40">
              Diagnosis is free · you pay for what ships
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
