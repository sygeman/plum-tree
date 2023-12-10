import { NodeData } from "@/types";

import { getPartnerPosition } from "./helpers/get-partner-position";
import { Partner } from "./partner";

type Props = {
  nodeData: NodeData;
};

export const Partners = ({ nodeData }: Props) => {
  const partners = nodeData.data.partners || [];

  return (
    <>
      {partners.map((partnerData, index, partners) => {
        const position = getPartnerPosition(index, partners.length);
        return (
          <Partner
            key={index}
            partnerData={partnerData}
            partners={partners}
            transform={`translate(${position.x},${position.y})`}
          />
        );
      })}
    </>
  );
};
