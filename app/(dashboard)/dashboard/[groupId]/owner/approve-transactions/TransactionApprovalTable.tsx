"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Check, X, RefreshCw } from "lucide-react";
import { processLoanAction } from "@/lib/actions/agent/processLoanAction";
import { LoanStatus } from "@prisma/client";
import { formatCurrency } from "@/lib/utils/date-logic";

interface TransactionWithUser {
  id: string;
  user: { name: string; email: string; loans: { status: LoanStatus }[] };
  issuedAt: Date;
  amount: number;
  description: string | null;
  groupId: string;
}
interface TableProps {
  transactions: TransactionWithUser[];
  groupId: string;
}

export default function TransactionApprovalTable({
  transactions: initialData,
  groupId,
}: TableProps) {
  const [transactions, setTransactions] = useState(initialData);
  const [processingId, setProcessingId] = useState<string | null>(null);

  const handleAction = async (transactionId: string, action: LoanStatus) => {
    setProcessingId(transactionId);
    const toastId = toast.loading(
      `${action === LoanStatus.ACTIVE ? "Clearing" : "Rejecting"} transaction...`,
    );

    try {
      const res = await processLoanAction(transactionId, action, groupId);

      if (res.success) {
        setTransactions((prev) => prev.filter((t) => t.id !== transactionId));
        toast.success(`Transaction ${action.toLowerCase()}d successfully`, {
          id: toastId,
        });
      } else {
        toast.error(res.message || "Action failed", { id: toastId });
      }
    } catch (err) {
      toast.error("Network communication protocol failure.", { id: toastId });
    } finally {
      setProcessingId(null);
    }
  };

  if (transactions.length === 0) {
    return (
      <div className="py-20 text-center space-y-2">
        <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">
          Queue Clean
        </p>
        <p className="text-sm text-slate-500 font-medium">
          No pending actions found for this ledger cycle.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-slate-200 text-slate-400 font-black text-xs uppercase tracking-wider">
            <th className="pb-4 pl-4">User</th>
            <th className="pb-4">Description</th>
            <th className="pb-4">Amount</th>
            <th className="pb-4">Date Added</th>
            <th className="pb-4 pr-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 text-sm font-medium text-slate-700">
          {transactions.map((tx) => (
            <tr key={tx.id} className="hover:bg-white/20 transition-colors">
              <td className="py-4 pl-4">
                <div className="font-bold text-slate-900">
                  {tx.user.name || "Whitelisted User"}
                </div>
                <div className="text-xs text-slate-400 font-mono">
                  {tx.user.email}
                </div>
              </td>
              <td className="py-4">
                <span
                  className={`inline-block px-2.5 py-1 rounded-full text-xs font-bold tracking-tight`}
                >
                  {tx.description}
                </span>
              </td>
              <td className="py-4 font-bold text-slate-900">
                {formatCurrency(tx.amount)}
              </td>
              <td className="py-4 text-xs text-slate-400 font-mono">
                {new Date(tx.issuedAt).toLocaleDateString("en-IN")}
              </td>
              <td className="py-4 pr-4 text-right">
                <div className="inline-flex gap-2">
                  <button
                    disabled={processingId !== null}
                    onClick={() => handleAction(tx.id, LoanStatus.ACTIVE)}
                    className="p-2 bg-emerald-500/10 text-emerald-700 border border-emerald-500/20 rounded-xl hover:bg-emerald-500 hover:text-white transition-all disabled:opacity-50"
                  >
                    {processingId === tx.id ? (
                      <RefreshCw className="animate-spin" size={16} />
                    ) : (
                      <Check size={16} />
                    )}
                  </button>
                  <button
                    disabled={processingId !== null}
                    onClick={() => handleAction(tx.id, LoanStatus.CANCELLED)}
                    className="p-2 bg-rose-500/10 text-rose-700 border border-rose-500/20 rounded-xl hover:bg-rose-500 hover:text-white transition-all disabled:opacity-50"
                  >
                    <X size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
