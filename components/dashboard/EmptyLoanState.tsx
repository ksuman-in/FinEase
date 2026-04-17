"use client";

import { HandCoins, Plus } from "lucide-react";
import { useState } from "react";
import TransactionModal from "../model/TransactionModal";
import { TransactionType } from "@prisma/client";

export function EmptyLoanState() {
  const [isOpenModal, openLoanModal] = useState(false);
  return (
    <div className="relative p-8 bg-gradient-to-br from-slate-900 to-slate-950 border border-white/10 rounded-[2.5rem] overflow-hidden group">
      {/* Background Decorative Element */}
      <div className="absolute -right-4 -top-4 w-32 h-32 bg-blue-500/10 blur-3xl group-hover:bg-blue-500/20 transition-all" />

      <div className="flex flex-col md:flex-row items-center gap-6">
        {/* Icon Badge */}
        <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shadow-inner">
          <HandCoins className="w-8 h-8 text-blue-400" />
        </div>

        <div className="flex-1 text-center md:text-left">
          <h3 className="text-xl font-bold text-white mb-1">Need Capital?</h3>
          <p className="text-slate-400 text-sm">
            You currently have no active loans. Access the group pool to boost
            your investment or manage a personal milestone.
          </p>
        </div>

        {/* The "Get Loan" Button */}
        <button
          onClick={() => openLoanModal(true)} // Open your drawer/modal
          className="w-full md:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-black rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-500/20 active:scale-95"
        >
          <Plus className="w-5 h-5" />
          Get New Loan
        </button>
      </div>
      {/* <TransactionModal
        isOpen={isOpenModal}
        onClose={() => openLoanModal(false)}
        mode={TransactionType.NEW_LOAN}
        onSubmit={async (val) => {}}
      /> */}
    </div>
  );
}
