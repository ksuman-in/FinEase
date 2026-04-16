"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ReceiptIndianRupee,
  Users,
  PieChart,
  LogOut,
} from "lucide-react";
import { logoutAction } from "@/lib/actions/auth";
import { Dispatch, SetStateAction } from "react";

const menuItems = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "Ledger", href: "/dashboard/transactions", icon: ReceiptIndianRupee },
  { name: "Members", href: "/dashboard/members", icon: Users },
  { name: "Reports", href: "/dashboard/reports", icon: PieChart },
];

interface SidebarProps {
  // Update this to accept the real state setter
  closeSidebar?: () => void;
}

export default function Sidebar({ closeSidebar }: SidebarProps) {
  const pathname = usePathname();

  const handleLogout = async () => {
    await logoutAction();
  };

  return (
    <div className="flex flex-col h-full justify-between p-4">
      <div className="space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`
                flex items-center gap-4 px-6 py-4 rounded-2xl text-sm font-bold transition-all group
                ${
                  isActive
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                    : "text-app-bg0 hover:bg-white/5 hover:text-slate-200"
                }
              `}
              {...(closeSidebar && { onClick: closeSidebar })}
            >
              <Icon
                size={18}
                className={
                  isActive ? "text-white" : "group-hover:text-blue-400"
                }
              />
              {item.name}
            </Link>
          );
        })}
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
