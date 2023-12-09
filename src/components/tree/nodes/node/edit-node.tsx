import {
  EDIT_BUTTON_PATTERN,
  NODE_BUTTON_RADIUS,
  NODE_HEIGHT,
} from "@/constants";
import { nodeToEdit, preview } from "@/state";
import { type HierarchyPointNode } from "d3-hierarchy";

export const EditNodeButton = ({
  nodeData,
}: {
  nodeData: HierarchyPointNode<unknown>;
}) => {
  if (preview.value) return;

  return (
    <circle
      className="cursor-pointer edit-node"
      cy={NODE_HEIGHT / 2}
      fill={`url(#${EDIT_BUTTON_PATTERN})`}
      onClick={() => (nodeToEdit.value = nodeData)}
      r={NODE_BUTTON_RADIUS}
    />
  );
};
