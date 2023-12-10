import { NODE_HEIGHT } from "@/constants";
import { NodeData } from "@/types";

export function getNodeWidth(node: NodeData) {
  return node.data.partners?.length ? NODE_HEIGHT * 2 : NODE_HEIGHT;
}
