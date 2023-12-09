import {
  DEFAULT_AVATAR_PATTERN,
  DEFAULT_SMALL_AVATAR_PATTERN,
  NODE_AVATAR_RADIUS,
  NODE_HEIGHT,
  NODE_SMALL_AVATAR_RADIUS,
} from "@/constants";
import { HierarchyPointNode } from "d3-hierarchy";
import get from "lodash.get";
import { v4 } from "uuid";

import { PersonLinks } from "./person-links";

type Props = {
  id?: string;
  small?: boolean;
  transform?: string;
};

export const Person = ({ id, small = false, transform = "" }: Props) => {
  const avatarRadius = small ? NODE_SMALL_AVATAR_RADIUS : NODE_AVATAR_RADIUS;
  const fillId = small ? DEFAULT_SMALL_AVATAR_PATTERN : DEFAULT_AVATAR_PATTERN;
  // const personAvatar = get(personData, "avatar", false);
  let image, links;

  // if (!get(personData, "_id", false)) return;

  // if (personAvatar) {
  //   fillId = v4();
  //   image = (
  //     <image
  //       aria-hidden="true"
  //       className="avatar-image"
  //       height={avatarRadius * 2}
  //       preserveAspectRatio="xMidYMid slice"
  //       width={avatarRadius * 2}
  //       x="0"
  //       // xlinkHref={personData.avatar}
  //       xmlnsXlink="http://www.w3.org/1999/xlink"
  //       y="0"
  //     />
  //   );
  // }

  // if (get(personData, "links.length")) {
  //   links = <PersonLinks links={personData.links} small={small} />;
  // }

  // extra node data for person details pane (main node person only)
  // const parentType = get(nodeData, "data.parentType", "NONE");
  // const parents = get(nodeData, "data.parents", []).map((parent) =>
  //   get(parent, "_id")
  // );
  // const adoptiveParents = get(nodeData, "data.adoptiveParents", []).map(
  //   (parent) => get(parent, "_id")
  // );

  return (
    <g className="person" transform={transform}>
      {/* {personAvatar && (
        <defs>
          <pattern
            className="avatar-pattern"
            height="1"
            id={fillId}
            width="1"
            x="10"
            y="10"
          >
            {image}
          </pattern>
        </defs>
      )} */}
      <circle
        className="stroke-white stroke-2 cursor-pointer"
        cx={avatarRadius + (NODE_HEIGHT - avatarRadius * 2) / 2}
        cy={avatarRadius + (NODE_HEIGHT - avatarRadius * 2) / 2}
        fill={`url(#${fillId})`}
        // onClick={() =>
        //   showPersonDetails(
        //     personData._id,
        //     parentType,
        //     parents,
        //     adoptiveParents
        //   )
        // }
        r={avatarRadius}
      />
      {links}
    </g>
  );
};
