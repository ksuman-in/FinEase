import {
  calculatePrincipalSavings,
  getPaymentWindowStatus,
} from "@/lib/utils/helper";
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
  groupId,
  groupConfig,
}: {
  activeLoanDetails: LoanProps;
  groupId: string;
  groupConfig: {
    memberInterestRate: number;
    interestStartDay: number;
    interestEndDay: number;
    principalStartDay: number;
    principalEndDay: number;
  };
}) {
  const { memberInterestRate } = groupConfig;
  const { isPrincipalWindow } = getPaymentWindowStatus({
    groupConfig,
  });
  const { amount, issuedAt, transactions } = activeLoanDetails;
  const totalPrincipalPaid = transactions.reduce(
    (acc, tx) => acc + tx.amount,
    0,
  );

  const interestRate = parseFloat(
    String(memberInterestRate ? memberInterestRate / 12 : 1),
  );

  const remainingPrincipal = amount - totalPrincipalPaid;
  const nextInterest = (remainingPrincipal * (interestRate / 100)).toFixed(0);
  const paidPercentage = ((amount - remainingPrincipal) / amount) * 100;

  const principalSaving = calculatePrincipalSavings(memberInterestRate);

  return (
    <div className="glass-morphism rounded-[3rem] p-10 relative group border border-white shadow-2xl overflow-hidden transition-all duration-500">
      {/* 3D Organic Rim Lighting */}
      <div className="absolute inset-0 rounded-[3rem] border-t border-l border-white/80 pointer-events-none" />

      {/* Dynamic Background Flare */}
      <div className="absolute -right-20 -top-20 w-64 h-64 bg-blue-100/40 rounded-full blur-[100px] group-hover:bg-blue-100/60 transition-all duration-700 pointer-events-none" />

      {/* Header Section */}
      <div className="flex justify-between items-start mb-10 relative">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2.5 h-2.5 bg-blue-600 rounded-full shadow-[0_0_10px_rgba(37,99,235,0.5)] animate-pulse" />
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.25em]">
              Active Capital
            </p>
          </div>
          <h2 className="text-5xl font-black text-slate-900 tracking-tighter leading-none">
            {formatCurrency(remainingPrincipal)}
          </h2>
        </div>

        <button className="w-14 h-14 bg-slate-900 rounded-2xl text-white flex items-center justify-center shadow-xl hover:bg-blue-600 hover:scale-110 transition-all duration-300 active:scale-95">
          <ArrowUpRight size={24} strokeWidth={2.5} />
        </button>
      </div>

      {/* Metrics Grid with Indented Soft-UI style */}
      <div className="grid grid-cols-2 gap-6 mb-10 relative">
        <div className="p-6 bg-white/40 border border-white rounded-[2rem] shadow-sm backdrop-blur-sm group/metric transition-all hover:bg-white/60">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-2 bg-blue-50 rounded-xl text-blue-600">
              <Calendar size={14} />
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
              Next Interest
            </p>
          </div>
          <p className="text-3xl font-black text-slate-900 tracking-tighter">
            <span className="text-sm font-medium text-slate-400 mr-1">₹</span>
            {Number(nextInterest).toLocaleString()}
          </p>
        </div>

        <div className="p-6 bg-white/40 border border-white rounded-[2rem] shadow-sm backdrop-blur-sm group/metric transition-all hover:bg-white/60 text-right">
          <div className="flex items-center justify-end gap-2 mb-3">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
              Monthly Rate
            </p>
            <div className="p-2 bg-emerald-50 rounded-xl text-emerald-600">
              <TrendingUp size={14} />
            </div>
          </div>
          <p className="text-3xl font-black text-emerald-600 tracking-tighter">
            {interestRate}
            <span className="text-lg opacity-60 ml-0.5">%</span>
          </p>
        </div>
      </div>

      {/* Progress Section */}
      <div className="space-y-4 mb-8 relative">
        <div className="flex justify-between items-end px-1">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
            Repayment Progress
          </span>
          <span className="text-sm font-black text-blue-600 bg-blue-50 px-2 py-0.5 rounded-lg">
            {paidPercentage > 0 ? paidPercentage.toFixed(1) : 0}%
          </span>
        </div>

        <div className="h-3 w-full bg-slate-200/50 rounded-full overflow-hidden p-[1px] border border-white shadow-inner">
          <div
            className="h-full bg-gradient-to-r from-blue-600 to-indigo-500 rounded-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(37,99,235,0.3)]"
            style={{ width: `${paidPercentage > 0 ? paidPercentage : 0}%` }}
          />
        </div>

        <div className="flex justify-between text-[11px] font-bold text-slate-400 uppercase tracking-tight px-1">
          <span>
            Issued: {issuedAt ? new Date(issuedAt).toLocaleDateString() : "N/A"}
          </span>
          <span className="text-slate-900">Goal: {formatCurrency(amount)}</span>
        </div>
      </div>

      <div className="mb-8 relative">
        <LoanButton
          loanId={activeLoanDetails.id}
          activeLoanDetails={activeLoanDetails}
          groupId={groupId}
          groupConfig={groupConfig}
        />
      </div>

      {/* Insight Section: Milk Glass Finish */}
      <div className="mb-8 p-6 bg-white/50 border border-white rounded-[2.5rem] flex items-start gap-4 shadow-sm hover:bg-white/80 transition-all duration-300 relative">
        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-md text-blue-600 shrink-0 border border-slate-50">
          <TrendingUp size={24} />
        </div>
        <div className="space-y-1">
          <p className="text-[11px] font-black text-blue-900 uppercase tracking-[0.15em]">
            Smart Savings Tip
          </p>
          <p className="text-[13px] text-slate-600 leading-relaxed font-medium">
            Every{" "}
            <span className="font-bold text-blue-600">
              {formatCurrency(principalSaving.amount)}
            </span>{" "}
            paid toward principal now reduces your lifetime interest by{" "}
            <span className="font-bold text-blue-600">
              {formatCurrency(principalSaving.monthlySaving)}
            </span>{" "}
            monthly.
          </p>
        </div>
      </div>

      {/* Footer / Context Section */}
      <div className="pt-8 border-t border-slate-100/80 flex flex-col items-center gap-4 relative">
        {!isPrincipalWindow && (
          <p className="text-[10px] text-slate-400 uppercase font-black tracking-[0.2em] bg-slate-50 px-4 py-1.5 rounded-full border border-slate-100">
            Next Principal Window Opens May 1st
          </p>
        )}
        <div className="flex items-center gap-3 text-slate-400 bg-white/30 p-3 rounded-2xl border border-white/50 w-full">
          <div className="p-2 bg-white rounded-xl shadow-sm text-blue-600">
            <Info size={16} />
          </div>
          <p className="text-[11px] leading-snug font-medium">
            Reducing balance active. Pay principal to lower your next{" "}
            <span className="text-slate-900 font-bold">
              {formatCurrency(+nextInterest)}
            </span>
            interest.
          </p>
        </div>
      </div>
    </div>
  );
}
