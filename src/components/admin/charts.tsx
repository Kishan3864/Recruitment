import Link from "next/link";

import { cn } from "@/lib/utils";

/**
 * Server-rendered charts for the admin dashboard — hand-drawn SVG on design
 * tokens, zero client JS. Colors are passed as CSS variable references
 * (e.g. "var(--color-accent-sage)") so they stay on the token sheet.
 */

export interface SeriesPoint {
  label: string;
  value: number;
}

const r1 = (n: number) => Math.round(n * 10) / 10;

/**
 * Catmull-Rom → cubic bézier, so the line glides instead of zig-zagging.
 * Control-point y values are clamped to the data's y-range — a bézier stays
 * inside its control hull, so the curve can never overshoot below the
 * baseline (or above the peak) around spikes.
 */
function smoothPath(pts: [number, number][]): string {
  if (pts.length < 2) return "";
  const ys = pts.map((p) => p[1]);
  const yMin = Math.min(...ys);
  const yMax = Math.max(...ys);
  const clampY = (y: number) => Math.min(yMax, Math.max(yMin, y));
  let d = `M ${r1(pts[0][0])},${r1(pts[0][1])}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[Math.max(0, i - 1)];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[Math.min(pts.length - 1, i + 2)];
    const c1x = p1[0] + (p2[0] - p0[0]) / 6;
    const c1y = clampY(p1[1] + (p2[1] - p0[1]) / 6);
    const c2x = p2[0] - (p3[0] - p1[0]) / 6;
    const c2y = clampY(p2[1] - (p3[1] - p1[1]) / 6);
    d += ` C ${r1(c1x)},${r1(c1y)} ${r1(c2x)},${r1(c2y)} ${r1(p2[0])},${r1(p2[1])}`;
  }
  return d;
}

export function AreaChart({
  points,
  ariaLabel,
  gradientId = "area-fill",
}: {
  points: SeriesPoint[];
  ariaLabel: string;
  gradientId?: string;
}) {
  const W = 640;
  const H = 200;
  const PAD_X = 8;
  const PAD_TOP = 14;
  const BASE = H - 26; // leave room for x labels
  const max = Math.max(4, ...points.map((p) => p.value));
  const step = points.length > 1 ? (W - PAD_X * 2) / (points.length - 1) : 0;

  const pts: [number, number][] = points.map((p, i) => [
    PAD_X + i * step,
    BASE - (p.value / max) * (BASE - PAD_TOP),
  ]);
  const line = smoothPath(pts);
  const area = line
    ? `${line} L ${r1(pts[pts.length - 1][0])},${BASE} L ${r1(pts[0][0])},${BASE} Z`
    : "";
  const gridYs = [0.25, 0.5, 0.75].map((f) => BASE - f * (BASE - PAD_TOP));
  const xLabelIdx = [0, Math.floor((points.length - 1) / 2), points.length - 1];
  const last = pts[pts.length - 1];

  return (
    <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={ariaLabel} className="h-auto w-full">
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--color-brand-500)" stopOpacity="0.22" />
          <stop offset="100%" stopColor="var(--color-brand-500)" stopOpacity="0" />
        </linearGradient>
      </defs>

      {gridYs.map((y) => (
        <line
          key={y}
          x1={PAD_X}
          x2={W - PAD_X}
          y1={r1(y)}
          y2={r1(y)}
          stroke="var(--border)"
          strokeWidth="1"
          strokeDasharray="2 5"
        />
      ))}
      <line
        x1={PAD_X}
        x2={W - PAD_X}
        y1={BASE}
        y2={BASE}
        stroke="var(--border)"
        strokeWidth="1"
      />

      {area && <path d={area} fill={`url(#${gradientId})`} />}
      {line && (
        <path
          d={line}
          fill="none"
          stroke="var(--color-brand-600)"
          strokeWidth="2"
          strokeLinecap="round"
        />
      )}

      {pts.map(([x, y], i) => (
        <circle key={i} cx={r1(x)} cy={r1(y)} r="6" fill="transparent">
          <title>{`${points[i].label}: ${points[i].value}`}</title>
        </circle>
      ))}
      {last && (
        <g>
          <circle cx={r1(last[0])} cy={r1(last[1])} r="6" fill="var(--color-brand-500)" opacity="0.25" />
          <circle
            cx={r1(last[0])}
            cy={r1(last[1])}
            r="3"
            fill="var(--color-brand-600)"
            stroke="#fff"
            strokeWidth="1.5"
          />
        </g>
      )}

      <text x={PAD_X} y={PAD_TOP - 3} fontSize="10" fill="var(--muted-foreground)">
        {max}
      </text>
      {xLabelIdx.map((i, k) => (
        <text
          key={i}
          x={r1(PAD_X + i * step)}
          y={H - 8}
          fontSize="10"
          fill="var(--muted-foreground)"
          textAnchor={k === 0 ? "start" : k === xLabelIdx.length - 1 ? "end" : "middle"}
        >
          {points[i]?.label}
        </text>
      ))}
    </svg>
  );
}

