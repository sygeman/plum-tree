import { tree } from "@/state";
import { type HierarchyPointNode } from "d3-hierarchy";
import get from "lodash.get";

import { AddNodeButton } from "./add-node";
import { EditNodeButton } from "./edit-node";
import { nodePosition } from "./helpers/node-position";
import { NodeEditBorder } from "./node-edit-border";
import { Partners } from "./partners";
import { Person } from "./person";

type Props = {
  nodeData: HierarchyPointNode<unknown>;
};

export const Node = ({ nodeData }: Props) => {
  const { x, y } = nodePosition(nodeData);

  const people = tree.value.people;
  const personData = people.find(
    (p) => p._id === get(nodeData, "data.person._id")
  );

  return (
    <g className="node" transform={`translate(${x},${y})`}>
      <NodeEditBorder nodeData={nodeData} />
      <Person nodeData={nodeData} personData={personData} />
      <Partners nodeData={nodeData} />
      <AddNodeButton nodeData={nodeData} />
      <EditNodeButton nodeData={nodeData} />
    </g>
  );
};
