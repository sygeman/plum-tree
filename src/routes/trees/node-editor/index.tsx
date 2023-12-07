import { Button } from "@mantine/core";
import { useState } from "react";

import { Parents } from "./parents";
import { Partners } from "./partners";
import { Person } from "./person";

const NodeEditorBlock = ({ action, actionTitle, description, title }) => {
  return (
    <div className="py-2">
      <h2 className="text-xl font-semibold">{title}</h2>
      <p>{description}</p>
      <Button
        className="bg-green-700 text-white px-4 rounded py-1 my-2"
        onClick={action}
      >
        {actionTitle}
      </Button>
    </div>
  );
};

export const NodeEditor = ({ close, node, onChange, people = [], tree }) => {
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

    if (confirmDelete) {
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
  }

  return (
    <div className="absolute inset-0 bg-gray-800 flex flex-col items-center">
      <div className="w-[600px] p-4">
        <button
          className="absolute right-0 px-4"
          id="close-node-editor"
          onClick={close}
        >
          <span>Close</span>
        </button>

        <h1 className="text-2xl font-semibold">Edit Node</h1>
        <p className="text-gray-500">
          Edit a point in a tree by adding a person to a node and their
          partners.
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
          <div className="space-y-2 mt-4 divide-y">
            <NodeEditorBlock
              action={() => setCurrentView("person")}
              actionTitle="Set This Nodes Person"
              description="A node person is the Sim you'll see on the left at each point in
                the tree with their parents above, partners to the right and
                children below."
              title="Set Node Person"
            />

            <NodeEditorBlock
              action={() => setCurrentView("partners")}
              actionTitle="Set Node Partners"
              description="A Sim can have multiple partners current or past."
              title="Set This Nodes Partners"
            />

            <NodeEditorBlock
              action={() => setCurrentView("parents")}
              actionTitle="Set Node Parents"
              description="Add extra information on how your Sim came to be and who raised
              them."
              title="Set This Nodes Parent Details"
            />

            <NodeEditorBlock
              action={() => deleteNode()}
              actionTitle="Delete This Node"
              description="elete this node? Remember if you delete this node you will also
              delete any children attached to it too."
              title="Danger Zone"
            />
          </div>
        )}
      </div>
    </div>
  );
};
