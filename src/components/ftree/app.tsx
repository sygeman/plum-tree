import ReactFlow, { Controls } from "reactflow";

import dataJson from "./data.json";
import { PersonNode } from "./person";
import { prepareData } from "./prepare-data";
import { Data } from "./types";

const data = dataJson as Data;

const nodeTypes = { person: PersonNode };
const { edges, nodes } = prepareData(data);

export const App = () => {
  return (
    <div className="insert-0 h-full w-full absolute">
      <ReactFlow edges={edges} fitView nodeTypes={nodeTypes} nodes={nodes}>
        <Controls className="bg-white" showInteractive={false} />
      </ReactFlow>
    </div>
  );
};
