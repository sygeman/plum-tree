import { deleteNode } from "@/api/tree";
import { nodeToEdit } from "@/state";
import { Modal, NavLink } from "@mantine/core";
import { useSignal } from "@preact/signals-react";
import { ChevronRightIcon } from "@radix-ui/react-icons";

import { Parents } from "./parents";
import { Partners } from "./partners";
import { Person } from "./person";

export const NodeEditor = () => {
  const currentView = useSignal<null | string>(null);
  const close = () => (currentView.value = null);

  return (
    <Modal
      centered
      onClose={() => (nodeToEdit.value = null)}
      opened={!!nodeToEdit.value}
      overlayProps={{ backgroundOpacity: 0.55, blur: 5 }}
      size="xl"
      withCloseButton={false}
    >
      <div className="px-2">
        <h1 className="text-2xl font-semibold">Edit Node</h1>
        <p className="text-zinc-500 text-sm">
          Edit a point in a tree by adding a person to a node and their
          partners.
        </p>

        {currentView.value === "person" && <Person close={close} />}
        {currentView.value === "partners" && <Partners close={close} />}
        {currentView.value === "parents" && <Parents close={close} />}

        {currentView.value === null && (
          <div className="space-y-2 mt-4">
            {[
              {
                action: () => (currentView.value = "person"),
                description: `A node person is the Sim you'll see on the left at each point in
                the tree with their parents above, partners to the right and
                children below.`,
                title: "Set Node Person",
              },
              {
                action: () => (currentView.value = "partners"),
                description: `A Sim can have multiple partners current or past.`,
                title: "Set This Nodes Partners",
              },
              {
                action: () => (currentView.value = "parents"),
                description: `Add extra information on how your Sim came to be and who raised
                them.`,
                title: "Set This Nodes Parent Details",
              },
              {
                action: () => deleteNode(),
                description: `Delete this node? Remember if you delete this node you will also
                delete any children attached to it too.`,
                title: "Danger Zone",
              },
            ].map(({ action, description, title }, index) => (
              <NavLink
                className="rounded-xl"
                description={description}
                key={index}
                label={title}
                onClick={action}
                rightSection={<ChevronRightIcon />}
              />
            ))}
          </div>
        )}
      </div>
    </Modal>
  );
};
