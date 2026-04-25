import { authGuard } from "@/lib/auth-utils";
import { prisma } from "@/lib/db";
import { addYearMonthDay, formatCurrency } from "@/lib/utils/date-logic";
import { generatInformations } from "@/utils/constant";
import { TransactionType } from "@prisma/client";
import { TrendingUp, Target, Calendar, ShieldCheck } from "lucide-react";

export async function InvestmentSummary({ groupId }: { groupId: string }) {
  const session = await authGuard(groupId);
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
    <section className="glass-morphism p-8 rounded-[3rem] border border-white shadow-2xl relative overflow-hidden group transition-all duration-500">
      <div className="absolute inset-0 rounded-[3rem] border-t border-l border-white/80 pointer-events-none z-10" />

      {/* Ambient background glow */}
      <div className="absolute -right-10 -top-10 w-48 h-48 bg-emerald-100/30 rounded-full blur-3xl opacity-50 group-hover:opacity-100 transition-opacity pointer-events-none" />

      <div className="flex items-center justify-between mb-10 relative">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-2xl shadow-sm border border-white">
            <TrendingUp size={20} strokeWidth={2.5} />
          </div>
          <h3 className="text-[10px] font-black text-slate-900 uppercase tracking-[0.2em]">
            Investment Vault
          </h3>
        </div>
        <div className="flex items-center gap-1.5 px-4 py-1.5 bg-slate-900 text-[9px] font-black text-white rounded-full uppercase tracking-[0.1em] shadow-lg">
          <ShieldCheck size={12} /> Verified Protocol
        </div>
      </div>

      <div className="space-y-8 relative">
        {/* Main Balance Section */}
        <div className="py-8 px-6 bg-white/40 rounded-[2.5rem] border border-white shadow-inner backdrop-blur-sm">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">
            Total Capital Contributed
          </p>
          <div className="flex items-baseline gap-2">
            <h2 className="text-5xl font-black text-slate-900 tracking-tighter">
              {formatCurrency(totalInvested)}
            </h2>
            <span className="text-sm font-black text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-100">
              +10%
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="p-6 bg-white/50 border border-white rounded-[2rem] shadow-sm backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-1.5 bg-rose-50 rounded-lg text-rose-500">
                <Target size={14} />
              </div>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                Target Cap
              </span>
            </div>
            <p className="text-xl font-black text-slate-900 tracking-tight">
              {formatCurrency(currentStepUp)}
              <span className="text-xs text-slate-400 font-medium ml-1">
                /mo
              </span>
            </p>
            <div className="w-full h-1.5 bg-slate-200/50 rounded-full mt-3 overflow-hidden p-[0.5px]">
              <div
                className="h-full bg-rose-500 rounded-full shadow-[0_0_8px_rgba(244,63,94,0.3)]"
                style={{ width: `${targetProgress}%` }}
              />
            </div>
          </div>

          <div className="p-6 bg-white/50 border border-white rounded-[2rem] shadow-sm backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-1.5 bg-blue-50 rounded-lg text-blue-500">
                <Calendar size={14} />
              </div>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                Review Cycle
              </span>
            </div>
            <p className="text-xl font-black text-slate-900 tracking-tight">
              {nextReview}
            </p>
            <p className="text-[9px] font-black text-blue-500 mt-2 uppercase tracking-widest">
              Next Monthly Sync
            </p>
          </div>
        </div>

        <div className="mt-4 space-y-4">
          <div className="p-6 bg-slate-900 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
            <div className="flex justify-between items-center mb-4">
              <div>
                <span className="block text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] mb-1">
                  Active Strategy
                </span>
                <span className="text-sm font-black text-white uppercase tracking-tight">
                  Power 5 Rotation
                </span>
              </div>
              <div className="p-2.5 bg-white/10 rounded-2xl border border-white/10">
                <ShieldCheck size={20} className="text-blue-400" />
              </div>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed font-medium">
              Your capital is rotated to maximize Compound Growth.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
