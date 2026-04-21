import { EmptyLoanState } from "@/components/dashboard/EmptyLoanState";
import { authGuard } from "@/lib/auth-utils";
import ActiveLoanCard from "@/components/dashboard/ActiveLoanCard";
import { PaymentStatusTimeline } from "@/components/dashboard/PaymentStatusTimeline";
import activeLoan from "@/lib/actions/activeLoan";
import { AgentNudgeCard } from "@/components/dashboard/AgentNudgeCard";
import { InvestmentSummary } from "@/components/dashboard/InvestmentSummary";
import { prisma } from "@/lib/db";
import LoanStatusBanner from "@/components/dashboard/LoanStatusBanner";
import { LoanStatus, UserType } from "@prisma/client";

export default async function DashboardPage() {
  const session = await authGuard();
  const user = session.user;
  const hasGroup = !!user.groupId;
  const activeLoanDetails = await activeLoan();
  const isActiveLoan = !!activeLoanDetails?.id;
  const pendingOrCancelled = !isActiveLoan
    ? await prisma.memberLoan.findFirst({
        where: {
          userId: session.user.id,
          status: LoanStatus.REQUEST,
        },
        orderBy: { issuedAt: "desc" },
      })
    : null;
  return (
    <main className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Show timeline and status only if group exists */}
      {hasGroup && <PaymentStatusTimeline isActiveLoan={isActiveLoan} />}

      {hasGroup && (
        <section
          id="status-alerts"
          className="animate-in fade-in slide-in-from-top-4 duration-500"
        >
          <LoanStatusBanner loan={pendingOrCancelled} />
        </section>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {!hasGroup ? (
            <div className="flex flex-col items-center justify-center p-12 border-2 border-dashed rounded-xl bg-muted/30">
              <h2 className="text-xl font-semibold">
                Account Pending Approval
              </h2>
              <p className="text-muted-foreground text-center mt-2 max-w-sm">
                You are not currently assigned to any financial group. Please
                contact your administrator to be added to a vault.
              </p>
            </div>
          ) : isActiveLoan ? (
            <ActiveLoanCard activeLoanDetails={activeLoanDetails} />
          ) : (
            <EmptyLoanState
              loan={pendingOrCancelled}
              user={{ ...user, groupId: user.groupId ?? "" }}
            />
          )}
        </div>

        {/* Sidebar info: only show if group exists */}
        {hasGroup && (
          <div className="space-y-6">
            <InvestmentSummary />
            {user?.role === UserType.ADMIN && <AgentNudgeCard />}
          </div>
        )}
      </div>
    </main>
  );
}
