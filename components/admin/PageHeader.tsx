"use client";

import { motion } from "framer-motion";
import { EASE } from "@/lib/animations";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}

export default function PageHeader({ title, subtitle, action }: PageHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [...EASE] as [number, number, number, number] }}
      className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8"
    >
      <div>
        <div className="flex items-center gap-3 mb-1">
          <div className="w-1 h-6 bg-ebg-yellow" />
          <h1 className="font-bebas text-2xl lg:text-3xl tracking-[0.08em] text-white">{title}</h1>
        </div>
        {subtitle && (
          <p className="text-gray-500 text-sm ml-4">{subtitle}</p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </motion.div>
  );
}
