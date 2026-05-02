import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
import AgentRequestSection from "./AgentRequestSection";
import { authGuard } from "@/lib/auth-utils";
import { GroupRole } from "@prisma/client";
import { formatCurrency } from "@/lib/utils/date-logic";
import getTotalInHand from "@/lib/actions/getTotalInHand";
import MemberVerificationSection from "./MemberVerificationSection";
import { getGroupConfig } from "@/lib/database/group-config";

type ApprovalPageTypes = {
  params: Promise<{ groupId: string }>;
};

export default async function ApprovalsPage({ params }: ApprovalPageTypes) {
  const { groupId } = await params;
  const { user } = await authGuard(groupId);

  const { memberInterestRate } = await getGroupConfig(groupId);

  const membership = await prisma.membership.findFirst({
    where: { userId: user.id, groupId },
    include: { group: true },
  });

  if (membership?.role !== GroupRole.OWNER) {
    redirect("/dashboard");
  }

  const cashAvailable = await getTotalInHand(groupId);

  const pendingMembers = await prisma.membership.findMany({
    where: {
      groupId: groupId,
      user: { isVerified: false },
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          phoneNumber: true,
          role: true,
        },
      },
    },
  });

  const loanRequests = await prisma.memberLoan.findMany({
    where: {
      status: "REQUEST",
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
    <main className="min-h-screen bg-[#F8FAFC] relative overflow-hidden p-6 md:p-10">
      <header className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10 p-8 rounded-[2.5rem] bg-white/40 border border-white/60 backdrop-blur-md shadow-[0_8px_32px_0_rgba(148,163,184,0.15)] ring-1 ring-white/80">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="h-2 w-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
            <span className="text-blue-600/70 font-bold text-[10px] uppercase tracking-[0.3em]">
              {membership.group.name} • Control Center
            </span>
          </div>
          <h1 className="text-4xl font-black text-slate-800 tracking-tight">
            Vault Approvals
          </h1>
          <p className="text-slate-500 font-medium text-sm mt-1">
            Authorized Owner:{" "}
            <span className="text-slate-900">{user.name}</span>
          </p>
        </div>

        <div className="flex flex-col items-end">
          <div className="text-slate-400 text-[10px] uppercase font-bold tracking-[0.2em] mb-2">
            Available Liquidity
          </div>
          <div className="px-8 py-3 rounded-2xl bg-white/60 border border-white shadow-sm backdrop-blur-sm">
            <span className="text-3xl font-black text-slate-900 tracking-tighter">
              {formatCurrency(cashAvailable)}
            </span>
          </div>
        </div>
      </header>

      <div className="space-y-12 relative z-10">
        <div className="space-y-4 md:space-y-6">
          {/* Refined Header */}
          <div className="flex items-center gap-3 px-2 md:px-4">
            <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-slate-200" />
            <h2 className="text-[10px] md:text-xs font-black text-slate-400 uppercase tracking-[0.2em] md:tracking-[0.3em] whitespace-nowrap">
              Loan Requests Queue ({loanRequests.length})
            </h2>
            <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-slate-200" />
          </div>

          {/* Responsive Premium Container */}
          <section className="rounded-[2.5rem] md:rounded-[3.5rem] bg-white/30 border border-white/50 backdrop-blur-lg shadow-xl md:shadow-2xl shadow-slate-200/40 p-1.5 md:p-3">
            <div className="bg-white/20 rounded-[2.2rem] md:rounded-[3rem] p-3 md:p-8 min-h-[300px] md:min-h-[400px]">
              <div className="max-w-7xl mx-auto">
                <AgentRequestSection
                  requests={loanRequests}
                  memberInterestRate={memberInterestRate}
                />
              </div>
            </div>
          </section>
        </div>

        {pendingMembers.length > 0 && (
          <div className="space-y-4 md:space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Refined Header */}
            <div className="flex items-center gap-3 px-2 md:px-4">
              <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-slate-200" />
              <div className="flex flex-col items-center">
                <h2 className="text-[10px] md:text-xs font-black text-slate-400 uppercase tracking-[0.2em] md:tracking-[0.3em] whitespace-nowrap">
                  Identity Verification
                </h2>
                <span className="text-[9px] font-bold text-blue-500/60 uppercase tracking-widest">
                  {pendingMembers.length}{" "}
                  {pendingMembers.length === 1 ? "Request" : "Requests"}
                </span>
              </div>
              <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-slate-200" />
            </div>

            {/* Responsive Container */}
            <div className="rounded-[2rem] md:rounded-[3rem] bg-blue-50/20 border border-blue-100/50 backdrop-blur-lg p-1.5 md:p-3">
              <div className="bg-white/40 rounded-[1.8rem] md:rounded-[2.8rem] p-3 md:p-10">
                <div className="max-w-7xl mx-auto">
                  <MemberVerificationSection
                    members={pendingMembers}
                    groupId={groupId}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
