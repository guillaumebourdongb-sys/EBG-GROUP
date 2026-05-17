"use client";

import { useState } from "react";
import { Plus, Wrench, Search } from "lucide-react";
import { motion } from "framer-motion";
import PageHeader from "@/components/admin/PageHeader";
import StatusBadge from "@/components/admin/StatusBadge";
import Modal from "@/components/admin/Modal";
import { MACHINES } from "@/lib/admin/data";
import type { Machine, MachineStatus } from "@/lib/admin/types";
import { EASE } from "@/lib/animations";

const STATUS_TABS: { label: string; value: MachineStatus | "all" }[] = [
  { label: "Tout",         value: "all"         },
  { label: "Disponible",   value: "available"   },
  { label: "Loué",         value: "rented"      },
  { label: "Maintenance",  value: "maintenance" },
];

const EMPTY_MACHINE: Omit<Machine, "id"> = {
  name: "", type: "", brand: "", model: "", year: new Date().getFullYear(), status: "available",
  dailyRate: 0, weeklyRate: 0, hoursUsed: 0, lastMaintenance: "", nextMaintenance: "",
};

export default function MaterielPage() {
  const [machines, setMachines] = useState<Machine[]>(MACHINES);
  const [tab, setTab]           = useState<MachineStatus | "all">("all");
  const [search, setSearch]     = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing]   = useState<Machine | null>(null);
  const [form, setForm]         = useState<Omit<Machine, "id">>(EMPTY_MACHINE);

  const filtered = machines.filter((m) => {
    const matchTab = tab === "all" || m.status === tab;
    const matchSearch = m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.type.toLowerCase().includes(search.toLowerCase());
    return matchTab && matchSearch;
  });

  function openCreate() { setEditing(null); setForm(EMPTY_MACHINE); setModalOpen(true); }
  function openEdit(m: Machine) {
    setEditing(m);
    setForm({ name: m.name, type: m.type, brand: m.brand, model: m.model, year: m.year, status: m.status,
      dailyRate: m.dailyRate, weeklyRate: m.weeklyRate, hoursUsed: m.hoursUsed,
      lastMaintenance: m.lastMaintenance, nextMaintenance: m.nextMaintenance });
    setModalOpen(true);
  }

  function save() {
    if (editing) {
      setMachines((p) => p.map((m) => m.id === editing.id ? { ...editing, ...form } : m));
    } else {
      setMachines((p) => [{ ...form, id: `MCH-${Date.now()}` }, ...p]);
    }
    setModalOpen(false);
  }

  function f(key: keyof Omit<Machine, "id">, v: string | number) {
    setForm((prev) => ({ ...prev, [key]: v }));
  }

  const statusColor: Record<MachineStatus, string> = {
    available:   "from-emerald-500/10 to-transparent border-emerald-500/20",
    rented:      "from-blue-500/10 to-transparent border-blue-500/20",
    maintenance: "from-orange-500/10 to-transparent border-orange-500/20",
  };

  return (
    <>
      <PageHeader
        title="Matériel"
        subtitle={`${machines.length} machine(s) dans le parc`}
        action={
          <button onClick={openCreate} className="flex items-center gap-2 bg-ebg-yellow text-black text-[12px] font-bold tracking-[0.1em] uppercase px-4 py-2.5 hover:bg-yellow-400 transition-colors">
            <Plus size={14} /> Ajouter machine
          </button>
        }
      />

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="flex gap-1">
          {STATUS_TABS.map(({ label, value }) => (
            <button key={value} onClick={() => setTab(value)}
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
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Rechercher..."
            className="bg-ebg-dark border border-ebg-dark-3 pl-8 pr-4 py-1.5 text-[12px] text-white placeholder-gray-600 outline-none focus:border-ebg-yellow/40 w-48" />
        </div>
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((m, i) => (
          <motion.div
            key={m.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06, duration: 0.35, ease: [...EASE] as [number, number, number, number] }}
            onClick={() => openEdit(m)}
            className={`bg-gradient-to-b ${statusColor[m.status]} border bg-ebg-dark cursor-pointer hover:border-ebg-yellow/30 transition-colors group`}
          >
            {/* Image placeholder */}
            <div className="h-36 bg-gradient-to-br from-ebg-dark-3 to-[#0c0c0c] flex items-center justify-center border-b border-white/5">
              <Wrench size={32} className="text-gray-700 group-hover:text-gray-500 transition-colors" strokeWidth={1} />
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <p className="text-white text-[14px] font-medium leading-snug">{m.name}</p>
                  <p className="text-gray-600 text-[11px] mt-0.5">{m.brand} {m.model} · {m.year}</p>
                </div>
                <StatusBadge status={m.status} />
              </div>
              <div className="grid grid-cols-2 gap-2 mt-3">
                <div className="bg-black/30 px-3 py-2">
                  <p className="text-[9px] text-gray-600 tracking-wider uppercase">Tarif/jour</p>
                  <p className="text-ebg-yellow font-bebas text-lg leading-none">{m.dailyRate} €</p>
                </div>
                <div className="bg-black/30 px-3 py-2">
                  <p className="text-[9px] text-gray-600 tracking-wider uppercase">Heures</p>
                  <p className="text-white font-bebas text-lg leading-none">{m.hoursUsed.toLocaleString("fr-FR")}</p>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-white/5">
                <p className="text-[10px] text-gray-700">
                  Dernière maintenance: <span className="text-gray-500">{m.lastMaintenance}</span>
                </p>
                <p className="text-[10px] text-gray-700 mt-0.5">
                  Prochaine: <span className={`${m.status === "maintenance" ? "text-orange-400" : "text-gray-500"}`}>{m.nextMaintenance}</span>
                </p>
              </div>
            </div>
          </motion.div>
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full py-16 text-center text-gray-600">Aucune machine trouvée.</div>
        )}
      </div>

      {/* Modal */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? "Modifier la machine" : "Ajouter une machine"} maxWidth="max-w-2xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {([
            { key: "name",      label: "Nom de la machine",    type: "text"   },
            { key: "type",      label: "Type",                 type: "text"   },
            { key: "brand",     label: "Marque",               type: "text"   },
            { key: "model",     label: "Modèle",               type: "text"   },
            { key: "year",      label: "Année",                type: "number" },
            { key: "dailyRate", label: "Tarif journalier (€)", type: "number" },
            { key: "weeklyRate",label: "Tarif hebdo (€)",      type: "number" },
            { key: "hoursUsed", label: "Heures utilisées",     type: "number" },
          ] as { key: keyof Omit<Machine,"id">; label: string; type: string }[]).map(({ key, label, type }) => (
            <div key={key}>
              <label className="block text-[10px] text-gray-500 tracking-[0.15em] uppercase mb-1.5">{label}</label>
              <input type={type} value={form[key] as string | number} onChange={(e) => f(key, type === "number" ? Number(e.target.value) : e.target.value)}
                className="w-full bg-[#111] border border-ebg-dark-3 text-white text-[13px] px-3 py-2.5 outline-none focus:border-ebg-yellow/40" />
            </div>
          ))}
          <div>
            <label className="block text-[10px] text-gray-500 tracking-[0.15em] uppercase mb-1.5">Statut</label>
            <select value={form.status} onChange={(e) => f("status", e.target.value as MachineStatus)}
              className="w-full bg-[#111] border border-ebg-dark-3 text-white text-[13px] px-3 py-2.5 outline-none focus:border-ebg-yellow/40">
              {(["available", "rented", "maintenance"] as MachineStatus[]).map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>
        <div className="flex justify-end gap-3 mt-6">
          <button onClick={() => setModalOpen(false)} className="px-5 py-2.5 border border-ebg-dark-3 text-gray-400 text-[12px] hover:text-white transition-colors">Annuler</button>
          <button onClick={save} className="px-5 py-2.5 bg-ebg-yellow text-black text-[12px] font-bold hover:bg-yellow-400 transition-colors">
            {editing ? "Enregistrer" : "Ajouter"}
          </button>
        </div>
      </Modal>
    </>
  );
}
