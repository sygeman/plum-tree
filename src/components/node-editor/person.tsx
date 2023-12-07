import { Button, Select } from "@mantine/core";
import get from "lodash.get";
import { useState } from "react";

export const Person = ({ close, node, onSave, people }) => {
  const personId = get(node, "data.person._id");
  const [person, setPerson] = useState(
    people.find((person) => person._id === personId)
  );

  function selectPerson(personId) {
    setPerson(people.find((person) => person._id === personId));
  }

  function handleSaveNodePerson() {
    onSave({ person });
    close();
  }

  return (
    <div>
      <Select
        className="mt-4"
        data={people.map((person) => ({
          label: `${person.firstName} ${person.lastName}`,
          value: person._id,
        }))}
        defaultValue={person?._id}
        description="Select the primary person for this node."
        label="Node Person"
        onChange={(value) => selectPerson(value)}
        searchable
      />

      <div className="flex space-x-2 justify-end mt-4">
        <Button onClick={close} variant="default">
          Cancel
        </Button>
        <Button onClick={handleSaveNodePerson} variant="default">
          Save
        </Button>
      </div>
    </div>
  );
};
