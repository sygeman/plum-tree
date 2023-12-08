import { getTree } from "@/api/tree";
import { Modal } from "@mantine/core";
import { useState } from "react";

import { NodeEditor } from "./node-editor";
import { Toolbar } from "./toolbar";
import { Tree } from "./tree/tree";

export const TreeEditor = () => {
  const [tree, setTree] = useState(getTree());
  const [readonly, setReadonly] = useState(false);
  const [nodeToEdit, setNodeToEdit] = useState(null);

  return (
    <>
      <Tree
        onChange={setTree}
        onEditNode={setNodeToEdit}
        readonly={readonly}
        tree={tree}
      />

      <Toolbar readonly={readonly} setReadonly={setReadonly} tree={tree} />

      <Modal
        centered
        onClose={() => setNodeToEdit(null)}
        opened={!!nodeToEdit}
        overlayProps={{ backgroundOpacity: 0.55, blur: 5 }}
        size="xl"
        withCloseButton={false}
      >
        <NodeEditor
          close={() => setNodeToEdit(null)}
          node={nodeToEdit}
          onChange={setTree}
          tree={tree}
        />
      </Modal>
    </>
  );
};
