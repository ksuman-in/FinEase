"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ReceiptIndianRupee,
  Users,
  PieChart,
  LogOut,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";
import { logoutAction } from "@/lib/actions/auth";
import { GroupRole } from "@prisma/client";

const menuItems = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "Approvals", href: "/dashboard/requests", icon: ShieldCheck },
  { name: "Ledger", href: "/dashboard/transactions", icon: ReceiptIndianRupee },
  { name: "Members", href: "/dashboard/members", icon: Users },
  { name: "Reports", href: "/dashboard/reports", icon: PieChart },
];

interface SidebarProps {
  closeSidebar?: () => void;
  membership?: { role: string } | null;
  pendingCount?: number;
}

export default function Sidebar({
  closeSidebar,
  membership,
  pendingCount,
}: SidebarProps) {
  const pathname = usePathname();
  const isOwner = membership?.role === GroupRole.OWNER;

  const handleLogout = async () => {
    await logoutAction();
  };

  return (
    <div className="flex flex-col h-full justify-between p-4 relative z-30">
      <div className="space-y-3">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          const isOwnerLink = item.href === "/dashboard/requests";

          if (isOwnerLink && !isOwner) {
            return null;
          }
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`
                flex items-center justify-between px-5 py-4 rounded-2xl text-sm font-bold transition-all duration-300 group relative
                ${
                  isActive
                    ? "bg-white/60 text-slate-900 shadow-sm border border-white"
                    : "text-slate-500 hover:bg-white/30 hover:shadow-sm hover:text-slate-900"
                }
              `}
              {...(closeSidebar && { onClick: closeSidebar })}
            >
              <div className="flex items-center gap-4 relative z-10 group-hover:text-blue-500">
                <div
                  className={`
                  p-2 rounded-xl transition-all duration-300
                  ${isActive ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20" : "bg-transparent text-slate-400 "}
                `}
                >
                  <Icon size={18} strokeWidth={2.5} />
                </div>
                <span
                  className={`tracking-tight ${isActive ? "font-black" : "font-bold"}`}
                >
                  {item.name}
                </span>
              </div>

              {isActive && (
                <ChevronRight
                  size={14}
                  className="text-slate-400 animate-in slide-in-from-left-2"
                />
              )}

              {isOwnerLink && isOwner && pendingCount && pendingCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded-lg shadow-lg border border-white">
                  {pendingCount}
                </span>
              )}
            </Link>
          );
        })}

        {isOwner && (
          <div className="pt-4 mt-4 border-t border-white/40">
            <Link
              href="/admin"
              {...(closeSidebar && { onClick: closeSidebar })}
              className="flex items-center gap-4 px-5 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:bg-white/30 hover:shadow-sm hover:text-slate-900 transition-all group"
            >
              <div className="p-2 bg-slate-100 rounded-xl group-hover:bg-blue-50 transition-colors">
                <ShieldCheck size={16} className="group-hover:text-blue-500" />
              </div>
              <span>Return to Admin</span>
            </Link>
          </div>
        )}
      </div>

      <button
        onClick={handleLogout}
        className="flex items-center gap-4 px-6 py-4 rounded-2xl text-xs font-black uppercase tracking-[0.2em] text-rose-500 hover:bg-rose-50 transition-all border border-transparent hover:border-rose-100 mt-auto"
      >
        <LogOut size={18} strokeWidth={3} />
        Logout
      </button>
    </div>
  );
}
