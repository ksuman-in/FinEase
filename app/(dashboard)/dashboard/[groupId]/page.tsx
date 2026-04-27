import { EmptyLoanState } from "@/components/dashboard/EmptyLoanState";
import { authGuard } from "@/lib/auth-utils";
import ActiveLoanCard from "@/components/dashboard/ActiveLoanCard";
import { PaymentStatusTimeline } from "@/components/dashboard/PaymentStatusTimeline";
import activeLoan from "@/lib/actions/activeLoan";
import { AgentNudgeCard } from "@/components/dashboard/AgentNudgeCard";
import { InvestmentSummary } from "@/components/dashboard/InvestmentSummary";
import { prisma } from "@/lib/db";
import LoanStatusBanner from "@/components/dashboard/LoanStatusBanner";
import { GroupRole, LoanStatus } from "@prisma/client";
import { ShieldAlert } from "lucide-react";
import { getGroupConfig } from "@/lib/database/group-config";

interface PageProps {
  params: Promise<{ groupId: string }>;
}

export default async function DashboardPage({ params }: PageProps) {
  const { groupId } = await params;

  const { session, user, membership } = await authGuard(groupId);
  const groupConfig = await getGroupConfig(groupId);

  const hasGroup = !!membership?.groupId;
  const isOwner = membership?.role === GroupRole.OWNER || user.isSuperAdmin;

  const activeLoanDetails = await activeLoan(groupId);
  const isActiveLoan = !!activeLoanDetails?.id;

  const pendingLoan = !isActiveLoan
    ? await prisma.memberLoan.findFirst({
        where: {
          userId: session.user.id,
          groupId: groupId,
          status: LoanStatus.REQUEST,
        },
        orderBy: { issuedAt: "desc" },
      })
    : null;

  return (
    <main className="space-y-8 animate-in fade-in duration-700">
      {hasGroup && (
        <div className="glass-morphism p-2 rounded-[2.5rem] border border-white/60">
          <PaymentStatusTimeline
            isActiveLoan={isActiveLoan}
            groupConfig={groupConfig}
          />
        </div>
      )}

      {hasGroup && (
        <section
          id="status-alerts"
          className="animate-in slide-in-from-top-4 duration-500"
        >
          <LoanStatusBanner loan={pendingLoan} />
        </section>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {!hasGroup ? (
            /* Unauthorized/Empty State */
            <div className="flex flex-col items-center justify-center p-12 glass-morphism rounded-[3rem] border-2 border-dashed border-white/80 text-center">
              <div className="w-16 h-16 bg-white/50 rounded-2xl flex items-center justify-center mb-6 shadow-inner">
                <ShieldAlert className="text-slate-400" />
              </div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                Access Restricted
              </h2>
              <p className="text-slate-500 font-medium mt-2 max-w-xs">
                You do not have access to this vault. Contact the group owner or
                system admin.
              </p>
            </div>
          ) : isActiveLoan ? (
            /* Active Loan Card for this specific group */
            <div className="glass-morphism rounded-[3rem] p-1 border border-white shadow-xl hover:shadow-2xl transition-shadow">
              <ActiveLoanCard
                activeLoanDetails={activeLoanDetails}
                groupId={groupId}
                groupConfig={groupConfig}
              />
            </div>
          ) : (
            <EmptyLoanState
              loan={pendingLoan}
              groupId={groupId}
              groupConfig={{
                interestStartDay: groupConfig.interestStartDay,
                interestEndDay: groupConfig.interestEndDay,
              }}
            />
          )}
        </div>

        {/* Sidebar Widgets */}
        {hasGroup && (
          <div className="space-y-6">
            <div className="glass-morphism p-1 rounded-[2.5rem] border border-white shadow-lg">
              {/* Ensure InvestmentSummary accepts and uses groupId for 18% profit calc */}
              <InvestmentSummary groupId={groupId} />
            </div>

            {isOwner && (
              <div className="glass-morphism p-1 rounded-[2.5rem] border border-white/40 overflow-hidden relative">
                <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500/10 blur-2xl" />
                <AgentNudgeCard />
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
