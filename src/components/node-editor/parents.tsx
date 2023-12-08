import { updateNode } from "@/api/tree";
import { nodeToEdit, tree } from "@/state";
import { Button, Group, MultiSelect, Radio } from "@mantine/core";
import get from "lodash.get";
import { useState } from "react";

export const Parents = ({ close }) => {
  const people = tree.value.people;

  const [conception, setConception] = useState(
    get(nodeToEdit.value, "data.parentType", "NONE")
  );
  const [parents, setParents] = useState(
    get(nodeToEdit.value, "data.parents", []).map((person) => person._id)
  );
  const [adoptiveParents, setAdoptiveParents] = useState(
    get(nodeToEdit.value, "data.adoptiveParents", []).map(
      (person) => person._id
    )
  );

  function handleSaveNodeParents() {
    const newNodeData = {
      adoptiveParents: adoptiveParents.map((parentId) =>
        people.find((person) => person._id === parentId)
      ),
      parentType: conception,
      parents: parents.map((parentId) =>
        people.find((person) => person._id === parentId)
      ),
    };

    updateNode(newNodeData);
    close();
  }

  const peopleOptions = people.map((person) => {
    return {
      label: `${person.firstName} ${person.lastName}`,
      value: person._id,
    };
  });

  return (
    <div>
      <h2 className="mt-4 text-lg">Persons Parents</h2>
      <p className="text-zinc-500 mb-4 text-sm">
        You can add the details about this node persons parents. These might not
        be the people you choose to show in the tree above this node.
      </p>

      <MultiSelect
        data={peopleOptions}
        label="Biological Parents"
        onChange={setParents}
        value={parents}
      />

      <Radio.Group
        className="my-4"
        label="Sims Conception"
        onChange={setConception}
        value={conception}
      >
        <Group>
          <Radio label="WooHoo" value="NONE" />
          <Radio label="Alien Abduction" value="ABDUCTION" />
          <Radio label="Cloning" value="CLONE" />
        </Group>
      </Radio.Group>

      <MultiSelect
        data={peopleOptions}
        label="Adoptive Parents"
        onChange={setAdoptiveParents}
        value={adoptiveParents}
      />

      <div className="flex space-x-2 justify-end mt-4">
        <Button onClick={close} variant="default">
          Cancel
        </Button>
        <Button onClick={handleSaveNodeParents} variant="default">
          Save
        </Button>
      </div>
    </div>
  );
};
