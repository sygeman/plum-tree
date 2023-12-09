import {
  LINK_BUTTON_PATTERN,
  NODE_AVATAR_RADIUS,
  NODE_BUTTON_RADIUS,
  NODE_HEIGHT,
  NODE_SMALL_AVATAR_RADIUS,
} from "@/constants";
import { useState } from "react";

export const PersonLinks = ({ links, small }) => {
  const [linksOpen, setLinksOpen] = useState(false);

  // icon position
  const offset = small ? NODE_SMALL_AVATAR_RADIUS : NODE_AVATAR_RADIUS;
  const centered =
    NODE_BUTTON_RADIUS + (NODE_HEIGHT - NODE_BUTTON_RADIUS * 2) / 2;

  // list position
  const linkListHeight = links.length * 48;
  const listX = centered + offset - NODE_BUTTON_RADIUS;
  const listY = centered - offset - NODE_BUTTON_RADIUS - linkListHeight - 10;

  return (
    <g>
      <circle
        className="cursor-pointer person-links"
        cx={centered + offset}
        cy={centered - offset}
        fill={`url(#${LINK_BUTTON_PATTERN})`}
        onClick={() => setLinksOpen(!linksOpen)}
        r={NODE_BUTTON_RADIUS}
      />

      {linksOpen && (
        <g transform={`translate(${listX},${listY})`}>
          <rect
            className="fill-[#f4f7f6] stroke-[#e6eaea] stroke-1"
            height={linkListHeight}
            rx="3"
            ry="3"
            width="198"
          />

          {links.map((linkData, index) => (
            <g
              className="fill-[#f4f7f6] cursor-pointer hover:fill-white person-link"
              key={index}
              // onClick={() => goToTree(linkData.treeId, linkData.personId)}
              transform={`translate(0,${48 * index})`}
            >
              <rect height="48" rx="3" ry="3" width="198" />
              <text className="cursor-pointer" transform="translate(10,30)">
                {linkData.title}
              </text>
            </g>
          ))}
        </g>
      )}
    </g>
  );
};
