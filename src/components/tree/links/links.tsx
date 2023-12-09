import { treeLinks } from "@/state";

import { Link } from "./link";

export const Links = () => (
  <>
    {treeLinks.value.map((linkData, index) => (
      <Link key={index} linkData={linkData} />
    ))}
  </>
);
