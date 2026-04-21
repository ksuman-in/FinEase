"use client";

import { HandCoins, Plus, HeartHandshake } from "lucide-react";
import { useState } from "react";
import TransactionModal from "../model/TransactionModal";
import { LoanStatus, TransactionType, User } from "@prisma/client";
import requestLoanAction from "@/lib/actions/requestLoanAction";
import { settleMonthlyPaymentAction } from "@/lib/actions/settleMonthlyPaymentAction";
import { configTimeline } from "@/utils/constant";

type TransactionMode = "NEW_LOAN" | "CONTRIB";

export function EmptyLoanState({
  loan,
  user,
}: {
  loan: { status: string; amount: number } | null;
  user: { groupId: string };
}) {
  const isAlreadyLoanRequested = loan?.status === LoanStatus.REQUEST;
  const [activeMode, setActiveMode] = useState<TransactionMode | null>(null);

  const day = new Date().getDate();
  const interestStart = configTimeline.INTEREST.start;
  const interestEnd = configTimeline.INTEREST.end;
  const isOpen = day >= interestStart && day <= interestEnd;

  const handleRequestNewLoan = async (values: {
    amount: number;
    description: string;
  }) => {
    console.log({ user });
    const response = await requestLoanAction({
      ...values,
      groupId: user?.groupId,
    });
    return response as { success?: boolean; error?: string };
  };

  const handleContribution = async (values: {
    amount: number;
    description: string;
  }) => {
    const response = await settleMonthlyPaymentAction({
      contributionAmount: values.amount,
      description: values.description,
      interestAmount: 0,
    });
    return response as { success?: boolean; error?: string };
  };

  const openModal = (mode: TransactionMode) => setActiveMode(mode);
  const closeModal = () => setActiveMode(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="relative p-8 bg-slate-900 border border-white/10 rounded-[2.5rem] overflow-hidden group">
        <div className="absolute -right-4 -top-4 w-32 h-32 bg-blue-500/10 blur-3xl group-hover:bg-blue-500/20 transition-all" />
        <div className="flex flex-col h-full justify-between">
          <div className="mb-6">
            <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-4">
              <HandCoins className="w-7 h-7 text-blue-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-1">Need Capital?</h3>
            <p className="text-slate-400 text-sm">
              Access the group pool to boost your investment.
            </p>
          </div>
          <button
            onClick={() => openModal(TransactionType.NEW_LOAN)}
            className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-black rounded-2xl cursor-pointer flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-500/20 active:scale-95 disabled:bg-slate-400 disabled:cursor-not-allowed"
            disabled={isAlreadyLoanRequested}
          >
            <Plus className="w-5 h-5" />
            Get New Loan
          </button>
        </div>
      </div>

      <div className="relative p-8 bg-white border border-slate-200 rounded-[2.5rem] overflow-hidden group">
        <div className="absolute -right-4 -top-4 w-32 h-32 bg-emerald-500/5 blur-3xl group-hover:bg-emerald-500/10 transition-all" />
        <div className="flex flex-col h-full justify-between">
          <div className="mb-6">
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center mb-4">
              <HeartHandshake className="w-7 h-7 text-emerald-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-1">
              Grow the Pool
            </h3>
            <p className="text-slate-500 text-sm">
              Make your monthly ₹1,000 contribution to keep your membership
              active.
            </p>
          </div>
          <button
            onClick={() => openModal(TransactionType.CONTRIB)}
            className="w-full py-4 cursor-pointer bg-slate-900 hover:bg-blue-600 text-white font-black rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-slate-200 active:scale-95 disabled:bg-gray-500 disabled:cursor-not-allowed"
            disabled={!isOpen}
          >
            <Plus className="w-5 h-5" />
            Contribute
          </button>
        </div>
      </div>

      {/* Unified Modal Handler */}
      {activeMode && (
        <TransactionModal
          isOpen={!!activeMode}
          onClose={closeModal}
          mode={activeMode}
          onSubmit={
            activeMode === TransactionType.NEW_LOAN
              ? handleRequestNewLoan
              : handleContribution
          }
        />
      )}
    </div>
  );
}
