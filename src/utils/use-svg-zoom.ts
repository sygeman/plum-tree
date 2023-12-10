import { select } from "d3-selection";
import { zoom } from "d3-zoom";
import { useEffect, useRef } from "react";

export const useSVGZoom = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const zoomRef = useRef<SVGGElement>(null);

  useEffect(() => {
    if (!svgRef.current || !zoomRef.current) return;

    const zoomInstance = zoom<SVGSVGElement, unknown>().on(
      "zoom",
      ({ transform: { k, x, y } }) => {
        zoomRef.current?.setAttribute(
          "transform",
          `translate(${x},${y})scale(${k})`
        );
      }
    );
    select(svgRef.current).call(zoomInstance);
  }, []);

  return { svgRef, zoomRef };
};
