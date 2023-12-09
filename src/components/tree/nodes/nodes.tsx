import { treeNodes } from "@/state";

import { Node } from "./node";

export const Nodes = () => (
  <>
    {treeNodes.value.map((nodeData, index) => (
      <Node key={index} nodeData={nodeData} />
    ))}
  </>
);
