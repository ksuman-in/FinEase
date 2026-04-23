"use client";

import { HandCoins, Plus, HeartHandshake } from "lucide-react";
import { useState, useMemo } from "react";
import TransactionModal from "../model/TransactionModal";
import { LoanStatus, TransactionType } from "@prisma/client";
import requestLoanAction from "@/lib/actions/requestLoanAction";
import { settleMonthlyPaymentAction } from "@/lib/actions/settleMonthlyPaymentAction";
import { configTimeline } from "@/utils/constant";

type TransactionMode = "NEW_LOAN" | "CONTRIB";

export function EmptyLoanState({
  loan,
  user,
}: {
  loan: { status: string; amount: number } | null;
  user: { groupId: string | undefined | null };
}) {
  const isAlreadyLoanRequested = loan?.status === LoanStatus.REQUEST;
  const [activeMode, setActiveMode] = useState<TransactionMode | null>(null);

  const day = new Date().getDate();
  const interestStart = configTimeline.INTEREST.start;
  const interestEnd = configTimeline.INTEREST.end;
  const isOpen = useMemo(
    () => day >= interestStart && day <= interestEnd,
    [day, interestStart, interestEnd],
  );
  console.log({ user });

  const handleRequestNewLoan = async (values: {
    amount: number;
    description: string;
  }) => {
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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
      {/* Get New Loan Card - Milk Glass Aesthetic */}
      <div className="glass-morphism p-10 rounded-[3rem] border border-white shadow-xl group relative overflow-hidden transition-all duration-500 hover:translate-y-[-4px]">
        {/* Soft Ambient Flare */}
        <div className="absolute -right-4 -top-4 w-32 h-32 bg-blue-500/5 blur-3xl group-hover:bg-blue-500/10 transition-all pointer-events-none" />

        <div className="flex flex-col h-full justify-between relative z-10">
          <div className="mb-8">
            <div className="w-16 h-16 rounded-2xl bg-white/60 border border-white flex items-center justify-center mb-6 shadow-sm">
              <HandCoins className="w-8 h-8 text-blue-600" strokeWidth={2.5} />
            </div>
            <h3 className="text-2xl font-black text-slate-900 mb-2 tracking-tight">
              Need Capital?
            </h3>
            <p className="text-slate-500 text-sm font-medium leading-relaxed">
              Access the group pool to boost your investment or handle immediate
              needs.
            </p>
          </div>

          <button
            onClick={() => openModal(TransactionType.NEW_LOAN)}
            className="w-full py-5 bg-slate-900 hover:bg-blue-600 text-white font-bold rounded-2xl cursor-pointer flex items-center justify-center gap-2 transition-all shadow-xl shadow-slate-900/10 active:scale-95 disabled:bg-slate-300 disabled:shadow-none disabled:cursor-not-allowed"
            disabled={isAlreadyLoanRequested}
          >
            <Plus className="w-5 h-5" strokeWidth={3} />
            {isAlreadyLoanRequested ? "Request Pending" : "Get New Loan"}
          </button>
        </div>
      </div>

      {/* Contribute Card - Milk Glass Aesthetic */}
      <div className="glass-morphism p-10 rounded-[3rem] border border-white shadow-xl group relative overflow-hidden transition-all duration-500 hover:translate-y-[-4px]">
        {/* Soft Ambient Flare */}
        <div className="absolute -right-4 -top-4 w-32 h-32 bg-emerald-500/5 blur-3xl group-hover:bg-emerald-500/10 transition-all pointer-events-none" />

        <div className="flex flex-col h-full justify-between relative z-10">
          <div className="mb-8">
            <div className="w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center mb-6 shadow-sm">
              <HeartHandshake
                className="w-8 h-8 text-emerald-600"
                strokeWidth={2.5}
              />
            </div>
            <h3 className="text-2xl font-black text-slate-900 mb-2 tracking-tight">
              Grow the Pool
            </h3>
            <p className="text-slate-500 text-sm font-medium leading-relaxed">
              Make your monthly contribution to keep membership active and grow
              the vault.
            </p>
          </div>

          <button
            onClick={() => openModal(TransactionType.CONTRIB)}
            className="w-full py-5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-900 font-bold rounded-2xl cursor-pointer flex items-center justify-center gap-2 transition-all shadow-sm active:scale-95 disabled:opacity-50 disabled:bg-slate-100 disabled:cursor-not-allowed"
            disabled={!isOpen}
          >
            <Plus className="w-5 h-5" strokeWidth={3} />
            {isOpen ? "Contribute" : "Window Closed"}
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
