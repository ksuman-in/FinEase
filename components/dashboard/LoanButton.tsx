"use client";

import { useState } from "react";
import TransactionModal from "../model/TransactionModal";
import { TransactionType } from "@prisma/client";
import { settleMonthlyPaymentAction } from "@/lib/actions/settleMonthlyPaymentAction";
import { generatInformations } from "@/utils/constant";
import { repayPrincipalAction } from "@/lib/actions/repayPrincipalAction";
import { getPaymentWindowStatus } from "@/lib/utils/helper";
import { Plus, Zap, ShieldCheck } from "lucide-react";
import { requestTopUpAction } from "@/lib/actions/requestTopUpAction";

interface LoanProps {
  id: string;
  amount: number;
  interestRate: number;
  issuedAt?: Date;
  transactions: { amount: number }[];
}

type TransactionMode = "TOP_UP" | "CONTRIB" | "PRIN_REPAY";

export default function LoanButton({
  loanId,
  activeLoanDetails,
}: {
  loanId: string;
  activeLoanDetails: LoanProps;
}) {
  const { isInterestWindow, isPrincipalWindow } = getPaymentWindowStatus();
  const { amount, interestRate, transactions } = activeLoanDetails;
  const { monthlyContribution } = generatInformations;
  const totalPrincipalPaid = transactions.reduce(
    (acc, tx) => acc + tx.amount,
    0,
  );

  const remainingPrincipal = amount - totalPrincipalPaid;

  const [isOpenModal, openLoanModal] = useState(false);
  const [mode, setMode] = useState<TransactionMode>(TransactionType.CONTRIB);

  const openContributionModal = (transType: string) => {
    openLoanModal(true);
    setMode(transType as TransactionMode);
  };

  const handleInterestAndcontribution = async ({
    amount,
    description,
  }: {
    amount: number;
    description: string;
  }) => {
    if (mode === TransactionType.CONTRIB) {
      let contributionAmount = amount;
      let interestAmount = 0;
      if (remainingPrincipal) {
        interestAmount = amount - monthlyContribution;
        contributionAmount = monthlyContribution;
      }
      const response = await settleMonthlyPaymentAction({
        loanId,
        interestAmount,
        contributionAmount,
        description,
      });
      return response as { success?: boolean; error?: string };
    }
    if (mode === TransactionType.PRIN_REPAY) {
      const response = await repayPrincipalAction({
        loanId,
        amount,
        description,
      });
      return response as { success?: boolean; error?: string };
    }
    if (mode === TransactionType.TOP_UP) {
      const response = await requestTopUpAction({
        amount,
        description,
      });
      return response as { success?: boolean; error?: string };
    }
  };

  return (
    <div className="flex flex-col gap-5 mt-8 relative z-20">
      <div className="flex gap-4">
        {/* INTEREST BUTTON: Refined Milk Glass Style */}
        <button
          disabled={!isInterestWindow}
          onClick={() => openContributionModal(TransactionType.CONTRIB)}
          className={`flex-1 h-16 rounded-[1.5rem] font-black transition-all text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-2 border-2 ${
            isInterestWindow
              ? "bg-white border-blue-600 text-blue-600 shadow-lg shadow-blue-500/10 hover:bg-blue-600 hover:text-white hover:scale-[1.02] active:scale-95 cursor-pointer"
              : "bg-slate-100/50 border-slate-200 text-slate-400 cursor-not-allowed opacity-60"
          }`}
        >
          <Zap
            size={14}
            strokeWidth={3}
            className={isInterestWindow ? "animate-pulse" : ""}
          />
          {isInterestWindow ? "Pay Interest" : "Closed"}
        </button>

        {/* PRINCIPAL BUTTON: Refined Milk Glass Style */}
        <button
          disabled={!isPrincipalWindow}
          onClick={() => openContributionModal(TransactionType.PRIN_REPAY)}
          className={`flex-1 h-16 rounded-[1.5rem] font-black transition-all text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-2 border-2 ${
            isPrincipalWindow
              ? "bg-white border-slate-900 text-slate-900 shadow-lg shadow-slate-900/10 hover:bg-slate-900 hover:text-white hover:scale-[1.02] active:scale-95 cursor-pointer"
              : "bg-slate-100/50 border-slate-200 text-slate-400 cursor-not-allowed opacity-60"
          }`}
        >
          <ShieldCheck size={14} strokeWidth={3} />
          {isPrincipalWindow ? "Pay Principal" : "Closed"}
        </button>
      </div>

      {/* TOP-UP BUTTON: Dominant Dark Anchor Action */}
      <button
        onClick={() => openContributionModal(TransactionType.TOP_UP)}
        className="w-full h-16 bg-slate-900 text-white font-black rounded-[1.5rem] flex items-center justify-center gap-3 hover:bg-blue-600 transition-all shadow-2xl shadow-slate-900/20 active:scale-[0.98] text-[10px] uppercase tracking-[0.2em] group"
      >
        <div className="p-1.5 bg-white/10 rounded-lg group-hover:bg-white/20 transition-colors">
          <Plus className="w-4 h-4 text-white" strokeWidth={3} />
        </div>
        Request Loan Top-up
      </button>

      <TransactionModal
        isOpen={isOpenModal}
        onClose={() => openLoanModal(false)}
        mode={mode}
        onSubmit={handleInterestAndcontribution}
        remainingPrincipal={remainingPrincipal}
        interestRate={interestRate}
      />
    </div>
  );
}
