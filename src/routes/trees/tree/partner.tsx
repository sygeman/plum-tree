import get from "lodash.get";
import React from "react";

import PartnerType from "./PartnerType";
import Person from "./Person";

export default ({
  highlightPeople,
  partnerData,
  partners,
  people,
  showPersonDetails,
  transform,
}) => {
  const nodePartners = partners;
  const partnerPeople = partnerData.people;
  const partnerType = partnerData.type;

  return (
    <g className="partner" transform={transform}>
      <PartnerType type={partnerType} />

      {partnerPeople.map((person, index) => {
        const small = nodePartners.length > 1 || index > 0;
        const personData = people.find((p) => p._id === get(person, "_id"));

        // check if we need to mute/darken the node person.
        const personId = get(personData, "_id");
        const mute =
          personId &&
          highlightPeople &&
          highlightPeople.length &&
          !highlightPeople.includes(personId);

        return (
          <Person
            key={index}
            mute={mute}
            personData={personData}
            showPersonDetails={showPersonDetails}
            small={small}
            transform={`translate(${index * 35},0)`}
          />
        );
      })}
    </g>
  );
};
