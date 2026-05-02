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

interface SidebarProps {
  closeSidebar?: () => void;
  membership?: { role: string; groupId: string } | null;
  pendingCount?: number;
  isSuperAdmin: boolean;
}

export default function Sidebar({
  closeSidebar,
  membership,
  pendingCount,
  isSuperAdmin,
}: SidebarProps) {
  const dashboardUrl = `/dashboard/${membership?.groupId}`;
  const menuItems = [
    { name: "Overview", href: `${dashboardUrl}`, icon: LayoutDashboard },
    {
      name: "Owner",
      href: `${dashboardUrl}/owner`,
      icon: ShieldCheck,
    },
    {
      name: "Ledger",
      href: `${dashboardUrl}/transactions`,
      icon: ReceiptIndianRupee,
    },
    { name: "Members", href: `${dashboardUrl}/members`, icon: Users },
    { name: "Reports", href: `${dashboardUrl}/reports`, icon: PieChart },
  ];
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
          const isOwnerLink =
            item.href === `/dashboard/${membership?.groupId}/owner`;

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
                <span className="absolute -top-1 -right-1 flex h-5 w-5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-lg bg-rose-400 opacity-75"></span>
                  <span className="relative inline-flex items-center justify-center rounded-lg h-5 w-5 bg-rose-500 text-white text-[10px] font-black shadow-lg border border-white">
                    {pendingCount}
                  </span>
                </span>
              )}
            </Link>
          );
        })}

        {isSuperAdmin && (
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
