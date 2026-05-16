"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const SERVICES = [
  {
    title: "Location de matériel",
    desc: "Mini-pelles, compacteurs, nacelles, groupes électrogènes et plus encore.",
    bg: "linear-gradient(150deg, #2d1500 0%, #5c3200 40%, #3d2000 70%, #111 100%)",
    href: "#contact",
  },
  {
    title: "Terrassement",
    desc: "Préparation de terrain, fouilles, nivellement, remblaiement…",
    bg: "linear-gradient(150deg, #1a1200 0%, #4a3500 40%, #2d2000 70%, #111 100%)",
    href: "#contact",
  },
  {
    title: "Transport",
    desc: "Évacuation de déblais, livraison de matériaux, transport d'engins.",
    bg: "linear-gradient(150deg, #0f1520 0%, #1e2d40 40%, #152030 70%, #111 100%)",
    href: "#contact",
  },
  {
    title: "Maintenance",
    desc: "Entretien, dépannage et suivi de vos équipements.",
    bg: "linear-gradient(150deg, #141414 0%, #1e1e1e 40%, #171717 70%, #111 100%)",
    href: "#contact",
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="bg-ebg-black pt-20 pb-0">
      {/* Header */}
      <div className="max-w-[1400px] mx-auto px-6 xl:px-10 text-center mb-12">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-ebg-yellow text-[10px] tracking-[0.5em] uppercase font-bold mb-4"
        >
          Nos activités
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, delay: 0.08 }}
          className="font-sans font-black text-white uppercase leading-tight"
          style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.5rem)", letterSpacing: "0.04em" }}
        >
          Des solutions pour tous vos chantiers
        </motion.h2>
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-4 mx-auto w-12 h-[3px] bg-ebg-yellow origin-left"
        />
      </div>

      {/* Photo cards grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4">
        {SERVICES.map((service, i) => (
          <ServiceCard key={service.title} service={service} index={i} />
        ))}
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
  return (
    <motion.a
      href={service.href}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ delay: index * 0.08, duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
      className="group relative block overflow-hidden cursor-pointer"
      style={{ minHeight: "380px" }}
    >
      {/*
        Image placeholder — remplacer par :
        <Image src={`/images/service-${index + 1}.jpg`} alt={service.title}
               fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
      */}
      <div
        className="absolute inset-0 group-hover:scale-105 transition-transform duration-700"
        style={{ background: service.bg }}
      />
      {/* Texture */}
      <div className="absolute inset-0 bg-stripe opacity-15" />

      {/* Bottom gradient overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-[70%] bg-gradient-to-t from-ebg-black via-ebg-black/80 to-transparent" />

      {/* Top subtle overlay */}
      <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-ebg-black/30 to-transparent" />

      {/* Left border accent on hover */}
      <div className="absolute bottom-0 left-0 w-[3px] h-0 bg-ebg-yellow group-hover:h-full transition-all duration-500" />

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 xl:p-7">
        <h3 className="font-sans font-black text-white uppercase tracking-wide text-base mb-2 leading-tight">
          {service.title}
        </h3>
        <p className="text-gray-400 text-[12px] leading-relaxed mb-4">
          {service.desc}
        </p>
        <span className="inline-flex items-center gap-2 text-ebg-yellow text-[11px] font-bold tracking-wider group-hover:gap-3 transition-all duration-300">
          En savoir plus
          <ArrowRight size={13} strokeWidth={2.5} />
        </span>
      </div>
    </motion.a>
  );
}
