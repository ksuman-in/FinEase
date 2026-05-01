import { authGuard } from "@/lib/auth-utils";
import { prisma } from "@/lib/db";
import { formatCurrency } from "@/lib/utils/date-logic";
import { getOrdinal } from "@/lib/utils/helper";
import {
  TrendingDown,
  IndianRupee,
  Calendar,
  History,
  ArrowUpRight,
  ShieldCheck,
  Mail,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function BorrowerDashboard() {
  const { user } = await authGuard();

  const membership = await prisma.membership.findFirst({
    where: { userId: user.id },
    include: {
      group: { include: { config: true } },
    },
  });

  const config = membership?.group?.config;
  const rate = config?.borrowerInterestRate || 18; // Protocol standard

  return (
    /* MAX-WIDTH CONTAINER (1200px) */
    <main className="max-w-[1200px] mx-auto px-6 py-10 space-y-10 pb-20">
      {/* Header Section */}
      <header className="relative p-10 rounded-[3rem] bg-white/40 border border-white/60 backdrop-blur-md shadow-xl flex justify-between items-end">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-rose-600 rounded-xl shadow-lg">
              <IndianRupee size={20} className="text-white" />
            </div>
            <span className="text-slate-500 font-black text-[10px] uppercase tracking-[0.3em]">
              Active Borrower Session
            </span>
          </div>
          <h1 className="text-5xl font-black text-slate-900 tracking-tighter">
            Debt <span className="text-slate-400">Command</span>
          </h1>
        </div>

        <div className="text-right space-y-1">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
            Vault Context
          </p>
          <p className="text-sm font-bold text-slate-900 flex items-center gap-2 justify-end">
            {membership?.group?.name}
            {user.isVerified && (
              <ShieldCheck size={16} className="text-blue-500" />
            )}
          </p>
        </div>
      </header>

      {/* Primary Financial Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="glass-morphism p-8 rounded-[2.5rem] border border-white shadow-xl bg-white/60">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">
            Total Outstanding
          </p>
          <p className="text-4xl font-black text-slate-900 tracking-tighter">
            {formatCurrency(500000)}
          </p>
          <p className="text-[10px] text-slate-500 font-bold mt-4 uppercase tracking-tighter">
            Principal Balance
          </p>
        </div>

        <div className="glass-morphism p-8 rounded-[2.5rem] border border-white shadow-xl bg-white/60">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">
            Interest Due
          </p>
          <p className="text-4xl font-black text-rose-600 tracking-tighter">
            {formatCurrency(7500)}
          </p>
          <p className="text-[10px] text-slate-500 font-bold mt-4 uppercase tracking-tighter">
            Accrued at {rate}% p.a.
          </p>
        </div>

        <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-6 opacity-10">
            <Calendar size={80} />
          </div>
          <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-4 relative z-10">
            Payment Window
          </p>
          <p className="text-2xl font-black tracking-tight relative z-10">
            {getOrdinal(config?.interestStartDay || 25)} —{" "}
            {getOrdinal(config?.interestEndDay || 30)}
          </p>
          <p className="text-[10px] text-slate-400 font-bold mt-4 uppercase tracking-tighter relative z-10">
            Repayment Period
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
        {/* Principal Reduction Strategy */}
        <div className="xl:col-span-4 space-y-6">
          <div className="p-8 rounded-[3rem] bg-emerald-600 text-white shadow-2xl space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/10 rounded-xl">
                <TrendingDown size={20} />
              </div>
              <h3 className="text-xs font-black uppercase tracking-widest">
                Protocol Nudge
              </h3>
            </div>
            <p className="text-lg font-bold leading-tight">
              Repaying <span className="text-emerald-200">₹10,000</span> reduces
              interest by
              <span className="text-emerald-200">
                {" "}
                ₹{Math.round((10000 * (rate / 100)) / 12)}
              </span>{" "}
              /mo.
            </p>
            <p className="text-[10px] text-emerald-100/60 font-medium italic">
              Targeting 1 Crore milestone by 2032.
            </p>
          </div>

          {/* Verification & Communication Status */}
          <div className="p-8 rounded-[3rem] bg-slate-900 text-white shadow-xl space-y-4">
            <div className="flex items-center gap-3 text-blue-400">
              <Mail size={16} />
              <p className="text-[10px] font-black uppercase tracking-widest">
                Digital Ledger
              </p>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed font-bold">
              Automated emails are sent after every repayment to sync your
              balance.
            </p>
          </div>
        </div>

        {/* Recent Transaction History */}
        <div className="xl:col-span-8">
          <section className="bg-white/40 backdrop-blur-xl border border-white rounded-[3rem] shadow-xl overflow-hidden">
            <div className="p-8 border-b border-white/60 bg-white/40 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <History className="text-slate-400" size={18} />
                <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest">
                  Recent Activity
                </h3>
              </div>
            </div>
            <div className="divide-y divide-white/60">
              <div className="p-6 flex items-center justify-between hover:bg-white/40 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl">
                    <ArrowUpRight size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-black text-slate-900">
                      Principal Repayment
                    </p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase">
                      April 2026
                    </p>
                  </div>
                </div>
                <p className="text-sm font-black text-emerald-600">
                  - {formatCurrency(25000)}
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
