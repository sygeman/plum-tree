import { NavLink } from "@mantine/core";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import { useState } from "react";

import { Parents } from "./parents";
import { Partners } from "./partners";
import { Person } from "./person";

export const NodeEditor = ({ close, node, onChange, tree }) => {
  const people = tree.people;

  const [currentView, setCurrentView] = useState(null);
  const [editingNode, setEditingNode] = useState(node);

  function updateNode(newNodeData) {
    // create a record of the child indexes in the tree to get to the node we
    // want delete
    let parentNode = node;
    const childIndexes = [];
    while (parentNode.parent) {
      // determine the current nodes index in the parent nodes children
      childIndexes.unshift(parentNode.parent.children.indexOf(parentNode));

      // move on to next parent node
      parentNode = parentNode.parent;
    }

    // Use the child indexes to delete the node to the tree
    const newTree = JSON.parse(JSON.stringify(tree)); // deep clone of the tree
    let currentNode = newTree.data;
    for (let i = 0; i < childIndexes.length; i++) {
      const index = childIndexes[i];
      currentNode = currentNode.children[index];
    }

    currentNode = Object.assign(currentNode, newNodeData);
    setEditingNode(Object.assign({}, editingNode, { data: currentNode }));
    onChange(newTree);
  }

  function deleteNode() {
    const confirmDelete = confirm("Are you sure you want to delete this node?");

    if (!confirmDelete) return;

    // create a record of the child indexes in the tree to get to the node we
    // want delete
    let parentNode = node;
    const childIndexes = [];
    while (parentNode.parent) {
      // determine the current nodes index in the parent nodes children
      childIndexes.unshift(parentNode.parent.children.indexOf(parentNode));

      // move on to next parent node
      parentNode = parentNode.parent;
    }

    // Use the child indexes to delete the node to the tree
    const newTree = JSON.parse(JSON.stringify(tree)); // deep clone of the tree
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

    onChange(newTree);
    close();
  }

  return (
    <div className="px-2">
      <h1 className="text-2xl font-semibold">Edit Node</h1>
      <p className="text-zinc-500 text-sm">
        Edit a point in a tree by adding a person to a node and their partners.
      </p>

      {currentView === "person" && (
        <Person
          close={() => setCurrentView(null)}
          node={editingNode}
          onSave={updateNode}
          people={people}
        />
      )}

      {currentView === "partners" && (
        <Partners
          close={() => setCurrentView(null)}
          node={editingNode}
          onSave={updateNode}
          people={people}
        />
      )}

      {currentView === "parents" && (
        <Parents
          close={() => setCurrentView(null)}
          node={editingNode}
          onSave={updateNode}
          people={people}
        />
      )}

      {currentView === null && (
        <div className="space-y-2 mt-4">
          <NavLink
            className="rounded-xl"
            description="A node person is the Sim you'll see on the left at each point in
      the tree with their parents above, partners to the right and
      children below."
            label="Set Node Person"
            onClick={() => setCurrentView("person")}
            rightSection={<ChevronRightIcon />}
          />

          <NavLink
            className="rounded-xl"
            description="A Sim can have multiple partners current or past."
            label="Set This Nodes Partners"
            onClick={() => setCurrentView("partners")}
            rightSection={<ChevronRightIcon />}
          />

          <NavLink
            className="rounded-xl"
            description="Add extra information on how your Sim came to be and who raised
              them."
            label="Set This Nodes Parent Details"
            onClick={() => setCurrentView("parents")}
            rightSection={<ChevronRightIcon />}
          />

          <NavLink
            className="rounded-xl"
            description="Delete this node? Remember if you delete this node you will also
              delete any children attached to it too."
            label="Danger Zone"
            onClick={() => deleteNode()}
            rightSection={<ChevronRightIcon />}
          />
        </div>
      )}
    </div>
  );
};
