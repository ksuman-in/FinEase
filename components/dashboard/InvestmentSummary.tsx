import { authGuard } from "@/lib/auth-utils";
import { prisma } from "@/lib/db";
import { addYearMonthDay, formatCurrency } from "@/lib/utils/date-logic";
import { generatInformations } from "@/utils/constant";
import { TransactionType } from "@prisma/client";
import { TrendingUp, Target, Calendar, ShieldCheck } from "lucide-react";

export async function InvestmentSummary() {
  const session = await authGuard();
  const userId = session.user.id;

  const nextReview = addYearMonthDay({ month: 1 });

  const summary = await prisma.memberTransaction.aggregate({
    where: {
      userId,
      type: TransactionType.CONTRIB,
    },
    _sum: { amount: true },
  });

  const totalInvested = summary._sum.amount || 0;
  const currentStepUp = 2000;

  const { monthlyContribution } = generatInformations;
  const targetProgress = (monthlyContribution / currentStepUp) * 100;

  return (
    <section className="p-8 bg-white border border-slate-100 rounded-[2.5rem] shadow-2xl shadow-slate-200/50 relative overflow-hidden group">
      {/* Decorative background glow */}
      <div className="absolute -right-10 -top-10 w-32 h-32 bg-emerald-50 rounded-full blur-3xl opacity-50 group-hover:opacity-100 transition-opacity" />

      <div className="flex items-center justify-between mb-8 relative">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-emerald-100 text-emerald-700 rounded-2xl shadow-sm">
            <TrendingUp size={18} strokeWidth={2.5} />
          </div>
          <h3 className="text-xs font-black text-slate-900 uppercase tracking-[0.15em]">
            Investment Vault
          </h3>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-900 text-[9px] font-black text-white rounded-full uppercase tracking-tighter">
          <ShieldCheck size={10} /> Verified
        </div>
      </div>

      <div className="space-y-6 relative">
        {/* Main Balance Section */}
        <div className="pt-6 pb-6 bg-slate-50 rounded-[2rem] border border-slate-100/50">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
            Total Capital Contributed
          </p>
          <div className="flex items-baseline gap-1">
            <h2 className="text-4xl font-black text-slate-900 tracking-tighter">
              {formatCurrency(totalInvested)}
            </h2>
            <span className="text-xs font-bold text-emerald-500">+10%</span>
          </div>
        </div>

        {/* Secondary Metrics Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-white border border-slate-100 rounded-2xl shadow-sm">
            <div className="flex items-center gap-1.5 mb-2 text-slate-400">
              <Target size={12} className="text-rose-500" />
              <span className="text-[9px] font-black uppercase tracking-tighter">
                Target Cap
              </span>
            </div>
            <p className="text-sm font-black text-slate-900">
              {formatCurrency(currentStepUp)}
              <span className="text-[10px] text-slate-400">/mo</span>
            </p>
            {/* Small Progress Bar for Target */}
            <div className="w-full h-1 bg-slate-100 rounded-full mt-2 overflow-hidden">
              <div
                className="h-full bg-rose-500"
                style={{ width: `${targetProgress}%` }}
              />
            </div>
          </div>

          <div className="p-4 bg-white border border-slate-100 rounded-2xl shadow-sm">
            <div className="flex items-center gap-1.5 mb-2 text-slate-400">
              <Calendar size={12} className="text-blue-500" />
              <span className="text-[9px] font-black uppercase tracking-tighter">
                Review Cycle
              </span>
            </div>
            <p className="text-sm font-black text-slate-900">{nextReview}</p>
            <p className="text-[9px] font-bold text-blue-500 mt-1 uppercase">
              Monthly Check
            </p>
          </div>
        </div>

        {/* Strategy Section */}
        <div className="mt-4 space-y-3">
          <div className="p-4 bg-slate-900 rounded-[2rem] shadow-xl shadow-slate-200">
            <div className="flex justify-between items-center mb-3">
              <div>
                <span className="block text-[8px] font-black text-slate-500 uppercase tracking-[0.2em]">
                  Current Strategy
                </span>
                <span className="text-xs font-black text-white uppercase tracking-tight">
                  Power 5 Rotation
                </span>
              </div>
              <div className="p-2 bg-white/10 rounded-xl">
                <ShieldCheck size={16} className="text-blue-400" />
              </div>
            </div>

            {/* Strategy Description */}
            <p className="text-[10px] text-slate-400 leading-relaxed font-medium">
              Your capital is currently being rotated to maximize
              <span className="text-white ml-1 font-bold italic underline decoration-blue-500">
                Compound Growth
              </span>
              . This ensures your contribution earns a share of all group
              interest.
            </p>
          </div>

          {/* Quick Status Tags */}
          <div className="flex gap-2">
            <div className="flex-1 py-2 bg-emerald-50 border border-emerald-100 rounded-xl text-center">
              <span className="block text-[8px] font-black text-emerald-600 uppercase">
                Status
              </span>
              <span className="text-[10px] font-black text-slate-900 uppercase tracking-tighter">
                Compounding
              </span>
            </div>
            <div className="flex-1 py-2 bg-blue-50 border border-blue-100 rounded-xl text-center">
              <span className="block text-[8px] font-black text-blue-600 uppercase">
                Risk Level
              </span>
              <span className="text-[10px] font-black text-slate-900 uppercase tracking-tighter">
                Low-Entry
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
