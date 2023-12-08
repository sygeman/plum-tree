import { nodeToEdit, tree } from "@/state";

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

export const updateNode = (newNodeData) => {
  // create a record of the child indexes in the tree to get to the node we
  // want delete
  let parentNode = nodeToEdit.value;
  const childIndexes = [];
  while (parentNode.parent) {
    // determine the current nodes index in the parent nodes children
    childIndexes.unshift(parentNode.parent.children.indexOf(parentNode));

    // move on to next parent node
    parentNode = parentNode.parent;
  }

  // Use the child indexes to delete the node to the tree
  const newTree = JSON.parse(JSON.stringify(tree.value)); // deep clone of the tree
  let currentNode = newTree.data;
  for (let i = 0; i < childIndexes.length; i++) {
    const index = childIndexes[i];
    currentNode = currentNode.children[index];
  }

  currentNode = Object.assign(currentNode, newNodeData);
  nodeToEdit.value = Object.assign({}, nodeToEdit.value, { data: currentNode });
  tree.value = newTree;
};

export const deleteNode = () => {
  // create a record of the child indexes in the tree to get to the node we
  // want delete
  let parentNode = nodeToEdit.value;
  const childIndexes = [];
  while (parentNode.parent) {
    // determine the current nodes index in the parent nodes children
    childIndexes.unshift(parentNode.parent.children.indexOf(parentNode));

    // move on to next parent node
    parentNode = parentNode.parent;
  }

  // Use the child indexes to delete the node to the tree
  const newTree = JSON.parse(JSON.stringify(tree.value)); // deep clone of the tree
  let currentNode = newTree.data;
  for (let i = 0; i < childIndexes.length; i++) {
    const index = childIndexes[i];

    // if the last node in child indexes we delete it
    if (i === childIndexes.length - 1) {
      currentNode.children.splice(index, 1);
      break;
    }
    // otherwise keep moving through the nodes
    currentNode = currentNode.children[index];
  }

  tree.value = newTree;
  nodeToEdit.value = null;
};
