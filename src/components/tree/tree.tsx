import { tree } from "@/state";
import { select } from "d3-selection";
import { zoom as d3Zoom } from "d3-zoom";
import { useEffect, useRef, useState } from "react";

import { CommonPatterns } from "./common-patterns";
import { TREE_TOP_PADDING } from "./constants";
import { updateTreeState } from "./helpers/update-tree-state";
import { Link } from "./link";
import { Node } from "./node";

export const Tree = () => {
  const [links, setLinks] = useState([]);
  const [nodes, setNodes] = useState([]);

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

  return (
    <div
      className={`absolute inset-0 overflow-hidden 
      bg-gradient-to-r from-teal-500 from-30% to-teal-700 to-90%`}
    >
      <div
        className={`pattern-dots pattern-blue-500 pattern-bg-white pattern-size-2 pattern-opacity-20 
        absolute inset-0 w-full h-full`}
      />
      <svg className="absolute  " height="100%" ref={svg} width="100%">
        <CommonPatterns />

        <g ref={zoom}>
          <g className="transform-layer">
            {links.map((linkData, index) => (
              <Link key={index} linkData={linkData} />
            ))}
            {nodes.map((nodeData, index) => (
              <Node key={index} nodeData={nodeData} />
            ))}
          </g>
        </g>
      </svg>
    </div>
  );
};
