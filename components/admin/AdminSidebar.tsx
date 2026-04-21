"use client";
import {
  LayoutDashboard,
  Users,
  ShieldCheck,
  Settings,
  LogOut,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  { icon: LayoutDashboard, label: "Command Center", href: "/admin" },
  { icon: Users, label: "Member Directory", href: "/admin/members" },
  { icon: ShieldCheck, label: "Liquidity Pool", href: "/admin/pool" },
  { icon: Settings, label: "System Config", href: "/admin/settings" },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <nav className="hidden lg:flex w-72 h-[calc(100vh-2rem)] m-4 bg-white border border-slate-100 rounded-[2.5rem] p-8 flex-col shadow-2xl sticky top-4">
      {/* Logo Area */}
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

      {/* Links */}
      <div className="flex-1 space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
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

      <div className="mt-auto space-y-2">
        <Link
          href="/dashboard"
          className="flex items-center gap-4 p-4 rounded-2xl font-black text-[10px] uppercase tracking-widest text-blue-600 bg-blue-50 hover:bg-blue-100 transition-all border border-blue-100"
        >
          <LayoutDashboard size={18} />
          Member Dashboard
        </Link>

        <button className="w-full flex items-center gap-4 p-4 rounded-2xl text-rose-500 font-black text-[10px] uppercase tracking-widest hover:bg-rose-50 transition-all">
          <LogOut size={18} />
          Terminate Session
        </button>
      </div>
    </nav>
  );
}
