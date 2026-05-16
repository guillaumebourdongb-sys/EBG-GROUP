"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";

const NAV_LINKS = [
  { label: "Accueil", href: "#accueil" },
  { label: "Location", href: "#services" },
  { label: "Services", href: "#services" },
  { label: "À propos", href: "#about" },
  { label: "Réalisations", href: "#realisations" },
  { label: "Contact", href: "#contact" },
];

const WHATSAPP_NUMBER = "594694136273";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-ebg-black/97 backdrop-blur-xl border-b border-ebg-dark-3"
            : "bg-ebg-black/80 backdrop-blur-md"
        }`}
      >
        {/* Scroll progress bar */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[2px] bg-ebg-yellow origin-left"
          style={{ scaleX }}
        />
        <div className="max-w-[1400px] mx-auto px-6 xl:px-10">
          <div className="flex items-center justify-between h-[70px]">

            {/* Logo */}
            <a href="#accueil" className="flex items-start gap-2 leading-none group">
              <div>
                <div className="font-bebas text-[26px] text-white tracking-[0.12em] leading-none group-hover:text-gray-100 transition-colors">
                  EBG
                </div>
                <div className="font-bebas text-[13px] text-ebg-yellow tracking-[0.35em] leading-none">
                  GROUP
                </div>
              </div>
            </a>

            {/* Desktop nav */}
            <div className="hidden lg:flex items-center gap-7 xl:gap-9">
              {NAV_LINKS.map((link, i) => (
                <a
                  key={link.label}
                  href={link.href}
                  className={`text-[11px] tracking-[0.2em] uppercase transition-colors duration-200 relative group ${
                    i === 0
                      ? "text-white after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[2px] after:bg-ebg-yellow"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {link.label}
                  {i !== 0 && (
                    <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-ebg-yellow group-hover:w-full transition-all duration-300" />
                  )}
                </a>
              ))}
            </div>

            {/* Right: Phone + CTA */}
            <div className="hidden lg:flex items-center gap-5">
              <a
                href="tel:+594694136273"
                className="flex items-center gap-2 text-ebg-yellow text-[12px] tracking-wide hover:text-ebg-yellow-light transition-colors"
              >
                <Phone size={13} strokeWidth={2.5} />
                <span className="font-medium">0694 136 273</span>
              </a>
              <a
                href="#contact"
                className="px-5 py-2.5 bg-ebg-yellow text-ebg-black text-[11px] font-black tracking-[0.18em] uppercase hover:bg-ebg-yellow-light transition-colors duration-200"
              >
                Demander un devis
              </a>
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="lg:hidden p-2 text-white hover:text-ebg-yellow transition-colors"
              aria-label="Menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.35, ease: [0.25, 0.4, 0.25, 1] }}
            className="fixed inset-0 z-40 bg-ebg-black flex flex-col"
          >
            <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-ebg-yellow" />
            <div className="flex flex-col pt-24 px-10 flex-1 gap-0">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.06 * i, duration: 0.35 }}
                  onClick={() => setMobileOpen(false)}
                  className="font-bebas text-5xl tracking-widest text-white hover:text-ebg-yellow transition-colors py-3 border-b border-ebg-dark-3"
                >
                  {link.label}
                </motion.a>
              ))}
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="p-8 pb-12 space-y-3"
            >
              <a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center w-full py-4 bg-ebg-yellow text-ebg-black font-black tracking-[0.18em] uppercase text-sm"
              >
                Demander un devis
              </a>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center w-full py-4 border border-ebg-dark-3 text-gray-400 text-sm tracking-wider hover:text-white transition-colors"
              >
                WhatsApp
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
