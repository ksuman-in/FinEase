"use client";

import { approveLoanAction } from "@/lib/actions/agent/approveLoanAction";
import { Check, User, X } from "lucide-react";

type RequestType = {
  id: string;
  user: { name: string };
  issuedAt: Date;
  amount: string | number;
};

export default function AgentRequestSection({
  requests,
}: {
  requests: RequestType[];
}) {
  // If no requests, show a "Fantastic" empty state
  if (requests.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-20 bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200">
        <p className="text-slate-400 font-bold italic">
          No pending requests. Everything is synced.
        </p>
      </div>
    );
  }

  return (
    <section className="space-y-6">
      <div className="flex items-center gap-2 px-2">
        <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
        <h2 className="text-sm font-black text-slate-500 uppercase tracking-widest">
          Pending Approvals ({requests.length})
        </h2>
      </div>

      <div className="grid gap-4">
        {requests.map((request: RequestType) => (
          <div
            key={request.id}
            className="group relative p-6 bg-white border border-slate-100 rounded-[2rem] hover:shadow-xl hover:shadow-slate-200/50 transition-all"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              {/* Member Info */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400">
                  <User size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">
                    {request.user.name}
                  </h4>
                  <p className="text-xs text-slate-500">
                    Requested on{" "}
                    {new Date(request.issuedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Amount */}
              <div className="flex items-center gap-1">
                <span className="text-slate-400 font-bold">₹</span>
                <span className="text-2xl font-black text-slate-900 leading-none">
                  {request.amount.toLocaleString("en-IN")}
                </span>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button className="flex-1 md:flex-none px-6 py-3 rounded-xl bg-slate-50 text-slate-400 hover:bg-rose-50 hover:text-rose-600 font-bold text-sm transition-all flex items-center justify-center gap-2">
                  <X size={16} /> Reject
                </button>
                <button
                  onClick={async () => await approveLoanAction(request.id)}
                  className="flex-1 md:flex-none px-6 py-3 rounded-xl bg-slate-900 text-white hover:bg-blue-600 font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-slate-900/20"
                >
                  <Check size={16} /> Approve
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
