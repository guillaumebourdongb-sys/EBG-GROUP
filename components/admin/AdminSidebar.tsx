"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, CalendarDays, Truck, FileText,
  Users, TrendingUp, Settings, X, Zap,
} from "lucide-react";
import { EASE } from "@/lib/animations";

const NAV_ITEMS = [
  { href: "/admin",             label: "Dashboard",       Icon: LayoutDashboard },
  { href: "/admin/locations",   label: "Locations",       Icon: CalendarDays    },
  { href: "/admin/materiel",    label: "Matériel",        Icon: Truck           },
  { href: "/admin/devis",       label: "Devis",           Icon: FileText        },
  { href: "/admin/clients",     label: "Clients",         Icon: Users           },
  { href: "/admin/finance",     label: "Finance",         Icon: TrendingUp      },
  { href: "/admin/administration", label: "Administration", Icon: Settings      },
];

function NavItem({ href, label, Icon, active }: { href: string; label: string; Icon: typeof LayoutDashboard; active: boolean }) {
  return (
    <Link href={href} className="block">
      <div className={`relative flex items-center gap-3 px-4 py-2.5 text-sm transition-colors duration-150 ${
        active
          ? "text-ebg-yellow bg-ebg-yellow/8"
          : "text-gray-500 hover:text-gray-200 hover:bg-white/4"
      }`}>
        {active && (
          <div className="absolute left-0 top-1.5 bottom-1.5 w-[2px] bg-ebg-yellow" />
        )}
        <Icon size={15} strokeWidth={active ? 2 : 1.6} className={active ? "text-ebg-yellow" : ""} />
        <span className={`tracking-wide text-[13px] ${active ? "font-medium text-white" : ""}`}>{label}</span>
      </div>
    </Link>
  );
}

interface AdminSidebarProps {
  open: boolean;
  onClose: () => void;
}

const SIDEBAR_W = "w-[240px]";

function SidebarContent({ pathname }: { pathname: string }) {
  function isActive(href: string) {
    return href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);
  }

  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-5 h-16 border-b border-ebg-dark-3 shrink-0">
        <div className="w-7 h-7 bg-ebg-yellow flex items-center justify-center">
          <Zap size={14} className="text-black" fill="black" strokeWidth={2.5} />
        </div>
        <div>
          <div className="font-bebas tracking-[0.15em] text-white text-lg leading-none">EBG GROUP</div>
          <div className="text-[9px] text-gray-600 tracking-[0.2em] uppercase leading-none mt-0.5">Admin Panel</div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 overflow-y-auto">
        <div className="px-4 mb-2">
          <p className="text-[9px] text-gray-700 tracking-[0.25em] uppercase">Navigation</p>
        </div>
        <div className="space-y-0.5">
          {NAV_ITEMS.map(({ href, label, Icon }) => (
            <NavItem key={href} href={href} label={label} Icon={Icon} active={isActive(href)} />
          ))}
        </div>
      </nav>

      {/* User card */}
      <div className="border-t border-ebg-dark-3 p-4 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-ebg-yellow/15 flex items-center justify-center shrink-0">
            <span className="text-ebg-yellow text-xs font-bold">JD</span>
          </div>
          <div className="min-w-0">
            <p className="text-white text-[12px] font-medium truncate">Jean Dupont</p>
            <p className="text-gray-600 text-[10px] truncate">Administrateur</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdminSidebar({ open, onClose }: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop: always visible */}
      <aside className={`hidden lg:flex flex-col fixed top-0 left-0 bottom-0 ${SIDEBAR_W} bg-ebg-dark border-r border-ebg-dark-3 z-40`}>
        <SidebarContent pathname={pathname} />
      </aside>

      {/* Mobile: overlay */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={onClose}
            />
            <motion.aside
              className={`fixed top-0 left-0 bottom-0 ${SIDEBAR_W} bg-ebg-dark border-r border-ebg-dark-3 z-50 lg:hidden flex flex-col`}
              initial={{ x: -240 }}
              animate={{ x: 0 }}
              exit={{ x: -240 }}
              transition={{ duration: 0.28, ease: [...EASE] as [number, number, number, number] }}
            >
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-7 h-7 flex items-center justify-center text-gray-500 hover:text-white transition-colors"
              >
                <X size={16} />
              </button>
              <SidebarContent pathname={pathname} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
