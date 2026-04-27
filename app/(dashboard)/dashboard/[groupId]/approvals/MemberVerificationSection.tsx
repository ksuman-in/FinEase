// components/admin/MemberVerificationSection.tsx
"use client";

import { useState } from "react";
import { UserCheck, XCircle, Loader2, ShieldAlert } from "lucide-react";
// import { verifyMemberAction } from "@/lib/actions/admin/verifyMemberAction";
import { toast } from "sonner";
import { verifyMemberAction } from "@/components/dashboard/verifyMemberAction";

interface Member {
  user: {
    id: string;
    name: string | null;
    email: string;
    phoneNumber: string | null;
  };
}

export default function MemberVerificationSection({
  members,
  groupId,
}: {
  members: Member[];
  groupId: string;
}) {
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const onVerify = async (userId: string) => {
    setLoadingId(userId);
    try {
      const res = await verifyMemberAction(userId, groupId);
      if (res.success) {
        toast.success("Identity Verified");
      }
    } catch (error) {
      toast.error("Verification failed");
    } finally {
      setLoadingId(null);
    }
  };

  if (members.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full py-10 opacity-40">
        <UserCheck className="w-12 h-12 mb-2 text-slate-400" />
        <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">
          No Pending Identities
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-3 px-2">
      {members.map((item) => (
        <div
          key={item.user.id}
          className="relative overflow-hidden rounded-2xl bg-white/50 border border-white/80 p-4 shadow-sm"
        >
          {/* Status Badge */}
          <div className="absolute top-0 right-0 px-3 py-1 bg-amber-100 text-amber-700 text-[9px] font-bold uppercase rounded-bl-xl">
            Pending Approval
          </div>

          <div className="flex flex-col gap-4">
            {/* User Profile Section */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-12 h-12 rounded-xl bg-slate-900 flex items-center justify-center text-white font-black text-base shadow-lg shadow-slate-200">
                  {item.user.name?.charAt(0) || "?"}
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-white rounded-full flex items-center justify-center border border-slate-100 shadow-sm">
                  <ShieldAlert className="w-3 h-3 text-amber-500" />
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-slate-900 text-sm truncate">
                  {item.user.name || "Anonymous User"}
                </h4>
                <div className="flex flex-col text-[11px] text-slate-500">
                  <span className="truncate">{item.user.email}</span>
                  <span className="font-mono text-[9px] opacity-70">
                    ID: {item.user.id.slice(-6)}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="grid grid-cols-5 gap-2 pt-1">
              <button
                onClick={() => onVerify(item.user.id)}
                disabled={!!loadingId}
                className="col-span-4 h-11 bg-slate-900 text-white rounded-xl text-[11px] font-bold uppercase tracking-wider cursor-pointer hover:bg-slate-800 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50 shadow-md shadow-slate-200"
              >
                {loadingId === item.user.id ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>Approve Member</>
                )}
              </button>

              <button
                disabled={!!loadingId}
                className="col-span-1 cursor-pointer h-11 flex items-center justify-center rounded-xl bg-red-50 border border-red-100 text-red-500 active:scale-[0.98] transition-all"
                title="Reject"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
