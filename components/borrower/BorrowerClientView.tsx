"use client";

import { repayEMIAction } from "@/lib/actions/repayEMIAction";
import { formatCurrency, formatTime } from "@/lib/utils/date-logic";
import { getOrdinal, getPaymentWindowStatus } from "@/lib/utils/helper";
import { Prisma } from "@prisma/client";
import {
  ArrowDownCircle,
  Clock,
  IndianRupee,
  Info,
  Loader2,
  Percent,
  ShieldCheck,
  Wallet,
  Zap,
} from "lucide-react";
import { useActionState } from "react";

const DEFAULT_CONFIG = {
  interestStartDay: 1,
  interestEndDay: 5,
  principalStartDay: 1,
  principalEndDay: 5,
};

type MembershipWithLoan = Prisma.MembershipGetPayload<{
  include: {
    group: { include: { config: true } };
  };
}>;

interface BorrowerClientViewProps {
  initialMembership: MembershipWithLoan;
  loan: {
    id: string;
    repayments: {
      id: string;
      billingMonth: number;
      billingYear: number;
      amountPaid: number;
      interestPaid: number;
      principalPaid: number;
      paymentDate: Date;
    }[];
    interestRate: number;
    remainingPrincipal: number;
    principalAmount: number;
    tenureMonths: number;
  };
  isPaidThisMonth: boolean;
}

