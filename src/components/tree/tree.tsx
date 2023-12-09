import { treeLinks, treeNodes } from "@/state";
import { select } from "d3-selection";
import { zoom as d3Zoom } from "d3-zoom";
import { useEffect, useRef } from "react";

import { CommonPatterns } from "./common-patterns";
import { Link } from "./link";
import { Node } from "./node";

export const Tree = () => {
  const svg = useRef(null);
  const zoom = useRef(null);

  useEffect(() => {
    const zoomInstance = d3Zoom().on("zoom", ({ transform: { k, x, y } }) => {
      zoom.current.setAttribute("transform", `translate(${x},${y})scale(${k})`);
    });
    select(svg.current).call(zoomInstance);
  }, []);

  return (
    <div
      className={`absolute inset-0 overflow-hidden 
      bg-gradient-to-r from-teal-500 from-30% to-teal-700 to-90%`}
    >
      <div
        className={`pattern-dots pattern-blue-500 pattern-bg-white pattern-size-2 pattern-opacity-20 
        absolute inset-0 w-full h-full`}
      />
      <svg className="absolute" height="100%" ref={svg} width="100%">
        <CommonPatterns />

        <g ref={zoom}>
          <g className="transform-layer">
            {treeLinks.value.map((linkData, index) => (
              <Link key={index} linkData={linkData} />
            ))}
            {treeNodes.value.map((nodeData, index) => (
              <Node key={index} nodeData={nodeData} />
            ))}
          </g>
        </g>
      </svg>
    </div>
  );
};
