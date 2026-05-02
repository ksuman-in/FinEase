"use client";

import { useState } from "react";
import { Menu, X, ShieldAlert } from "lucide-react";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminLayoutClient({
  children,
  membership,
}: {
  children: React.ReactNode;
  membership: any;
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <aside className="hidden lg:block w-72 shrink-0 border-r border-slate-200/60 bg-white shadow-2xl sticky top-0 h-screen">
        <AdminSidebar />
      </aside>

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100] lg:hidden animate-in fade-in duration-300"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <aside
        className={`
    fixed inset-y-0 left-0 w-80 bg-white z-[101] transform transition-transform duration-300 ease-in-out lg:hidden shadow-2xl
    ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
    flex flex-col // Add flex-col here
  `}
      >
        {/* Header: Fixed at top */}
        <div className="flex justify-between items-center p-6 border-b border-slate-100 bg-slate-50/50 shrink-0">
          <div className="flex items-center gap-2">
            <ShieldAlert size={18} className="text-slate-900" />
            <span className="font-black text-slate-900 tracking-tighter uppercase text-sm">
              Admin Portal
            </span>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="p-2 hover:bg-white rounded-xl transition-colors"
          >
            <X size={20} className="text-slate-600" />
          </button>
        </div>

        {/* Sidebar Content: Allow this to grow and scroll */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden">
          <AdminSidebar />
        </div>
      </aside>

      <main className="flex-1 relative w-full overflow-x-hidden">
        {/* --- MOBILE TOP NAVIGATION --- */}
        <nav className="lg:hidden flex items-center justify-between p-4 bg-white/70 backdrop-blur-lg border-b border-slate-200/60 sticky top-0 z-50">
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="p-3 bg-white shadow-sm border border-slate-100 rounded-2xl active:scale-95 transition-transform"
          >
            <Menu size={20} className="text-slate-900" />
          </button>
          <div className="flex flex-col items-center">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
              {membership?.group?.name || "System"}
            </span>
            <span className="text-[8px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full uppercase">
              Super Admin
            </span>
          </div>
          <div className="w-10" /> {/* Balance spacer */}
        </nav>

        {/* Decorative background element */}
        <div className="hidden lg:block absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[500px] h-[500px] bg-blue-100/40 rounded-full blur-[120px] pointer-events-none -z-10" />

        {/* Content Area */}
        <div className="relative z-10 p-4 md:p-8 lg:p-10 xl:p-14 pb-32 lg:pb-14">
          <div className="max-w-[1400px] mx-auto">{children}</div>
        </div>
      </main>
    </div>
  );
}
