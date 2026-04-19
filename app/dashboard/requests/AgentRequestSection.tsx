"use client";
import { processLoanAction } from "@/lib/actions/agent/processLoanAction";
import { formatCurrency } from "@/lib/utils/date-logic";
import { LoanStatus } from "@prisma/client";
import { Loader2, X } from "lucide-react";
import { useState } from "react";
type RequestType = {
  id: string;
  user: { name: string; loans: { status: LoanStatus }[] };
  issuedAt: Date;
  amount: number;
  description: string | null;
};
export default function AdminPendingRequests({
  requests,
}: {
  requests: RequestType[];
}) {
  const [processingState, setProcessingState] = useState<{
    id: string;
    action: LoanStatus;
  } | null>(null);

  const handleAction = async (loanId: string, action: LoanStatus) => {
    try {
      setProcessingState({ id: loanId, action });
      await processLoanAction(loanId, action);
    } catch (error) {
      console.error("Failed to process action:", error);
    } finally {
      setProcessingState(null);
    }
  };
  return (
    <section className="bg-white/60 backdrop-blur-xl border border-white rounded-[3rem] p-10 shadow-2xl">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">
            Pending Approvals
          </h2>
          <p className="text-slate-700 font-bold italic">
            Verification required for {requests.length} members
          </p>
        </div>
        <div className="px-5 py-2 bg-amber-100 text-amber-600 rounded-full text-xs font-black uppercase tracking-widest">
          Action Required
        </div>
      </div>

      <div className="space-y-4">
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
              className={`flex items-center justify-between p-6 bg-slate-50/50 rounded-[2rem] border border-transparent transition-all ${
                isCancelling || isApproving
                  ? "opacity-70 pointer-events-none"
                  : "hover:border-slate-200"
              }`}
            >
              {/* User Info Section */}
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-white font-black text-lg">
                  {request.user.name[0]}
                </div>
                <div>
                  <p className="text-sm font-black text-slate-900">
                    {request.user.name}
                  </p>
                  <p
                    className={`text-[10px] font-black px-2 py-1 rounded-md ${isTopUp ? "bg-blue-50 text-blue-600" : "bg-purple-50 text-purple-600"}`}
                  >
                    {isTopUp ? "TOP-UP REQUEST" : "NEW CAPITAL REQUEST"}
                  </p>
                </div>
              </div>

              {/* Amount Section */}
              <div className="text-center">
                <p className="text-lg font-black text-slate-900">
                  {formatCurrency(request.amount)}
                </p>
                <p className="text-[10px] font-bold text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-md">
                  1% Monthly Int.
                </p>
              </div>

              {/* Actions Section */}
              <div className="flex gap-3">
                {/* CANCEL BUTTON */}
                <button
                  disabled={isAnyLoading}
                  onClick={() => handleAction(request.id, LoanStatus.CANCELLED)}
                  className={`w-12 h-12 flex items-center justify-center rounded-2xl border-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                    isCancelling
                      ? "border-rose-500 text-rose-500 bg-rose-50"
                      : "border-slate-200 text-slate-400 hover:border-rose-200 hover:text-rose-500 cursor-pointer"
                  }`}
                >
                  {isCancelling ? (
                    <Loader2 className="animate-spin w-5 h-5" strokeWidth={3} />
                  ) : (
                    <X size={20} strokeWidth={3} />
                  )}
                </button>

                {/* APPROVE BUTTON */}
                <button
                  disabled={isAnyLoading}
                  onClick={() => handleAction(request.id, LoanStatus.ACTIVE)}
                  className="min-w-40 px-6 h-12 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest cursor-pointer hover:bg-blue-600 transition-all shadow-lg disabled:bg-slate-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isApproving ? (
                    <>
                      <Loader2 className="animate-spin w-4 h-4" />
                      Processing...
                    </>
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
