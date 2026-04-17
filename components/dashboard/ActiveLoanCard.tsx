import { ArrowUpRight, Calendar, Info } from "lucide-react";
import LoanButton from "./LoanButton";
import { getPaymentWindowStatus } from "@/lib/utils/date-logic";

interface LoanProps {
  id: string;
  amount: number;
  interestRate: number;
  issuedAt?: Date;
  transactions: { amount: number }[];
}

export default function ActiveLoanCard({
  activeLoanDetails,
}: {
  activeLoanDetails: LoanProps;
}) {
  const { isPrincipalWindow } = getPaymentWindowStatus();
  const { amount, interestRate, issuedAt, transactions } = activeLoanDetails;
  const totalPrincipalPaid = transactions.reduce(
    (acc, tx) => acc + tx.amount,
    0,
  );

  const remainingPrincipal = amount - totalPrincipalPaid;

  const nextInterest = (remainingPrincipal * (interestRate / 100)).toFixed(0);
  const paidPercentage = ((amount - remainingPrincipal) / amount) * 100;

  return (
    <div className="relative overflow-hidden bg-slate-950 border border-white/10 rounded-[2.5rem] p-8 shadow-2xl group">
      {/* Background Decorative Glow */}
      <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-blue-600/10 blur-[80px] group-hover:bg-blue-600/20 transition-all duration-500" />

      {/* Header: Title and Top-up Action */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">
              Active Capital
            </p>
          </div>
          <h2 className="text-3xl font-black text-white tracking-tighter">
            ₹{remainingPrincipal}
          </h2>
        </div>

        <button className="p-3 bg-white/5 border border-white/10 rounded-2xl text-blue-400 hover:bg-blue-500 hover:text-white transition-all">
          <ArrowUpRight size={20} />
        </button>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="space-y-1">
          <p className="text-[10px] font-bold text-slate-500 uppercase flex items-center gap-1">
            <Calendar size={10} /> Next Interest
          </p>
          <p className="text-lg font-mono font-bold text-white">
            ₹{nextInterest}
          </p>
        </div>
        <div className="space-y-1 text-right">
          <p className="text-[10px] font-bold text-slate-500 uppercase">
            Monthly Rate
          </p>
          <p className="text-lg font-mono font-bold text-emerald-400">
            {interestRate}%
          </p>
        </div>
      </div>

      {/* Progress Section */}
      <div className="space-y-3">
        <div className="flex justify-between items-end">
          <span className="text-[10px] font-black text-slate-400 uppercase">
            Repayment Progress
          </span>
          <span className="text-xs font-mono font-bold text-blue-400">
            {paidPercentage > 0 ? paidPercentage.toFixed(1) : 0}%
          </span>
        </div>

        {/* Track */}
        <div className="relative w-full h-2 bg-white/5 rounded-full overflow-hidden">
          {/* Progress fill */}
          <div
            className="h-full bg-gradient-to-r from-blue-600 to-indigo-500 transition-all duration-1000 ease-out"
            style={{ width: `${paidPercentage > 0 ? paidPercentage : 0}%` }}
          />
        </div>

        <div className="flex justify-between text-[12px] font-bold text-slate-400 uppercase tracking-tighter">
          <span>Started: {new Date(issuedAt || "").toLocaleDateString()}</span>
          <span>Goal: ₹0.00</span>
        </div>
      </div>

      <LoanButton
        loanId={activeLoanDetails.id}
        activeLoanDetails={activeLoanDetails}
      />

      {!isPrincipalWindow && (
        <p className="text-center mt-4 text-[10px] text-slate-500 uppercase font-bold tracking-widest">
          Next payment window opens May 1st
        </p>
      )}

      {/* Footer Info / Tip */}
      <div className="mt-8 pt-6 border-t border-white/5 flex items-center gap-3 text-slate-400">
        <Info size={14} className="shrink-0 text-blue-500/50" />
        <p className="text-[10px] leading-relaxed">
          Reducing balance enabled. Pay principal anytime to lower your next{" "}
          <span className="text-blue-400 font-bold">₹{nextInterest}</span>{" "}
          interest payment.
        </p>
      </div>
    </div>
  );
}
