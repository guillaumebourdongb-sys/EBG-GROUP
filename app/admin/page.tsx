"use client";

import { Euro, CalendarDays, FileText, Truck } from "lucide-react";
import StatCard from "@/components/admin/StatCard";
import RevenueChart from "@/components/admin/RevenueChart";
import ActivityFeed from "@/components/admin/ActivityFeed";
import StatusBadge from "@/components/admin/StatusBadge";
import PageHeader from "@/components/admin/PageHeader";
import { MONTHLY_DATA, LOCATIONS, RECENT_ACTIVITY } from "@/lib/admin/data";

const ACTIVE_LOCATIONS = LOCATIONS.filter((l) => l.status === "active").length;
const PENDING_DEVIS = 3;
const AVAILABLE_MACHINES = 3;
const CURRENT_REVENUE = MONTHLY_DATA[MONTHLY_DATA.length - 1].revenue;

const RECENT_LOCATIONS = LOCATIONS.slice(0, 5);

export default function AdminDashboardPage() {
  return (
    <>
      <PageHeader title="Dashboard" subtitle="Vue d'ensemble — Mai 2026" />

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          label="CA du mois"
          value={CURRENT_REVENUE}
          format={(n) => `${Math.round(n).toLocaleString("fr-FR")} €`}
          icon={Euro}
          change="+12% vs mois dernier"
          changePositive
          delay={0}
        />
        <StatCard
          label="Locations actives"
          value={ACTIVE_LOCATIONS}
          icon={CalendarDays}
          change="+2 cette semaine"
          changePositive
          delay={0.06}
        />
        <StatCard
          label="Devis en attente"
          value={PENDING_DEVIS}
          icon={FileText}
          change="À traiter"
          changePositive={false}
          delay={0.12}
        />
        <StatCard
          label="Matériel dispo"
          value={AVAILABLE_MACHINES}
          icon={Truck}
          change="3 loués / 1 maintenance"
          changePositive
          delay={0.18}
        />
      </div>

      {/* Revenue chart + activity */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
        <div className="xl:col-span-2 bg-ebg-dark border border-ebg-dark-3 p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-[10px] text-gray-600 tracking-[0.2em] uppercase mb-0.5">Revenus mensuels</p>
              <p className="font-bebas text-xl text-white tracking-wide">Évolution 2025–2026</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-gray-600 mb-0.5">Cumul annuel</p>
              <p className="font-bebas text-ebg-yellow text-lg">
                {MONTHLY_DATA.reduce((s, d) => s + d.revenue, 0).toLocaleString("fr-FR")} €
              </p>
            </div>
          </div>
          <RevenueChart />
        </div>

        <div className="bg-ebg-dark border border-ebg-dark-3 p-5">
          <p className="text-[10px] text-gray-600 tracking-[0.2em] uppercase mb-1">Activité récente</p>
          <p className="font-bebas text-xl text-white tracking-wide mb-4">Derniers événements</p>
          <ActivityFeed events={RECENT_ACTIVITY} />
        </div>
      </div>

      {/* Recent locations */}
      <div className="bg-ebg-dark border border-ebg-dark-3">
        <div className="px-5 py-4 border-b border-ebg-dark-3 flex items-center justify-between">
          <div>
            <p className="text-[10px] text-gray-600 tracking-[0.2em] uppercase mb-0.5">Tableau</p>
            <p className="font-bebas text-xl text-white tracking-wide">Locations récentes</p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-ebg-dark-3">
                {["Référence", "Client", "Machine", "Début", "Fin", "Statut"].map((h) => (
                  <th key={h} className="px-5 py-3 text-left text-[10px] text-gray-600 tracking-[0.18em] uppercase font-normal">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {RECENT_LOCATIONS.map((loc) => (
                <tr key={loc.id} className="border-b border-ebg-dark-3 last:border-0 hover:bg-white/2 transition-colors">
                  <td className="px-5 py-3.5 text-[11px] text-gray-400 font-mono">{loc.id}</td>
                  <td className="px-5 py-3.5 text-[13px] text-white">{loc.clientName}</td>
                  <td className="px-5 py-3.5 text-[12px] text-gray-400">{loc.machineName}</td>
                  <td className="px-5 py-3.5 text-[11px] text-gray-500">{loc.startDate}</td>
                  <td className="px-5 py-3.5 text-[11px] text-gray-500">{loc.endDate}</td>
                  <td className="px-5 py-3.5"><StatusBadge status={loc.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
