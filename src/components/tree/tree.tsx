import { tree } from "@/state";
import { select } from "d3-selection";
import { zoom as d3Zoom } from "d3-zoom";
import get from "lodash.get";
import { useEffect, useRef, useState } from "react";

import { CommonPatterns } from "./common-patterns";
import { TREE_TOP_PADDING } from "./constants";
import { addNode } from "./helpers/add-node";
import { updateTreeState } from "./helpers/update-tree-state";
import { usePrevious } from "./helpers/use-previous";
import { Link } from "./link";
import { Node } from "./node";
import { PersonDetails } from "./person-details";

export const Tree = () => {
  const people = tree.value.people;

  const [zoomInitialized, setZoomInitialized] = useState(false);
  const [links, setLinks] = useState([]);
  const [nodes, setNodes] = useState([]);
  const [nodeToHighlight, setNodeToHighlight] = useState(null);
  const [nodePeopleToHighlight, setNodePeopleToHighlight] = useState([]);
  const [personDetails, setPersonDetails] = useState(null);
  const [parentType, setParentType] = useState("NONE");
  const [parents, setParents] = useState([]);
  const [adoptiveParents, setAdoptiveParents] = useState([]);

  const prevTree = usePrevious(tree.value);

  const svg = useRef(null);
  const zoom = useRef(null);

  useEffect(() => {
    setZoomInitialized(false);
  }, []);

  useEffect(() => {
    // when moving between trees the component will try and be smart and not
    // remove the Component from the DOM. This makes re-render faster but screws
    // up the zoom handler. So we need to re-init by setting zoomInitialized to
    // false
    if (get(tree.value, "_id") !== get(prevTree, "_id")) {
      setZoomInitialized(false);
    }
    if (tree.value && tree.value.data) {
      updateTreeState(tree.value.data, setNodes, setLinks);
    }
  }, [tree.value]);

  useEffect(() => {
    if (svg.current && !zoomInitialized) {
      initSVGZoom(svg.current);
    }
  }, [zoomInitialized, svg.current]);

  function initSVGZoom(svg) {
    // have to check both clientWidth and parentNode.clientWidth to fix FireFox
    // issue where clientWidth is 0
    const width = svg.clientWidth || svg.parentNode.clientWidth;
    const zoomInstance = d3Zoom().scaleExtent([0.1, 3]).on("zoom", zoomed);
    const selectionSvg = select("svg").call(zoomInstance);

    // move to initial position
    zoomInstance.translateBy(selectionSvg, width / 2, TREE_TOP_PADDING);

    setZoomInitialized(true);
  }

  function zoomed(event) {
    const zoomTransform = event.transform;
    zoom.current.setAttribute(
      "transform",
      `translate(${zoomTransform.x},${zoomTransform.y})scale(${zoomTransform.k})`
    );
  }

  function showPersonDetails(
    personId,
    parentType = "NONE",
    parentIds = [],
    adoptiveParentIds = []
  ) {
    const personDetails = people.find((p) => p._id === personId);
    const parents = parentIds.map((parentId) =>
      people.find((person) => person._id === parentId)
    );
    const adoptiveParents = adoptiveParentIds.map((parentId) =>
      people.find((person) => person._id === parentId)
    );

    setPersonDetails(personDetails);
    setParentType(parentType);
    setParents(parents);
    setAdoptiveParents(adoptiveParents);
  }

  function highlightParents(node, peopleIds) {
    setNodeToHighlight(node);
    setNodePeopleToHighlight(peopleIds);
  }

  const treeId = get(tree.value, "_id", "");

  return (
    <div
      className="absolute inset-0 overflow-hidden bg-cover"
      style={{ backgroundImage: `url("/green-poly.jpg"` }}
    >
      {personDetails && (
        <PersonDetails
          adoptiveParents={adoptiveParents}
          aspirations={personDetails.aspirations}
          avatar={personDetails.avatar}
          bio={personDetails.bio}
          closeDetails={() => setPersonDetails(null)}
          custom={personDetails.custom}
          firstName={personDetails.firstName}
          lastName={personDetails.lastName}
          lifeStates={personDetails.lifeStates}
          parentType={parentType}
          parents={parents}
          personId={personDetails._id}
          readonly={false}
          traits={personDetails.traits}
          treeId={treeId}
        />
      )}

      <svg height="100%" ref={svg} width="100%">
        <CommonPatterns />

        <g ref={zoom}>
          <g className="transform-layer">
            {links.map((linkData, index) => (
              <Link key={index} linkData={linkData} />
            ))}

            {nodes.map((nodeData, index) => {
              // if the node we are rendering is the one where we need to
              // highlight some people (parents) then pass the array of
              // nodePeopleToHighlight otherwise default to an empty array.
              let highlightPeople = [];
              if (nodeData === nodeToHighlight) {
                highlightPeople = nodePeopleToHighlight;
              }

              return (
                <Node
                  addNode={addNode}
                  highlightParents={highlightParents}
                  highlightPeople={highlightPeople}
                  key={index}
                  nodeData={nodeData}
                  people={people}
                  showPersonDetails={showPersonDetails}
                />
              );
            })}
          </g>
        </g>
      </svg>
    </div>
  );
};
