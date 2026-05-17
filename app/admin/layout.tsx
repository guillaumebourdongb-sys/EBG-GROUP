"use client";

import { useState } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminTopbar from "@/components/admin/AdminTopbar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0c0c0c]">
      <AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <AdminTopbar onMenuToggle={() => setSidebarOpen((o) => !o)} />
      <main className="lg:ml-[240px] pt-16 min-h-screen">
        <div className="p-5 sm:p-7 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
