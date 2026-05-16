"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";

const NAV_LINKS = [
  { label: "Accueil", href: "#accueil" },
  { label: "Services", href: "#services" },
  { label: "À propos", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const WHATSAPP_NUMBER = "594694000000";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

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
        transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-ebg-black/95 backdrop-blur-xl border-b border-ebg-dark-3"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-20">

            {/* Logo */}
            <a href="#accueil" className="flex items-center gap-3 group">
              <div className="w-9 h-9 bg-ebg-yellow flex items-center justify-center shrink-0 group-hover:bg-ebg-yellow-light transition-colors duration-300">
                <span className="font-bebas text-ebg-black text-xl leading-none tracking-wide">E</span>
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-bebas text-[22px] tracking-[0.25em] text-white">EBG</span>
                <span className="text-[9px] tracking-[0.35em] text-ebg-yellow uppercase font-semibold">
                  GROUP
                </span>
              </div>
            </a>

            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-10">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="relative text-[11px] tracking-[0.25em] uppercase text-gray-400 hover:text-white transition-colors duration-300 group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-ebg-yellow group-hover:w-full transition-all duration-300" />
                </a>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center gap-5">
              <a
                href="tel:+594694000000"
                className="flex items-center gap-2 text-[11px] tracking-wider text-gray-500 hover:text-white transition-colors"
              >
                <Phone size={13} />
                <span>+594 694 00 00 00</span>
              </a>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2.5 bg-ebg-yellow text-ebg-black text-[11px] font-bold tracking-[0.2em] uppercase hover:bg-ebg-yellow-light transition-colors duration-300"
              >
                WhatsApp
              </a>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="md:hidden p-2 text-white hover:text-ebg-yellow transition-colors"
              aria-label="Menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
            className="fixed inset-0 z-40 bg-ebg-black flex flex-col"
          >
            {/* Yellow left accent */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-ebg-yellow" />

            <div className="flex flex-col gap-1 pt-28 px-10 flex-1">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 * i, duration: 0.4 }}
                  onClick={() => setMobileOpen(false)}
                  className="font-bebas text-5xl tracking-widest text-white hover:text-ebg-yellow transition-colors duration-200 py-3 border-b border-ebg-dark-3"
                >
                  {link.label}
                </motion.a>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.4 }}
              className="p-8 pb-12 space-y-3"
            >
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center w-full py-4 bg-ebg-yellow text-ebg-black font-bold tracking-[0.2em] uppercase text-sm"
              >
                Nous contacter sur WhatsApp
              </a>
              <a
                href="tel:+594694000000"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center w-full py-4 border border-ebg-dark-3 text-gray-400 text-sm tracking-wider hover:text-white transition-colors"
              >
                +594 694 00 00 00
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
