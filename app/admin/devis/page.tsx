"use client";

import { useState } from "react";
import { Plus, CheckCircle, XCircle, Eye, Search } from "lucide-react";
import { motion } from "framer-motion";
import PageHeader from "@/components/admin/PageHeader";
import StatusBadge from "@/components/admin/StatusBadge";
import Modal from "@/components/admin/Modal";
import { DEVIS_LIST, CLIENTS, MACHINES } from "@/lib/admin/data";
import type { Devis, DevisStatus, DevisItem } from "@/lib/admin/types";
import { EASE } from "@/lib/animations";

const TABS: { label: string; value: DevisStatus | "all" }[] = [
  { label: "Tous",     value: "all"       },
  { label: "En attente", value: "pending"  },
  { label: "Validés",  value: "validated" },
  { label: "Refusés",  value: "rejected"  },
];

export default function DevisPage() {
  const [devis, setDevis] = useState<Devis[]>(DEVIS_LIST);
  const [tab, setTab]     = useState<DevisStatus | "all">("all");
  const [search, setSearch] = useState("");
  const [viewDevis, setViewDevis] = useState<Devis | null>(null);
  const [creating, setCreating] = useState(false);
  const [newForm, setNewForm] = useState({
    clientId: "", clientName: "", validUntil: "",
    items: [{ description: "", quantity: 1, unitPrice: 0, total: 0 }] as DevisItem[],
    notes: "",
  });

  const filtered = devis.filter((d) => {
    const matchTab = tab === "all" || d.status === tab;
    const matchSearch = d.clientName.toLowerCase().includes(search.toLowerCase()) ||
      d.id.toLowerCase().includes(search.toLowerCase());
    return matchTab && matchSearch;
  });

  const counts = {
    pending:   devis.filter((d) => d.status === "pending").length,
    validated: devis.filter((d) => d.status === "validated").length,
    rejected:  devis.filter((d) => d.status === "rejected").length,
  };

  function updateStatus(id: string, status: DevisStatus) {
    setDevis((prev) => prev.map((d) => d.id === id ? { ...d, status } : d));
  }

  function updateItem(idx: number, key: keyof DevisItem, value: string | number) {
    setNewForm((f) => {
      const items = f.items.map((item, i) => {
        if (i !== idx) return item;
        const updated = { ...item, [key]: key === "description" ? value : Number(value) };
        updated.total = updated.quantity * updated.unitPrice;
        return updated;
      });
      return { ...f, items };
    });
  }

  function addItem() {
    setNewForm((f) => ({ ...f, items: [...f.items, { description: "", quantity: 1, unitPrice: 0, total: 0 }] }));
  }

  function createDevis() {
    const total = newForm.items.reduce((s, it) => s + it.total, 0);
    const d: Devis = {
      id: `DEV-${Date.now()}`,
      clientId: newForm.clientId, clientName: newForm.clientName,
      createdAt: new Date().toLocaleDateString("fr-FR"),
      validUntil: newForm.validUntil,
      status: "pending", items: newForm.items, totalHT: total,
      tva: total * 0.085, totalTTC: total * 1.085, notes: newForm.notes,
    };
    setDevis((p) => [d, ...p]);
    setCreating(false);
  }

  return (
    <>
      <PageHeader
        title="Devis"
        subtitle="Gestion et validation des devis"
        action={
          <button onClick={() => setCreating(true)} className="flex items-center gap-2 bg-ebg-yellow text-black text-[12px] font-bold tracking-[0.1em] uppercase px-4 py-2.5 hover:bg-yellow-400 transition-colors">
            <Plus size={14} /> Nouveau devis
          </button>
        }
      />

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: "En attente", count: counts.pending,   color: "text-ebg-yellow border-ebg-yellow/20" },
          { label: "Validés",    count: counts.validated, color: "text-emerald-400 border-emerald-400/20" },
          { label: "Refusés",    count: counts.rejected,  color: "text-red-400 border-red-400/20" },
        ].map(({ label, count, color }) => (
          <div key={label} className={`bg-ebg-dark border ${color} p-4 text-center`}>
            <p className={`font-bebas text-3xl ${color.split(" ")[0]}`}>{count}</p>
            <p className="text-[11px] text-gray-600 tracking-wide mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="flex gap-1">
          {TABS.map(({ label, value }) => (
            <button key={value} onClick={() => setTab(value)}
              className={`px-3 py-1.5 text-[11px] tracking-wide border transition-colors ${
                tab === value ? "bg-ebg-yellow/10 border-ebg-yellow/40 text-ebg-yellow" : "border-ebg-dark-3 text-gray-500 hover:text-white hover:border-gray-600"
              }`}
            >{label}</button>
          ))}
        </div>
        <div className="relative sm:ml-auto">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Rechercher..."
            className="bg-ebg-dark border border-ebg-dark-3 pl-8 pr-4 py-1.5 text-[12px] text-white placeholder-gray-600 outline-none focus:border-ebg-yellow/40 w-48" />
        </div>
      </div>

      {/* Table */}
      <div className="bg-ebg-dark border border-ebg-dark-3">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-ebg-dark-3">
                {["Référence", "Client", "Créé le", "Valide jusqu'au", "Total TTC", "Statut", "Actions"].map((h) => (
                  <th key={h} className="px-5 py-3 text-left text-[10px] text-gray-600 tracking-[0.18em] uppercase font-normal">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((d, i) => (
                <motion.tr key={d.id}
                  initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04, duration: 0.3, ease: [...EASE] as [number, number, number, number] }}
                  className="border-b border-ebg-dark-3 last:border-0 hover:bg-white/2 transition-colors"
                >
                  <td className="px-5 py-3.5 text-[11px] text-gray-500 font-mono">{d.id}</td>
                  <td className="px-5 py-3.5 text-[13px] text-white">{d.clientName}</td>
                  <td className="px-5 py-3.5 text-[11px] text-gray-500">{d.createdAt}</td>
                  <td className="px-5 py-3.5 text-[11px] text-gray-500">{d.validUntil}</td>
                  <td className="px-5 py-3.5 text-[13px] text-ebg-yellow font-medium">
                    {d.totalTTC.toLocaleString("fr-FR", { minimumFractionDigits: 2 })} €
                  </td>
                  <td className="px-5 py-3.5"><StatusBadge status={d.status} /></td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-1.5">
                      <button onClick={() => setViewDevis(d)} className="text-gray-600 hover:text-white transition-colors p-1"><Eye size={13} /></button>
                      {d.status === "pending" && (
                        <>
                          <button onClick={() => updateStatus(d.id, "validated")} className="text-gray-600 hover:text-emerald-400 transition-colors p-1"><CheckCircle size={13} /></button>
                          <button onClick={() => updateStatus(d.id, "rejected")}  className="text-gray-600 hover:text-red-400 transition-colors p-1"><XCircle size={13} /></button>
                        </>
                      )}
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* View devis modal */}
      <Modal open={!!viewDevis} onClose={() => setViewDevis(null)} title={`Devis ${viewDevis?.id}`} maxWidth="max-w-2xl">
        {viewDevis && (
          <>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-[10px] text-gray-600 tracking-wider uppercase mb-1">Client</p>
                <p className="text-white text-sm">{viewDevis.clientName}</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-600 tracking-wider uppercase mb-1">Statut</p>
                <StatusBadge status={viewDevis.status} />
              </div>
              <div>
                <p className="text-[10px] text-gray-600 tracking-wider uppercase mb-1">Créé le</p>
                <p className="text-gray-400 text-sm">{viewDevis.createdAt}</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-600 tracking-wider uppercase mb-1">Valide jusqu'au</p>
                <p className="text-gray-400 text-sm">{viewDevis.validUntil}</p>
              </div>
            </div>
            <div className="border border-ebg-dark-3 mb-4">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-ebg-dark-3">
                    {["Description", "Qté", "P.U.", "Total"].map((h) => (
                      <th key={h} className="px-4 py-2.5 text-left text-[10px] text-gray-600 tracking-wider uppercase font-normal">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {viewDevis.items.map((item, i) => (
                    <tr key={i} className="border-b border-ebg-dark-3 last:border-0">
                      <td className="px-4 py-2.5 text-[12px] text-white">{item.description}</td>
                      <td className="px-4 py-2.5 text-[12px] text-gray-400">{item.quantity}</td>
                      <td className="px-4 py-2.5 text-[12px] text-gray-400">{item.unitPrice.toLocaleString("fr-FR")} €</td>
                      <td className="px-4 py-2.5 text-[12px] text-ebg-yellow">{item.total.toLocaleString("fr-FR")} €</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex flex-col items-end gap-1 text-sm mb-4">
              <p className="text-gray-500">Sous-total HT: <span className="text-white">{viewDevis.totalHT.toLocaleString("fr-FR", { minimumFractionDigits: 2 })} €</span></p>
              <p className="text-gray-500">TVA (8.5%): <span className="text-white">{viewDevis.tva.toLocaleString("fr-FR", { minimumFractionDigits: 2 })} €</span></p>
              <p className="text-ebg-yellow font-bold text-base">Total TTC: {viewDevis.totalTTC.toLocaleString("fr-FR", { minimumFractionDigits: 2 })} €</p>
            </div>
            {viewDevis.status === "pending" && (
              <div className="flex justify-end gap-3">
                <button onClick={() => { updateStatus(viewDevis.id, "rejected"); setViewDevis(null); }}
                  className="px-5 py-2.5 bg-red-500/10 border border-red-500/30 text-red-400 text-[12px] font-medium hover:bg-red-500/20 transition-colors">
                  Refuser
                </button>
                <button onClick={() => { updateStatus(viewDevis.id, "validated"); setViewDevis(null); }}
                  className="px-5 py-2.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[12px] font-medium hover:bg-emerald-500/20 transition-colors">
                  Valider
                </button>
              </div>
            )}
          </>
        )}
      </Modal>

      {/* Create devis modal */}
      <Modal open={creating} onClose={() => setCreating(false)} title="Nouveau devis" maxWidth="max-w-2xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-[10px] text-gray-500 tracking-[0.15em] uppercase mb-1.5">Client</label>
            <select value={newForm.clientId} onChange={(e) => {
              const c = CLIENTS.find((cl) => cl.id === e.target.value);
              setNewForm((f) => ({ ...f, clientId: e.target.value, clientName: c?.name ?? "" }));
            }} className="w-full bg-[#111] border border-ebg-dark-3 text-white text-[13px] px-3 py-2.5 outline-none focus:border-ebg-yellow/40">
              <option value="">Sélectionner...</option>
              {CLIENTS.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-[10px] text-gray-500 tracking-[0.15em] uppercase mb-1.5">Valide jusqu'au</label>
            <input type="date" value={newForm.validUntil} onChange={(e) => setNewForm((f) => ({ ...f, validUntil: e.target.value }))}
              className="w-full bg-[#111] border border-ebg-dark-3 text-white text-[13px] px-3 py-2.5 outline-none focus:border-ebg-yellow/40" />
          </div>
        </div>
        <div className="border border-ebg-dark-3 mb-4">
          <table className="w-full">
            <thead>
              <tr className="border-b border-ebg-dark-3">
                {["Description", "Qté", "P.U. (€)"].map((h) => (
                  <th key={h} className="px-4 py-2 text-left text-[10px] text-gray-600 tracking-wider uppercase font-normal">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {newForm.items.map((item, i) => (
                <tr key={i} className="border-b border-ebg-dark-3 last:border-0">
                  <td className="px-2 py-1.5">
                    <input value={item.description} onChange={(e) => updateItem(i, "description", e.target.value)}
                      className="w-full bg-transparent text-white text-[12px] px-2 py-1 outline-none border border-transparent focus:border-ebg-yellow/30 placeholder-gray-700" placeholder="Description..." />
                  </td>
                  <td className="px-2 py-1.5 w-16">
                    <input type="number" value={item.quantity} onChange={(e) => updateItem(i, "quantity", e.target.value)}
                      className="w-full bg-transparent text-white text-[12px] px-2 py-1 outline-none border border-transparent focus:border-ebg-yellow/30" />
                  </td>
                  <td className="px-2 py-1.5 w-24">
                    <input type="number" value={item.unitPrice} onChange={(e) => updateItem(i, "unitPrice", e.target.value)}
                      className="w-full bg-transparent text-white text-[12px] px-2 py-1 outline-none border border-transparent focus:border-ebg-yellow/30" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={addItem} className="w-full text-center py-2 text-[11px] text-gray-600 hover:text-ebg-yellow hover:bg-ebg-yellow/5 transition-colors border-t border-ebg-dark-3">
            + Ajouter une ligne
          </button>
        </div>
        <div className="flex justify-end gap-3">
          <button onClick={() => setCreating(false)} className="px-5 py-2.5 border border-ebg-dark-3 text-gray-400 text-[12px] hover:text-white transition-colors">Annuler</button>
          <button onClick={createDevis} className="px-5 py-2.5 bg-ebg-yellow text-black text-[12px] font-bold hover:bg-yellow-400 transition-colors">Créer le devis</button>
        </div>
      </Modal>
    </>
  );
}
