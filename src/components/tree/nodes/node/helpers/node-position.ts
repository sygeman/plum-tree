import { NODE_HEIGHT } from "@/constants";
import { NodeData } from "@/types";

export function nodePosition(node: NodeData) {
  let left = NODE_HEIGHT / 2;

  if (node.data.partners?.length) {
    left = NODE_HEIGHT;
  }

  return { x: node.x - left, y: node.y };
}
