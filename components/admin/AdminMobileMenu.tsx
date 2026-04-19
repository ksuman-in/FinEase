"use client";

import {
  LayoutDashboard,
  Users,
  Plus,
  ShieldCheck,
  Settings,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  { icon: LayoutDashboard, label: "Home", href: "/admin" },
  { icon: Users, label: "Members", href: "/admin/members" },
  { icon: ShieldCheck, label: "Pool", href: "/admin/pool" },
  { icon: Settings, label: "Config", href: "/admin/settings" },
];

export default function AdminMobileMenu() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-md z-50">
      <div className="bg-slate-900/90 backdrop-blur-2xl border border-white/10 p-2 rounded-[2.5rem] flex items-center justify-between shadow-2xl">
        {/* Left Side Icons */}
        <div className="flex flex-1 justify-around items-center">
          {menuItems.slice(0, 2).map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.href} href={item.href} className="relative p-3">
                <item.icon
                  size={22}
                  className={isActive ? "text-blue-400" : "text-slate-500"}
                />
                {isActive && (
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-blue-400 rounded-full" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Center Action Button */}
        <button className="relative -top-6 w-14 h-14 bg-blue-600 rounded-[1.5rem] flex items-center justify-center text-white shadow-xl shadow-blue-500/40 border-4 border-slate-900 active:scale-90 transition-all">
          <Plus size={28} strokeWidth={3} />
        </button>

        {/* Right Side Icons */}
        <div className="flex flex-1 justify-around items-center">
          {menuItems.slice(2, 4).map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.href} href={item.href} className="relative p-3">
                <item.icon
                  size={22}
                  className={isActive ? "text-blue-400" : "text-slate-500"}
                />
                {isActive && (
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-blue-400 rounded-full" />
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
