"use client";

import { motion } from "framer-motion";
import { Calendar, FileText, Users, Wrench, TrendingUp } from "lucide-react";
import type { ActivityEvent } from "@/lib/admin/types";
import { EASE } from "@/lib/animations";

const ICON_MAP = {
  location: { Icon: Calendar,   color: "text-ebg-yellow",  bg: "bg-ebg-yellow/10"  },
  devis:    { Icon: FileText,   color: "text-blue-400",    bg: "bg-blue-400/10"    },
  client:   { Icon: Users,      color: "text-emerald-400", bg: "bg-emerald-400/10" },
  machine:  { Icon: Wrench,     color: "text-orange-400",  bg: "bg-orange-400/10"  },
  finance:  { Icon: TrendingUp, color: "text-violet-400",  bg: "bg-violet-400/10"  },
};

export default function ActivityFeed({ events }: { events: ActivityEvent[] }) {
  return (
    <ul className="space-y-1">
      {events.map((event, i) => {
        const { Icon, color, bg } = ICON_MAP[event.type];
        return (
          <motion.li
            key={event.id}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.05 * i, duration: 0.35, ease: [...EASE] as [number, number, number, number] }}
            className="flex items-start gap-3 py-3 border-b border-ebg-dark-3 last:border-0"
          >
            <div className={`w-7 h-7 shrink-0 flex items-center justify-center ${bg}`}>
              <Icon size={13} className={color} strokeWidth={2} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-gray-300 text-[12px] leading-snug">{event.message}</p>
              <p className="text-gray-600 text-[10px] mt-0.5">{event.time}</p>
            </div>
          </motion.li>
        );
      })}
    </ul>
  );
}
