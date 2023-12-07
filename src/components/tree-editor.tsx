import { getTree } from "@/api/tree";
import { Modal, Switch } from "@mantine/core";
import { EyeOpenIcon, Pencil1Icon } from "@radix-ui/react-icons";
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
    <>
      <div className="items-center absolute space-x-2 flex top-2 left-2 z-10 backdrop-blur bg-black/30 px-4 py-2 rounded-lg text-white">
        <div>{tree?.title}</div>
        {/* <Switch
          defaultChecked={readonly}
          offLabel={<EyeOpenIcon />}
          onChange={(event) => setReadonly(event.currentTarget.checked)}
          onLabel={<Pencil1Icon />}
        /> */}
      </div>

      <Tree
        onChange={saveTree}
        onEditNode={setNodeToEdit}
        people={people}
        readonly={readonly}
        tree={tree}
      />

      <Modal
        centered
        onClose={() => setNodeToEdit(null)}
        opened={!!nodeToEdit}
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 5,
        }}
        size="xl"
        withCloseButton={false}
      >
        <NodeEditor
          close={() => setNodeToEdit(null)}
          node={nodeToEdit}
          onChange={saveTree}
          people={people}
          tree={tree}
        />
      </Modal>
    </>
  );
};
