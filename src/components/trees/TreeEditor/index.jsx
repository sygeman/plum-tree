import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import get from "lodash.get";
import { useParams } from "react-router-dom";
import styles from "./styles.scss";
import Toolbar from "./Toolbar";
import NodeEdit from "../NodeEditor";
import Tree from "../Tree";

import data from "../../../../data/data-641f24449a150cba09f92d5b.json";

export default () => {
  const params = useParams();
  const { treeId } = params;
  const [loading, setLoading] = useState(false);
  const [tree, setTree] = useState(data);
  const [people, setPeople] = useState(data.people);
  const [readonly, setReadonly] = useState(false);
  const [nodeToEdit, setNodeToEdit] = useState(null);

  function saveTree(tree, alertSuccess = false) {
      setTree(tree);
      toast.success("Tree saved");
  }

  return (
    <div className={styles.root}>
      <h1 className="sr-only">Tree Editor</h1>
      <Tree
        tree={tree}
        people={people}
        loading={loading}
        readonly={readonly}
        onChange={saveTree}
        onEditNode={setNodeToEdit}
      />
      <Toolbar tree={tree} saveTree={saveTree} setPreviewMode={setReadonly} />
      {nodeToEdit && (
        <NodeEdit
          people={people}
          tree={tree}
          node={nodeToEdit}
          close={() => setNodeToEdit(null)}
          onChange={saveTree}
        />
      )}
    </div>
  );
};
