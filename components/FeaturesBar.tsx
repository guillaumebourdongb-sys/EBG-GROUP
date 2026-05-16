"use client";

import { motion } from "framer-motion";
import { Zap, ShieldCheck, MapPin, HardHat, type LucideIcon } from "lucide-react";
import { EASE, EASE_OUT, VP } from "@/lib/animations";

const FEATURES: { Icon: LucideIcon; title: string; desc: string }[] = [
  { Icon: Zap,        title: "Réactivité",      desc: "Intervention rapide en Guyane" },
  { Icon: ShieldCheck,title: "Matériel récent",  desc: "Des équipements fiables et entretenus" },
  { Icon: MapPin,     title: "Proximité",        desc: "Basés à Matoury, au cœur de la Guyane" },
  { Icon: HardHat,    title: "Professionnels",   desc: "Une équipe qualifiée à votre service" },
];

const card = {
  hidden:   { opacity: 0, y: 22 },
  visible:  { opacity: 1, y: 0 },
  hovered:  { opacity: 1, y: 0 },
};

// scaleY: 0 in visible prevents a spurious reveal during the scroll entrance
const accentBarVariants = {
  hidden:   { scaleY: 0 },
  visible:  { scaleY: 0, transition: { duration: 0 } },
  hovered:  { scaleY: 1, transition: { duration: 0.35, ease: EASE } },
};

const hoverTintVariants = {
  hidden:   { opacity: 0 },
  visible:  { opacity: 0 },
  hovered:  { opacity: 1, transition: { duration: 0.2 } },
};

const iconBoxVariants = {
  hidden:   {},
  visible:  {},
  hovered:  { scale: 1.12, backgroundColor: "rgba(244,180,0,0.2)", transition: { duration: 0.25, ease: EASE_OUT } },
};

const iconRotateVariants = {
  hidden:   {},
  visible:  {},
  hovered:  { rotate: -8, transition: { duration: 0.3, ease: EASE } },
};

const textNudgeVariants = {
  hidden:   {},
  visible:  {},
  hovered:  { x: 5, transition: { duration: 0.3, ease: EASE_OUT } },
};

function cardBorderClass(i: number): string {
  if (i === FEATURES.length - 1) return "";
  if (i === 1) return "border-r-0 lg:border-r border-ebg-dark-3";
  return "border-r border-ebg-dark-3";
}

export default function FeaturesBar() {
  return (
    <section className="bg-ebg-dark-2 border-y border-ebg-dark-3">
      <div className="max-w-[1400px] mx-auto px-6 xl:px-10">
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((feature, i) => (
            <motion.div
              key={feature.title}
              variants={card}
              initial="hidden"
              whileInView="visible"
              whileHover="hovered"
              viewport={VP}
              transition={{ delay: i * 0.09, duration: 0.7, ease: EASE }}
              className={`relative flex items-start gap-4 px-6 py-8 overflow-hidden cursor-default ${cardBorderClass(i)}`}
            >
              {/* Yellow left accent bar — scaleY 0→1 on hover, suppressed during scroll entrance */}
              <motion.div
                className="absolute left-0 inset-y-0 w-[2px] bg-ebg-yellow origin-top"
                variants={accentBarVariants}
              />

              <motion.div
                className="absolute inset-0 bg-ebg-yellow/[0.04] pointer-events-none"
                variants={hoverTintVariants}
              />

              <motion.div
                className="relative shrink-0 w-11 h-11 flex items-center justify-center bg-ebg-yellow/10"
                variants={iconBoxVariants}
              >
                <motion.div variants={iconRotateVariants}>
                  <feature.Icon size={22} className="text-ebg-yellow" strokeWidth={1.8} />
                </motion.div>
              </motion.div>

              <motion.div className="relative" variants={textNudgeVariants}>
                <p className="text-ebg-yellow text-[11px] font-black tracking-[0.22em] uppercase mb-1.5">
                  {feature.title}
                </p>
                <p className="text-gray-400 text-[12px] leading-relaxed">
                  {feature.desc}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
