import {
  DEFAULT_AVATAR_PATTERN,
  DEFAULT_SMALL_AVATAR_PATTERN,
  EDIT_BUTTON_PATTERN,
  LINK_BUTTON_PATTERN,
  NODE_AVATAR_RADIUS,
  NODE_BUTTON_RADIUS,
  NODE_SMALL_AVATAR_RADIUS,
  PLUS_BUTTON_PATTERN,
} from "@/constants";

import defaultAvatar from "/default-avatar.png";
import editIcon from "/edit.png";
import linkIcon from "/link.png";
import plusIcon from "/plus.png";

export const CommonPatterns = () => {
  return (
    <defs>
      <pattern height="1" id={LINK_BUTTON_PATTERN} width="1" x="10" y="10">
        <image
          aria-hidden="true"
          height={NODE_BUTTON_RADIUS * 2}
          preserveAspectRatio="xMidYMid slice"
          width={NODE_BUTTON_RADIUS * 2}
          x="0"
          xlinkHref={linkIcon}
          xmlnsXlink="http://www.w3.org/1999/xlink"
          y="0"
        />
      </pattern>
      <pattern height="1" id={PLUS_BUTTON_PATTERN} width="1" x="10" y="10">
        <image
          aria-hidden="true"
          height={NODE_BUTTON_RADIUS * 2}
          preserveAspectRatio="xMidYMid slice"
          width={NODE_BUTTON_RADIUS * 2}
          x="0"
          xlinkHref={plusIcon}
          xmlnsXlink="http://www.w3.org/1999/xlink"
          y="0"
        />
      </pattern>
      <pattern height="1" id={EDIT_BUTTON_PATTERN} width="1" x="10" y="10">
        <image
          aria-hidden="true"
          height={NODE_BUTTON_RADIUS * 2}
          preserveAspectRatio="xMidYMid slice"
          width={NODE_BUTTON_RADIUS * 2}
          x="0"
          xlinkHref={editIcon}
          xmlnsXlink="http://www.w3.org/1999/xlink"
          y="0"
        />
      </pattern>
      <pattern height="1" id={DEFAULT_AVATAR_PATTERN} width="1" x="10" y="10">
        <image
          aria-hidden="true"
          height={NODE_AVATAR_RADIUS * 2}
          preserveAspectRatio="xMidYMid slice"
          width={NODE_AVATAR_RADIUS * 2}
          x="0"
          xlinkHref={defaultAvatar}
          xmlnsXlink="http://www.w3.org/1999/xlink"
          y="0"
        />
      </pattern>
      <pattern
        height="1"
        id={DEFAULT_SMALL_AVATAR_PATTERN}
        width="1"
        x="10"
        y="10"
      >
        <image
          aria-hidden="true"
          height={NODE_SMALL_AVATAR_RADIUS * 2}
          preserveAspectRatio="xMidYMid slice"
          width={NODE_SMALL_AVATAR_RADIUS * 2}
          x="0"
          xlinkHref={defaultAvatar}
          xmlnsXlink="http://www.w3.org/1999/xlink"
          y="0"
        />
      </pattern>
    </defs>
  );
};
