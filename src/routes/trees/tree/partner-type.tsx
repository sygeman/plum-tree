import {
  NODE_PLUS_HEIGHT,
  NODE_PLUS_WIDTH,
  PARTNER_ABDUCTION_BASE_HEIGHT,
  PARTNER_ABDUCTION_BASE_WIDTH,
  PARTNER_ABDUCTION_BASE_Y,
  PARTNER_ABDUCTION_TOP_RADIUS,
  PARTNER_ABDUCTION_TOP_Y,
} from "./constants";

export const PartnerType = ({ type }) => {
  if (type === "PARTNER" || type === "EX_PARTNER") {
    let transform = "translate(-5,35)";
    if (type === "EX_PARTNER") {
      transform += " rotate(45,5,5)";
    }
    return (
      <g
        className={
          "fill-none stroke-black stroke-2"
          // type === "EX_PARTNER" ? `ex-partner-symbol` : `partner-symbol`
        }
        transform={transform}
      >
        <line
          x1={NODE_PLUS_WIDTH / 2}
          x2={NODE_PLUS_WIDTH / 2}
          y1="0"
          y2={NODE_PLUS_HEIGHT}
        />
        <line
          x1="0"
          x2={NODE_PLUS_WIDTH}
          y1={NODE_PLUS_HEIGHT / 2}
          y2={NODE_PLUS_HEIGHT / 2}
        />
      </g>
    );
  }

  if (type === "ABDUCTION") {
    return (
      <g
        className="fill-black stroke-none abduction-symbol"
        transform="translate(-5,35)"
      >
        <circle
          cx={PARTNER_ABDUCTION_BASE_WIDTH / 2}
          cy={PARTNER_ABDUCTION_TOP_Y}
          r={PARTNER_ABDUCTION_TOP_RADIUS}
        />
        <rect
          height={PARTNER_ABDUCTION_BASE_HEIGHT}
          ry={PARTNER_ABDUCTION_BASE_HEIGHT / 2}
          width={PARTNER_ABDUCTION_BASE_WIDTH}
          x="0"
          y={PARTNER_ABDUCTION_BASE_Y}
        />
      </g>
    );
  }

  if (type === "MARRIED") {
    return (
      <polyline
        className="fill-none stroke-black stroke-2 marriage-symbol"
        points="0,10 0,3 3,6 6,3 6,10"
        transform="translate(-2,35)"
      />
    );
  }

  return null;
};
