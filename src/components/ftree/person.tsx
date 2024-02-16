import { Handle, Position } from "reactflow";

import { PeopleExtended } from "./types";

const getPartnerTypeSymbol = (type: string) => {
  if (type === "ABDUCTION") return "A";
  if (type === "MARRIED") return "M";
  if (type === "PARTNER") return "P";
  if (type === "EX_PARTNER") return "X";
  return "";
};

export const PersonNode = ({ data }: { data: PeopleExtended }) => {
  return (
    <div>
      <Handle position={Position.Top} type="target" />
      <div className="flex items-center justify-center p-2 bg-zinc-800/60 backdrop-blur-md w-[150px] h-24 shrink-0 rounded-full m-1">
        <img
          className="h-12 w-12 rounded-full"
          src={`data:image/webp;base64, ${data.avatar}`}
        />
        <div className="ml-1">
          {Array.from(data.partners).map(({ partner, type }) => (
            <div className="p-1 flex items-center" key={partner.id}>
              <div className="text-xs px-1 text-zinc-500 font-bold">
                {getPartnerTypeSymbol(type)}
              </div>
              <img
                className="h-8 w-8 rounded-full"
                src={`data:image/webp;base64, ${partner.avatar}`}
              />
            </div>
          ))}
        </div>
      </div>
      <Handle position={Position.Bottom} type="source" />
    </div>
  );
};
