import { MapPin, Phone, MessageCircle, Mail } from "lucide-react";

const SERVICES_LINKS = [
  "Location Mini-Pelles",
  "Terrassement",
  "Transport",
  "Maintenance",
  "Services Chantier",
];

const COMPANY_LINKS = [
  { label: "À propos", href: "#about" },
  { label: "Nos valeurs", href: "#about" },
  { label: "Contact", href: "#contact" },
  { label: "Mentions légales", href: "#" },
];

export default function Footer() {
  return (
    <footer className="bg-ebg-dark border-t border-ebg-dark-3 relative overflow-hidden">
      {/* Subtle top gradient */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-ebg-yellow/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Main grid */}
        <div className="py-16 grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">

          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 bg-ebg-yellow flex items-center justify-center">
                <span className="font-bebas text-ebg-black text-xl leading-none">E</span>
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-bebas text-[22px] tracking-[0.25em] text-white">EBG</span>
                <span className="text-[9px] tracking-[0.35em] text-ebg-yellow uppercase font-bold">
                  GROUP
                </span>
              </div>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed mb-6 max-w-[220px]">
              Votre partenaire BTP de confiance en Guyane française. Location
              de mini-pelles et services chantier.
            </p>
            <div className="flex items-center gap-2 text-gray-600 text-xs">
              <MapPin size={12} className="text-ebg-yellow shrink-0" />
              <span>Guyane Française &middot; Département 973</span>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white text-[10px] font-bold tracking-[0.28em] uppercase mb-6">
              Services
            </h4>
            <ul className="space-y-3">
              {SERVICES_LINKS.map((label) => (
                <li key={label}>
                  <a
                    href="#services"
                    className="text-gray-500 text-[13px] hover:text-ebg-yellow transition-colors duration-200"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white text-[10px] font-bold tracking-[0.28em] uppercase mb-6">
              Entreprise
            </h4>
            <ul className="space-y-3">
              {COMPANY_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-gray-500 text-[13px] hover:text-ebg-yellow transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white text-[10px] font-bold tracking-[0.28em] uppercase mb-6">
              Contact
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="tel:+594694000000"
                  className="flex items-center gap-3 text-gray-500 text-[13px] hover:text-white transition-colors"
                >
                  <Phone size={13} className="text-ebg-yellow shrink-0" />
                  +594 694 00 00 00
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/594694000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-gray-500 text-[13px] hover:text-white transition-colors"
                >
                  <MessageCircle size={13} className="text-ebg-yellow shrink-0" />
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href="mailto:contact@ebg-group.fr"
                  className="flex items-center gap-3 text-gray-500 text-[13px] hover:text-white transition-colors"
                >
                  <Mail size={13} className="text-ebg-yellow shrink-0" />
                  contact@ebg-group.fr
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-6 border-t border-ebg-dark-3 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-700 text-[11px] tracking-widest">
            © 2025 EBG GROUP — Tous droits réservés
          </p>
          <p className="text-gray-700 text-[11px] tracking-widest uppercase">
            Made in Guyane 🇬🇫
          </p>
        </div>
      </div>
    </footer>
  );
}
