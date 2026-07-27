import { ImageResponse } from "next/og";

export const SOCIAL_ALT = "Aperture — The AI Data Intelligence Layer";
export const SOCIAL_SIZE = { width: 1200, height: 630 };
export const SOCIAL_CONTENT_TYPE = "image/png";

/**
 * Shared renderer for the Open Graph + Twitter social cards. Both route files
 * keep their own literal `runtime`/`size` exports (Next requires literals) and
 * delegate the pixels here so the artwork stays in one place.
 */
export function renderSocialCard() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background:
            "radial-gradient(120% 120% at 50% 0%, #0b1020 0%, #04060b 55%, #020308 100%)",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: 520,
            height: 520,
            borderRadius: "50%",
            border: "2px solid rgba(245,185,66,0.35)",
            boxShadow: "0 0 160px 40px rgba(245,185,66,0.18)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 320,
            height: 320,
            borderRadius: "50%",
            border: "1px solid rgba(56,225,255,0.25)",
            display: "flex",
          }}
        />
        <div
          style={{
            fontSize: 132,
            fontWeight: 800,
            letterSpacing: "-0.04em",
            color: "#f7d38a",
            display: "flex",
          }}
        >
          APERTURE
        </div>
        <div
          style={{
            marginTop: 8,
            fontSize: 34,
            color: "rgba(255,255,255,0.72)",
            letterSpacing: "0.02em",
            display: "flex",
          }}
        >
          The AI Data Intelligence Layer
        </div>
        <div
          style={{
            marginTop: 26,
            fontSize: 22,
            color: "rgba(255,255,255,0.42)",
            display: "flex",
          }}
        >
          Raw data is like crude oil. Aperture refines it into better models.
        </div>
      </div>
    ),
    { ...SOCIAL_SIZE },
  );
}
