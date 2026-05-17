"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { EASE } from "@/lib/animations";
import { MONTHLY_DATA } from "@/lib/admin/data";

const VW = 560;
const VH = 180;
const PAD = { t: 16, b: 32, l: 52, r: 12 };
const CW = VW - PAD.l - PAD.r;
const CH = VH - PAD.t - PAD.b;
const MAX = Math.max(...MONTHLY_DATA.map((d) => d.revenue)) * 1.1;

function toX(i: number) { return PAD.l + (i / (MONTHLY_DATA.length - 1)) * CW; }
function toY(v: number) { return PAD.t + (1 - v / MAX) * CH; }

function smoothLine(pts: { x: number; y: number }[]): string {
  return pts.reduce((acc, p, i) => {
    if (i === 0) return `M ${p.x.toFixed(1)} ${p.y.toFixed(1)}`;
    const prev = pts[i - 1];
    const dx = (p.x - prev.x) / 2;
    return `${acc} C ${(prev.x + dx).toFixed(1)} ${prev.y.toFixed(1)} ${(p.x - dx).toFixed(1)} ${p.y.toFixed(1)} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`;
  }, "");
}

const POINTS = MONTHLY_DATA.map((d, i) => ({ x: toX(i), y: toY(d.revenue) }));
const LINE_PATH = smoothLine(POINTS);
const AREA_PATH = `${LINE_PATH} L ${POINTS[POINTS.length - 1].x.toFixed(1)} ${PAD.t + CH} L ${POINTS[0].x.toFixed(1)} ${PAD.t + CH} Z`;
const GRID_LEVELS = [0.25, 0.5, 0.75, 1.0];

export default function RevenueChart() {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <svg
      ref={ref}
      viewBox={`0 0 ${VW} ${VH}`}
      className="w-full h-auto"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id="revAreaGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f4b400" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#f4b400" stopOpacity="0" />
        </linearGradient>
      </defs>

      {GRID_LEVELS.map((level) => {
        const y = toY(MAX * level);
        return (
          <g key={level}>
            <line x1={PAD.l} y1={y} x2={VW - PAD.r} y2={y} stroke="#222" strokeWidth={1} />
            <text x={PAD.l - 6} y={y + 4} textAnchor="end" fontSize={9} fill="#4b5563">
              {Math.round((MAX * level) / 1000)}k
            </text>
          </g>
        );
      })}

      <line x1={PAD.l} y1={PAD.t + CH} x2={VW - PAD.r} y2={PAD.t + CH} stroke="#222" strokeWidth={1} />

      {MONTHLY_DATA.map((d, i) => (
        <text key={i} x={toX(i)} y={VH - 4} textAnchor="middle" fontSize={9} fill="#4b5563">
          {d.month}
        </text>
      ))}

      <motion.path
        d={AREA_PATH}
        fill="url(#revAreaGrad)"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      />

      <motion.path
        d={LINE_PATH}
        stroke="#f4b400"
        strokeWidth={2}
        fill="none"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={inView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
        transition={{ duration: 1.5, ease: [...EASE] as [number, number, number, number], delay: 0.1 }}
      />

      {POINTS.map((p, i) => (
        <motion.circle
          key={i}
          cx={p.x}
          cy={p.y}
          r={3}
          fill="#f4b400"
          stroke="#111"
          strokeWidth={2}
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
          style={{ transformOrigin: `${p.x}px ${p.y}px` }}
          transition={{ delay: 0.9 + i * 0.05, duration: 0.3 }}
        />
      ))}
    </svg>
  );
}
