"use client";

import { motion } from "framer-motion";
import { MapPin, Shield, Zap, Users } from "lucide-react";
import { EASE, EASE_OUT, VP, VP_TIGHT } from "@/lib/animations";

const VALUES = [
  {
    Icon: Shield,
    title: "Fiabilité",
    desc: "Matériel certifié, régulièrement entretenu et disponible.",
  },
  {
    Icon: Zap,
    title: "Réactivité",
    desc: "Intervention rapide sur tous vos chantiers.",
  },
  {
    Icon: MapPin,
    title: "Ancrage local",
    desc: "Entreprise guyanaise, au service du territoire.",
  },
  {
    Icon: Users,
    title: "Partenariat",
    desc: "Des relations durables basées sur la confiance.",
  },
];

const HEADING_LINES = [
  { text: "ANCRÉS EN GUYANE,", yellow: false },
  { text: "TOURNÉS VERS", yellow: true },
  { text: "L'AVENIR.", yellow: false },
];


export default function AboutSection() {
  return (
    <section id="about" className="py-32 bg-ebg-dark border-t border-ebg-dark-3 relative overflow-hidden">
      {/* Background watermark */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none overflow-hidden">
        <span className="font-bebas text-[22vw] leading-none text-white/[0.015] select-none tracking-widest">
          BTP
        </span>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 xl:gap-24 items-center">

          {/* Left: Text content */}
          <div>
            {/* Label */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VP}
              transition={{ duration: 0.5 }}
              className="text-ebg-yellow text-[10px] tracking-[0.45em] uppercase font-semibold mb-5"
            >
              — À propos
            </motion.p>

            {/* Line-by-line heading reveal */}
            <h2 className="font-bebas text-[clamp(2.8rem,6vw,5rem)] leading-none tracking-wide mb-10">
              {HEADING_LINES.map((line, i) => (
                <div key={i} className="overflow-hidden">
                  <motion.div
                    initial={{ y: "105%" }}
                    whileInView={{ y: "0%" }}
                    viewport={VP_TIGHT}
                    transition={{ duration: 0.9, ease: EASE, delay: 0.1 + i * 0.1 }}
                    className={line.yellow ? "text-ebg-yellow" : "text-white"}
                  >
                    {line.text}
                  </motion.div>
                </div>
              ))}
            </h2>

            {/* Body text */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={VP}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-4 text-gray-400 text-[0.95rem] leading-[1.8] mb-12"
            >
              <p>
                EBG GROUP est une entreprise guyanaise fondée pour répondre
                aux besoins du secteur BTP en pleine croissance en Guyane française.
                Nous débutons avec la location de mini-pelles et développons
                progressivement une offre complète pour les professionnels et
                les particuliers.
              </p>
              <p>
                Notre ambition : devenir le partenaire BTP de référence sur le
                territoire guyanais, en alliant qualité de matériel,
                réactivité opérationnelle et engagement client sans compromis.
              </p>
            </motion.div>

            {/* Values cards */}
            <div className="grid grid-cols-2 gap-3">
              {VALUES.map((value, i) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -3, borderColor: "rgba(244,180,0,0.25)" }}
                  viewport={VP}
                  transition={{ delay: 0.3 + i * 0.09, duration: 0.5 }}
                  className="group flex items-start gap-3 p-4 bg-ebg-black border border-ebg-dark-3 cursor-default"
                >
                  <div className="w-8 h-8 shrink-0 flex items-center justify-center bg-ebg-yellow/10 group-hover:bg-ebg-yellow/20 transition-colors duration-200">
                    <value.Icon size={15} className="text-ebg-yellow" />
                  </div>
                  <div>
                    <div className="text-white text-[13px] font-semibold mb-1">
                      {value.title}
                    </div>
                    <div className="text-gray-600 text-[11px] leading-relaxed">
                      {value.desc}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: Visual card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={VP}
            transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
          >
            <AboutCard />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function AboutCard() {
  return (
    <div className="relative">
      {/* Main card */}
      <div className="relative bg-ebg-black border border-ebg-dark-3 p-10 overflow-hidden">
        {/* Yellow top accent — animates in */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={VP}
          transition={{ duration: 0.6, delay: 0.4, ease: EASE }}
          className="absolute top-0 left-0 w-20 h-[3px] bg-ebg-yellow origin-left"
        />

        {/* Subtle bg grid */}
        <div className="absolute inset-0 bg-line-grid opacity-60" />

        <div className="relative space-y-8">
          {/* Location header */}
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 bg-ebg-yellow flex items-center justify-center shrink-0">
              <MapPin size={18} className="text-ebg-black" />
            </div>
            <div>
              <div className="text-white font-semibold text-sm">Guyane Française</div>
              <div className="text-gray-500 text-xs mt-0.5">Zone d&apos;intervention principale</div>
            </div>
          </div>

          <div className="h-px bg-ebg-dark-3" />

          {/* Key figures */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <div className="font-bebas text-5xl text-ebg-yellow leading-none">2024</div>
              <div className="text-gray-600 text-[9px] tracking-[0.28em] uppercase mt-2">
                Année de fondation
              </div>
            </div>
            <div>
              <div className="font-bebas text-5xl text-white leading-none">973</div>
              <div className="text-gray-600 text-[9px] tracking-[0.28em] uppercase mt-2">
                Département outre-mer
              </div>
            </div>
          </div>

          <div className="h-px bg-ebg-dark-3" />

          {/* Vision */}
          <div>
            <p className="text-ebg-yellow text-[9px] tracking-[0.35em] uppercase font-semibold mb-3">
              Notre vision
            </p>
            <p className="text-gray-300 text-sm leading-relaxed">
              &ldquo;Devenir le leader guyanais de la location de matériel BTP,
              en offrant des services premium à la hauteur des ambitions
              de notre territoire.&rdquo;
            </p>
          </div>

          {/* Services pills */}
          <div className="flex flex-wrap gap-2">
            {["Mini-pelles", "Terrassement", "Transport", "Maintenance"].map(
              (tag) => (
                <motion.span
                  key={tag}
                  whileHover={{ borderColor: "rgba(244,180,0,0.35)", color: "#9ca3af" }}
                  transition={{ duration: 0.2 }}
                  className="text-[9px] tracking-[0.18em] uppercase px-3 py-1.5 border border-ebg-dark-3 text-gray-600 cursor-default"
                >
                  {tag}
                </motion.span>
              )
            )}
          </div>
        </div>

        {/* Corner accent */}
        <div className="absolute bottom-0 right-0 w-7 h-7 border-b-2 border-r-2 border-ebg-yellow/30" />
      </div>

      {/* Shadow block */}
      <div className="absolute -bottom-3 -right-3 w-full h-full bg-ebg-yellow/[0.04] border border-ebg-yellow/10 -z-10" />
    </div>
  );
}
