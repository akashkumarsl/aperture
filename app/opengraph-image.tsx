import { renderSocialCard, SOCIAL_ALT, SOCIAL_SIZE, SOCIAL_CONTENT_TYPE } from "@/lib/og";

export const runtime = "edge";
export const alt = SOCIAL_ALT;
export const size = SOCIAL_SIZE;
export const contentType = SOCIAL_CONTENT_TYPE;

export default function OpengraphImage() {
  return renderSocialCard();
}
