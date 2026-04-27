"use client";
import { processLoanAction } from "@/lib/actions/agent/processLoanAction";
import { formatCurrency } from "@/lib/utils/date-logic";
import { LoanStatus } from "@prisma/client";
import { Loader2, X, Info } from "lucide-react";
import { useState } from "react";

type RequestType = {
  id: string;
  user: { name: string; loans: { status: LoanStatus }[] };
  issuedAt: Date;
  amount: number;
  description: string | null;
  groupId: string;
};

export default function AdminPendingRequests({
  requests,
  memberInterestRate,
}: {
  requests: RequestType[];
  memberInterestRate: number;
}) {
  const [processingState, setProcessingState] = useState<{
    id: string;
    action: LoanStatus;
  } | null>(null);

  const handleAction = async (
    loanId: string,
    action: LoanStatus,
    groupId: string,
  ) => {
    try {
      setProcessingState({ id: loanId, action });
      await processLoanAction(loanId, action, groupId);
    } catch (error) {
      console.error("Failed to process action:", error);
    } finally {
      setProcessingState(null);
    }
  };

  return (
    <section className="bg-white/60 backdrop-blur-xl border border-white rounded-[2rem] md:rounded-[3rem] p-4 md:p-10 shadow-2xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 md:mb-10">
        <div>
          <h2 className="text-xl md:text-3xl font-black text-slate-900 tracking-tight">
            Pending Approvals
          </h2>
          <p className="text-xs md:text-sm text-slate-700 font-bold italic">
            Verification required for {requests.length} members
          </p>
        </div>
        <div className="px-4 py-1.5 bg-amber-100 text-amber-600 rounded-full text-[10px] font-black uppercase tracking-widest">
          Action Required
        </div>
      </div>

      <div className="space-y-3 md:space-y-4">
        {requests.map((request) => {
          const isTopUp = request.user.loans.some((l) => l.status === "ACTIVE");
          const isCancelling =
            processingState?.id === request.id &&
            processingState?.action === LoanStatus.CANCELLED;
          const isApproving =
            processingState?.id === request.id &&
            processingState?.action === LoanStatus.ACTIVE;
          const isAnyLoading = !!processingState;

          return (
            <div
              key={request.id}
              className={`flex flex-col md:flex-row md:items-center justify-between p-4 md:p-6 bg-slate-50/50 rounded-[1.5rem] md:rounded-[2rem] border border-transparent transition-all gap-4 ${
                isCancelling || isApproving
                  ? "opacity-70 pointer-events-none"
                  : "hover:border-slate-200"
              }`}
            >
              {/* Top Row: User Avatar & Basic Info */}
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-slate-900 rounded-xl md:rounded-2xl flex items-center justify-center text-white font-black text-base md:text-lg shrink-0">
                  {request.user.name[0]}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-black text-slate-900 truncate">
                    {request.user.name}
                  </p>
                  <span
                    className={`inline-block text-[9px] font-black px-2 py-0.5 rounded mt-1 ${isTopUp ? "bg-blue-50 text-blue-600" : "bg-purple-50 text-purple-600"}`}
                  >
                    {isTopUp ? "TOP-UP" : "NEW CAPITAL"}
                  </span>
                </div>
              </div>

              {/* Middle Row: Amount & Interest (Visible clearly on mobile) */}
              <div className="flex items-center justify-between md:flex-col md:text-center px-1 md:px-0 bg-white/40 md:bg-transparent p-3 md:p-0 rounded-xl">
                <div>
                  <p className="text-base md:text-lg font-black text-slate-900">
                    {formatCurrency(request.amount)}
                  </p>
                  <p className="text-[9px] md:text-[10px] font-bold text-emerald-600">
                    {(memberInterestRate / 12).toFixed(0)} Monthly Int.
                  </p>
                </div>
                <div className="md:hidden">
                  <Info size={14} className="text-slate-400" />
                </div>
              </div>

              {/* Bottom Row: Actions */}
              <div className="flex gap-2 md:gap-3">
                <button
                  type="button"
                  disabled={isAnyLoading}
                  onClick={() =>
                    handleAction(
                      request.id,
                      LoanStatus.CANCELLED,
                      request.groupId,
                    )
                  }
                  className={`w-12 h-12 flex items-center cursor-pointer justify-center rounded-xl md:rounded-2xl border-2 shrink-0 transition-all ${
                    isCancelling
                      ? "border-rose-500 text-rose-500 bg-rose-50"
                      : "border-slate-200 text-slate-400 active:bg-rose-50"
                  }`}
                >
                  {isCancelling ? (
                    <Loader2 className="animate-spin w-5 h-5" />
                  ) : (
                    <X size={20} strokeWidth={3} />
                  )}
                </button>

                <button
                  disabled={isAnyLoading}
                  onClick={() =>
                    handleAction(request.id, LoanStatus.ACTIVE, request.groupId)
                  }
                  className="flex-1 md:min-w-40 px-6 h-12 bg-slate-900 text-white rounded-xl md:rounded-2xl font-black text-[10px] md:text-xs uppercase tracking-widest active:scale-95 transition-all shadow-lg cursor-pointer disabled:bg-slate-300 flex items-center justify-center gap-2"
                >
                  {isApproving ? (
                    <Loader2 className="animate-spin w-4 h-4" />
                  ) : (
                    "Approve Request"
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
