"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, animate } from "framer-motion";

const STATS = [
  { value: 100, suffix: "%", label: "Satisfaction client" },
  { value: 5, suffix: "+", label: "Ans d'expérience" },
  { value: 24, suffix: "/7", label: "Disponibilité" },
  { value: 50, suffix: "+", label: "Chantiers réalisés" },
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(0, value, {
      duration: 2.2,
      ease: [0.25, 0.4, 0.25, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return controls.stop;
  }, [isInView, value]);

  return (
    <span ref={ref} className="font-bebas text-5xl xl:text-6xl text-ebg-yellow leading-none">
      {display}{suffix}
    </span>
  );
}

export default function StatsSection() {
  return (
    <section className="py-14 bg-ebg-dark border-y border-ebg-dark-3 relative overflow-hidden">
      {/* Top yellow bar */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-ebg-yellow/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
              className={`flex flex-col items-center justify-center text-center py-8 px-4 ${
                i < STATS.length - 1 ? "border-r border-ebg-dark-3" : ""
              } ${i === 2 ? "border-r-0 lg:border-r border-ebg-dark-3" : ""}`}
            >
              <Counter value={stat.value} suffix={stat.suffix} />
              <span className="text-gray-600 text-[9px] tracking-[0.28em] uppercase mt-2.5">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-ebg-yellow/30 to-transparent" />
    </section>
  );
}
