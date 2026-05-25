import type { TableItem } from "@/lib/tables";
import type { Dictionary } from "@/lib/i18n";

interface Props {
  item: TableItem;
  dict: Dictionary;
}

/**
 * Side-view scale comparison of the table to a standing person (avg 175cm).
 * Helps customers visualize the actual size of the table in a room.
 */
export default function SizeVisualizer({ item, dict }: Props) {
  const heightCm = item.dimensions.heightCm;
  const lengthCm =
    item.dimensions.lengthCm ?? item.dimensions.diameterCm ?? 100;
  const personHeightCm = 175;

  // SVG viewBox: width 400, height 240. We map cm -> px using a fixed scale.
  // The person is the reference: ~190px tall in the SVG = 175cm in real life
  const cmToPx = 190 / personHeightCm; // ≈ 1.085 px/cm
  const tableHeightPx = heightCm * cmToPx;
  const tableWidthPx = lengthCm * cmToPx;
  const personHeightPx = personHeightCm * cmToPx;
  const groundY = 220;

  const { title, personLabel, tableLabel } = dict.sizeVisualizer;

  // Center the composition, leaving room for the height-label on the left
  const labelGutter = 38;
  const personWidth = 50;
  const gap = 40;
  const totalWidth = tableWidthPx + gap + personWidth;
  const startX = Math.max(labelGutter, (400 - totalWidth) / 2);
  const tableX = startX;
  const personX = startX + tableWidthPx + gap;

  return (
    <div className="rounded-2xl bg-cream border border-stone-200/60 p-6">
      <p className="eyebrow mb-4">{title}</p>
      <svg viewBox="0 0 400 240" className="w-full h-auto">
        {/* Ground line */}
        <line
          x1="0"
          y1={groundY}
          x2="400"
          y2={groundY}
          stroke="#1A1814"
          strokeWidth="0.5"
          opacity="0.3"
        />
        <line
          x1="0"
          y1={groundY}
          x2="400"
          y2={groundY}
          stroke="#1A1814"
          strokeWidth="0.4"
          strokeDasharray="2 3"
          opacity="0.2"
        />

        {/* Table */}
        <g>
          {/* Tabletop */}
          <rect
            x={tableX}
            y={groundY - tableHeightPx}
            width={tableWidthPx}
            height={Math.max(4, 5 * cmToPx)}
            fill="#A88550"
            rx="1"
          />
          {/* Legs */}
          <rect
            x={tableX + 4}
            y={groundY - tableHeightPx + 5}
            width="3"
            height={tableHeightPx - 5}
            fill="#1F170E"
          />
          <rect
            x={tableX + tableWidthPx - 7}
            y={groundY - tableHeightPx + 5}
            width="3"
            height={tableHeightPx - 5}
            fill="#1F170E"
          />
          {/* Label */}
          <line
            x1={tableX - 6}
            y1={groundY - tableHeightPx}
            x2={tableX - 6}
            y2={groundY}
            stroke="#1A1814"
            strokeWidth="0.6"
            opacity="0.4"
          />
          <line
            x1={tableX - 9}
            y1={groundY - tableHeightPx}
            x2={tableX - 3}
            y2={groundY - tableHeightPx}
            stroke="#1A1814"
            strokeWidth="0.6"
            opacity="0.4"
          />
          <line
            x1={tableX - 9}
            y1={groundY}
            x2={tableX - 3}
            y2={groundY}
            stroke="#1A1814"
            strokeWidth="0.6"
            opacity="0.4"
          />
          <text
            x={tableX - 11}
            y={groundY - tableHeightPx / 2 + 3}
            fontSize="9"
            fill="#1A1814"
            textAnchor="end"
            opacity="0.7"
          >
            {heightCm}cm
          </text>
          <text
            x={tableX + tableWidthPx / 2}
            y={groundY + 14}
            fontSize="9"
            fill="#1A1814"
            textAnchor="middle"
            opacity="0.7"
          >
            {lengthCm} cm
          </text>
        </g>

        {/* Person silhouette */}
        <g transform={`translate(${personX} ${groundY - personHeightPx})`}>
          {/* Head */}
          <circle cx="18" cy="14" r="11" fill="#1A1814" opacity="0.65" />
          {/* Body */}
          <path
            d="M8,28 L28,28 L30,80 L26,140 L22,170 L14,170 L10,140 L6,80 Z"
            fill="#1A1814"
            opacity="0.65"
          />
          {/* Arms hint */}
          <path
            d="M8,40 L2,90 L0,130"
            stroke="#1A1814"
            strokeWidth="3"
            fill="none"
            opacity="0.55"
            strokeLinecap="round"
          />
          <path
            d="M28,40 L34,90 L36,130"
            stroke="#1A1814"
            strokeWidth="3"
            fill="none"
            opacity="0.55"
            strokeLinecap="round"
          />
          {/* Legs */}
          <line x1="14" y1="170" x2="13" y2={personHeightPx} stroke="#1A1814" strokeWidth="3.5" opacity="0.65" strokeLinecap="round" />
          <line x1="22" y1="170" x2="23" y2={personHeightPx} stroke="#1A1814" strokeWidth="3.5" opacity="0.65" strokeLinecap="round" />
        </g>

        {/* Person label */}
        <text x={personX + 18} y={groundY + 14} fontSize="9" fill="#1A1814" textAnchor="middle" opacity="0.55">
          {personLabel}
        </text>
      </svg>

      <div className="mt-4 flex items-center justify-between text-xs text-stone-500">
        <span className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-sm bg-oak-500" />
          {tableLabel}
        </span>
        <span>~ 1:1</span>
      </div>
    </div>
  );
}
