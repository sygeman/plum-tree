import { NODE_HEIGHT } from "@/constants";

export function getNodeWidth(node) {
  return node.data.partners.length > 0 ? NODE_HEIGHT * 2 : NODE_HEIGHT;
}
