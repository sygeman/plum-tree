import { treeLinks } from "@/state";
import { drawPath } from "@/utils/draw-path";

export const Links = () => (
  <>
    {treeLinks.value.map((linkData, index) => (
      <path
        className="fill-none stroke-gray-700 stroke-2"
        d={drawPath(linkData)}
        key={index}
      />
    ))}
  </>
);
