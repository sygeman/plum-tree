import get from "lodash.get";

import { PartnerType } from "./partner-type";
import { Person } from "./person";

export const Partner = ({ partnerData, partners, transform }) => (
  <g transform={transform}>
    <PartnerType type={partnerData.type} />

    {partnerData.people.map((person, index) => (
      <Person
        id={get(person, "_id")}
        key={index}
        small={partners.length > 1 || index > 0}
        transform={`translate(${index * 35},0)`}
      />
    ))}
  </g>
);
