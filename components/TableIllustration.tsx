import type { TableItem } from "@/lib/tables";

interface Props {
  item: TableItem;
  variant?: "card" | "detail" | "compact";
  className?: string;
}

type WoodTone = {
  light: string;
  mid: string;
  dark: string;
  shadow: string;
  grain: string;
};

function woodToneFor(item: TableItem): WoodTone {
  const wood = item.woodType.en.toLowerCase();
  if (wood.includes("walnut") || wood.includes("oř") || wood.includes("nuss")) {
    return {
      light: "#8B6A3A",
      mid: "#4F3A1F",
      dark: "#2A1D0E",
      shadow: "#15100A",
      grain: "#1F170E",
    };
  }
  if (wood.includes("ash") || wood.includes("jas") || wood.includes("esch")) {
    return {
      light: "#E8DCC0",
      mid: "#C4A878",
      dark: "#8B6A3A",
      shadow: "#54402A",
      grain: "#3A2C1A",
    };
  }
  if (wood.includes("beech") || wood.includes("buk")) {
    return {
      light: "#EBD9B8",
      mid: "#C7A26A",
      dark: "#8B6A3A",
      shadow: "#544025",
      grain: "#3A2C1A",
    };
  }
  // default oak
  return {
    light: "#D9BE8E",
    mid: "#A88550",
    dark: "#6F5430",
    shadow: "#3A2C1A",
    grain: "#1F170E",
  };
}

/**
 * SVG illustration of the table itself, viewed from a slight perspective.
 * Replaces the gradient placeholder until real photos arrive.
 */
