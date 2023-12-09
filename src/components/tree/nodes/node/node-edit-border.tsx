import { NODE_HEIGHT } from "@/constants";
import { preview } from "@/state";
import { type HierarchyPointNode } from "d3-hierarchy";

import { getNodeWidth } from "./helpers/get-node-width";

export const NodeEditBorder = ({
  nodeData,
}: {
  nodeData: HierarchyPointNode<unknown>;
}) => {
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
