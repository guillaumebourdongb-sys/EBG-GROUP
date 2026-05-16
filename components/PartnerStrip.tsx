"use client";

import { motion } from "framer-motion";
import { CalendarCheck, Users, MapPin, Headphones } from "lucide-react";
import { EASE, VP } from "@/lib/animations";

const STATS = [
  { Icon: CalendarCheck, value: "100%", label: "Disponible" },
  { Icon: Users, value: "+", label: "Clients satisfaits" },
  { Icon: MapPin, value: "Guyane", label: "Notre territoire" },
  { Icon: Headphones, value: "7j/7", label: "À votre écoute" },
];

export default function PartnerStrip() {
  return (
    <section className="flex flex-col lg:flex-row min-h-[160px]">
      {/* Yellow left block with diagonal cut */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={VP}
        transition={{ duration: 0.75, ease: EASE }}
        className="relative bg-ebg-yellow flex items-center px-10 xl:px-16 py-10 lg:py-0 shrink-0 lg:w-auto"
        style={{ clipPath: "polygon(0 0, 100% 0, 92% 100%, 0 100%)" }}
      >
        <div className="pr-12">
          <h2
            className="font-bebas text-ebg-black leading-tight tracking-wide"
            style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)" }}
          >
            EBG GROUP,
            <br />
            VOTRE PARTENAIRE
            <br />
            DE CONFIANCE EN GUYANE.
          </h2>
        </div>
      </motion.div>

      {/* Dark right block with stats */}
      <div className="bg-ebg-dark flex-1 flex items-center px-6 xl:px-12">
        <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-6 py-8 lg:py-0">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VP}
              transition={{ delay: 0.2 + i * 0.09, duration: 0.55, ease: EASE }}
              className="flex items-center gap-3 group cursor-default"
            >
              <motion.div
                initial={{ rotate: -15, opacity: 0 }}
                whileInView={{ rotate: 0, opacity: 1 }}
                viewport={VP}
                transition={{ delay: 0.3 + i * 0.09, duration: 0.6, ease: EASE }}
                whileHover={{ rotate: -8, scale: 1.1 }}
              >
                <stat.Icon
                  size={28}
                  className="text-ebg-yellow shrink-0"
                  strokeWidth={1.5}
                />
              </motion.div>
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={VP}
                  transition={{ delay: 0.35 + i * 0.09, duration: 0.5 }}
                  className="font-bebas text-2xl xl:text-3xl text-white leading-none group-hover:text-ebg-yellow transition-colors duration-300"
                >
                  {stat.value}
                </motion.div>
                <div className="text-gray-500 text-[9px] tracking-[0.22em] uppercase mt-0.5">
                  {stat.label}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
