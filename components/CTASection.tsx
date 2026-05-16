"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { MessageCircle, Phone, ArrowRight } from "lucide-react";
import { EASE, EASE_OUT, VP } from "@/lib/animations";

const WHATSAPP_NUMBER = "594694136273";
const WHATSAPP_MESSAGE =
  "Bonjour%20EBG%20GROUP,%20je%20souhaite%20un%20devis%20pour%20la%20location%20d%27une%20mini-pelle.";

function MagneticButton({
  children,
  className,
  href,
  target,
  rel,
}: {
  children: React.ReactNode;
  className?: string;
  href: string;
  target?: string;
  rel?: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 20, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 150, damping: 20, mass: 0.5 });

  function onMouseMove(e: React.MouseEvent<HTMLAnchorElement>) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.22);
    y.set((e.clientY - cy) * 0.22);
  }

  function onMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      target={target}
      rel={rel}
      style={{ x: springX, y: springY }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      whileTap={{ scale: 0.97 }}
      className={className}
    >
      {children}
    </motion.a>
  );
}

export default function CTASection() {
  return (
    <section
      id="contact"
      className="py-32 bg-ebg-black border-t border-ebg-dark-3 relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-dot-grid opacity-30" />

      {/* Pulsing glow */}
      <motion.div
        className="absolute top-0 right-0 w-[600px] h-[600px] bg-ebg-yellow/[0.04] rounded-full blur-[160px] pointer-events-none"
        animate={{ opacity: [0.6, 1, 0.6], scale: [1, 1.08, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

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
                viewport={VP}
                transition={{ duration: 0.5 }}
                className="text-ebg-yellow text-[10px] tracking-[0.45em] uppercase font-semibold mb-5"
              >
                — Contactez-nous
              </motion.p>

              <h2 className="font-bebas text-[clamp(3rem,6vw,5.5rem)] leading-none tracking-wide mb-6">
                {[
                  { text: "PRÊT À DÉMARRER", yellow: false },
                  { text: "VOTRE PROJET ?", yellow: true },
                ].map((line, i) => (
                  <div key={i} className="overflow-hidden">
                    <motion.div
                      initial={{ y: "105%" }}
                      whileInView={{ y: "0%" }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ duration: 0.85, ease: EASE, delay: 0.1 + i * 0.12 }}
                      className={line.yellow ? "text-ebg-yellow" : "text-white"}
                    >
                      {line.text}
                    </motion.div>
                  </div>
                ))}
              </h2>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={VP}
                transition={{ duration: 0.6, delay: 0.35 }}
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
              viewport={VP}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-col gap-3 min-w-[280px] lg:min-w-[320px]"
            >
              {/* WhatsApp — magnetic */}
              <MagneticButton
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center justify-between w-full px-7 py-5 bg-ebg-yellow text-ebg-black font-bold tracking-[0.15em] uppercase text-[11px] overflow-hidden"
              >
                {/* Hover shimmer */}
                <motion.div
                  className="absolute inset-0 bg-white/10 -translate-x-full skew-x-12"
                  whileHover={{ translateX: "200%" }}
                  transition={{ duration: 0.55, ease: EASE_OUT }}
                />
                <div className="relative flex items-center gap-3">
                  <MessageCircle size={18} />
                  <span>WhatsApp — Devis gratuit</span>
                </div>
                <motion.div
                  className="relative"
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.25, ease: EASE_OUT }}
                >
                  <ArrowRight size={16} />
                </motion.div>
              </MagneticButton>

              {/* Phone */}
              <motion.a
                href="tel:+594694136273"
                whileHover={{ borderColor: "rgba(244,180,0,0.45)", color: "#f4b400" }}
                transition={{ duration: 0.25 }}
                className="group flex items-center justify-between w-full px-7 py-5 border border-ebg-dark-3 text-white font-medium tracking-[0.15em] uppercase text-[11px]"
              >
                <div className="flex items-center gap-3">
                  <Phone size={18} />
                  <span>+594 694 136 273</span>
                </div>
                <motion.div
                  initial={{ x: -4, opacity: 0 }}
                  whileHover={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.25, ease: EASE_OUT }}
                >
                  <ArrowRight size={16} />
                </motion.div>
              </motion.a>

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
