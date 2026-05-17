import type { LocationStatus, MachineStatus, DevisStatus, UserRole } from "@/lib/admin/types";

type AnyStatus = LocationStatus | MachineStatus | DevisStatus | UserRole;

const CONFIG: Record<AnyStatus, { label: string; dot: string; bg: string; text: string }> = {
  active:      { label: "Actif",        dot: "bg-emerald-400", bg: "bg-emerald-400/10", text: "text-emerald-400" },
  reserved:    { label: "Réservé",      dot: "bg-ebg-yellow",  bg: "bg-ebg-yellow/10",  text: "text-ebg-yellow"  },
  completed:   { label: "Terminé",      dot: "bg-gray-500",    bg: "bg-gray-500/10",    text: "text-gray-400"    },
  cancelled:   { label: "Annulé",       dot: "bg-red-500",     bg: "bg-red-500/10",     text: "text-red-400"     },
  available:   { label: "Disponible",   dot: "bg-emerald-400", bg: "bg-emerald-400/10", text: "text-emerald-400" },
  rented:      { label: "En location",  dot: "bg-blue-400",    bg: "bg-blue-400/10",    text: "text-blue-400"    },
  maintenance: { label: "Maintenance",  dot: "bg-orange-400",  bg: "bg-orange-400/10",  text: "text-orange-400"  },
  pending:     { label: "En attente",   dot: "bg-ebg-yellow",  bg: "bg-ebg-yellow/10",  text: "text-ebg-yellow"  },
  validated:   { label: "Validé",       dot: "bg-emerald-400", bg: "bg-emerald-400/10", text: "text-emerald-400" },
  rejected:    { label: "Refusé",       dot: "bg-red-500",     bg: "bg-red-500/10",     text: "text-red-400"     },
  admin:       { label: "Admin",        dot: "bg-ebg-yellow",  bg: "bg-ebg-yellow/10",  text: "text-ebg-yellow"  },
  employee:    { label: "Employé",      dot: "bg-gray-400",    bg: "bg-gray-400/10",    text: "text-gray-400"    },
};

export default function StatusBadge({ status }: { status: AnyStatus }) {
  const c = CONFIG[status];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-semibold tracking-[0.12em] uppercase ${c.bg} ${c.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${c.dot}`} />
      {c.label}
    </span>
  );
}