export default function TableIllustration({
  item,
  variant = "card",
  className = "",
}: Props) {
  const tone = woodToneFor(item);
  const isRound = !!item.dimensions.diameterCm;
  const isDesk = item.productType === "desk";
  const isCoffeeOrBistro =
    item.productType === "coffee_table" || item.productType === "bistro_table";
  const liveEdge = item.edgeType === "live_edge";

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      {/* Backdrop — soft warm room */}
      <svg
        viewBox="0 0 400 500"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 w-full h-full"
        aria-hidden="true"
      >
        <defs>
          {/* Room gradient — bone wall to floor */}
          <linearGradient id={`room-${item.id}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F7F0E2" />
            <stop offset="55%" stopColor="#EDE3D0" />
            <stop offset="100%" stopColor="#D7C7AC" />
          </linearGradient>

          {/* Wood gradient for tabletop */}
          <linearGradient id={`top-${item.id}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={tone.light} />
            <stop offset="55%" stopColor={tone.mid} />
            <stop offset="100%" stopColor={tone.dark} />
          </linearGradient>

          {/* Wood gradient — edge (slightly darker) */}
          <linearGradient id={`edge-${item.id}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={tone.mid} />
            <stop offset="100%" stopColor={tone.shadow} />
          </linearGradient>

          {/* Grain pattern */}
          <pattern
            id={`grain-${item.id}`}
            width="240"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <rect width="240" height="20" fill="transparent" />
            <path
              d="M0,10 Q60,4 120,11 T240,9"
              stroke={tone.grain}
              strokeWidth="0.4"
              fill="none"
              opacity="0.35"
            />
            <path
              d="M0,16 Q60,11 120,18 T240,15"
              stroke={tone.grain}
              strokeWidth="0.3"
              fill="none"
              opacity="0.25"
            />
            <path
              d="M0,3 Q60,1 120,5 T240,2"
              stroke={tone.grain}
              strokeWidth="0.25"
              fill="none"
              opacity="0.2"
            />
          </pattern>

          {/* Soft floor shadow under table */}
          <radialGradient id={`floorshadow-${item.id}`} cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="#1A1814" stopOpacity="0.28" />
            <stop offset="60%" stopColor="#1A1814" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#1A1814" stopOpacity="0" />
          </radialGradient>

          {/* Soft window light */}
          <radialGradient id={`light-${item.id}`} cx="0.2" cy="0.2" r="0.7">
            <stop offset="0%" stopColor="#FFFAF0" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#FFFAF0" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Room backdrop */}
        <rect width="400" height="500" fill={`url(#room-${item.id})`} />
        {/* Floor seam */}
        <rect y="340" width="400" height="160" fill="#D7C7AC" />
        <line x1="0" y1="340" x2="400" y2="340" stroke="#B89E78" strokeWidth="0.5" opacity="0.6" />

        {/* Window light overlay */}
        <rect width="400" height="500" fill={`url(#light-${item.id})`} />

        {/* Render shape */}
        {isRound ? (
          <RoundTable id={item.id} tone={tone} />
        ) : isDesk ? (
          <DeskTable id={item.id} tone={tone} />
        ) : isCoffeeOrBistro ? (
          <CoffeeTable id={item.id} tone={tone} liveEdge={liveEdge} />
        ) : (
          <RectTable id={item.id} tone={tone} liveEdge={liveEdge} />
        )}
      </svg>

      {/* Optional subtle grain overlay for the whole card */}
      <div
        className="absolute inset-0 pointer-events-none mix-blend-multiply"
        style={{
          opacity: 0.035,
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
        }}
      />
    </div>
  );
}

/* ------ Individual table shapes ------ */

function RectTable({ id, tone, liveEdge }: { id: string; tone: WoodTone; liveEdge: boolean }) {
  // Rectangular dining/conference table, slight perspective
  const topPath = liveEdge
    ? "M40,210 Q70,205 105,208 Q160,212 215,206 Q270,200 325,210 Q360,216 360,232 Q360,248 325,244 Q270,238 215,242 Q160,246 105,244 Q70,242 40,236 Z"
    : "M40,210 L360,210 L360,244 L40,244 Z";

  return (
    <>
      {/* Floor shadow */}
      <ellipse cx="200" cy="380" rx="160" ry="20" fill={`url(#floorshadow-${id})`} />

      {/* Far legs */}
      <Leg x={70} top={244} height={140} tone={tone} />
      <Leg x={330} top={244} height={140} tone={tone} />

      {/* Tabletop edge (front face) */}
      <rect x="40" y="232" width="320" height="14" fill={`url(#edge-${id})`} />
      <rect x="40" y="232" width="320" height="14" fill={`url(#grain-${id})`} opacity="0.5" />

      {/* Tabletop surface */}
      <path d={topPath} fill={`url(#top-${id})`} />
      <path d={topPath} fill={`url(#grain-${id})`} opacity="0.55" />

      {/* Highlight on top */}
      <path
        d="M50,212 Q120,208 200,210 Q280,212 350,208"
        stroke="#FFFAF0"
        strokeWidth="1.2"
        opacity="0.25"
        fill="none"
      />
    </>
  );
}

function RoundTable({ id, tone }: { id: string; tone: WoodTone }) {
  return (
    <>
      {/* Floor shadow */}
      <ellipse cx="200" cy="380" rx="130" ry="18" fill={`url(#floorshadow-${id})`} />

      {/* Central cross base — black steel */}
      <rect x="190" y="252" width="20" height="120" fill="#1F170E" rx="2" />
      <ellipse cx="200" cy="378" rx="60" ry="6" fill="#2A2620" />
      <rect x="142" y="372" width="116" height="8" fill="#1F170E" rx="2" />

      {/* Tabletop edge */}
      <ellipse cx="200" cy="232" rx="135" ry="20" fill={`url(#edge-${id})`} />

      {/* Tabletop surface */}
      <ellipse cx="200" cy="222" rx="135" ry="20" fill={`url(#top-${id})`} />
      <ellipse cx="200" cy="222" rx="135" ry="20" fill={`url(#grain-${id})`} opacity="0.55" />

      {/* Highlight */}
      <path
        d="M85,218 Q150,205 215,210 Q280,215 315,225"
        stroke="#FFFAF0"
        strokeWidth="1.2"
        opacity="0.3"
        fill="none"
      />
    </>
  );
}

function CoffeeTable({ id, tone, liveEdge }: { id: string; tone: WoodTone; liveEdge: boolean }) {
  const topPath = liveEdge
    ? "M50,270 Q90,265 145,270 Q215,275 280,268 Q335,262 350,272 Q352,288 335,290 Q280,294 215,292 Q145,290 90,290 Q55,290 50,280 Z"
    : "M50,270 L350,270 L350,292 L50,292 Z";

  return (
    <>
      {/* Floor shadow */}
      <ellipse cx="200" cy="370" rx="145" ry="14" fill={`url(#floorshadow-${id})`} />

      {/* X-frame steel legs */}
      <line x1="80" y1="290" x2="160" y2="370" stroke="#1F170E" strokeWidth="6" strokeLinecap="round" />
      <line x1="160" y1="290" x2="80" y2="370" stroke="#1F170E" strokeWidth="6" strokeLinecap="round" />
      <line x1="240" y1="290" x2="320" y2="370" stroke="#1F170E" strokeWidth="6" strokeLinecap="round" />
      <line x1="320" y1="290" x2="240" y2="370" stroke="#1F170E" strokeWidth="6" strokeLinecap="round" />

      {/* Edge */}
      <rect x="50" y="285" width="300" height="10" fill={`url(#edge-${id})`} />
      <rect x="50" y="285" width="300" height="10" fill={`url(#grain-${id})`} opacity="0.5" />

      {/* Top */}
      <path d={topPath} fill={`url(#top-${id})`} />
      <path d={topPath} fill={`url(#grain-${id})`} opacity="0.6" />

      {liveEdge && (
        <>
          {/* Black resin detail */}
          <ellipse cx="180" cy="280" rx="14" ry="2.5" fill="#0A0807" opacity="0.85" />
          <ellipse cx="240" cy="278" rx="9" ry="2" fill="#0A0807" opacity="0.7" />
        </>
      )}

      {/* Highlight */}
      <path d="M60,272 Q150,268 220,270 Q300,272 340,268" stroke="#FFFAF0" strokeWidth="1.2" opacity="0.25" fill="none" />
    </>
  );
}

function DeskTable({ id, tone }: { id: string; tone: WoodTone }) {
  return (
    <>
      {/* Floor shadow */}
      <ellipse cx="200" cy="380" rx="150" ry="16" fill={`url(#floorshadow-${id})`} />

      {/* Slim legs */}
      <Leg x={62} top={244} height={140} tone={tone} thin />
      <Leg x={338} top={244} height={140} tone={tone} thin />

      {/* Edge */}
      <rect x="40" y="232" width="320" height="12" fill={`url(#edge-${id})`} />
      <rect x="40" y="232" width="320" height="12" fill={`url(#grain-${id})`} opacity="0.5" />

      {/* Top */}
      <rect x="40" y="210" width="320" height="24" fill={`url(#top-${id})`} rx="2" />
      <rect x="40" y="210" width="320" height="24" fill={`url(#grain-${id})`} opacity="0.55" rx="2" />

      {/* Subtle laptop hint */}
      <rect x="170" y="200" width="60" height="6" rx="1" fill="#1F170E" opacity="0.5" />
      <rect x="173" y="194" width="54" height="8" rx="1" fill="#2A2620" opacity="0.7" />

      {/* Highlight */}
      <path d="M50,214 Q150,210 220,212 Q300,214 350,210" stroke="#FFFAF0" strokeWidth="1.2" opacity="0.3" fill="none" />
    </>
  );
}

function Leg({
  x,
  top,
  height,
  tone,
  thin = false,
}: {
  x: number;
  top: number;
  height: number;
  tone: WoodTone;
  thin?: boolean;
}) {
  const w = thin ? 4 : 8;
  return (
    <>
      <rect x={x - w / 2} y={top} width={w} height={height} fill="#1F170E" rx="1" />
      <rect x={x - w / 2} y={top} width={w} height={4} fill={tone.shadow} opacity="0.6" />
    </>
  );
}
