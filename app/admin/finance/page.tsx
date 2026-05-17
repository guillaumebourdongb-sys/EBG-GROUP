"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Euro, TrendingUp, TrendingDown, Percent } from "lucide-react";
import StatCard from "@/components/admin/StatCard";
import RevenueChart from "@/components/admin/RevenueChart";
import PageHeader from "@/components/admin/PageHeader";
import StatusBadge from "@/components/admin/StatusBadge";
import { MONTHLY_DATA, TRANSACTIONS } from "@/lib/admin/data";
import { EASE } from "@/lib/animations";

const totalRevenue  = MONTHLY_DATA.reduce((s, d) => s + d.revenue, 0);
const totalExpenses = MONTHLY_DATA.reduce((s, d) => s + d.expenses, 0);
const totalProfit   = totalRevenue - totalExpenses;
const margin        = Math.round((totalProfit / totalRevenue) * 100);

const BAR_MAX = Math.max(...MONTHLY_DATA.map((d) => d.revenue)) * 1.1;
const BAR_H   = 120;

export default function FinancePage() {
  const barRef = useRef<HTMLDivElement>(null);
  const inView = useInView(barRef, { once: true, margin: "-40px" });

  return (
    <>
      <PageHeader title="Finance" subtitle="Suivi comptable — 2025–2026" />

      {/* KPI cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard label="CA annuel"    value={totalRevenue}  format={(n) => `${Math.round(n).toLocaleString("fr-FR")} €`} icon={Euro}         change="+14% vs N-1" changePositive delay={0}    />
        <StatCard label="Dépenses"     value={totalExpenses} format={(n) => `${Math.round(n).toLocaleString("fr-FR")} €`} icon={TrendingDown}  change="+3% vs N-1"  changePositive={false} delay={0.06} />
        <StatCard label="Bénéfice net" value={totalProfit}   format={(n) => `${Math.round(n).toLocaleString("fr-FR")} €`} icon={TrendingUp}    change="+22% vs N-1" changePositive delay={0.12} />
        <StatCard label="Marge nette"  value={margin}        format={(n) => `${Math.round(n)} %`}                          icon={Percent}       change="+4pts vs N-1" changePositive delay={0.18} />
      </div>

      {/* Revenue chart + bar chart */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
        <div className="bg-ebg-dark border border-ebg-dark-3 p-5">
          <p className="text-[10px] text-gray-600 tracking-[0.2em] uppercase mb-0.5">Revenus</p>
          <p className="font-bebas text-xl text-white tracking-wide mb-4">Courbe mensuelle</p>
          <RevenueChart />
        </div>

        {/* Bar chart — Revenue vs Expenses */}
        <div className="bg-ebg-dark border border-ebg-dark-3 p-5">
          <p className="text-[10px] text-gray-600 tracking-[0.2em] uppercase mb-0.5">Comparaison</p>
          <p className="font-bebas text-xl text-white tracking-wide mb-4">Revenus vs Dépenses</p>

          <div ref={barRef} className="flex items-end gap-1 h-[120px] mt-2">
            {MONTHLY_DATA.map((d, i) => {
              const revH    = (d.revenue  / BAR_MAX) * BAR_H;
              const expH    = (d.expenses / BAR_MAX) * BAR_H;
              return (
                <div key={i} className="flex-1 flex items-end gap-px">
                  <motion.div
                    className="flex-1 bg-ebg-yellow/70 min-w-0"
                    initial={{ scaleY: 0 }}
                    animate={inView ? { scaleY: 1 } : { scaleY: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.05, ease: [...EASE] as [number, number, number, number] }}
                    style={{ transformOrigin: "bottom", height: `${revH}px` }}
                  />
                  <motion.div
                    className="flex-1 bg-red-500/40 min-w-0"
                    initial={{ scaleY: 0 }}
                    animate={inView ? { scaleY: 1 } : { scaleY: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.05 + 0.05, ease: [...EASE] as [number, number, number, number] }}
                    style={{ transformOrigin: "bottom", height: `${expH}px` }}
                  />
                </div>
              );
            })}
          </div>

          <div className="flex gap-4 mt-3">
            {[["bg-ebg-yellow/70", "Revenus"], ["bg-red-500/40", "Dépenses"]].map(([cls, label]) => (
              <div key={label} className="flex items-center gap-2">
                <div className={`w-2.5 h-2.5 ${cls}`} />
                <span className="text-[10px] text-gray-600">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Monthly breakdown table */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 bg-ebg-dark border border-ebg-dark-3">
          <div className="px-5 py-4 border-b border-ebg-dark-3">
            <p className="text-[10px] text-gray-600 tracking-[0.2em] uppercase mb-0.5">Tableau</p>
            <p className="font-bebas text-xl text-white tracking-wide">Détail mensuel</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-ebg-dark-3">
                  {["Mois", "Revenus", "Dépenses", "Bénéfice", "Locations"].map((h) => (
                    <th key={h} className="px-5 py-3 text-left text-[10px] text-gray-600 tracking-[0.18em] uppercase font-normal">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {MONTHLY_DATA.map((d, i) => {
                  const profit = d.revenue - d.expenses;
                  return (
                    <tr key={i} className="border-b border-ebg-dark-3 last:border-0 hover:bg-white/2 transition-colors">
                      <td className="px-5 py-3 text-[12px] text-white">{d.month}</td>
                      <td className="px-5 py-3 text-[12px] text-ebg-yellow">{d.revenue.toLocaleString("fr-FR")} €</td>
                      <td className="px-5 py-3 text-[12px] text-red-400">{d.expenses.toLocaleString("fr-FR")} €</td>
                      <td className={`px-5 py-3 text-[12px] font-medium ${profit >= 0 ? "text-emerald-400" : "text-red-400"}`}>
                        {profit.toLocaleString("fr-FR")} €
                      </td>
                      <td className="px-5 py-3 text-[12px] text-gray-500">{d.locations}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Transactions */}
        <div className="bg-ebg-dark border border-ebg-dark-3">
          <div className="px-5 py-4 border-b border-ebg-dark-3">
            <p className="text-[10px] text-gray-600 tracking-[0.2em] uppercase mb-0.5">Transactions</p>
            <p className="font-bebas text-xl text-white tracking-wide">Récentes</p>
          </div>
          <div className="divide-y divide-ebg-dark-3">
            {TRANSACTIONS.map((t) => (
              <div key={t.id} className="px-5 py-3.5 flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full shrink-0 ${t.type === "revenue" ? "bg-emerald-400" : "bg-red-400"}`} />
                <div className="min-w-0 flex-1">
                  <p className="text-[12px] text-white truncate">{t.description}</p>
                  <p className="text-[10px] text-gray-600">{t.date}</p>
                </div>
                <p className={`text-[12px] font-medium shrink-0 ${t.type === "revenue" ? "text-emerald-400" : "text-red-400"}`}>
                  {t.type === "revenue" ? "+" : "-"}{t.amount.toLocaleString("fr-FR")} €
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
