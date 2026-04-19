import { getPaymentWindowStatus } from "@/lib/utils/helper";
import { ArrowUpRight, Calendar, Info, TrendingUp } from "lucide-react";
import { formatCurrency } from "@/lib/utils/date-logic";
import LoanButton from "./LoanButton";

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
    <div className="relative overflow-hidden bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-2xl group">
      {/* Background Accent Glow - adjusted for light theme */}
      <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-blue-100/50 blur-[80px] group-hover:bg-blue-100/80 transition-all duration-500" />

      {/* Header Section */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">
              Active Capital
            </p>
          </div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tighter">
            {formatCurrency(remainingPrincipal)}
          </h2>
        </div>

        <button className="p-3 bg-slate-900 border border-slate-800 rounded-2xl text-white hover:bg-blue-600 transition-all shadow-lg">
          <ArrowUpRight size={20} />
        </button>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 gap-4 mb-10">
        {/* Next Interest Card */}
        <div className="relative overflow-hidden p-4 bg-slate-50 border border-slate-100 rounded-[1.5rem] transition-all hover:bg-white hover:shadow-md group">
          <div className="absolute -right-4 -top-4 w-12 h-12 bg-blue-500/5 blur-2xl group-hover:bg-blue-500/10 transition-all" />
          <div className="relative space-y-2">
            <div className="flex items-center gap-1.5">
              <div className="p-1.5 bg-blue-100 rounded-lg">
                <Calendar size={12} className="text-blue-600" />
              </div>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                Next Interest
              </p>
            </div>
            <p className="text-2xl font-black text-slate-900 tracking-tight">
              <span className="text-sm font-medium text-slate-400 mr-1">₹</span>
              {Number(nextInterest).toLocaleString()}
            </p>
          </div>
        </div>

        {/* Monthly Rate Card */}
        <div className="relative overflow-hidden p-4 bg-slate-50 border border-slate-100 rounded-[1.5rem] transition-all hover:bg-white hover:shadow-md group text-right">
          <div className="absolute -left-4 -top-4 w-12 h-12 bg-emerald-500/5 blur-2xl group-hover:bg-emerald-500/10 transition-all" />
          <div className="relative space-y-2">
            <div className="flex items-center justify-end gap-1.5">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                Monthly Rate
              </p>
              <div className="p-1.5 bg-emerald-100 rounded-lg">
                <TrendingUp size={12} className="text-emerald-600" />
              </div>
            </div>
            <p className="text-2xl font-black text-emerald-600 tracking-tight">
              {interestRate}
              <span className="text-sm font-medium opacity-60 ml-0.5">%</span>
            </p>
          </div>
        </div>
      </div>

      {/* Progress Section */}
      <div className="space-y-3">
        <div className="flex justify-between items-end">
          <span className="text-[10px] font-black text-slate-400 uppercase">
            Repayment Progress
          </span>
          <span className="text-xs font-mono font-bold text-blue-600">
            {paidPercentage > 0 ? paidPercentage.toFixed(1) : 0}%
          </span>
        </div>

        {/* Track */}
        <div className="relative w-full h-2 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-600 to-indigo-500 transition-all duration-1000 ease-out"
            style={{ width: `${paidPercentage > 0 ? paidPercentage : 0}%` }}
          />
        </div>

        <div className="flex justify-between text-[11px] font-bold text-slate-500 uppercase tracking-tighter">
          <span>
            Started:{" "}
            {issuedAt ? new Date(issuedAt).toLocaleDateString() : "N/A"}
          </span>
          <span>Goal: {formatCurrency(amount)}</span>
        </div>
      </div>

      <div className="mt-6 mb-6">
        <LoanButton
          loanId={activeLoanDetails.id}
          activeLoanDetails={activeLoanDetails}
        />
      </div>

      <div className="mb-8 p-5 bg-blue-50/50 border border-blue-100 rounded-[2rem] flex items-start gap-4 group/insight transition-all hover:bg-blue-50">
        <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center shadow-sm text-blue-600 shrink-0">
          <TrendingUp size={20} />
        </div>

        <div className="space-y-1">
          <p className="text-[11px] font-black text-blue-900 uppercase tracking-wider">
            Smart Savings Tip
          </p>
          <p className="text-[12px] text-blue-800/80 leading-relaxed font-medium">
            Every <span className="font-bold text-blue-600">₹10,000</span> you
            pay toward principal now reduces your lifetime interest by{" "}
            <span className="font-bold text-blue-600">₹100</span> every single
            month.
          </p>
        </div>
      </div>

      {!isPrincipalWindow && (
        <p className="text-center mt-4 text-[10px] text-slate-400 uppercase font-bold tracking-widest">
          Next payment window opens May 1st
        </p>
      )}

      {/* Footer Info / Tip */}
      <div className="mt-8 pt-6 border-t border-slate-100 flex items-center gap-3 text-slate-500">
        <div className="p-2 bg-slate-50 rounded-xl">
          <Info size={14} className="shrink-0 text-blue-600" />
        </div>
        <p className="text-[10px] leading-relaxed">
          Reducing balance enabled. Pay principal anytime to lower your next{" "}
          <span className="text-blue-600 font-bold">₹{nextInterest}</span>{" "}
          interest payment.
        </p>
      </div>
    </div>
  );
}
