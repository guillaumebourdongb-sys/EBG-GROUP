"use client";

import { useState } from "react";
import { Plus, Search, Pencil, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import PageHeader from "@/components/admin/PageHeader";
import StatusBadge from "@/components/admin/StatusBadge";
import Modal from "@/components/admin/Modal";
import { LOCATIONS, CLIENTS, MACHINES } from "@/lib/admin/data";
import type { RentalLocation, LocationStatus } from "@/lib/admin/types";
import { EASE } from "@/lib/animations";

const STATUS_TABS: { label: string; value: LocationStatus | "all" }[] = [
  { label: "Toutes",    value: "all"       },
  { label: "Actives",   value: "active"    },
  { label: "Réservées", value: "reserved"  },
  { label: "Terminées", value: "completed" },
  { label: "Annulées",  value: "cancelled" },
];

const EMPTY: Omit<RentalLocation, "id"> = {
  clientId: "", clientName: "", machineId: "", machineName: "",
  startDate: "", endDate: "", status: "reserved", dailyRate: 0, totalAmount: 0, deposit: 0, createdAt: "", notes: "",
};

export default function LocationsPage() {
  const [locations, setLocations] = useState<RentalLocation[]>(LOCATIONS);
  const [tab, setTab] = useState<LocationStatus | "all">("all");
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<RentalLocation | null>(null);
  const [form, setForm] = useState<Omit<RentalLocation, "id">>(EMPTY);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const filtered = locations.filter((l) => {
    const matchTab = tab === "all" || l.status === tab;
    const matchSearch = l.clientName.toLowerCase().includes(search.toLowerCase()) ||
      l.machineName.toLowerCase().includes(search.toLowerCase());
    return matchTab && matchSearch;
  });

  function openCreate() {
    setEditing(null);
    setForm(EMPTY);
    setModalOpen(true);
  }

  function openEdit(loc: RentalLocation) {
    setEditing(loc);
    setForm({ clientId: loc.clientId, clientName: loc.clientName, machineId: loc.machineId,
      machineName: loc.machineName, startDate: loc.startDate, endDate: loc.endDate,
      status: loc.status, dailyRate: loc.dailyRate, totalAmount: loc.totalAmount,
      deposit: loc.deposit, createdAt: loc.createdAt, notes: loc.notes ?? "" });
    setModalOpen(true);
  }

  function saveForm() {
    if (editing) {
      setLocations((prev) => prev.map((l) => l.id === editing.id ? { ...editing, ...form } : l));
    } else {
      const newLoc: RentalLocation = { ...form, id: `LOC-${Date.now()}` };
      setLocations((prev) => [newLoc, ...prev]);
    }
    setModalOpen(false);
  }

  function confirmDelete() {
    if (deleteId) setLocations((prev) => prev.filter((l) => l.id !== deleteId));
    setDeleteId(null);
  }

  function field(key: keyof Omit<RentalLocation, "id">, value: string | number) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  return (
    <>
      <PageHeader
        title="Locations"
        subtitle={`${locations.length} location(s) au total`}
        action={
          <button
            onClick={openCreate}
            className="flex items-center gap-2 bg-ebg-yellow text-black text-[12px] font-bold tracking-[0.1em] uppercase px-4 py-2.5 hover:bg-yellow-400 transition-colors"
          >
            <Plus size={14} /> Nouvelle location
          </button>
        }
      />

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="flex gap-1 flex-wrap">
          {STATUS_TABS.map(({ label, value }) => (
            <button
              key={value}
              onClick={() => setTab(value)}
              className={`px-3 py-1.5 text-[11px] tracking-wide border transition-colors ${
                tab === value
                  ? "bg-ebg-yellow/10 border-ebg-yellow/40 text-ebg-yellow"
                  : "border-ebg-dark-3 text-gray-500 hover:text-white hover:border-gray-600"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="relative sm:ml-auto">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher..."
            className="bg-ebg-dark border border-ebg-dark-3 pl-8 pr-4 py-1.5 text-[12px] text-white placeholder-gray-600 outline-none focus:border-ebg-yellow/40 w-48"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-ebg-dark border border-ebg-dark-3">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-ebg-dark-3">
                {["Réf.", "Client", "Machine", "Période", "Montant", "Statut", ""].map((h) => (
                  <th key={h} className="px-5 py-3 text-left text-[10px] text-gray-600 tracking-[0.18em] uppercase font-normal">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((loc, i) => (
                <motion.tr
                  key={loc.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04, duration: 0.3, ease: [...EASE] as [number, number, number, number] }}
                  className="border-b border-ebg-dark-3 last:border-0 hover:bg-white/2 transition-colors"
                >
                  <td className="px-5 py-3.5 text-[11px] text-gray-500 font-mono">{loc.id}</td>
                  <td className="px-5 py-3.5 text-[13px] text-white">{loc.clientName}</td>
                  <td className="px-5 py-3.5 text-[12px] text-gray-400">{loc.machineName}</td>
                  <td className="px-5 py-3.5 text-[11px] text-gray-500 whitespace-nowrap">
                    {loc.startDate} → {loc.endDate}
                  </td>
                  <td className="px-5 py-3.5 text-[13px] text-ebg-yellow font-medium">
                    {loc.totalAmount.toLocaleString("fr-FR")} €
                  </td>
                  <td className="px-5 py-3.5"><StatusBadge status={loc.status} /></td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2 justify-end">
                      <button
                        onClick={() => openEdit(loc)}
                        className="text-gray-600 hover:text-white transition-colors p-1"
                      >
                        <Pencil size={13} />
                      </button>
                      <button
                        onClick={() => setDeleteId(loc.id)}
                        className="text-gray-600 hover:text-red-400 transition-colors p-1"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-5 py-12 text-center text-gray-600 text-sm">
                    Aucune location trouvée.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create / Edit modal */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? "Modifier la location" : "Nouvelle location"} maxWidth="max-w-2xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[10px] text-gray-500 tracking-[0.15em] uppercase mb-1.5">Client</label>
            <select
              value={form.clientId}
              onChange={(e) => {
                const c = CLIENTS.find((cl) => cl.id === e.target.value);
                field("clientId", e.target.value);
                field("clientName", c?.name ?? "");
              }}
              className="w-full bg-[#111] border border-ebg-dark-3 text-white text-[13px] px-3 py-2.5 outline-none focus:border-ebg-yellow/40"
            >
              <option value="">Sélectionner...</option>
              {CLIENTS.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-[10px] text-gray-500 tracking-[0.15em] uppercase mb-1.5">Machine</label>
            <select
              value={form.machineId}
              onChange={(e) => {
                const m = MACHINES.find((mc) => mc.id === e.target.value);
                field("machineId", e.target.value);
                field("machineName", m?.name ?? "");
              }}
              className="w-full bg-[#111] border border-ebg-dark-3 text-white text-[13px] px-3 py-2.5 outline-none focus:border-ebg-yellow/40"
            >
              <option value="">Sélectionner...</option>
              {MACHINES.map((m) => <option key={m.id} value={m.id}>{m.name}</option>)}
            </select>
          </div>
          {(["startDate", "endDate"] as const).map((k) => (
            <div key={k}>
              <label className="block text-[10px] text-gray-500 tracking-[0.15em] uppercase mb-1.5">
                {k === "startDate" ? "Date début" : "Date fin"}
              </label>
              <input
                type="date"
                value={form[k]}
                onChange={(e) => field(k, e.target.value)}
                className="w-full bg-[#111] border border-ebg-dark-3 text-white text-[13px] px-3 py-2.5 outline-none focus:border-ebg-yellow/40"
              />
            </div>
          ))}
          <div>
            <label className="block text-[10px] text-gray-500 tracking-[0.15em] uppercase mb-1.5">Tarif journalier (€)</label>
            <input
              type="number"
              value={form.dailyRate}
              onChange={(e) => field("dailyRate", Number(e.target.value))}
              className="w-full bg-[#111] border border-ebg-dark-3 text-white text-[13px] px-3 py-2.5 outline-none focus:border-ebg-yellow/40"
            />
          </div>
          <div>
            <label className="block text-[10px] text-gray-500 tracking-[0.15em] uppercase mb-1.5">Statut</label>
            <select
              value={form.status}
              onChange={(e) => field("status", e.target.value as LocationStatus)}
              className="w-full bg-[#111] border border-ebg-dark-3 text-white text-[13px] px-3 py-2.5 outline-none focus:border-ebg-yellow/40"
            >
              {(["reserved", "active", "completed", "cancelled"] as LocationStatus[]).map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          <div className="sm:col-span-2">
            <label className="block text-[10px] text-gray-500 tracking-[0.15em] uppercase mb-1.5">Notes</label>
            <textarea
              value={form.notes ?? ""}
              onChange={(e) => field("notes", e.target.value)}
              rows={3}
              className="w-full bg-[#111] border border-ebg-dark-3 text-white text-[13px] px-3 py-2.5 outline-none focus:border-ebg-yellow/40 resize-none"
            />
          </div>
        </div>
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={() => setModalOpen(false)}
            className="px-5 py-2.5 border border-ebg-dark-3 text-gray-400 text-[12px] tracking-wide hover:text-white transition-colors"
          >
            Annuler
          </button>
          <button
            onClick={saveForm}
            className="px-5 py-2.5 bg-ebg-yellow text-black text-[12px] font-bold tracking-wide hover:bg-yellow-400 transition-colors"
          >
            {editing ? "Enregistrer" : "Créer"}
          </button>
        </div>
      </Modal>

      {/* Delete confirm */}
      <Modal open={!!deleteId} onClose={() => setDeleteId(null)} title="Confirmer la suppression" maxWidth="max-w-sm">
        <p className="text-gray-400 text-sm mb-6">Cette action est irréversible. La location sera définitivement supprimée.</p>
        <div className="flex justify-end gap-3">
          <button onClick={() => setDeleteId(null)} className="px-5 py-2.5 border border-ebg-dark-3 text-gray-400 text-[12px] hover:text-white transition-colors">
            Annuler
          </button>
          <button onClick={confirmDelete} className="px-5 py-2.5 bg-red-500 text-white text-[12px] font-bold hover:bg-red-600 transition-colors">
            Supprimer
          </button>
        </div>
      </Modal>
    </>
  );
}
