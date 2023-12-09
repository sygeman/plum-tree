import { useSVGZoom } from "@/utils/use-svg-zoom";

import { BackgroundDots } from "./background-dots";
import { CommonPatterns } from "./common-patterns";
import { Links } from "./links";
import { Nodes } from "./nodes/nodes";

export const Tree = () => {
  const { svgRef, zoomRef } = useSVGZoom();

  return (
    <div className="absolute inset-0 overflow-hidden">
      <BackgroundDots />

      <svg className="absolute h-full w-full" ref={svgRef}>
        <CommonPatterns />
        <g ref={zoomRef}>
          <g>
            <Links />
            <Nodes />
          </g>
        </g>
      </svg>
    </div>
  );
};
