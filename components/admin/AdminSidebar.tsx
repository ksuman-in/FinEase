"use client";
import { logoutAction } from "@/lib/actions/auth";
import {
  LayoutDashboard,
  LogOut,
  ChevronRight,
  Landmark,
  UserCheck,
  ReceiptIndianRupee,
  ShieldAlert,
  Settings2,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  { icon: LayoutDashboard, label: "Command Center", href: "/admin" },
  { icon: Landmark, label: "Vault Directory", href: "/admin/groups" },
  { icon: UserCheck, label: "Identity Vetting", href: "/admin/kyc" },
  {
    icon: ReceiptIndianRupee,
    label: "Global Ledger",
    href: "/admin/transactions",
  },
  { icon: ShieldAlert, label: "Risk Management", href: "/admin/defaults" },
  // { icon: Settings2, label: "Protocol Rules", href: "/admin/config" },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  const handleLogout = async () => {
    await logoutAction();
  };

  return (
    <nav className="flex w-full min-h-full bg-white p-8 flex-col">
      <div className="mb-12 px-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-slate-900 rounded-2xl flex items-center justify-center text-white font-black shadow-lg">
            P
          </div>
          <div>
            <h2 className="text-lg font-black text-slate-900 tracking-tighter">
              Power 10
            </h2>
            <p className="text-[8px] font-black text-blue-600 uppercase tracking-[0.2em]">
              Agent Portal
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 space-y-2">
        {menuItems.map((item) => {
          const isActive =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`group flex items-center justify-between p-4 rounded-2xl transition-all ${
                isActive
                  ? "bg-slate-900 text-white shadow-xl shadow-slate-200"
                  : "text-slate-400 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <div className="flex items-center gap-4">
                <item.icon size={18} strokeWidth={isActive ? 3 : 2} />
                <span className="text-[10px] font-black uppercase tracking-widest">
                  {item.label}
                </span>
              </div>
              {isActive && <ChevronRight size={14} className="text-blue-400" />}
            </Link>
          );
        })}
      </div>

      <div className="mt-auto space-y-2 pt-8">
        <Link
          href="/dashboard"
          className="flex items-center gap-4 p-4 rounded-2xl font-black text-[10px] uppercase tracking-widest text-blue-600 bg-blue-50 hover:bg-blue-100 transition-all border border-blue-100"
        >
          <LayoutDashboard size={18} />
          Member Dashboard
        </Link>
        <div className="mt-auto space-y-2 pt-10 pb-6">
          <button
            className="w-full flex items-center gap-4 p-4 rounded-2xl text-rose-500 font-black text-[10px] uppercase tracking-widest hover:bg-rose-50 transition-all"
            onClick={handleLogout}
          >
            <LogOut size={18} />
            Terminate Session
          </button>
        </div>
      </div>
    </nav>
  );
}
