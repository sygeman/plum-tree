import { addNode } from "@/api/tree";
import {
  EDIT_BUTTON_PATTERN,
  NODE_BUTTON_RADIUS,
  NODE_HEIGHT,
  NODE_SMALL_AVATAR_RADIUS,
  PARTNER_PADDING,
  PLUS_BUTTON_PATTERN,
} from "@/constants";
import { nodeToEdit, preview, tree } from "@/state";
import get from "lodash.get";

import { Partner } from "./partner";
import { Person } from "./person";

export const Node = ({ nodeData }) => {
  const people = tree.value.people;

  const showPersonDetails = () => null;
  // function showPersonDetails(
  //   personId,
  //   parentType = "NONE",
  //   parentIds = [],
  //   adoptiveParentIds = []
  // ) {
  //   const personDetails = people.find((p) => p._id === personId);
  //   const parents = parentIds.map((parentId) =>
  //     people.find((person) => person._id === parentId)
  //   );
  //   const adoptiveParents = adoptiveParentIds.map((parentId) =>
  //     people.find((person) => person._id === parentId)
  //   );

  //   setPersonDetails(personDetails);
  //   setParentType(parentType);
  //   setParents(parents);
  //   setAdoptiveParents(adoptiveParents);
  // }

  function nodePosition(node) {
    let left = NODE_HEIGHT / 2;

    if (node.data.partners.length > 0) {
      left = NODE_HEIGHT;
    }

    return [node.x - left, node.y];
  }

  function getPartnerPosition(index, partnerCount) {
    const partnerSize = NODE_SMALL_AVATAR_RADIUS * 2 + PARTNER_PADDING;
    const totalHeight = partnerCount * partnerSize;
    const heightDiff = (NODE_HEIGHT - totalHeight) / 2;
    const offset = partnerSize / 2 + heightDiff;

    const y = index * partnerSize + offset - 40;

    return [80, y];
  }

  function getNodeWidth(node) {
    if (node.data.partners.length > 0) {
      return NODE_HEIGHT * 2;
    }
    return NODE_HEIGHT;
  }

  const nodeX = nodePosition(nodeData)[0];
  const nodeY = nodePosition(nodeData)[1];
  const nodeWidth = getNodeWidth(nodeData);

  const personData = people.find(
    (p) => p._id === get(nodeData, "data.person._id")
  );
  const partners = nodeData.data.partners;

  return (
    <g className="node" transform={`translate(${nodeX},${nodeY})`}>
      {!preview.value && (
        <rect
          className="fill-none stroke-white stroke-2"
          height={NODE_HEIGHT}
          rx={NODE_HEIGHT / 2}
          ry={NODE_HEIGHT / 2}
          style={{ strokeDasharray: 5 }}
          width={nodeWidth}
        />
      )}

      <Person
        nodeData={nodeData}
        personData={personData}
        showPersonDetails={showPersonDetails}
      />

      {partners.map((partnerData, index, partners) => {
        const partnerPosition = getPartnerPosition(index, partners.length);

        return (
          <Partner
            key={index}
            partnerData={partnerData}
            partners={partners}
            people={people}
            showPersonDetails={showPersonDetails}
            transform={`translate(${partnerPosition[0]},${partnerPosition[1]})`}
          />
        );
      })}

      {!preview.value && (
        <circle
          className="cursor-pointer add-node"
          cx={partners.length ? NODE_HEIGHT : NODE_HEIGHT / 2}
          cy={NODE_HEIGHT}
          fill={`url(#${PLUS_BUTTON_PATTERN})`}
          onClick={() => addNode(nodeData)}
          r={NODE_BUTTON_RADIUS}
        />
      )}

      {!preview.value && (
        <circle
          className="cursor-pointer edit-node"
          cy={NODE_HEIGHT / 2}
          fill={`url(#${EDIT_BUTTON_PATTERN})`}
          onClick={() => (nodeToEdit.value = nodeData)}
          r={NODE_BUTTON_RADIUS}
        />
      )}
    </g>
  );
};
