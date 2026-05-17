"use client";

import { useRef, useEffect, useState } from "react";
import { motion, animate, useInView } from "framer-motion";
import { type LucideIcon } from "lucide-react";
import { EASE } from "@/lib/animations";

interface StatCardProps {
  label: string;
  value: number | string;
  format?: (n: number) => string;
  icon: LucideIcon;
  change?: string;
  changePositive?: boolean;
  delay?: number;
}

export default function StatCard({
  label,
  value,
  format = (n) => Math.round(n).toLocaleString("fr-FR"),
  icon: Icon,
  change,
  changePositive = true,
  delay = 0,
}: StatCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const isNumeric = typeof value === "number";
  const [display, setDisplay] = useState(isNumeric ? "0" : (value as string));

  useEffect(() => {
    if (!inView || !isNumeric) return;
    const controls = animate(0, value as number, {
      duration: 1.3,
      ease: [...EASE] as [number, number, number, number],
      onUpdate: (v) => setDisplay(format(v)),
    });
    return controls.stop;
  }, [inView, value, isNumeric, format]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      whileHover={{ y: -2, borderColor: "rgba(244,180,0,0.22)" }}
      transition={{ duration: 0.45, ease: [...EASE] as [number, number, number, number], delay }}
      className="relative bg-ebg-dark border border-ebg-dark-3 p-5 overflow-hidden cursor-default"
    >
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-ebg-yellow/60 to-transparent" />

      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-gray-500 text-[10px] tracking-[0.2em] uppercase mb-2.5">{label}</p>
          <p className="font-bebas text-[2rem] text-white leading-none tracking-wide">
            {display}
          </p>
          {change && (
            <p className={`text-[11px] mt-2 font-medium ${changePositive ? "text-emerald-400" : "text-red-400"}`}>
              {changePositive ? "↑" : "↓"} {change}
            </p>
          )}
        </div>
        <div className="w-10 h-10 shrink-0 flex items-center justify-center bg-ebg-yellow/10">
          <Icon size={18} className="text-ebg-yellow" strokeWidth={1.8} />
        </div>
      </div>
    </motion.div>
  );
}
