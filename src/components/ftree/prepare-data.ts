import Dagre from "@dagrejs/dagre";
import { Edge, Node } from "reactflow";

import { Data, PartnerType, TreeNode } from "./types";

export const prepareData = (data: Data) => {
  const initialNodes = data.people.map(
    ({ avatar, firstName, id, lastName }) => ({
      data: { avatar, firstName, id, lastName },
      id,
      position: { x: 0, y: 0 },
      type: "person",
    })
  );

  const initialEdges: Edge<{ type?: PartnerType }>[] = [];

  const getEdgesFromTree = (tree: TreeNode) => {
    if (tree.partners) {
      tree.partners.forEach((partner) => {
        partner.people.map((people) => {
          initialEdges.push({
            data: {
              type: partner.type,
            },
            id: `${tree.person}-${people}`,
            source: tree.person,
            target: people,
          });
        });
      });
    }

    if (tree.children) {
      tree.children.forEach((children) => {
        initialEdges.push({
          animated: true,
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
