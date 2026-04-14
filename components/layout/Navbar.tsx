// src/components/layout/Navbar.tsx
"use client";

import Link from "next/link";
import { useState } from "react";
import {
  LayoutDashboard,
  FileBarChart,
  UserCircle,
  Menu,
  X,
  User,
} from "lucide-react";
import { Session } from "@/lib/auth-types";
import { LogoutButton } from "./LogoutButton";

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Monthly Report", href: "/reports", icon: FileBarChart },
  { name: "Members", href: "/members", icon: User },
  { name: "Profile", href: "/dashboard/profile", icon: UserCircle },
];

const EasyFinanceLogo = () => (
  <svg
    viewBox="0 0 100 100"
    className="w-9 h-9"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="logo-grad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#22D3EE" /> {/* Cyan */}
        <stop offset="100%" stopColor="#2563EB" /> {/* Blue */}
      </linearGradient>
      {/* Frosted Layer Filter */}
      <filter id="glass-blur" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="3" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>

    {/* Geometric "E" Layer (Main Structure) */}
    <path
      d="M20 30 C 20 20, 80 20, 80 30 M20 50 C 20 40, 60 40, 60 50 M20 70 C 20 60, 80 60, 80 70"
      stroke="url(#logo-grad)"
      strokeWidth="6"
      strokeLinecap="round"
      className="filter drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]"
    />

    {/* Upward Growth Intersection */}
    <path
      d="M10 90 L90 10"
      stroke="url(#logo-grad)"
      strokeWidth="2"
      strokeOpacity="0.3"
    />
  </svg>
);

export default function Navbar({ session }: { session: Session | null }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/20 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <EasyFinanceLogo />
          <span className="text-white font-bold tracking-tight text-xl">
            FinEase
          </span>
        </div>

        {session?.session?.id && (
          <>
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors group"
                >
                  <item.icon
                    size={18}
                    className="group-hover:scale-110 transition-transform"
                  />
                  <span className="text-sm font-medium">{item.name}</span>
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-gray-400 hover:text-cyan-400 transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            <div className="hidden md:flex px-4 py-1.5 rounded-full bg-white/5 border border-white/10 cursor-pointer">
              <LogoutButton />
            </div>
          </>
        )}
        {!session?.session?.id && (
          <div>
            <Link href={"/login"}>Sign In</Link>
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      {session?.session?.id && isOpen && (
        <div className="md:hidden border-t border-white/10 bg-black/40 backdrop-blur-md">
          <div className="px-6 py-4 space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center gap-3 text-gray-400 hover:text-cyan-400 transition-colors py-2"
                onClick={() => setIsOpen(false)}
              >
                <item.icon size={20} />
                <span className="text-sm font-medium">{item.name}</span>
              </Link>
            ))}
            <div className="border-t border-white/10 pt-4 mt-4">
              <div className="text-gray-400 hover:text-cyan-400 transition-colors">
                <LogoutButton />
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
