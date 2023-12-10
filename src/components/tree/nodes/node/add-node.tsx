import { addNode } from "@/api/tree";
import {
  NODE_BUTTON_RADIUS,
  NODE_HEIGHT,
  PLUS_BUTTON_PATTERN,
} from "@/constants";
import { preview } from "@/state";
import { NodeData } from "@/types";

type Props = {
  nodeData: NodeData;
};

export const AddNodeButton = ({ nodeData }: Props) => {
  if (preview.value) return;
  const partners = nodeData.data.partners;

  return (
    <circle
      className="cursor-pointer add-node"
      cx={partners?.length ? NODE_HEIGHT : NODE_HEIGHT / 2}
      cy={NODE_HEIGHT}
      fill={`url(#${PLUS_BUTTON_PATTERN})`}
      onClick={() => addNode(nodeData)}
      r={NODE_BUTTON_RADIUS}
    />
  );
};
