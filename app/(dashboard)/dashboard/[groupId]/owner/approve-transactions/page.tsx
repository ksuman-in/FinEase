import { authGuard } from "@/lib/auth-utils";
import { prisma } from "@/lib/db";
import { notFound, redirect } from "next/navigation";
import { Landmark, ShieldAlert } from "lucide-react";
import { GroupRole, LoanStatus, TransactionType } from "@prisma/client";
import TransactionApprovalTable from "./TransactionApprovalTable";

export default async function ApproveTransactionsPage({
  params,
}: {
  params: Promise<{ groupId: string }>;
}) {
  const session = await authGuard();
  const { groupId } = await params;

  // Enforce strict Super Admin governance
  const membership = await prisma.membership.findUnique({
    where: {
      userId_groupId: { userId: session.user.id, groupId },
    },
  });

  if (!membership || membership.role !== GroupRole.OWNER) {
    redirect(`/dashboard/${groupId}`);
  }

  const pendingTransactions = await prisma.memberLoan.findMany({
    where: {
      status: LoanStatus.REQUEST,
      groupId: groupId,
    },
    include: {
      user: {
        select: {
          name: true,
          email: true,
          loans: { where: { status: "ACTIVE" } },
        },
      },
    },
    orderBy: { issuedAt: "desc" },
  });

  return (
    <div className="min-h-screen p-6 md:p-10 space-y-8">
      <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 text-blue-500 font-black uppercase tracking-widest text-xs mb-1">
            <Landmark size={14} /> Vault Authority Desk
          </div>
          <h1 className="text-3xl font-black uppercase tracking-tighter text-slate-900">
            Transaction Clearances
          </h1>
          <p className="text-slate-500 text-sm font-medium">
            Reviewing queue for Vault ID:{" "}
            <code className="bg-slate-200/60 px-1.5 py-0.5 rounded text-xs font-mono">
              {groupId}
            </code>
          </p>
        </div>

        <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl px-4 py-3 flex items-center gap-3 max-w-xs">
          <ShieldAlert className="text-amber-600 shrink-0" size={20} />
          <p className="text-[11px] text-amber-900 leading-tight font-medium">
            Approvals modify live ledger metrics instantly. Cross-verify
            physical slips when necessary.
          </p>
        </div>
      </header>

      <main className="bg-white/40 backdrop-blur-xl border border-white rounded-[2.5rem] p-6 shadow-2xl overflow-hidden">
        <TransactionApprovalTable
          transactions={pendingTransactions}
          groupId={groupId}
        />
      </main>
    </div>
  );
}
