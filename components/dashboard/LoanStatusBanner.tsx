import { formatCurrency } from "@/lib/utils/date-logic";
import { HandCoins } from "lucide-react";

export default function LoanStatusBanner({
  loan,
}: {
  loan: { status: string; amount: number } | null;
}) {
  if (loan?.status !== "REQUEST") return null;

  return (
    <div className="bg-amber-50 border border-amber-200/50 p-6 rounded-[2.5rem] flex items-center gap-5 mb-8 shadow-xl shadow-amber-900/5 transition-all">
      <div className="relative">
        <div className="w-14 h-14 bg-amber-500 rounded-[1.5rem] flex items-center justify-center text-white shadow-lg shadow-amber-200">
          <HandCoins size={28} />
        </div>
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center">
          <span className="w-2 h-2 bg-amber-500 rounded-full animate-ping" />
        </span>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-0.5">
          <p className="text-[10px] font-black text-amber-700 uppercase tracking-widest">
            Pending Approval
          </p>
        </div>
        <h2 className="text-lg font-black text-slate-900 tracking-tight">
          {formatCurrency(loan.amount)} Request is being reviewed
        </h2>
      </div>
    </div>
  );
}