export default function BorrowerClientView({
  initialMembership,
  loan,
  isPaidThisMonth,
}: BorrowerClientViewProps) {
  const [state, formAction, isPending] = useActionState(repayEMIAction, {
    success: false,
    message: "",
  });
  const config = initialMembership?.group?.config;
  const interestStartDay = config?.interestStartDay || 1;
  const interestEndDay = config?.interestEndDay || 5;
  const rate = loan?.interestRate || config?.borrowerInterestRate || 18;
  const remainingPrincipal = loan?.remainingPrincipal;
  const totalLoanTaken = loan?.principalAmount;
  const principalPaid = totalLoanTaken - remainingPrincipal;
  const repayments = loan?.repayments || [];

  const r = rate / (12 * 100);
  const n = loan?.tenureMonths;
  const emiAmount = Math.round(
    (totalLoanTaken * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1),
  );
  const interestDue = Math.round(remainingPrincipal * r);
  const remainingMonths = n - (loan?.repayments?.length || 0);
  const { isInterestWindow } = getPaymentWindowStatus({
    groupConfig: config || DEFAULT_CONFIG,
  });
  return (
    <div className="max-w-[1200px] mx-auto px-6 py-10 space-y-10 pb-20">
      <header className="p-10 rounded-[3rem] bg-white/40 border border-white/60 backdrop-blur-md shadow-xl flex justify-between items-end">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-rose-600 rounded-xl shadow-lg text-white">
              <IndianRupee size={20} />
            </div>
            <span className="text-slate-500 font-black text-[10px] uppercase tracking-[0.3em]">
              Active Borrower Session
            </span>
          </div>
          <h1 className="text-5xl font-black text-slate-900 tracking-tighter">
            Debt <span className="text-slate-400">Command</span>
          </h1>
        </div>
        <div className="text-right">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
            Vault Context
          </p>
          <p className="text-sm font-bold text-slate-900 flex items-center gap-2 justify-end">
            {initialMembership?.group?.name}{" "}
            <ShieldCheck size={16} className="text-blue-500" />
          </p>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="glass-morphism p-8 rounded-[2.5rem] border border-white shadow-xl bg-white/60 relative overflow-hidden">
          <Wallet
            className="absolute -right-4 -bottom-4 text-slate-900/5"
            size={120}
          />

          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 bg-slate-900 rounded-lg text-white">
                <Wallet size={16} />
              </div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                Total Remaining
              </p>
            </div>

            <p className="text-4xl font-black text-slate-900 tracking-tighter">
              {formatCurrency(remainingPrincipal)}
            </p>

            <div className="mt-4 flex items-start gap-2 text-slate-500">
              <ArrowDownCircle size={14} className="mt-0.5 shrink-0" />
              <p className="text-xs font-bold leading-tight">
                The total principal balance left to be settled before protocol
                closure.
              </p>
            </div>
          </div>
        </div>

        <div className="glass-morphism p-8 rounded-[2.5rem] border border-white shadow-xl bg-white/60 relative overflow-hidden">
          <Percent
            className="absolute -right-4 -bottom-4 text-rose-600/5"
            size={120}
          />

          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 bg-rose-600 rounded-lg text-white">
                <Percent size={16} />
              </div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                Interest Component (Next)
              </p>
            </div>

            <p className="text-4xl font-black text-rose-600 tracking-tighter">
              {formatCurrency(interestDue)}
            </p>

            <div className="mt-4 flex items-start gap-2 text-slate-500">
              <Info size={14} className="mt-0.5 shrink-0" />
              <p className="text-xs font-bold leading-tight">
                Calculated based on your custom ROI. Payable during the{" "}
                {getOrdinal(interestStartDay)} — {getOrdinal(interestEndDay)}{" "}
                window.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden">
          <div className="absolute -top-6 -right-6 opacity-10">
            <IndianRupee size={120} />
          </div>

          <div className="relative z-10 space-y-6">
            <div>
              <p className="text-[10px] font-black text-rose-400 uppercase tracking-widest mb-1">
                Next EMI Window
              </p>
              <p className="text-2xl font-black tracking-tight">
                {getOrdinal(interestStartDay)} — {getOrdinal(interestEndDay)}
              </p>
            </div>

            <div className="py-4 border-y border-white/10">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                Scheduled Outflow
              </p>
              <p className="text-4xl font-black text-white tracking-tighter">
                {formatCurrency(emiAmount)}
              </p>
            </div>

            <form action={formAction}>
              <input type="hidden" name="loanId" value={loan?.id} />
              <input
                type="hidden"
                name="groupId"
                value={initialMembership.groupId}
              />
              <button
                type="submit"
                disabled={!isInterestWindow || isPaidThisMonth}
                className="w-full py-4 bg-rose-600 hover:bg-rose-700 disabled:bg-slate-800 disabled:text-slate-500 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-lg shadow-rose-900/20"
              >
                {isPending ? (
                  <Loader2 className="animate-spin" size={16} />
                ) : (
                  <>
                    <Zap size={14} /> Execute EMI Protocol
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="glass-morphism p-6 rounded-3xl border border-white bg-white/40">
          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">
            Total Loan Taken
          </p>
          <p className="text-xl font-black text-slate-900">
            {formatCurrency(totalLoanTaken)}
          </p>
        </div>
        <div className="glass-morphism p-6 rounded-3xl border border-white bg-emerald-50/50">
          <p className="text-[9px] font-black text-emerald-600 uppercase tracking-widest mb-2">
            Principal Repaid
          </p>
          <p className="text-xl font-black text-emerald-700">
            {formatCurrency(principalPaid)}
          </p>
        </div>
        <div className="glass-morphism p-6 rounded-3xl border border-white bg-white/40">
          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">
            Total Tenure
          </p>
          <p className="text-xl font-black text-slate-900">
            {n} <span className="text-xs text-slate-400">Months</span>
          </p>
        </div>
        <div className="glass-morphism p-6 rounded-3xl border border-white bg-white/40">
          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">
            Remaining Months
          </p>
          <p className="text-xl font-black text-slate-900">
            {remainingMonths}{" "}
            <span className="text-xs text-slate-400">Months</span>
          </p>
        </div>
      </div>

      <section className="bg-white/40 backdrop-blur-xl border border-white rounded-[3rem] shadow-xl overflow-hidden">
        <div className="p-8 border-b border-white/60 flex items-center gap-3">
          <Clock className="text-slate-400" size={18} />
          <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest">
            Digital Ledger History
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-900/5 text-[10px] font-black uppercase text-slate-500">
              <tr>
                <th className="p-6">Payment Date</th>
                <th className="p-6">Total EMI</th>
                <th className="p-6 text-rose-600">Interest Paid</th>
                <th className="p-6 text-emerald-600">Principal Paid</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/60 text-xs">
              {repayments.map((rp) => (
                <tr key={rp.id}>
                  <td className="p-6 font-bold">
                    {formatTime({
                      time: rp.paymentDate,
                      format: "DD-MMM-YYYY",
                    })}
                  </td>
                  <td className="p-6 font-black">
                    {formatCurrency(rp.amountPaid)}
                  </td>
                  <td className="p-6 font-bold text-rose-600">
                    {formatCurrency(rp.interestPaid)}
                  </td>
                  <td className="p-6 font-bold text-emerald-600">
                    {formatCurrency(rp.principalPaid)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
