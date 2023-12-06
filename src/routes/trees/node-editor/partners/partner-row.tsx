import get from "lodash.get";
import React, { useEffect, useState } from "react";

import PeopleSelect from "../PeopleSelect";

export default ({ index, onChange, onRemove, partner, people }) => {
  const [type, setType] = useState(get(partner, "type", "PARTNER"));
  const [partners, setPartners] = useState(
    get(partner, "people", []).map((p) => ({
      label: `${p.firstName} ${p.lastName}`,
      value: p._id,
    }))
  );

  useEffect(() => {
    onChange(index, {
      partners,
      type,
    });
  }, [type, partners]);

  function handleTypeChange(event) {
    setType(event.target.value);
  }

  function handleRemovePartner() {
    onRemove(index);
  }

  return (
    <div className={"styles.partnerTile"}>
      <div className="form-group">
        <label>Partner Sim(s)</label>
        <PeopleSelect
          defaultValues={partners}
          inputId={`node-partner-select-${index}`}
          onValuesChange={setPartners}
          options={people}
        />
      </div>

      <div className="form-group">
        <label>Partner Type</label>
        <input
          checked={type === "PARTNER"}
          id={`partner-${index}`}
          name={`type-${index}`}
          onChange={handleTypeChange}
          type="radio"
          value="PARTNER"
        />
        <label
          className="radio"
          htmlFor={`partner-${index}`}
          id={`partner-label-${index}`}
        >
          <span /> Partner
        </label>
        <input
          checked={type === "EX_PARTNER"}
          id={`ex-partner-${index}`}
          name={`type-${index}`}
          onChange={handleTypeChange}
          type="radio"
          value="EX_PARTNER"
        />
        <label
          className="radio"
          htmlFor={`ex-partner-${index}`}
          id={`ex-partner-label-${index}`}
        >
          <span /> Ex-Partner
        </label>
        <input
          checked={type === "MARRIED"}
          id={`married-${index}`}
          name={`type-${index}`}
          onChange={handleTypeChange}
          type="radio"
          value="MARRIED"
        />
        <label
          className="radio"
          htmlFor={`married-${index}`}
          id={`married-label-${index}`}
        >
          <span /> Married
        </label>
        <input
          checked={type === "ABDUCTION"}
          id={`abduction-${index}`}
          name={`type-${index}`}
          onChange={handleTypeChange}
          type="radio"
          value="ABDUCTION"
        />
        <label
          className="radio"
          htmlFor={`abduction-${index}`}
          id={`abduction-label-${index}`}
        >
          <span /> Abduction
        </label>
      </div>
      <button className="btn btn-danger" onClick={handleRemovePartner}>
        Remove Partner
      </button>
    </div>
  );
};
