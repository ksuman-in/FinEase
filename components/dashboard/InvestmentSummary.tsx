import { authGuard } from "@/lib/auth-utils";
import { prisma } from "@/lib/db";
import { addYearMonthDay, formatCurrency } from "@/lib/utils/date-logic";
import { generatInformations } from "@/utils/constant";
import { TransactionType } from "@prisma/client";
import { TrendingUp, Target, Calendar, ShieldCheck } from "lucide-react";

export async function InvestmentSummary({ groupId }: { groupId: string }) {
  const { user } = await authGuard(groupId);
  const userId = user.id;

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
    <section className="glass-morphism p-5 md:p-8 rounded-[2rem] md:rounded-[3rem] border border-white shadow-2xl relative overflow-hidden group transition-all duration-500">
      <div className="absolute inset-0 rounded-[2rem] md:rounded-[3rem] border-t border-l border-white/80 pointer-events-none z-10" />

      {/* Ambient background glow */}
      <div className="absolute -right-10 -top-10 w-32 md:w-48 h-32 md:h-48 bg-emerald-100/30 rounded-full blur-3xl opacity-50 group-hover:opacity-100 transition-opacity pointer-events-none" />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 md:mb-10 relative">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl md:rounded-2xl shadow-sm border border-white">
            <TrendingUp
              size={18}
              className="w-2.5 h-2.5 md:w-3 md:h-3"
              strokeWidth={2.5}
            />
          </div>
          <h3 className="text-[10px] font-black text-slate-900 uppercase tracking-[0.2em]">
            Investment Vault
          </h3>
        </div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 text-[8px] md:text-[9px] font-black text-white rounded-full uppercase tracking-[0.1em] shadow-lg">
          <ShieldCheck size={10} className="w-2.5 h-2.5 md:w-3 md:h-3" />{" "}
          Verified Protocol
        </div>
      </div>

      <div className="space-y-4 md:space-y-8 relative">
        {/* Main Balance Section */}
        <div className="py-6 md:py-8 px-4 md:px-6 bg-white/40 rounded-[1.5rem] md:rounded-[2.5rem] border border-white shadow-inner backdrop-blur-sm">
          <p className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 md:mb-2">
            Total Capital Contributed
          </p>
          <div className="flex flex-wrap items-baseline gap-2">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter">
              {formatCurrency(totalInvested)}
            </h2>
            <span className="text-[10px] md:text-sm font-black text-emerald-500 bg-emerald-50 px-1.5 py-0.5 rounded-lg border border-emerald-100">
              +10%
            </span>
          </div>
        </div>

        {/* Info Grid - Stacks on extra small mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
          <div className="p-4 bg-white/50 border border-white rounded-[1.5rem] md:rounded-[2rem] shadow-sm backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-2 md:mb-3">
              <div className="p-1 bg-rose-50 rounded-md text-rose-500">
                <Target
                  size={12}
                  className="w-[18px] h-[18px] md:w-[20px] md:h-[20px]"
                />
              </div>
              <span className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest">
                Target Cap
              </span>
            </div>
            <p className="text-lg md:text-xl font-black text-slate-900 tracking-tight">
              {formatCurrency(currentStepUp)}
              <span className="text-[10px] text-slate-400 font-medium ml-1">
                /mo
              </span>
            </p>
            <div className="w-full h-1.5 bg-slate-200/50 rounded-full mt-2 md:mt-3 overflow-hidden">
              <div
                className="h-full bg-rose-500 rounded-full"
                style={{ width: `${targetProgress}%` }}
              />
            </div>
          </div>

          <div className="p-4 bg-white/50 border border-white rounded-[1.5rem] md:rounded-[2rem] shadow-sm backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-2 md:mb-3">
              <div className="p-1 bg-blue-50 rounded-md text-blue-500">
                <Calendar
                  size={12}
                  className="w-[18px] h-[18px] md:w-[20px] md:h-[20px]"
                />
              </div>
              <span className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest">
                Review Cycle
              </span>
            </div>
            <p className="text-lg md:text-xl font-black text-slate-900 tracking-tight">
              {nextReview}
            </p>
            <p className="text-[8px] md:text-[9px] font-black text-blue-500 mt-1 md:mt-2 uppercase tracking-widest">
              Next Monthly Sync
            </p>
          </div>
        </div>

        <div className="mt-2 md:mt-4">
          <div className="p-4 bg-slate-900 rounded-[1.5rem] md:rounded-[2.5rem] shadow-2xl relative overflow-hidden">
            <div className="flex justify-between items-center mb-2 md:mb-4">
              <div>
                <span className="block text-[8px] md:text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] mb-1">
                  Active Strategy
                </span>
                <span className="text-xs md:text-sm font-black text-white uppercase tracking-tight">
                  Power 5 Rotation
                </span>
              </div>
              <div className="p-2 bg-white/10 rounded-xl border border-white/10">
                <ShieldCheck
                  size={16}
                  className="text-blue-400 w-[18px] h-[18px] md:w-[20px] md:h-[20px]"
                />
              </div>
            </div>
            <p className="text-[10px] md:text-[11px] text-slate-400 leading-relaxed font-medium">
              Your capital is rotated to maximize Compound Growth.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
