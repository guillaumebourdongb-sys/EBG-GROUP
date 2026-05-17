"use client";

import { useState } from "react";
import { Search, Phone, Mail, StickyNote, Plus, Pencil } from "lucide-react";
import { motion } from "framer-motion";
import PageHeader from "@/components/admin/PageHeader";
import Modal from "@/components/admin/Modal";
import { CLIENTS, LOCATIONS } from "@/lib/admin/data";
import type { Client } from "@/lib/admin/types";
import { EASE } from "@/lib/animations";

export default function ClientsPage() {
  const [clients, setClients]   = useState<Client[]>(CLIENTS);
  const [search, setSearch]     = useState("");
  const [selected, setSelected] = useState<Client | null>(null);
  const [editing, setEditing]   = useState<Client | null>(null);
  const [form, setForm]         = useState<Omit<Client, "id" | "createdAt">>({
    name: "", email: "", phone: "", company: "", address: "", notes: "", totalLocations: 0, totalSpent: 0,
  });

  const filtered = clients.filter((c) =>
    [c.name, c.email, c.phone, c.company ?? ""].join(" ").toLowerCase().includes(search.toLowerCase())
  );

  const clientLocations = (id: string) => LOCATIONS.filter((l) => l.clientId === id);

  function openEdit(c: Client) {
    setEditing(c);
    setForm({ name: c.name, email: c.email, phone: c.phone, company: c.company ?? "",
      address: c.address ?? "", notes: c.notes ?? "", totalLocations: c.totalLocations, totalSpent: c.totalSpent });
  }

  function save() {
    if (!editing) return;
    setClients((p) => p.map((c) => c.id === editing.id ? { ...editing, ...form } : c));
    setEditing(null);
    if (selected?.id === editing.id) setSelected({ ...editing, ...form });
  }

  function f(key: keyof typeof form, value: string) {
    setForm((p) => ({ ...p, [key]: value }));
  }

  return (
    <>
      <PageHeader
        title="Clients"
        subtitle={`${clients.length} client(s) enregistré(s)`}
        action={
          <div className="relative">
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Rechercher un client..."
              className="bg-ebg-dark border border-ebg-dark-3 pl-8 pr-4 py-2 text-[12px] text-white placeholder-gray-600 outline-none focus:border-ebg-yellow/40 w-56" />
          </div>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Client list */}
        <div className="lg:col-span-2 bg-ebg-dark border border-ebg-dark-3">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-ebg-dark-3">
                  {["Nom", "Contact", "Société", "Locations", ""].map((h) => (
                    <th key={h} className="px-5 py-3 text-left text-[10px] text-gray-600 tracking-[0.18em] uppercase font-normal">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((c, i) => (
                  <motion.tr key={c.id}
                    initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.3, ease: [...EASE] as [number, number, number, number] }}
                    onClick={() => setSelected(c)}
                    className={`border-b border-ebg-dark-3 last:border-0 cursor-pointer transition-colors ${
                      selected?.id === c.id ? "bg-ebg-yellow/5" : "hover:bg-white/2"
                    }`}
                  >
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 bg-ebg-yellow/10 flex items-center justify-center shrink-0">
                          <span className="text-ebg-yellow text-[10px] font-bold">{c.name.slice(0, 2).toUpperCase()}</span>
                        </div>
                        <span className="text-[13px] text-white">{c.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <p className="text-[11px] text-gray-400">{c.email}</p>
                      <p className="text-[11px] text-gray-600">{c.phone}</p>
                    </td>
                    <td className="px-5 py-3.5 text-[12px] text-gray-500">{c.company ?? "—"}</td>
                    <td className="px-5 py-3.5">
                      <span className="text-[11px] text-ebg-yellow font-medium">{clientLocations(c.id).length}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <button onClick={(e) => { e.stopPropagation(); openEdit(c); }}
                        className="text-gray-600 hover:text-white transition-colors p-1">
                        <Pencil size={13} />
                      </button>
                    </td>
                  </motion.tr>
                ))}
                {filtered.length === 0 && (
                  <tr><td colSpan={5} className="px-5 py-12 text-center text-gray-600 text-sm">Aucun client trouvé.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Detail panel */}
        <div className="bg-ebg-dark border border-ebg-dark-3 h-fit">
          {selected ? (
            <>
              <div className="p-5 border-b border-ebg-dark-3">
                <div className="w-12 h-12 bg-ebg-yellow/10 flex items-center justify-center mb-3">
                  <span className="text-ebg-yellow text-lg font-bold">{selected.name.slice(0, 2).toUpperCase()}</span>
                </div>
                <p className="text-white font-medium">{selected.name}</p>
                {selected.company && <p className="text-gray-500 text-[12px] mt-0.5">{selected.company}</p>}
              </div>
              <div className="p-5 space-y-3">
                <div className="flex items-center gap-2.5 text-[12px]">
                  <Mail size={13} className="text-gray-600 shrink-0" />
                  <span className="text-gray-400">{selected.email}</span>
                </div>
                <div className="flex items-center gap-2.5 text-[12px]">
                  <Phone size={13} className="text-gray-600 shrink-0" />
                  <span className="text-gray-400">{selected.phone}</span>
                </div>
                {selected.notes && (
                  <div className="flex items-start gap-2.5 text-[12px] mt-3 pt-3 border-t border-ebg-dark-3">
                    <StickyNote size={13} className="text-gray-600 shrink-0 mt-0.5" />
                    <span className="text-gray-500">{selected.notes}</span>
                  </div>
                )}
              </div>
              <div className="px-5 pb-5">
                <p className="text-[10px] text-gray-600 tracking-[0.2em] uppercase mb-2">Historique locations</p>
                {clientLocations(selected.id).length === 0 ? (
                  <p className="text-gray-700 text-[12px]">Aucune location.</p>
                ) : (
                  <div className="space-y-2">
                    {clientLocations(selected.id).map((l) => (
                      <div key={l.id} className="bg-black/20 px-3 py-2 text-[11px]">
                        <p className="text-gray-300">{l.machineName}</p>
                        <p className="text-gray-600">{l.startDate} → {l.endDate}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="p-8 text-center text-gray-700 text-sm">
              Sélectionnez un client pour voir ses détails.
            </div>
          )}
        </div>
      </div>

      {/* Edit modal */}
      <Modal open={!!editing} onClose={() => setEditing(null)} title="Modifier le client" maxWidth="max-w-xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {([
            { key: "name",    label: "Nom complet"    },
            { key: "email",   label: "Email"          },
            { key: "phone",   label: "Téléphone"      },
            { key: "company", label: "Société"        },
            { key: "address", label: "Adresse"        },
          ] as { key: keyof typeof form; label: string }[]).map(({ key, label }) => (
            <div key={key} className={key === "address" ? "sm:col-span-2" : ""}>
              <label className="block text-[10px] text-gray-500 tracking-[0.15em] uppercase mb-1.5">{label}</label>
              <input value={form[key] ?? ""} onChange={(e) => f(key, e.target.value)}
                className="w-full bg-[#111] border border-ebg-dark-3 text-white text-[13px] px-3 py-2.5 outline-none focus:border-ebg-yellow/40" />
            </div>
          ))}
          <div className="sm:col-span-2">
            <label className="block text-[10px] text-gray-500 tracking-[0.15em] uppercase mb-1.5">Notes internes</label>
            <textarea value={form.notes ?? ""} onChange={(e) => f("notes", e.target.value)}
              rows={3} className="w-full bg-[#111] border border-ebg-dark-3 text-white text-[13px] px-3 py-2.5 outline-none focus:border-ebg-yellow/40 resize-none" />
          </div>
        </div>
        <div className="flex justify-end gap-3 mt-6">
          <button onClick={() => setEditing(null)} className="px-5 py-2.5 border border-ebg-dark-3 text-gray-400 text-[12px] hover:text-white transition-colors">Annuler</button>
          <button onClick={save} className="px-5 py-2.5 bg-ebg-yellow text-black text-[12px] font-bold hover:bg-yellow-400 transition-colors">Enregistrer</button>
        </div>
      </Modal>
    </>
  );
}
