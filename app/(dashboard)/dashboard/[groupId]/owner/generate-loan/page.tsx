import { authGuard } from "@/lib/auth-utils";
import { prisma } from "@/lib/db";
import LoanGenerator from "./LoanGenerator";
import { ArrowLeft, ShieldAlert } from "lucide-react";
import Link from "next/link";

export default async function GenerateLoanPage({
  params,
}: {
  params: Promise<{ groupId: string }>;
}) {
  const { groupId } = await params;
  const { user } = await authGuard(groupId);

  const membership = await prisma.membership.findFirst({
    where: {
      userId: user.id,
      groupId: groupId,
      role: "OWNER",
    },
  });
  if (!membership) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="p-8 rounded-[2rem] bg-rose-50 border border-rose-100 text-center space-y-4">
          <ShieldAlert className="mx-auto text-rose-600" size={48} />
          <h2 className="text-xl font-black text-rose-950 uppercase tracking-tight">
            Access Denied
          </h2>
          <p className="text-sm text-rose-700 font-medium max-w-xs">
            Only the authorized Vault Owner can generate new loan protocols.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1200px] mx-auto px-6 py-10 space-y-10">
      {/* Navigation & Status Header */}
      <div className="flex items-center justify-between">
        <Link
          href={`/dashboard/${groupId}/owner`}
          className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-slate-900 transition-all"
        >
          <ArrowLeft size={14} /> Back to Command Center
        </Link>

        <div className="flex items-center gap-2 px-4 py-1.5 bg-slate-900 text-white rounded-full shadow-lg">
          <ShieldAlert size={12} className="text-blue-400" />
          <span className="text-[9px] font-black uppercase tracking-[0.2em]">
            Authorized Owner Session
          </span>
        </div>
      </div>

      <header className="space-y-2">
        <h1 className="text-6xl font-black text-slate-900 tracking-tighter">
          Generate <span className="text-slate-400 font-normal">Loan</span>
        </h1>
        <p className="text-slate-500 font-bold text-sm tracking-tight">
          Assign capital and unique ROI to support the{" "}
          <span className="text-slate-900 underline decoration-blue-500/30">
            ₹1 Crore 2032 milestone
          </span>
          .
        </p>
      </header>

      <LoanGenerator groupId={groupId} />

      <footer className="pt-10 border-t border-slate-100 flex flex-col items-center gap-2">
        <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.4em]">
          Power 10 Management Protocol
        </p>
        <p className="text-[9px] text-slate-400 font-medium italic">
          All loan generations are logged to the digital ledger and triggered
          for automated email verification.
        </p>
      </footer>
    </div>
  );
}
