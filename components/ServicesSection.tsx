"use client";

import { motion } from "framer-motion";
import { Wrench, Layers, Truck, Settings, HardHat, Building2, ArrowUpRight } from "lucide-react";

const SERVICES = [
  {
    Icon: Wrench,
    title: "Location Mini-Pelles",
    description:
      "Location de mini-pelles et micro-pelles pour vos travaux de terrassement, excavation, tranchées et nivellement.",
    badge: "Disponible",
    available: true,
    href: "#contact",
  },
  {
    Icon: Layers,
    title: "Terrassement",
    description:
      "Travaux de déblaiement, remblaiement, préparation de terrain et nivellement pour tous types de chantiers.",
    badge: "Bientôt",
    available: false,
    href: "#",
  },
  {
    Icon: Truck,
    title: "Transport",
    description:
      "Transport de matériaux, évacuation des terres et déblais, livraison sur chantier partout en Guyane.",
    badge: "Bientôt",
    available: false,
    href: "#",
  },
  {
    Icon: Settings,
    title: "Maintenance",
    description:
      "Entretien préventif et correctif de votre parc de matériel BTP. Intervention rapide et efficace sur site.",
    badge: "Bientôt",
    available: false,
    href: "#",
  },
  {
    Icon: HardHat,
    title: "Services Chantier",
    description:
      "Coordination logistique, sécurité chantier et gestion opérationnelle pour vos projets de construction.",
    badge: "Bientôt",
    available: false,
    href: "#",
  },
  {
    Icon: Building2,
    title: "Location Matériel BTP",
    description:
      "Extension du parc : pelleteuses, compacteurs, nacelles élévatrices, outils pneumatiques et plus encore.",
    badge: "À venir",
    available: false,
    href: "#",
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="py-32 bg-ebg-black relative overflow-hidden">
      {/* Subtle background */}
      <div className="absolute inset-0 bg-stripe opacity-60" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section header */}
        <div className="mb-20">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-ebg-yellow text-[10px] tracking-[0.45em] uppercase font-semibold mb-5"
          >
            — Nos services
          </motion.p>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-bebas text-[clamp(3rem,7vw,5.5rem)] leading-none tracking-wide text-white"
            >
              TOUT POUR
              <br />
              <span className="text-ebg-yellow">VOS CHANTIERS</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="text-gray-500 max-w-sm text-sm leading-relaxed lg:text-right"
            >
              Une gamme complète de services BTP qui s&apos;étoffe pour
              accompagner chaque étape de vos projets en Guyane.
            </motion.p>
          </div>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
            className="mt-10 h-[1px] bg-gradient-to-r from-ebg-yellow via-ebg-dark-3 to-transparent origin-left"
          />
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({
  service,
  index,
}: {
  service: (typeof SERVICES)[0];
  index: number;
}) {
  const { Icon, title, description, badge, available, href } = service;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.07, duration: 0.65, ease: [0.25, 0.4, 0.25, 1] }}
      className={`group relative bg-ebg-dark border p-8 transition-all duration-500 ${
        available
          ? "border-ebg-yellow/25 hover:border-ebg-yellow"
          : "border-ebg-dark-3 hover:border-ebg-dark-4"
      }`}
    >
      {/* Hover overlay */}
      <div
        className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
          available ? "bg-ebg-yellow/[0.04]" : "bg-white/[0.015]"
        }`}
      />

      {/* Top accent bar on available */}
      {available && (
        <div className="absolute top-0 left-0 w-full h-[2px] bg-ebg-yellow" />
      )}

      <div className="relative flex flex-col h-full">
        {/* Icon row */}
        <div className="flex items-start justify-between mb-7">
          <div
            className={`w-11 h-11 flex items-center justify-center transition-colors ${
              available
                ? "bg-ebg-yellow/10 group-hover:bg-ebg-yellow/15"
                : "bg-ebg-dark-3"
            }`}
          >
            <Icon
              size={20}
              className={available ? "text-ebg-yellow" : "text-gray-600"}
            />
          </div>
          <span
            className={`text-[9px] tracking-[0.2em] uppercase px-3 py-1.5 font-bold ${
              available
                ? "text-ebg-yellow bg-ebg-yellow/10"
                : "text-gray-600 bg-ebg-dark-3"
            }`}
          >
            {badge}
          </span>
        </div>

        {/* Title */}
        <h3
          className={`font-bebas text-[1.5rem] tracking-wide mb-3 transition-colors duration-300 ${
            available
              ? "text-white group-hover:text-ebg-yellow"
              : "text-gray-400"
          }`}
        >
          {title}
        </h3>

        {/* Description */}
        <p className="text-gray-500 text-sm leading-relaxed mb-8 flex-1">
          {description}
        </p>

        {/* CTA */}
        {available ? (
          <a
            href={href}
            className="inline-flex items-center gap-2 text-ebg-yellow text-[10px] tracking-[0.25em] uppercase font-semibold hover:gap-3 transition-all duration-300 group/link"
          >
            Demander un devis
            <ArrowUpRight size={13} className="group-hover/link:rotate-12 transition-transform" />
          </a>
        ) : (
          <span className="text-gray-700 text-[10px] tracking-[0.2em] uppercase">
            En développement
          </span>
        )}
      </div>
    </motion.div>
  );
}
