import { Handle, Position } from "reactflow";

export const PersonNode = ({ data }) => {
  return (
    <div>
      <Handle position={Position.Top} type="target" />
      <div className="flex items-center p-2 bg-zinc-700 w-[200px] h-14 shrink-0 rounded-full m-1">
        <img
          className="h-10 w-10 rounded-full"
          src={`data:image/webp;base64, ${data.avatar}`}
        />
        <div className="px-2 text-sm">
          <div>{data.firstName}</div>
          <div>{data.lastName}</div>
        </div>
      </div>
      <Handle position={Position.Bottom} type="source" />
    </div>
  );
};
