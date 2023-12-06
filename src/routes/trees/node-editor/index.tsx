import { useState } from "react";

import { Parents } from "./parents";
import { Partners } from "./partners";
import { Person } from "./person";

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
    <div className={"styles.editNodeContainer"}>
      <div className="container">
        <div
          className={"styles.closeButton"}
          id="close-node-editor"
          onClick={close}
        >
          <span>Close</span>
          <i className={"styles.close"} />
        </div>

        <h1>Edit Node</h1>
        <p>
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
          <div>
            <div className={"'styles.editNodeSection'"}>
              <h2>Set Node Person</h2>
              <p>
                A node person is the Sim you'll see on the left at each point in
                the tree with their parents above, partners to the right and
                children below.
              </p>
              <button
                className="btn btn-primary"
                id="set-node-person"
                onClick={() => setCurrentView("person")}
              >
                Set This Nodes Person <i className="icon-chevron-right" />
              </button>
            </div>

            <div className={"styles.editNodeSection"}>
              <h2>Set Node Partners</h2>
              <p>A Sim can have multiple partners current or past.</p>
              <button
                className="btn btn-primary"
                id="set-node-partners"
                onClick={() => setCurrentView("partners")}
              >
                Set This Nodes Partners <i className="icon-chevron-right" />
              </button>
            </div>

            <div className={"styles.editNodeSection"}>
              <h2>Set Node Parents</h2>
              <p>
                Add extra information on how your Sim came to be and who raised
                them.
              </p>
              <button
                className="btn btn-primary"
                id="set-node-parents"
                onClick={() => setCurrentView("parents")}
              >
                Set This Nodes Parent Details{" "}
                <i className="icon-chevron-right" />
              </button>
            </div>

            <div className={"styles.editNodeSection"}>
              <h2>Danger Zone</h2>
              <p>
                Delete this node? Remember if you delete this node you will also
                delete any children attached to it too.
              </p>
              <button
                className="btn btn-danger"
                id="delete-node"
                onClick={deleteNode}
              >
                Delete This Node
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
