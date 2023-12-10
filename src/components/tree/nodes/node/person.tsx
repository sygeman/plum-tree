import {
  DEFAULT_AVATAR_PATTERN,
  DEFAULT_SMALL_AVATAR_PATTERN,
  NODE_AVATAR_RADIUS,
  NODE_HEIGHT,
  NODE_SMALL_AVATAR_RADIUS,
} from "@/constants";
import { tree } from "@/state";
import { useId } from "react";

type Props = {
  id?: string;
  small?: boolean;
  transform?: string;
};

export const Person = ({ id, small = false, transform = "" }: Props) => {
  const avatarRadius = small ? NODE_SMALL_AVATAR_RADIUS : NODE_AVATAR_RADIUS;
  let fillId = small ? DEFAULT_SMALL_AVATAR_PATTERN : DEFAULT_AVATAR_PATTERN;
  const avatarId = useId();

  const personData = tree.value.people.find((p) => p.id === id);

  const personAvatar = personData?.avatar;
  let image, links;

  if (!personData) return;

  if (personAvatar) {
    fillId = avatarId;
    image = (
      <image
        aria-hidden="true"
        className="avatar-image"
        height={avatarRadius * 2}
        preserveAspectRatio="xMidYMid slice"
        width={avatarRadius * 2}
        x="0"
        xlinkHref={`data:image/webp;base64, ${personAvatar}`}
        xmlnsXlink="http://www.w3.org/1999/xlink"
        y="0"
      />
    );
  }

  return (
    <g className="person" transform={transform}>
      {personAvatar && (
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
      )}
      <circle
        className="stroke-white stroke-2 cursor-pointer"
        cx={avatarRadius + (NODE_HEIGHT - avatarRadius * 2) / 2}
        cy={avatarRadius + (NODE_HEIGHT - avatarRadius * 2) / 2}
        fill={`url(#${fillId})`}
        // onClick={() => showPersonDetails(id)}
        r={avatarRadius}
      />
      {links}
    </g>
  );
};
