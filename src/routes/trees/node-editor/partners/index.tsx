import get from "lodash.get";
import React, { useState } from "react";

import PartnerRow from "./PartnerRow";

export default ({ close, node, onSave, people }) => {
  const [partners, setPartners] = useState(get(node, "data.partners", []));

  function handleAddPartner() {
    setPartners(
      partners.concat([
        {
          people: [],
          type: "PARTNER",
        },
      ])
    );
  }

  function removePartner(index) {
    setPartners([...partners.slice(0, index), ...partners.slice(index + 1)]);
  }

  function partnerUpdated(partnerRowIndex, partner) {
    const { partners: partnerRowPartners, type } = partner;
    const newPartner = {
      people: partnerRowPartners.map((partner) =>
        people.find((person) => person._id === partner.value)
      ),
      type,
    };

    const newPartners = partners.map((originalPartner, index) =>
      index === partnerRowIndex ? newPartner : originalPartner
    );

    setPartners(newPartners);
  }

  function handleSaveNodePartners() {
    onSave({ partners });
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
      <h2>Persons Partners</h2>
      <p>Add partners by using the "Add Partner" button and selecting Sims.</p>
      <button
        className="btn btn-primary"
        id="add-node-partner"
        onClick={handleAddPartner}
      >
        <i className="icon-plus" /> Add Partner
      </button>

      {partners.map((partner, index) => {
        return (
          <PartnerRow
            index={index}
            key={index}
            onChange={partnerUpdated}
            onRemove={removePartner}
            partner={partner}
            people={peopleOptions}
          />
        );
      })}

      <button className="btn btn-default" onClick={close}>
        Cancel
      </button>
      <button
        className="btn btn-primary"
        id="save-node-partners"
        onClick={handleSaveNodePartners}
      >
        Save
      </button>
    </div>
  );
};
