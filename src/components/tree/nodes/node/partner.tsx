import { Partner as PartnerT } from "@/types";

import { PartnerType } from "./partner-type";
import { Person } from "./person";

type Props = {
  partnerData: PartnerT;
  partners: PartnerT[];
  transform: string;
};

export const Partner = ({ partnerData, partners, transform }: Props) => (
  <g transform={transform}>
    <PartnerType type={partnerData.type} />

    {partnerData.people.map((person, index) => (
      <Person
        id={person}
        key={index}
        small={partners.length > 1 || index > 0}
        transform={`translate(${index * 35},0)`}
      />
    ))}
  </g>
);
