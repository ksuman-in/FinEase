"use client";

import { useState } from "react";
import TransactionModal from "../model/TransactionModal";
import { TransactionType } from "@prisma/client";
import { settleMonthlyPaymentAction } from "@/lib/actions/settleMonthlyPaymentAction";
import { getPaymentWindowStatus } from "@/lib/utils/date-logic";
import { generatInformations } from "@/utils/constant";
import { repayPrincipalAction } from "@/lib/actions/repayPrincipalAction";

interface LoanProps {
  id: string;
  amount: number;
  interestRate: number;
  issuedAt?: Date;
  transactions: { amount: number }[];
}

type TransactionMode = "NEW_LOAN" | "CONTRIB" | "PRIN_REPAY";

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
  };
  return (
    <div className="flex gap-4 mt-8">
      {/* Interest Button: Only 1st-5th */}
      <button
        disabled={!isInterestWindow}
        className={`flex-1 h-14 rounded-2xl font-black transition-all ${
          isInterestWindow
            ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20 cursor-pointer"
            : "bg-white/5 text-slate-500 border border-white/5 cursor-not-allowed"
        }`}
        onClick={() => openContributionModal(TransactionType.CONTRIB)}
      >
        {isInterestWindow
          ? "Pay Interest/Contribution"
          : "Interest/Contribution Window Closed"}
      </button>

      {/* Principal Button: Only 1st-10th */}
      <button
        disabled={isPrincipalWindow}
        className={`flex-1 h-14 rounded-2xl font-black transition-all ${
          !isPrincipalWindow
            ? "bg-white text-slate-950 cursor-pointer"
            : "bg-white/5 text-slate-500 border border-white/5 cursor-not-allowed"
        }`}
        onClick={() => openContributionModal(TransactionType.PRIN_REPAY)}
      >
        {!isPrincipalWindow ? "Pay Principal" : "Principal Window Closed"}
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
