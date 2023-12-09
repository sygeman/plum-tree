import { select } from "d3-selection";
import { zoom as d3Zoom } from "d3-zoom";
import { useEffect, useRef } from "react";

export const useSVGZoom = () => {
  const svgRef = useRef(null);
  const zoomRef = useRef(null);

  useEffect(() => {
    const zoomInstance = d3Zoom().on("zoom", ({ transform: { k, x, y } }) => {
      zoomRef.current.setAttribute(
        "transform",
        `translate(${x},${y})scale(${k})`
      );
    });
    select(svgRef.current).call(zoomInstance);
  }, []);

  return { svgRef, zoomRef };
};
