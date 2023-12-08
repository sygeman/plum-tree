import { tree as d3Tree, hierarchy } from "d3-hierarchy";

import { TREE_DEPTH } from "../constants";
/**
 * Takes the tree data and generates the links and nodes data followed by
 * setting those in the component state. Called when new props for tree data
 * are received.
 * @param  {Object} tree The tree data
 * @return {void}
 */
export const updateTreeState = (tree, setNodes, setLinks) => {
  // setup tree data
  const root = hierarchy(tree);

  // declares a tree layout
  const treeMap = d3Tree()
    .nodeSize([200, 80])
    .separation((a, b) => (a.parent === b.parent ? 1 : 1.2));
  const treeData = treeMap(root);

  // compute the tree layout nodes and links
  const nodes = treeData.descendants();

  // overwrite the height increase for each node depth/generation
  nodes.forEach(function (d) {
    d.y = d.depth * TREE_DEPTH;
  });

  // get link data (from nodes minus the root node)
  const links = nodes.slice(1);

  // set state data for our tree to render
  setNodes(nodes);
  setLinks(links);
};
