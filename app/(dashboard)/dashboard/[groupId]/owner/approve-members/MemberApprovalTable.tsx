// components/dashboard/MemberApprovalTable.tsx
"use client";

import { useState } from "react";
import { toast } from "sonner";
import { X, RefreshCw, FileCheck } from "lucide-react";
import { processMemberApprovalAction } from "@/lib/actions/owner/membershipsApprove";
import { GroupRole } from "@prisma/client";

interface PendingMembership {
  id: string;
  role: GroupRole;
  createdAt: Date;
  user: { name: string | null; email: string; phoneNumber: string | null };
}

interface TableProps {
  memberships: PendingMembership[];
  groupId: string;
}

export default function MemberApprovalTable({
  memberships: initialData,
  groupId,
}: TableProps) {
  const [list, setList] = useState(initialData);
  const [processingId, setProcessingId] = useState<string | null>(null);

  const handleStatusChange = async (
    membershipId: string,
    action: "ACTIVATE" | "REJECT",
  ) => {
    setProcessingId(membershipId);
    const toastId = toast.loading(
      `${action === "ACTIVATE" ? "Activating" : "Rejecting"} profile credentials...`,
    );

    try {
      const res = await processMemberApprovalAction(
        membershipId,
        groupId,
        action,
      );

      if (res.success) {
        setList((prev) => prev.filter((item) => item.id !== membershipId));
        toast.success(res.message, { id: toastId });
      } else {
        toast.error(res.message, { id: toastId });
      }
    } catch (err) {
      toast.error("Network infrastructure interface failure.", { id: toastId });
    } finally {
      setProcessingId(null);
    }
  };

  if (list.length === 0) {
    return (
      <div className="py-20 text-center space-y-2">
        <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">
          Registry Clean
        </p>
        <p className="text-sm text-slate-500 font-medium">
          No memberships are currently awaiting legal onboarding steps.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-slate-200 text-slate-400 font-black text-xs uppercase tracking-wider">
            <th className="pb-4 pl-4">Applicant Profile</th>
            <th className="pb-4">Allocated Role</th>
            <th className="pb-4">Contact Record</th>
            <th className="pb-4">Joined App</th>
            <th className="pb-4 pr-4 text-right">Office Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 text-sm font-medium text-slate-700">
          {list.map((m) => (
            <tr key={m.id} className="hover:bg-white/20 transition-colors">
              <td className="py-4 pl-4">
                <div className="font-bold text-slate-900">
                  {m.user.name || "Awaiting Name Sync"}
                </div>
                <div className="text-xs text-slate-400 font-mono">
                  {m.user.email}
                </div>
              </td>
              <td className="py-4">
                <span
                  className={`inline-block px-2.5 py-1 rounded-full text-xs font-bold tracking-tight ${
                    m.role === "BORROWER"
                      ? "bg-rose-100 text-rose-800"
                      : "bg-emerald-100 text-emerald-800"
                  }`}
                >
                  {m.role}
                </span>
              </td>
              <td className="py-4 text-xs font-mono text-slate-600">
                {m.user.phoneNumber || "No Phone Registered"}
              </td>
              <td className="py-4 text-xs text-slate-400 font-mono">
                {new Date(m.createdAt).toLocaleDateString("en-IN")}
              </td>
              <td className="py-4 pr-4 text-right">
                <div className="inline-flex gap-2">
                  <button
                    disabled={processingId !== null}
                    onClick={() => handleStatusChange(m.id, "ACTIVATE")}
                    className="p-2 bg-emerald-500/10 text-emerald-700 border border-emerald-500/20 rounded-xl hover:bg-emerald-500 hover:text-white transition-all disabled:opacity-50"
                    title="Confirm Documents & Activate"
                  >
                    {processingId === m.id ? (
                      <RefreshCw className="animate-spin" size={16} />
                    ) : (
                      <FileCheck size={16} />
                    )}
                  </button>
                  <button
                    disabled={processingId !== null}
                    onClick={() => handleStatusChange(m.id, "REJECT")}
                    className="p-2 bg-rose-500/10 text-rose-700 border border-rose-500/20 rounded-xl hover:bg-rose-500 hover:text-white transition-all disabled:opacity-50"
                    title="Reject/Flag Account"
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
