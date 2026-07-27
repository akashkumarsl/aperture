import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { SiteChrome } from "@/components/layout/SiteChrome";
import { GrainOverlay } from "@/components/layout/GrainOverlay";

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const SITE = {
  name: "Aperture",
  title: "Aperture — The AI Data Intelligence Layer",
  description:
    "Raw data is like crude oil. Aperture is the AI Data Intelligence Layer that continuously observes datasets, training runs and production feedback, reasons about the highest-impact intervention, and orchestrates specialised engines to refine data into better models.",
  url: "https://aperture.ai",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: SITE.title,
    template: "%s — Aperture",
  },
  description: SITE.description,
  applicationName: SITE.name,
  keywords: [
    "AI data intelligence",
    "autonomous data engineering",
    "synthetic data",
    "domain adaptation",
    "active learning",
    "dataset optimization",
    "machine learning infrastructure",
    "data-centric AI",
  ],
  authors: [{ name: "Aperture" }],
  creator: "Aperture",
  openGraph: {
    type: "website",
    url: SITE.url,
    title: SITE.title,
    description: SITE.description,
    siteName: SITE.name,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.title,
    description: SITE.description,
    creator: "@aperture",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  category: "technology",
};

export const viewport: Viewport = {
  themeColor: "#04060b",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${display.variable} ${mono.variable}`}>
      <body className="relative min-h-screen bg-void text-white/80 selection:bg-gold/30">
        <a
          href="#refinery"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-black"
        >
          Skip to content
        </a>
        <SmoothScroll>
          <main id="top">{children}</main>
          <SiteChrome />
        </SmoothScroll>
        <GrainOverlay />
      </body>
    </html>
  );
}
