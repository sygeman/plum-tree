import { NODE_HEIGHT } from "@/constants";

export function nodePosition(node) {
  let left = NODE_HEIGHT / 2;

  if (node.data.partners.length > 0) {
    left = NODE_HEIGHT;
  }

  return { x: node.x - left, y: node.y };
}
