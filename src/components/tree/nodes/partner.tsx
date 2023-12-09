import get from "lodash.get";

import { PartnerType } from "./partner-type";
import { Person } from "./person";

export const Partner = ({
  partnerData,
  partners,
  people,
  showPersonDetails,
  transform,
}) => (
  <g className="partner" transform={transform}>
    <PartnerType type={partnerData.type} />

    {partnerData.people.map((person, index) => {
      const small = partners.length > 1 || index > 0;
      const personData = people.find((p) => p._id === get(person, "_id"));

      return (
        <Person
          key={index}
          personData={personData}
          showPersonDetails={showPersonDetails}
          small={small}
          transform={`translate(${index * 35},0)`}
        />
      );
    })}
  </g>
);
