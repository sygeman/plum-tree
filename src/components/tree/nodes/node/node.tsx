import { NodeData } from "@/types";

import { AddNodeButton } from "./add-node";
import { EditNodeButton } from "./edit-node";
import { nodePosition } from "./helpers/node-position";
import { NodeEditBorder } from "./node-edit-border";
import { Partners } from "./partners";
import { Person } from "./person";

type Props = {
  nodeData: NodeData;
};

export const Node = ({ nodeData }: Props) => {
  const { x, y } = nodePosition(nodeData);

  return (
    <g transform={`translate(${x},${y})`}>
      <NodeEditBorder nodeData={nodeData} />
      <Person id={nodeData.data.person} />
      <Partners nodeData={nodeData} />
      <AddNodeButton nodeData={nodeData} />
      <EditNodeButton nodeData={nodeData} />
    </g>
  );
};
