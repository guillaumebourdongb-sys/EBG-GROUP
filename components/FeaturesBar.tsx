"use client";

import { motion } from "framer-motion";
import { Zap, ShieldCheck, MapPin, HardHat } from "lucide-react";

const FEATURES = [
  {
    Icon: Zap,
    title: "Réactivité",
    desc: "Intervention rapide en Guyane",
  },
  {
    Icon: ShieldCheck,
    title: "Matériel récent",
    desc: "Des équipements fiables et entretenus",
  },
  {
    Icon: MapPin,
    title: "Proximité",
    desc: "Basés à Matoury, au cœur de la Guyane",
  },
  {
    Icon: HardHat,
    title: "Professionnels",
    desc: "Une équipe qualifiée à votre service",
  },
];

export default function FeaturesBar() {
  return (
    <section className="bg-ebg-dark-2 border-y border-ebg-dark-3">
      <div className="max-w-[1400px] mx-auto px-6 xl:px-10">
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className={`flex items-start gap-4 px-6 py-7 ${
                i < FEATURES.length - 1 ? "border-r border-ebg-dark-3" : ""
              } ${i === 1 ? "border-r-0 lg:border-r border-ebg-dark-3" : ""}`}
            >
              <div className="shrink-0 mt-0.5">
                <feature.Icon
                  size={26}
                  className="text-ebg-yellow"
                  strokeWidth={1.8}
                />
              </div>
              <div>
                <p className="text-ebg-yellow text-[11px] font-black tracking-[0.2em] uppercase mb-1">
                  {feature.title}
                </p>
                <p className="text-gray-400 text-[12px] leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
