"use client";

import { motion } from "framer-motion";
import { PenLine, MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = "594694136273";
const WHATSAPP_MESSAGE =
  "Bonjour%20EBG%20GROUP,%20je%20souhaite%20un%20devis%20pour%20la%20location%20de%20mat%C3%A9riel.";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.3 },
  },
};

const item = {
  hidden: { opacity: 0, y: 36 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.25, 0.4, 0.25, 1] } },
};

export default function HeroSection() {
  return (
    <section
      id="accueil"
      className="relative min-h-screen bg-ebg-black overflow-hidden flex items-stretch"
    >
      {/* ── RIGHT: Photo area ──────────────────────────────────────── */}
      <div className="absolute inset-y-0 right-0 w-full lg:w-[62%]">
        {/*
          Photo placeholder — remplacer ce div par :
          <Image src="/images/hero-excavator.jpg" alt="EBG GROUP mini-pelle en Guyane"
                 fill className="object-cover object-center" priority />
        */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(140deg, #1c0f00 0%, #3b1f00 25%, #6b3a00 45%, #4a2900 65%, #1a1000 85%, #0a0a0a 100%)",
          }}
        />
        {/* Texture overlay */}
        <div className="absolute inset-0 bg-stripe opacity-20" />
        {/* Blended shadow toward left (dark section) */}
        <div className="absolute inset-0 bg-gradient-to-r from-ebg-black via-ebg-black/75 lg:via-ebg-black/40 to-transparent" />
        {/* Bottom vignette */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-ebg-black to-transparent" />
        {/* Subtle yellow glow mid-right */}
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-amber-500/[0.07] blur-[120px] pointer-events-none" />
      </div>

      {/* ── LEFT: Content ──────────────────────────────────────────── */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 xl:px-10 flex items-center">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="w-full lg:w-[52%] xl:w-[48%] py-36 flex flex-col"
        >
          {/* Main logo headline */}
          <motion.div variants={item} className="mb-3">
            <h1 className="font-bebas leading-[0.87] tracking-[0.06em]">
              <span className="block text-white" style={{ fontSize: "clamp(5.5rem, 13vw, 10.5rem)" }}>
                EBG
              </span>
              <span className="block text-ebg-yellow" style={{ fontSize: "clamp(5.5rem, 13vw, 10.5rem)" }}>
                GROUP
              </span>
            </h1>
          </motion.div>

          {/* Tagline */}
          <motion.h2
            variants={item}
            className="font-sans font-black text-white uppercase leading-tight mb-3"
            style={{ fontSize: "clamp(1rem, 2vw, 1.35rem)", letterSpacing: "0.04em" }}
          >
            Location de matériel<br />
            &amp; solutions chantier<br />
            en Guyane
          </motion.h2>

          {/* Description */}
          <motion.p variants={item} className="text-gray-400 text-sm leading-relaxed max-w-[320px] mb-9">
            Du matériel performant, un service réactif et des solutions
            adaptées à tous vos projets.
          </motion.p>

          {/* CTA buttons */}
          <motion.div variants={item} className="flex flex-wrap gap-3">
            <a
              href="#contact"
              className="group inline-flex items-center gap-2.5 px-7 py-3.5 bg-ebg-yellow text-ebg-black text-[11px] font-black tracking-[0.18em] uppercase hover:bg-ebg-yellow-light transition-colors duration-200"
            >
              <PenLine size={14} strokeWidth={2.5} />
              Demander un devis
            </a>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-ebg-dark border border-ebg-dark-3 text-white text-[11px] font-semibold tracking-[0.18em] uppercase hover:border-ebg-yellow/40 hover:text-ebg-yellow transition-all duration-200"
            >
              <WhatsAppIcon />
              WhatsApp
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-[15px] h-[15px] fill-current shrink-0">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}
