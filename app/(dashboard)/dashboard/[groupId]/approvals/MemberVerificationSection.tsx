// components/admin/MemberVerificationSection.tsx
"use client";

import { useState } from "react";
import { UserCheck, ShieldCheck, XCircle, Loader2 } from "lucide-react";
// import { verifyMemberAction } from "@/lib/actions/admin/verifyMemberAction";
import { toast } from "sonner";

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
    // try {
    //   const res = await verifyMemberAction(userId, groupId);
    //   if (res.success) {
    //     toast.success("Identity Verified");
    //   }
    // } catch (error) {
    //   toast.error("Verification failed");
    // } finally {
    //   setLoadingId(null);
    // }
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
    <div className="space-y-4">
      {members.map((item) => (
        <div
          key={item.user.id}
          className="group relative p-5 rounded-3xl bg-white/40 border border-white/60 shadow-sm transition-all hover:bg-white/60 hover:shadow-md"
        >
          <div className="flex flex-col gap-4">
            {/* User Info */}
            <div className="flex items-start justify-between">
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-2xl bg-slate-900 flex items-center justify-center text-white font-black text-sm">
                  {item.user.name?.charAt(0) || "?"}
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm leading-tight">
                    {item.user.name || "Anonymous User"}
                  </h4>
                  <p className="text-[10px] text-slate-500 font-medium truncate max-w-[150px]">
                    {item.user.email}
                  </p>
                </div>
              </div>
              <ShieldCheck className="w-4 h-4 text-blue-500/30 group-hover:text-blue-500 transition-colors" />
            </div>

            {/* Verification Actions */}
            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => onVerify(item.user.id)}
                disabled={!!loadingId}
                className="flex-1 h-10 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loadingId === item.user.id ? (
                  <Loader2 className="w-3 h-3 animate-spin" />
                ) : (
                  <>Verify Identity</>
                )}
              </button>

              <button
                disabled={!!loadingId}
                className="w-10 h-10 flex items-center justify-center rounded-xl bg-white border border-slate-200 text-slate-400 hover:text-red-500 hover:border-red-100 hover:bg-red-50 transition-all"
              >
                <XCircle className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