export interface DonutSegment {
  label: string;
  value: number;
  /** CSS color, e.g. "var(--color-accent-sage)" */
  color: string;
}

export function Donut({
  segments,
  centerLabel,
  ariaLabel,
}: {
  segments: DonutSegment[];
  centerLabel: string;
  ariaLabel: string;
}) {
  const R = 42;
  const C = 2 * Math.PI * R;
  const total = segments.reduce((sum, s) => sum + s.value, 0);

  let offset = 0;
  const arcs = segments
    .filter((s) => s.value > 0)
    .map((s) => {
      const frac = s.value / total;
      const arc = { ...s, dash: frac * C, offset };
      offset += frac * C;
      return arc;
    });

  return (
    <div className="flex items-center gap-5">
      <svg viewBox="0 0 112 112" role="img" aria-label={ariaLabel} className="size-32 shrink-0">
        <circle
          cx="56"
          cy="56"
          r={R}
          fill="none"
          stroke="var(--border)"
          strokeWidth="14"
          opacity="0.6"
        />
        {arcs.map((a) => (
          <circle
            key={a.label}
            cx="56"
            cy="56"
            r={R}
            fill="none"
            stroke={a.color}
            strokeWidth="14"
            strokeDasharray={`${r1(a.dash)} ${r1(C)}`}
            strokeDashoffset={r1(-a.offset)}
            transform="rotate(-90 56 56)"
          >
            <title>{`${a.label}: ${a.value}`}</title>
          </circle>
        ))}
        <text
          x="56"
          y="53"
          textAnchor="middle"
          className="font-display"
          fontSize="22"
          fontWeight="700"
          fill="var(--foreground)"
        >
          {total}
        </text>
        <text x="56" y="68" textAnchor="middle" fontSize="9" fill="var(--muted-foreground)">
          {centerLabel}
        </text>
      </svg>

      <ul className="min-w-0 space-y-2">
        {segments.map((s) => (
          <li key={s.label} className="flex items-center gap-2 text-sm">
            <span
              aria-hidden="true"
              className="size-2.5 shrink-0 rounded-full"
              style={{ backgroundColor: s.color }}
            />
            <span className="truncate text-muted-foreground">{s.label}</span>
            <span className="ml-auto pl-3 font-semibold tabular-nums">{s.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export interface BarItem {
  label: string;
  value: number;
  /** Tailwind fill class for the bar, e.g. TINT.sage.fillDeep */
  barClass: string;
  href?: string;
}

export function BarList({ items, unit }: { items: BarItem[]; unit?: string }) {
  const max = Math.max(1, ...items.map((i) => i.value));

  return (
    <ul className="space-y-3">
      {items.map((item) => {
        const row = (
          <>
            <span className="flex items-baseline justify-between gap-3">
              <span className="truncate text-sm font-medium">{item.label}</span>
              <span className="text-sm font-semibold tabular-nums">
                {item.value}
                {unit && (
                  <span className="ml-1 text-xs font-normal text-muted-foreground">{unit}</span>
                )}
              </span>
            </span>
            <span className="mt-1.5 block h-2 overflow-hidden rounded-full bg-neutral-100">
              <span
                aria-hidden="true"
                className={cn("block h-full rounded-full transition-[width]", item.barClass)}
                style={{ width: `${Math.max(3, (item.value / max) * 100)}%` }}
              />
            </span>
          </>
        );
        return (
          <li key={item.label}>
            {item.href ? (
              <Link
                href={item.href}
                className="block rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-ring/60 [&:hover_span:first-child_span:first-child]:text-brand-700"
              >
                {row}
              </Link>
            ) : (
              row
            )}
          </li>
        );
      })}
    </ul>
  );
}

export function Sparkline({ values, color }: { values: number[]; color: string }) {
  const max = Math.max(1, ...values);
  const pts = values
    .map((v, i) => {
      const x = values.length > 1 ? (i / (values.length - 1)) * 100 : 50;
      const y = 26 - (v / max) * 22;
      return `${r1(x)},${r1(y)}`;
    })
    .join(" ");

  return (
    <svg
      viewBox="0 0 100 28"
      preserveAspectRatio="none"
      aria-hidden="true"
      className="h-7 w-full"
    >
      <polyline
        points={`0,28 ${pts} 100,28`}
        fill={color}
        opacity="0.12"
        stroke="none"
      />
      <polyline
        points={pts}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
