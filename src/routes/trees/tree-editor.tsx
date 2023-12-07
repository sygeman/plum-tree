import { getTree } from "@/api/tree";
import { useState } from "react";
import { useParams } from "react-router-dom";

import { NodeEditor } from "./node-editor";
import { Tree } from "./tree";

export const TreeEditor = () => {
  const { treeId } = useParams();
  const [tree, setTree] = useState(getTree(treeId));
  const [people, setPeople] = useState(getTree(treeId).people);
  const [readonly, setReadonly] = useState(false);
  const [nodeToEdit, setNodeToEdit] = useState(null);

  function saveTree(tree) {
    setTree(tree);
  }

  return (
    <div>
      <Tree
        onChange={saveTree}
        onEditNode={setNodeToEdit}
        people={people}
        readonly={readonly}
        tree={tree}
      />
      {nodeToEdit && (
        <NodeEditor
          close={() => setNodeToEdit(null)}
          node={nodeToEdit}
          onChange={saveTree}
          people={people}
          tree={tree}
        />
      )}
    </div>
  );
};
