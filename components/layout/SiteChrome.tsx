"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { CinemaToggle } from "@/components/layout/CinemaToggle";

/**
 * Global chrome for the main cinematic experience (navbar, scene rail, footer,
 * cinema toggle). The `/pitch` variant is a self-contained, recording-first
 * route with its own minimal chrome, so we hide all of this there to keep the
 * capture completely clean.
 */
export function SiteChrome() {
  const pathname = usePathname();
  if (pathname && (pathname.startsWith("/pitch") || pathname.startsWith("/deck")))
    return null;

  return (
    <>
      <ScrollProgress />
      <Navbar />
      <Footer />
      <CinemaToggle />
    </>
  );
}
