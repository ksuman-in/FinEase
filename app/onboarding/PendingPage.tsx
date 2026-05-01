"use client";

import { VaultLogoIcon } from "@/components/ui/logo-icon";
import { logoutAction } from "@/lib/actions/auth";
import { GroupRole } from "@prisma/client";
import { motion } from "framer-motion";
import {
  ShieldAlert,
  MessageCircle,
  LogOut,
  User,
  TrendingUp,
  Wallet,
} from "lucide-react";

interface PendingPageProps {
  user: {
    name: string | null;
    email: string;
    role: string;
  };
}

export default function PendingPage({ user }: PendingPageProps) {
  const handleLogout = async () => {
    await logoutAction();
  };

  const isInvestor = user.role === GroupRole.MEMBER;

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white p-8 md:p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-100 text-center space-y-8"
      >
        {/* Status Icon */}
        <div className="relative mx-auto w-20 h-20">
          <div className="absolute inset-0 bg-amber-100 rounded-3xl rotate-12 animate-pulse" />
          <div className="relative flex items-center justify-center w-20 h-20 bg-amber-500 rounded-3xl text-white shadow-lg shadow-amber-200">
            <VaultLogoIcon />
          </div>
        </div>

        {/* User Identity Card */}
        <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 flex items-center gap-4 text-left">
          <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center border border-slate-200 shrink-0">
            <User className="w-6 h-6 text-slate-400" />
          </div>
          <div className="overflow-hidden">
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest">
              Signed in as
            </p>
            <p className="font-bold text-slate-900 truncate">
              {user.name || "New Member"}
            </p>
            <p className="text-[10px] text-slate-500 truncate">{user.email}</p>
          </div>
        </div>

        <div className="space-y-3">
          <h1 className="text-2xl font-black text-slate-900 uppercase tracking-tight">
            Activation Pending
          </h1>
          <p className="text-slate-500 text-sm font-medium leading-relaxed">
            Welcome to the vault. Your request to join as a
            <span className="text-blue-600 font-bold"> {user.role} </span>
            is being reviewed by the Group Owner.
          </p>
        </div>

        {/* Dynamic Role Info */}
        <div className="p-5 bg-blue-50/50 rounded-2xl border border-blue-100 text-left space-y-3">
          <div className="flex items-center gap-3">
            {isInvestor ? (
              <TrendingUp className="w-5 h-5 text-blue-600" />
            ) : (
              <Wallet className="w-5 h-5 text-blue-600" />
            )}
            <p className="text-[10px] font-black text-blue-900 uppercase tracking-widest">
              {isInvestor ? "Investment Profile" : "Borrower Profile"}
            </p>
          </div>
          <p className="text-xs text-blue-800 font-medium leading-tight">
            {isInvestor
              ? "Once verified, you can start deploying capital at 18% annual returns."
              : "Verification unlocks your ability to request low-friction EMI loans from the vault."}
          </p>
        </div>

        <div className="grid gap-3">
          <button
            onClick={() => window.open("https://wa.me/82009900773", "_blank")}
            className="w-full h-14 border-2 border-green-800 text-green-800 rounded-2xl font-bold uppercase tracking-widest flex items-center cursor-pointer justify-center gap-2 hover:bg-green-800 hover:text-white transition-all shadow-xl shadow-slate-200"
          >
            <MessageCircle className="w-5 h-5" /> Fast-Track Via WhatsApp
          </button>

          <button
            onClick={handleLogout}
            className="w-full h-14 border-2 border-blue-500 bg-white text-blue-500 rounded-2xl font-bold uppercase tracking-widest flex items-center cursor-pointer justify-center gap-2 hover:bg-blue-500 hover:text-white transition-all"
          >
            <LogOut className="w-5 h-5" /> Sign Out
          </button>
        </div>

        <div className="flex items-center justify-center gap-2 pt-2">
          <ShieldAlert className="w-4 h-4 text-slate-300" />
          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em]">
            Secure Vault Protocol v1.0
          </span>
        </div>
      </motion.div>
    </div>
  );
}
