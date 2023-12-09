import {
  NODE_HEIGHT,
  NODE_SMALL_AVATAR_RADIUS,
  PARTNER_PADDING,
} from "@/constants";

export function getPartnerPosition(index: number, partnerCount: number) {
  const partnerSize = NODE_SMALL_AVATAR_RADIUS * 2 + PARTNER_PADDING;
  const totalHeight = partnerCount * partnerSize;
  const heightDiff = (NODE_HEIGHT - totalHeight) / 2;
  const offset = partnerSize / 2 + heightDiff;

  const y = index * partnerSize + offset - 40;

  return { x: 80, y };
}
