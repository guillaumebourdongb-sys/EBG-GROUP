"use client";

import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Menu, Bell, LogOut } from "lucide-react";

const TITLES: Record<string, string> = {
  "/admin":                  "Dashboard",
  "/admin/locations":        "Gestion des Locations",
  "/admin/materiel":         "Gestion du Matériel",
  "/admin/devis":            "Gestion des Devis",
  "/admin/clients":          "Gestion des Clients",
  "/admin/finance":          "Gestion Financière",
  "/admin/administration":   "Administration",
};

interface AdminTopbarProps {
  onMenuToggle: () => void;
}

export default function AdminTopbar({ onMenuToggle }: AdminTopbarProps) {
  const pathname = usePathname();
  const router   = useRouter();
  const title    = TITLES[pathname] ?? "Admin";

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <header className="fixed top-0 right-0 left-0 lg:left-[240px] h-16 bg-ebg-dark border-b border-ebg-dark-3 z-30 flex items-center px-4 sm:px-6 gap-4">
      <button
        onClick={onMenuToggle}
        className="lg:hidden w-8 h-8 flex items-center justify-center text-gray-500 hover:text-white transition-colors"
      >
        <Menu size={18} />
      </button>

      <motion.h2
        key={title}
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="font-bebas text-lg tracking-[0.1em] text-white flex-1"
      >
        {title}
      </motion.h2>

      <div className="flex items-center gap-3">
        <button className="relative w-8 h-8 flex items-center justify-center text-gray-500 hover:text-white transition-colors">
          <Bell size={16} />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-ebg-yellow rounded-full" />
        </button>
        <div className="w-8 h-8 bg-ebg-yellow/15 flex items-center justify-center">
          <span className="text-ebg-yellow text-xs font-bold">GB</span>
        </div>
        <button
          onClick={logout}
          title="Se déconnecter"
          className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-red-400 transition-colors"
        >
          <LogOut size={15} />
        </button>
      </div>
    </header>
  );
}
