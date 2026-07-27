import type { Metadata, Viewport } from "next";
import { DeckShell } from "@/components/deck/DeckShell";
import { SlideTitle } from "@/components/deck/slides/Title";
import { SlideWhatWeDo } from "@/components/deck/slides/WhatWeDo";
import { SlideProblem } from "@/components/deck/slides/Problem";
import { SlideWhyNow } from "@/components/deck/slides/WhyNow";
import { SlideMarket } from "@/components/deck/slides/Market";
import { SlideSolution } from "@/components/deck/slides/Solution";
import { SlideProductLive } from "@/components/deck/slides/ProductLive";
import { SlideProductRoadmap } from "@/components/deck/slides/ProductRoadmap";
import { SlidePlatform } from "@/components/deck/slides/Platform";
import { SlideOutcomes } from "@/components/deck/slides/Outcomes";
import { SlideTraction } from "@/components/deck/slides/Traction";
import { SlideBusinessModel } from "@/components/deck/slides/BusinessModel";
import { SlidePricing } from "@/components/deck/slides/Pricing";
import { SlideCompetition } from "@/components/deck/slides/Competition";
import { SlideMoat } from "@/components/deck/slides/Moat";
import { SlideMilestones } from "@/components/deck/slides/Milestones";
import { SlideAsk } from "@/components/deck/slides/Ask";
import { SlideTeam } from "@/components/deck/slides/Team";
import { SlideClose } from "@/components/deck/slides/Close";

export const metadata: Metadata = {
  title: "APERTURE — Investor Deck",
  description:
    "The data intelligence layer for computer vision. Diagnose why a model fails, then fix the dataset that caused it. Seed deck.",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#f7f7f4",
  colorScheme: "light",
};

const slides = [
  <SlideTitle key="title" />,
  <SlideWhatWeDo key="what" />,
  <SlideProblem key="problem" />,
  <SlideWhyNow key="why-now" />,
  <SlideMarket key="market" />,
  <SlideSolution key="solution" />,
  <SlideProductLive key="product-live" />,
  <SlideProductRoadmap key="roadmap" />,
  <SlidePlatform key="platform" />,
  <SlideOutcomes key="outcomes" />,
  <SlideTraction key="traction" />,
  <SlideBusinessModel key="model" />,
  <SlidePricing key="pricing" />,
  <SlideCompetition key="competition" />,
  <SlideMoat key="moat" />,
  <SlideMilestones key="milestones" />,
  <SlideAsk key="ask" />,
  <SlideTeam key="team" />,
  <SlideClose key="close" />,
];

export default function DeckPage() {
  return <DeckShell slides={slides} />;
}
