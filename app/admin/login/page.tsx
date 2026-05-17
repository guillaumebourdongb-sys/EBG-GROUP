"use client";

import { Suspense, useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, Lock, AlertCircle } from "lucide-react";
import { EASE } from "@/lib/animations";

function LoginForm() {
  const router       = useRouter();
  const params       = useSearchParams();
  const inputRef     = useRef<HTMLInputElement>(null);

  const [password, setPassword] = useState("");
  const [show,     setShow]     = useState(false);
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState("");
  const [shake,    setShake]    = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/login", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ password }),
      });

      if (res.ok) {
        const from = params.get("from") ?? "/admin";
        router.push(from);
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error ?? "Accès refusé.");
        setPassword("");
        inputRef.current?.focus();
        setShake(true);
        setTimeout(() => setShake(false), 500);
      }
    } catch {
      setError("Erreur réseau — veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <motion.div
      animate={shake ? { x: [-8, 8, -6, 6, -4, 4, 0] } : { x: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-[#0c0c0c] border border-ebg-dark-3"
    >
      {/* Header */}
      <div className="px-7 pt-7 pb-5 border-b border-ebg-dark-3 flex items-center gap-3">
        <div className="w-8 h-8 bg-ebg-yellow/10 flex items-center justify-center">
          <Lock size={14} className="text-ebg-yellow" />
        </div>
        <div>
          <p className="text-white text-[14px] font-medium">Accès restreint</p>
          <p className="text-gray-600 text-[11px]">Entrez votre mot de passe administrateur</p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={submit} className="px-7 py-6 space-y-4">
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="flex items-center gap-2.5 bg-red-500/8 border border-red-500/20 px-4 py-3"
            >
              <AlertCircle size={13} className="text-red-400 shrink-0" />
              <p className="text-red-400 text-[12px]">{error}</p>
            </motion.div>
          )}
        </AnimatePresence>

        <div>
          <label className="block text-[10px] text-gray-500 tracking-[0.15em] uppercase mb-1.5">
            Mot de passe
          </label>
          <div className="relative">
            <input
              ref={inputRef}
              type={show ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
              autoComplete="current-password"
              required
              className="w-full bg-[#111] border border-ebg-dark-3 text-white text-[13px] px-3 py-3 pr-10 outline-none focus:border-ebg-yellow/50 transition-colors placeholder-gray-700"
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShow((s) => !s)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-400 transition-colors"
              tabIndex={-1}
            >
              {show ? <EyeOff size={14} /> : <Eye size={14} />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading || !password}
          className={`w-full py-3 font-bold text-[12px] tracking-[0.1em] uppercase transition-all ${
            loading || !password
              ? "bg-ebg-yellow/30 text-black/40 cursor-not-allowed"
              : "bg-ebg-yellow text-black hover:bg-yellow-400"
          }`}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="w-3.5 h-3.5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
              Vérification...
            </span>
          ) : (
            "Se connecter"
          )}
        </button>
      </form>
    </motion.div>
  );
}

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-ebg-dark flex items-center justify-center p-4">
      <div
        className="fixed inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      <div className="fixed top-0 left-0 right-0 h-0.5 bg-ebg-yellow" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [...EASE] as [number, number, number, number] }}
        className="relative w-full max-w-sm"
      >
        <div className="text-center mb-8">
          <p className="font-bebas text-4xl tracking-[0.3em] text-white">EBG</p>
          <p className="text-[10px] text-gray-600 tracking-[0.4em] uppercase mt-0.5">Administration</p>
        </div>

        <Suspense fallback={<div className="bg-[#0c0c0c] border border-ebg-dark-3 p-7 text-gray-600 text-sm">Chargement...</div>}>
          <LoginForm />
        </Suspense>

        <p className="text-center text-gray-700 text-[10px] mt-5 tracking-wider">
          EBG GROUP — Espace sécurisé
        </p>
      </motion.div>
    </div>
  );
}
