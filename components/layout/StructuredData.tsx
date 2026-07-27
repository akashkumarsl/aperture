/**
 * JSON-LD structured data so search engines and social platforms understand
 * Aperture as a software product. Rendered as a plain script tag in the server
 * component tree.
 */
export function StructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Aperture",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Web",
    description:
      "Aperture is the AI Data Intelligence Layer. It continuously observes datasets, training runs and production feedback, reasons about the highest-impact intervention, and orchestrates specialised engines to refine data into better models.",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    publisher: { "@type": "Organization", name: "Aperture Intelligence, Inc." },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
