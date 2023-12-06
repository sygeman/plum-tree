import get from "lodash.get";

import {
  EDIT_BUTTON_PATTERN,
  NODE_BUTTON_RADIUS,
  NODE_HEIGHT,
  NODE_SMALL_AVATAR_RADIUS,
  PARTNER_PADDING,
  PLUS_BUTTON_PATTERN,
} from "./constants";
import { Partner } from "./partner";
import { Person } from "./person";

export default ({
  addNode,
  editNode,
  highlightParents,
  highlightPeople,
  nodeData,
  people,
  readonly,
  showPersonDetails,
}) => {
  function doHighlightParents() {
    const nodeParentIds = get(nodeData, "data.parents", []).map(
      (parent) => parent._id
    );

    if (get(nodeData, "parent") && highlightParents) {
      highlightParents(nodeData.parent, nodeParentIds);
    }
  }

  function doUnhighlightParents() {
    if (get(nodeData, "parent") && highlightParents) {
      highlightParents(nodeData.parent, []);
    }
  }

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

  // check if we need to mute/darken the node person.
  const personId = get(personData, "_id");
  const mute =
    personId &&
    highlightPeople &&
    highlightPeople.length &&
    !highlightPeople.includes(personId);

  return (
    <g className="node" transform={`translate(${nodeX},${nodeY})`}>
      {!readonly && (
        <rect
          className={"styles.background"}
          height={NODE_HEIGHT}
          rx={NODE_HEIGHT / 2}
          ry={NODE_HEIGHT / 2}
          width={nodeWidth}
        />
      )}

      <Person
        highlightParents={doHighlightParents}
        mute={mute}
        nodeData={nodeData}
        personData={personData}
        showPersonDetails={showPersonDetails}
        unhighlightParents={doUnhighlightParents}
      />

      {partners.map((partnerData, index, partners) => {
        const partnerPosition = getPartnerPosition(index, partners.length);

        return (
          <Partner
            highlightPeople={highlightPeople}
            key={index}
            partnerData={partnerData}
            partners={partners}
            people={people}
            showPersonDetails={showPersonDetails}
            transform={`translate(${partnerPosition[0]},${partnerPosition[1]})`}
          />
        );
      })}

      {!readonly && (
        <circle
          className={`$'{styles.addChildIcon'} add-node`}
          cx={partners.length ? NODE_HEIGHT : NODE_HEIGHT / 2}
          cy={NODE_HEIGHT}
          fill={`url(#${PLUS_BUTTON_PATTERN})`}
          onClick={() => addNode(nodeData)}
          r={NODE_BUTTON_RADIUS}
        />
      )}

      {!readonly && (
        <circle
          className={`${"styles.editNodeIcon"} edit-node`}
          cy={NODE_HEIGHT / 2}
          fill={`url(#${EDIT_BUTTON_PATTERN})`}
          onClick={() => editNode(nodeData)}
          r={NODE_BUTTON_RADIUS}
        />
      )}
    </g>
  );
};
