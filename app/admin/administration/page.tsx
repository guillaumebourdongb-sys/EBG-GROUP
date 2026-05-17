"use client";

import { useState } from "react";
import { Plus, Pencil, Shield, User } from "lucide-react";
import { motion } from "framer-motion";
import PageHeader from "@/components/admin/PageHeader";
import StatusBadge from "@/components/admin/StatusBadge";
import Modal from "@/components/admin/Modal";
import { ADMIN_USERS } from "@/lib/admin/data";
import type { AdminUser, UserRole } from "@/lib/admin/types";
import { EASE } from "@/lib/animations";

const EMPTY_USER: Omit<AdminUser, "id" | "createdAt"> = {
  name: "", email: "", role: "employee", active: true,
};

export default function AdministrationPage() {
  const [users, setUsers]     = useState<AdminUser[]>(ADMIN_USERS);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<AdminUser | null>(null);
  const [form, setForm]       = useState<Omit<AdminUser, "id" | "createdAt">>(EMPTY_USER);
  const [settings, setSettings] = useState({
    siteName:    "EBG GROUP",
    siteEmail:   "contact@ebg-group.fr",
    sitePhone:   "0694 13 62 73",
    tvaRate:     "8.5",
    currency:    "EUR",
    language:    "fr",
    timezone:    "America/Cayenne",
  });
  const [saved, setSaved] = useState(false);

  function openCreate() { setEditing(null); setForm(EMPTY_USER); setModalOpen(true); }
  function openEdit(u: AdminUser) {
    setEditing(u);
    setForm({ name: u.name, email: u.email, role: u.role, active: u.active });
    setModalOpen(true);
  }

  function save() {
    if (editing) {
      setUsers((p) => p.map((u) => u.id === editing.id ? { ...editing, ...form } : u));
    } else {
      setUsers((p) => [...p, { ...form, id: `USR-${Date.now()}`, createdAt: new Date().toLocaleDateString("fr-FR") }]);
    }
    setModalOpen(false);
  }

  function saveSettings() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  function f(key: keyof typeof form, value: string | boolean) {
    setForm((p) => ({ ...p, [key]: value }));
  }

  return (
    <>
      <PageHeader title="Administration" subtitle="Utilisateurs et paramètres" />

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Users management */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-[10px] text-gray-600 tracking-[0.2em] uppercase mb-0.5">Gestion</p>
              <p className="font-bebas text-xl text-white tracking-wide">Utilisateurs</p>
            </div>
            <button onClick={openCreate} className="flex items-center gap-2 bg-ebg-yellow text-black text-[11px] font-bold tracking-[0.1em] uppercase px-3 py-2 hover:bg-yellow-400 transition-colors">
              <Plus size={13} /> Ajouter
            </button>
          </div>

          <div className="bg-ebg-dark border border-ebg-dark-3">
            {users.map((u, i) => (
              <motion.div key={u.id}
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06, duration: 0.3, ease: [...EASE] as [number, number, number, number] }}
                className="flex items-center gap-4 px-5 py-4 border-b border-ebg-dark-3 last:border-0"
              >
                <div className="w-9 h-9 bg-ebg-yellow/10 flex items-center justify-center shrink-0">
                  {u.role === "admin" ? (
                    <Shield size={14} className="text-ebg-yellow" />
                  ) : (
                    <User size={14} className="text-gray-500" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-[13px] text-white font-medium">{u.name}</p>
                    <StatusBadge status={u.role} />
                  </div>
                  <p className="text-[11px] text-gray-600 mt-0.5">{u.email}</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${u.active ? "bg-emerald-400" : "bg-gray-700"}`} title={u.active ? "Actif" : "Inactif"} />
                  <button onClick={() => openEdit(u)} className="text-gray-600 hover:text-white transition-colors p-1">
                    <Pencil size={13} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Site settings */}
        <div>
          <div className="mb-4">
            <p className="text-[10px] text-gray-600 tracking-[0.2em] uppercase mb-0.5">Configuration</p>
            <p className="font-bebas text-xl text-white tracking-wide">Paramètres du site</p>
          </div>

          <div className="bg-ebg-dark border border-ebg-dark-3 p-5 space-y-4">
            {([
              { key: "siteName",  label: "Nom du site"         },
              { key: "siteEmail", label: "Email de contact"    },
              { key: "sitePhone", label: "Téléphone"           },
              { key: "tvaRate",   label: "Taux TVA (%)"        },
              { key: "currency",  label: "Devise"              },
              { key: "timezone",  label: "Fuseau horaire"      },
            ] as { key: keyof typeof settings; label: string }[]).map(({ key, label }) => (
              <div key={key}>
                <label className="block text-[10px] text-gray-500 tracking-[0.15em] uppercase mb-1.5">{label}</label>
                <input
                  value={settings[key]}
                  onChange={(e) => setSettings((s) => ({ ...s, [key]: e.target.value }))}
                  className="w-full bg-[#111] border border-ebg-dark-3 text-white text-[13px] px-3 py-2.5 outline-none focus:border-ebg-yellow/40"
                />
              </div>
            ))}

            <div className="pt-2">
              <button onClick={saveSettings}
                className={`w-full py-2.5 text-[12px] font-bold tracking-wide transition-colors ${
                  saved
                    ? "bg-emerald-500 text-white"
                    : "bg-ebg-yellow text-black hover:bg-yellow-400"
                }`}
              >
                {saved ? "Paramètres enregistrés" : "Enregistrer les paramètres"}
              </button>
            </div>
          </div>

          {/* Danger zone */}
          <div className="mt-6 bg-ebg-dark border border-red-500/20 p-5">
            <p className="text-[10px] text-red-400/70 tracking-[0.2em] uppercase mb-3">Zone dangereuse</p>
            <div className="space-y-2">
              {["Vider les données de démonstration", "Réinitialiser la configuration"].map((action) => (
                <button key={action}
                  onClick={() => alert("Action désactivée en mode démonstration.")}
                  className="w-full text-left px-4 py-2.5 border border-red-500/20 text-red-400/60 text-[12px] hover:border-red-500/40 hover:text-red-400 transition-colors"
                >
                  {action}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* User modal */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? "Modifier l'utilisateur" : "Nouvel utilisateur"} maxWidth="max-w-lg">
        <div className="space-y-4">
          {([
            { key: "name",  label: "Nom complet", type: "text"     },
            { key: "email", label: "Email",        type: "email"    },
          ] as { key: "name" | "email"; label: string; type: string }[]).map(({ key, label, type }) => (
            <div key={key}>
              <label className="block text-[10px] text-gray-500 tracking-[0.15em] uppercase mb-1.5">{label}</label>
              <input type={type} value={form[key]} onChange={(e) => f(key, e.target.value)}
                className="w-full bg-[#111] border border-ebg-dark-3 text-white text-[13px] px-3 py-2.5 outline-none focus:border-ebg-yellow/40" />
            </div>
          ))}

          <div>
            <label className="block text-[10px] text-gray-500 tracking-[0.15em] uppercase mb-1.5">Rôle</label>
            <select value={form.role} onChange={(e) => f("role", e.target.value as UserRole)}
              className="w-full bg-[#111] border border-ebg-dark-3 text-white text-[13px] px-3 py-2.5 outline-none focus:border-ebg-yellow/40">
              <option value="admin">Administrateur</option>
              <option value="employee">Employé</option>
            </select>
          </div>

          <div className="flex items-center gap-3">
            <button onClick={() => f("active", !form.active)}
              className={`w-10 h-6 rounded-full transition-colors relative ${form.active ? "bg-emerald-500" : "bg-gray-700"}`}
            >
              <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${form.active ? "translate-x-5" : "translate-x-1"}`} />
            </button>
            <span className="text-[12px] text-gray-400">Compte {form.active ? "actif" : "inactif"}</span>
          </div>
        </div>
        <div className="flex justify-end gap-3 mt-6">
          <button onClick={() => setModalOpen(false)} className="px-5 py-2.5 border border-ebg-dark-3 text-gray-400 text-[12px] hover:text-white transition-colors">Annuler</button>
          <button onClick={save} className="px-5 py-2.5 bg-ebg-yellow text-black text-[12px] font-bold hover:bg-yellow-400 transition-colors">
            {editing ? "Enregistrer" : "Créer"}
          </button>
        </div>
      </Modal>
    </>
  );
}
