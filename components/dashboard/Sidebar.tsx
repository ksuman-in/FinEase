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
} from "lucide-react";
import { logoutAction } from "@/lib/actions/auth";

const menuItems = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "Approvals", href: "/dashboard/requests", icon: ShieldCheck },
  { name: "Ledger", href: "/dashboard/transactions", icon: ReceiptIndianRupee },
  { name: "Members", href: "/dashboard/members", icon: Users },
  { name: "Reports", href: "/dashboard/reports", icon: PieChart },
];

interface SidebarProps {
  closeSidebar?: () => void;
  user?: { role: string | null };
  pendingCount?: number;
}

export default function Sidebar({
  closeSidebar,
  user,
  pendingCount,
}: SidebarProps) {
  const pathname = usePathname();
  const isAdmin = user?.role === "admin";

  const handleLogout = async () => {
    await logoutAction();
  };

  return (
    <div className="flex flex-col h-full justify-between p-4">
      <div className="space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          const isAdminLink = item.href === "/dashboard/requests";

          if (isAdminLink && !isAdmin) {
            return null;
          }
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`
                flex items-center gap-4 px-6 py-4 rounded-2xl text-sm font-bold transition-all group
                ${
                  isActive
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                    : "text-app-bg hover:bg-white/5 hover:text-slate-200"
                }
              `}
              {...(closeSidebar && { onClick: closeSidebar })}
            >
              <div className="flex items-center gap-3">
                <Icon
                  size={18}
                  className={
                    isActive ? "text-white" : "group-hover:text-blue-400"
                  }
                />
                <span className="font-bold ">{item.name}</span>
              </div>

              {isAdminLink && isAdmin && pendingCount && pendingCount > 0 && (
                <span className="bg-rose-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full">
                  {pendingCount}
                </span>
              )}
            </Link>
          );
        })}
        {isAdmin && (
          <Link
            href="/admin"
            {...(closeSidebar && { onClick: closeSidebar })}
            className={
              "flex items-center gap-4 px-6 py-4 rounded-2xl text-sm font-bold transition-all group text-app-bg hover:bg-white/5 hover:text-slate-200"
            }
          >
            <div className="flex items-center gap-3">
              <ShieldCheck size={18} className="group-hover:text-blue-400" />
              <span className="font-bold uppercase">Return to Admin</span>
            </div>
          </Link>
        )}
      </div>

      <button
        onClick={handleLogout}
        className="flex items-center gap-4 px-6 py-4 rounded-2xl text-sm font-bold text-rose-500 hover:bg-rose-500/10 transition-all"
      >
        <LogOut size={18} />
        Logout
      </button>
    </div>
  );
}
