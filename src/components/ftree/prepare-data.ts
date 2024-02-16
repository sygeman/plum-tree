import Dagre from "@dagrejs/dagre";
import { Edge, Node } from "reactflow";

import { flatData } from "./flat-data";
import { Data, PartnerType, TreeNode } from "./types";

export const prepareData = (data: Data) => {
  const people = flatData(data);

  const initialEdges: Edge<{ type?: PartnerType }>[] = [];

  const initialNodes = Array.from(people, ([, p]) => p)
    .filter(({ childen, parents }) => childen.size + parents.size)
    .map((data) => ({
      data,
      id: data.id,
      position: { x: 0, y: 0 },
      type: "person",
    }));

  const getEdgesFromTree = (tree: TreeNode) => {
    if (tree.children) {
      tree.children.forEach((children) => {
        initialEdges.push({
          // animated: true,
          data: {},
          id: `${tree.person}-${children.person}`,
          source: tree.person,
          target: children.person,
        });

        getEdgesFromTree(children);
      });
    }
  };

  getEdgesFromTree(data.tree);

  const g = new Dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));

  const getLayoutedElements = (nodes: Node[], edges: Edge[]) => {
    g.setGraph({
      edgesep: 200,
      height: 28,
      marginx: 200,
      marginy: 200,
      nodesep: 200,
      rankdir: "TB",
      ranksep: 200,
      width: 200,
    });

    edges.forEach((edge) => g.setEdge(edge.source, edge.target));
    nodes.forEach((node) => g.setNode(node.id, node));

    Dagre.layout(g);

    return {
      edges,
      nodes: nodes.map((node) => {
        const { x, y } = g.node(node.id);

        return { ...node, position: { x, y } };
      }),
    };
  };

  const { edges, nodes } = getLayoutedElements(initialNodes, initialEdges);

  return { edges, nodes };
};
