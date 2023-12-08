import { tree } from "@/state";
import { select } from "d3-selection";
import { zoom as d3Zoom } from "d3-zoom";
import { useEffect, useRef, useState } from "react";

import { CommonPatterns } from "./common-patterns";
import { TREE_TOP_PADDING } from "./constants";
import { addNode } from "./helpers/add-node";
import { updateTreeState } from "./helpers/update-tree-state";
import { Link } from "./link";
import { Node } from "./node";

export const Tree = () => {
  const [links, setLinks] = useState([]);
  const [nodes, setNodes] = useState([]);
  const [nodeToHighlight, setNodeToHighlight] = useState(null);
  const [nodePeopleToHighlight, setNodePeopleToHighlight] = useState([]);

  const svg = useRef(null);
  const zoom = useRef(null);

  useEffect(() => {
    updateTreeState(tree.value.data, setNodes, setLinks);
  }, [tree.value]);

  useEffect(() => {
    initSVGZoom(svg.current);
  }, []);

  function initSVGZoom(svg) {
    // have to check both clientWidth and parentNode.clientWidth to fix FireFox
    // issue where clientWidth is 0
    const width = svg.clientWidth || svg.parentNode.clientWidth;
    const zoomInstance = d3Zoom().scaleExtent([0.1, 3]).on("zoom", zoomed);
    const selectionSvg = select("svg").call(zoomInstance);

    // move to initial position
    zoomInstance.translateBy(selectionSvg, width / 2, TREE_TOP_PADDING);
  }

  function zoomed(event) {
    const zoomTransform = event.transform;
    zoom.current.setAttribute(
      "transform",
      `translate(${zoomTransform.x},${zoomTransform.y})scale(${zoomTransform.k})`
    );
  }

  function highlightParents(node, peopleIds) {
    setNodeToHighlight(node);
    setNodePeopleToHighlight(peopleIds);
  }

  return (
    <div
      className="absolute inset-0 overflow-hidden bg-cover"
      style={{ backgroundImage: `url("/green-poly.jpg"` }}
    >
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
                />
              );
            })}
          </g>
        </g>
      </svg>
    </div>
  );
};
