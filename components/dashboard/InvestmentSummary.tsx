import { authGuard } from "@/lib/auth-utils";
import { prisma } from "@/lib/db";
import { formatCurrency } from "@/lib/utils/date-logic";
import { TransactionType } from "@prisma/client";
import { TrendingUp, Target, Calendar } from "lucide-react";

export async function InvestmentSummary() {
  const session = await authGuard();
  const userId = session.user.id;
  const summary = await prisma.memberTransaction.aggregate({
    where: {
      userId,
      type: TransactionType.CONTRIB,
    },
    _sum: { amount: true },
    _count: { id: true },
  });
  const totalInvested = summary._sum.amount || 0;
  const currentStepUp = 25000;
  return (
    <section className="p-8 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
          <TrendingUp size={20} />
        </div>
        <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">
          Investment Summary
        </h3>
      </div>

      <div className="space-y-6">
        {/* Main Balance */}
        <div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
            Total Capital Contribution
          </p>
          <h2 className="text-4xl font-black text-slate-900">
            {formatCurrency(totalInvested)}
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-50">
          {/* Step-up Target */}
          <div>
            <div className="flex items-center gap-1.5 mb-1 text-slate-400">
              <Target size={12} />
              <span className="text-[10px] font-bold uppercase">
                2026 Target
              </span>
            </div>
            <p className="text-sm font-black text-slate-900">
              {formatCurrency(currentStepUp)}/mo
            </p>
          </div>

          <div>
            <div className="flex items-center gap-1.5 mb-1 text-slate-400">
              <Calendar size={12} />
              <span className="text-[10px] font-bold uppercase">
                Next Review
              </span>
            </div>
            <p className="text-sm font-black text-slate-900">July 2026</p>
          </div>
        </div>

        {/* Strategy Badge */}
        <div className="mt-4 p-3 bg-slate-50 rounded-2xl flex items-center justify-between">
          <span className="text-[9px] font-black text-slate-400 uppercase">
            Current Strategy
          </span>
          <span className="text-[9px] font-black text-blue-600 bg-blue-50 px-2 py-1 rounded-lg uppercase">
            Power 5 Rotation
          </span>
        </div>
      </div>
    </section>
  );
}
