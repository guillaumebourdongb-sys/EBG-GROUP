"use client";

import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = "594694000000";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.11, delayChildren: 0.5 },
  },
};

const item = {
  hidden: { opacity: 0, y: 50 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: [0.25, 0.4, 0.25, 1] },
  },
};

export default function HeroSection() {
  return (
    <section
      id="accueil"
      className="relative min-h-screen flex items-center bg-ebg-black overflow-hidden"
    >
      {/* Layered backgrounds */}
      <div className="absolute inset-0 bg-dot-grid opacity-50" />
      <div className="absolute inset-0 bg-gradient-to-br from-ebg-black via-ebg-black to-ebg-dark-2" />

      {/* Yellow atmospheric glows */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] rounded-full bg-ebg-yellow/[0.04] blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 w-[300px] h-[300px] rounded-full bg-ebg-yellow/[0.03] blur-[100px] pointer-events-none" />

      {/* Left yellow edge bar */}
      <div className="absolute left-0 top-0 w-[3px] h-full bg-gradient-to-b from-transparent via-ebg-yellow to-transparent opacity-70" />

      {/* Decorative large text watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <span className="font-bebas text-[35vw] leading-none text-white/[0.015] select-none tracking-wider">
          EBG
        </span>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full pt-28 pb-24 lg:pt-32 lg:pb-32">
        <div className="grid lg:grid-cols-[1fr_420px] xl:grid-cols-[1fr_500px] gap-12 xl:gap-20 items-center">

          {/* Left: Main content */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="flex flex-col"
          >
            {/* Tag */}
            <motion.div variants={item} className="mb-8">
              <span className="inline-flex items-center gap-3 px-4 py-2 border border-ebg-yellow/25 text-ebg-yellow text-[10px] tracking-[0.35em] uppercase font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-ebg-yellow animate-pulse" />
                Guyane Française &middot; BTP &middot; Construction
              </span>
            </motion.div>

            {/* Headline */}
            <motion.div variants={item}>
              <h1 className="font-bebas text-[clamp(4.5rem,11vw,9.5rem)] leading-[0.88] tracking-wide text-white">
                PUISSANCE
              </h1>
            </motion.div>
            <motion.div variants={item} className="mb-7">
              <h1 className="font-bebas text-[clamp(4.5rem,11vw,9.5rem)] leading-[0.88] tracking-wide text-ebg-yellow">
                &amp;&nbsp;PRÉCISION.
              </h1>
            </motion.div>

            {/* Yellow accent bar */}
            <motion.div
              variants={item}
              className="w-20 h-[3px] bg-ebg-yellow mb-9"
            />

            {/* Description */}
            <motion.p
              variants={item}
              className="text-gray-400 text-[1.05rem] leading-[1.75] max-w-[520px] mb-11"
            >
              Votre partenaire BTP de confiance en Guyane française.
              Location de mini-pelles et matériel de chantier pour tous
              vos projets — terrassement, excavation, construction.
            </motion.p>

            {/* CTA buttons */}
            <motion.div variants={item} className="flex flex-wrap gap-4">
              <a
                href="#services"
                className="group inline-flex items-center gap-3 px-8 py-4 bg-ebg-yellow text-ebg-black text-[11px] font-bold tracking-[0.22em] uppercase hover:bg-ebg-yellow-light transition-all duration-300"
              >
                Nos services
                <ArrowRight
                  size={15}
                  className="group-hover:translate-x-1.5 transition-transform duration-300"
                />
              </a>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 px-8 py-4 border border-white/15 text-white text-[11px] font-medium tracking-[0.22em] uppercase hover:border-ebg-yellow/50 hover:text-ebg-yellow transition-all duration-300"
              >
                <MessageCircle size={15} />
                WhatsApp
              </a>
            </motion.div>
          </motion.div>

          {/* Right: Premium visual card */}
          <motion.div
            initial={{ opacity: 0, x: 60, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
            className="hidden lg:block"
          >
            <HeroCard />
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2.5 text-gray-600"
        >
          <span className="text-[9px] tracking-[0.4em] uppercase">Défiler</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="w-px h-14 bg-gradient-to-b from-gray-600 to-transparent"
          />
        </motion.div>
      </div>
    </section>
  );
}

function HeroCard() {
  return (
    <div className="relative w-full aspect-[4/5]">
      {/* Outer ghost frame */}
      <div className="absolute inset-6 border border-white/[0.04]" />

      {/* Floating accent box top-right */}
      <div className="absolute top-0 right-0 w-14 h-14 bg-ebg-yellow" />

      {/* Main card */}
      <div className="absolute top-10 left-0 right-6 bottom-0 bg-ebg-dark border border-ebg-dark-3 overflow-hidden">
        {/* Inner line grid */}
        <div className="absolute inset-0 bg-line-grid" />

        {/* Top yellow accent bar */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-ebg-yellow" />

        {/* Watermark text */}
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
          <span className="font-bebas text-[11rem] leading-none text-white/[0.025] select-none tracking-widest">
            EBG
          </span>
        </div>

        {/* Content */}
        <div className="relative p-7 flex flex-col h-full">
          {/* Header info */}
          <div className="mb-auto">
            <p className="text-ebg-yellow text-[9px] tracking-[0.35em] uppercase font-semibold mb-1.5">
              Guyane Française · Dep. 973
            </p>
            <p className="text-white text-sm font-medium tracking-wide">
              Location · Terrassement · Transport
            </p>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-3 mt-8">
            <div className="bg-ebg-black/60 border border-ebg-dark-3 p-4 hover:border-ebg-yellow/20 transition-colors">
              <div className="font-bebas text-3xl text-ebg-yellow leading-none mb-1">100%</div>
              <div className="text-gray-600 text-[9px] tracking-[0.22em] uppercase">Engagement</div>
            </div>
            <div className="bg-ebg-black/60 border border-ebg-dark-3 p-4 hover:border-white/10 transition-colors">
              <div className="font-bebas text-3xl text-white leading-none mb-1">24/7</div>
              <div className="text-gray-600 text-[9px] tracking-[0.22em] uppercase">Disponibilité</div>
            </div>
            <div className="col-span-2 bg-ebg-yellow/[0.07] border border-ebg-yellow/20 p-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-1.5 h-1.5 rounded-full bg-ebg-yellow" />
                <span className="text-ebg-yellow text-[9px] tracking-[0.25em] uppercase font-bold">
                  Location Mini-Pelles
                </span>
              </div>
              <p className="text-gray-500 text-[10px] tracking-wide">
                Disponible maintenant — Devis gratuit
              </p>
            </div>
          </div>

          {/* Bottom coordinates */}
          <div className="mt-4 font-mono text-[9px] text-gray-700 tracking-wider">
            <span>4°56&apos;N 52°19&apos;W &mdash; GUYANE 🇬🇫</span>
          </div>
        </div>

        {/* Corner accents */}
        <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-ebg-yellow" />
        <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-ebg-yellow/40" />
      </div>

      {/* Floating dots bottom-left */}
      <div className="absolute bottom-4 left-1 grid grid-cols-4 gap-1.5">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="w-1 h-1 rounded-full bg-ebg-yellow/20"
          />
        ))}
      </div>
    </div>
  );
}
