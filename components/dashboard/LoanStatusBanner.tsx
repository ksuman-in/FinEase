import { formatCurrency } from "@/lib/utils/date-logic";
import { HandCoins } from "lucide-react";

export default function LoanStatusBanner({
  loan,
}: {
  loan: { status: string; amount: number } | null;
}) {
  if (loan?.status !== "REQUEST") return null;

  return (
    <div className="glass-morphism p-6 rounded-[2.5rem] flex items-center gap-6 mb-8 border border-white relative overflow-hidden group">
      <div className="absolute inset-0 rounded-[2.5rem] border-t border-l border-white/60 pointer-events-none" />

      <div className="relative">
        <div className="w-16 h-16 bg-white/60 backdrop-blur-md rounded-[1.8rem] flex items-center justify-center text-blue-600 shadow-sm border border-white">
          <HandCoins size={32} strokeWidth={2.5} />
        </div>

        <span className="absolute -top-1 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-md">
          <span className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-ping" />
        </span>
      </div>

      <div className="relative">
        <p className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] mb-1">
          Verification in Progress
        </p>
        <h2 className="text-xl font-black text-slate-900 tracking-tight leading-tight">
          {formatCurrency(loan.amount)} Request is being reviewed
        </h2>
        <p className="text-slate-500 text-xs font-medium mt-1">
          Pending Power 10 consensus.
        </p>
      </div>
      <div className="absolute -right-10 top-0 w-32 h-32 bg-blue-100/20 blur-[60px] pointer-events-none" />
    </div>
  );
}
