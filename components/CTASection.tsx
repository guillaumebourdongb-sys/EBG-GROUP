"use client";

import { motion } from "framer-motion";
import { MessageCircle, Phone, ArrowRight } from "lucide-react";

const WHATSAPP_NUMBER = "594694000000";
const WHATSAPP_MESSAGE =
  "Bonjour%20EBG%20GROUP,%20je%20souhaite%20un%20devis%20pour%20la%20location%20d%27une%20mini-pelle.";

export default function CTASection() {
  return (
    <section
      id="contact"
      className="py-32 bg-ebg-black border-t border-ebg-dark-3 relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-dot-grid opacity-30" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-ebg-yellow/[0.03] rounded-full blur-[160px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        <div className="relative bg-ebg-dark border border-ebg-dark-3 p-10 lg:p-16 xl:p-20 overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute inset-0 bg-line-grid opacity-40" />
          <div className="absolute left-0 top-12 bottom-12 w-[3px] bg-ebg-yellow" />
          <div className="absolute top-0 right-0 w-20 h-20 bg-ebg-yellow" />
          <div className="absolute top-3 right-3 font-bebas text-ebg-black text-4xl leading-none select-none pointer-events-none">
            ▸
          </div>
          <div className="absolute bottom-0 left-16 w-40 h-[2px] bg-gradient-to-r from-ebg-yellow/40 to-transparent" />

          <div className="relative grid lg:grid-cols-[1fr_auto] gap-12 xl:gap-20 items-center">
            {/* Text */}
            <div>
              <motion.p
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-ebg-yellow text-[10px] tracking-[0.45em] uppercase font-semibold mb-5"
              >
                — Contactez-nous
              </motion.p>

              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="font-bebas text-[clamp(3rem,6vw,5.5rem)] leading-none tracking-wide text-white mb-6"
              >
                PRÊT À DÉMARRER
                <br />
                <span className="text-ebg-yellow">VOTRE PROJET ?</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-gray-400 text-[1rem] leading-[1.75] max-w-lg"
              >
                Obtenez un devis gratuit en quelques minutes. Notre équipe
                est disponible pour répondre à toutes vos questions et
                planifier la mise à disposition du matériel.
              </motion.p>
            </div>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-col gap-3 min-w-[280px] lg:min-w-[320px]"
            >
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between w-full px-7 py-5 bg-ebg-yellow text-ebg-black font-bold tracking-[0.15em] uppercase text-[11px] hover:bg-ebg-yellow-light transition-colors duration-300"
              >
                <div className="flex items-center gap-3">
                  <MessageCircle size={18} />
                  <span>WhatsApp — Devis gratuit</span>
                </div>
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1.5 transition-transform duration-300"
                />
              </a>

              <a
                href="tel:+594694000000"
                className="group flex items-center justify-between w-full px-7 py-5 border border-ebg-dark-3 text-white font-medium tracking-[0.15em] uppercase text-[11px] hover:border-ebg-yellow/40 hover:text-ebg-yellow transition-all duration-300"
              >
                <div className="flex items-center gap-3">
                  <Phone size={18} />
                  <span>+594 694 00 00 00</span>
                </div>
                <ArrowRight
                  size={16}
                  className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300"
                />
              </a>

              <p className="text-center text-gray-700 text-[10px] tracking-[0.2em] uppercase mt-1">
                Réponse garantie sous 24h &middot; Devis 100% gratuit
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
