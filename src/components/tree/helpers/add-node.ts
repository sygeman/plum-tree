import { tree } from "@/state";

export const addNode = (node) => {
  const newNode = { partners: [] };

  // create a record of the child indexes in the tree to get to the node we
  // want to add a new node to
  let parentNode = node;
  const childIndexes = [];
  while (parentNode.parent) {
    // determine the current nodes index in the parent nodes children
    childIndexes.unshift(parentNode.parent.children.indexOf(parentNode));

    // move on to next parent node
    parentNode = parentNode.parent;
  }

  // Use the child indexes to add the new node to the tree
  const newTree = JSON.parse(JSON.stringify(tree.value)); // deep clone of the tree
  let currentNode = newTree.data;
  for (let i = 0; i < childIndexes.length; i++) {
    const index = childIndexes[i];
    currentNode = currentNode.children[index];
  }

  currentNode.children = currentNode.children
    ? [...currentNode.children, newNode]
    : [newNode];

  tree.value = newTree;
};
