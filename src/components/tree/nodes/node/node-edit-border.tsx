import { NODE_HEIGHT } from "@/constants";
import { preview } from "@/state";
import { NodeData } from "@/types";

import { getNodeWidth } from "./helpers/get-node-width";

type Props = {
  nodeData: NodeData;
};

export const NodeEditBorder = ({ nodeData }: Props) => {
  if (preview.value) return;

  const nodeWidth = getNodeWidth(nodeData);

  return (
    <rect
      className="fill-none stroke-white stroke-2"
      height={NODE_HEIGHT}
      rx={NODE_HEIGHT / 2}
      ry={NODE_HEIGHT / 2}
      style={{ strokeDasharray: 5 }}
      width={nodeWidth}
    />
  );
};
