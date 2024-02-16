import ReactFlow, { Background, ConnectionLineType, Controls } from "reactflow";

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
      <ReactFlow
        connectionLineType={ConnectionLineType.SmoothStep}
        connectionRadius={0}
        edges={edges}
        edgesFocusable={false}
        elementsSelectable={false}
        fitView
        nodeTypes={nodeTypes}
        nodes={nodes}
        nodesConnectable={false}
        nodesDraggable={false}
        nodesFocusable={false}
      >
        <Background className="bg-gradient-to-r from-stone-500 to-stone-700" />
        <Controls className="bg-white" showInteractive={false} />
      </ReactFlow>
    </div>
  );
};
