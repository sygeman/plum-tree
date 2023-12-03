import get from "lodash.get";
import React, { useState } from "react";

import PeopleSelect from "../PeopleSelect";

export default ({ close, node, onSave, people }) => {
  const [conception, setConception] = useState(
    get(node, "data.parentType", "NONE")
  );
  const [parents, setParents] = useState(
    get(node, "data.parents", []).map((person) => ({
      label: `${person.firstName} ${person.lastName}`,
      value: person._id,
    }))
  );
  const [adoptiveParents, setAdoptiveParents] = useState(
    get(node, "data.adoptiveParents", []).map((person) => ({
      label: `${person.firstName} ${person.lastName}`,
      value: person._id,
    }))
  );

  function handleConceptionChange(event) {
    setConception(event.target.value);
  }

  function handleSaveNodeParents() {
    const newNodeData = {
      adoptiveParents: adoptiveParents.map((parent) =>
        people.find((person) => person._id === parent.value)
      ),
      parentType: conception,
      parents: parents.map((parent) =>
        people.find((person) => person._id === parent.value)
      ),
    };

    onSave(newNodeData);
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
      <h2>Persons Parents</h2>
      <p>
        You can add the details about this node persons parents. These might not
        be the people you choose to show in the tree above this node.
      </p>
      <h3>Biological Parents</h3>
      <div className="form-group">
        <label>Parents</label>
        <PeopleSelect
          defaultValues={parents}
          inputId="node-parents-select"
          onValuesChange={setParents}
          options={peopleOptions}
        />
      </div>

      <div className="form-group">
        <label>Sims Conception</label>
        <input
          checked={conception === "NONE"}
          id="parent-type-none"
          name="parentType"
          onChange={handleConceptionChange}
          type="radio"
          value="NONE"
        />
        <label className="radio" htmlFor="parent-type-none">
          <span /> WooHoo
        </label>
        <input
          checked={conception === "ABDUCTION"}
          id="parent-type-abduction"
          name="parentType"
          onChange={handleConceptionChange}
          type="radio"
          value="ABDUCTION"
        />
        <label className="radio" htmlFor="parent-type-abduction">
          <span /> Alien Abduction
        </label>
        <input
          checked={conception === "CLONE"}
          id="parent-type-clone"
          name="parentType"
          onChange={handleConceptionChange}
          type="radio"
          value="CLONE"
        />
        <label className="radio" htmlFor="parent-type-clone">
          <span /> Cloning
        </label>
      </div>

      <h3>Adoptive Parents</h3>
      <div className="form-group">
        <label>Parents</label>
        <PeopleSelect
          defaultValues={adoptiveParents}
          inputId="node-adoptive-parents-select"
          onValuesChange={setAdoptiveParents}
          options={peopleOptions}
        />
      </div>

      <button className="btn btn-default" onClick={close}>
        Cancel
      </button>
      <button
        className="btn btn-primary"
        id="save-node-parents"
        onClick={handleSaveNodeParents}
      >
        Save
      </button>
    </div>
  );
};
