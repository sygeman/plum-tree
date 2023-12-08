import { updateNode } from "@/api/tree";
import { nodeToEdit, tree } from "@/state";
import { Button } from "@mantine/core";
import get from "lodash.get";
import { useState } from "react";

import { PartnerRow } from "./partner-row";

export const Partners = ({ close }) => {
  const [partners, setPartners] = useState(
    get(nodeToEdit.value, "data.partners", [])
  );

  const people = tree.value.people;

  function handleAddPartner() {
    setPartners(partners.concat([{ people: [], type: "PARTNER" }]));
  }

  function removePartner(index) {
    setPartners([...partners.slice(0, index), ...partners.slice(index + 1)]);
  }

  function partnerUpdated(partnerRowIndex, partner) {
    const { partners: partnerRowPartners, type } = partner;
    const newPartner = {
      people: partnerRowPartners.map((partnerId) =>
        people.find((person) => person._id === partnerId)
      ),
      type,
    };

    const newPartners = partners.map((originalPartner, index) =>
      index === partnerRowIndex ? newPartner : originalPartner
    );

    setPartners(newPartners);
  }

  function handleSaveNodePartners() {
    updateNode({ partners });
    close();
  }

  const peopleOptions = people.map((person) => {
    return {
      label: `${person.firstName} ${person.lastName}`,
      value: person._id,
    };
  });

  return (
    <div className="mt-4">
      <Button onClick={handleAddPartner} variant="default">
        Add Partner
      </Button>

      {partners.map((partner, index) => {
        return (
          <PartnerRow
            index={index}
            key={index}
            onChange={partnerUpdated}
            onRemove={() => removePartner(index)}
            partner={partner}
            people={peopleOptions}
          />
        );
      })}

      <div className="flex space-x-2 justify-end mt-4">
        <Button onClick={close} variant="default">
          Cancel
        </Button>
        <Button onClick={handleSaveNodePartners} variant="default">
          Save
        </Button>
      </div>
    </div>
  );
};
