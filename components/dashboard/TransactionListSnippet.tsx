"use client";

import { ArrowUpRight, ArrowDownLeft, ReceiptText } from "lucide-react";

interface SimpleTransaction {
  id: string;
  type: "CONTRIB" | "INT_PAID" | "BOTH" | "PRIN_REPAY";
  amount: number;
  description: string;
  createdAt: string;
}

export default function TransactionListSnippet({
  transactions,
}: {
  transactions: SimpleTransaction[];
}) {
  if (transactions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-10 opacity-50">
        <ReceiptText size={32} className="mb-2 text-slate-600" />
        <p className="text-xs font-bold uppercase tracking-widest">
          No recent activity
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-1">
      {transactions.map((tx) => {
        const isEntry = tx.type === "CONTRIB";

        return (
          <div
            key={tx.id}
            className="flex items-center justify-between p-4 rounded-2xl hover:bg-white/[0.03] transition-all group"
          >
            <div className="flex items-center gap-4">
              {/* Minimal Icon Indicator */}
              <div
                className={`p-2 rounded-xl ${
                  isEntry
                    ? "bg-emerald-500/10 text-emerald-500"
                    : "bg-blue-500/10 text-blue-500"
                }`}
              >
                {isEntry ? (
                  <ArrowDownLeft size={16} />
                ) : (
                  <ArrowUpRight size={16} />
                )}
              </div>

              <div>
                <p className="text-sm font-bold text-slate-200 group-hover:text-white transition-colors">
                  {tx.description}
                </p>
                <p className="text-[10px] font-medium text-app-bg0 uppercase tracking-tighter">
                  {tx.type.replace("_", " ")} •{" "}
                  {new Date(tx.createdAt).toLocaleDateString(undefined, {
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>

            <div className="text-right">
              <p
                className={`text-sm font-mono font-black ${isEntry ? "text-emerald-400" : "text-white"}`}
              >
                {isEntry ? "+" : ""}
                {tx.amount.toLocaleString("en-IN", {
                  currency: "INR",
                  minimumFractionDigits: 2,
                })}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
