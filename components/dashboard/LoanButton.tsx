"use client";

import { useState } from "react";
import TransactionModal from "../model/TransactionModal";
import { TransactionType } from "@prisma/client";
import { settleMonthlyPaymentAction } from "@/lib/actions/settleMonthlyPaymentAction";
import { generatInformations } from "@/utils/constant";
import { repayPrincipalAction } from "@/lib/actions/repayPrincipalAction";
import { getPaymentWindowStatus } from "@/lib/utils/helper";
import { Plus } from "lucide-react";
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
    <div className="flex flex-col gap-4 mt-8">
      <div className="flex gap-4">
        {/* INTEREST BUTTON */}
        <button
          disabled={!isInterestWindow}
          className={`flex-1 h-14 rounded-2xl font-black transition-all text-xs uppercase tracking-widest ${
            isInterestWindow
              ? "bg-white text-blue-600 border-2 border-blue-600 cursor-pointer hover:bg-blue-600 hover:text-white active:scale-95"
              : "bg-slate-50 text-slate-400 border border-slate-100 cursor-not-allowed"
          }`}
          onClick={() => openContributionModal(TransactionType.CONTRIB)}
        >
          {isInterestWindow ? "Pay Interest" : "Window Closed"}
        </button>

        {/* PRINCIPAL BUTTON */}
        <button
          disabled={!isPrincipalWindow}
          className={`flex-1 h-14 rounded-2xl font-black transition-all text-xs uppercase tracking-widest ${
            isPrincipalWindow
              ? "bg-white text-slate-900 border-2 border-slate-900 cursor-pointer hover:bg-slate-900 hover:text-white active:scale-95"
              : "bg-slate-50 text-slate-400 border border-slate-100 cursor-not-allowed"
          }`}
          onClick={() => openContributionModal(TransactionType.PRIN_REPAY)}
        >
          {isPrincipalWindow ? "Pay Principal" : "Window Closed"}
        </button>
      </div>

      {/* TOP-UP BUTTON */}
      <button
        onClick={() => openContributionModal(TransactionType.TOP_UP)}
        className="w-full h-14 bg-slate-900 text-white font-black rounded-2xl flex items-center justify-center gap-2 hover:bg-blue-600 transition-all shadow-xl shadow-slate-200 active:scale-[0.98] text-xs uppercase tracking-widest"
      >
        <Plus className="w-5 h-5 text-white" />
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
