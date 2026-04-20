import { EmptyLoanState } from "@/components/dashboard/EmptyLoanState";
import { authGuard } from "@/lib/auth-utils";
import ActiveLoanCard from "@/components/dashboard/ActiveLoanCard";
import { PaymentStatusTimeline } from "@/components/dashboard/PaymentStatusTimeline";
import activeLoan from "@/lib/actions/activeLoan";
import { AgentNudgeCard } from "@/components/dashboard/AgentNudgeCard";
import { InvestmentSummary } from "@/components/dashboard/InvestmentSummary";
import { prisma } from "@/lib/db";
import LoanStatusBanner from "@/components/dashboard/LoanStatusBanner";
import { LoanStatus } from "@prisma/client";

export default async function DashboardPage() {
  const session = await authGuard();
  const user = session.user;
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
      <PaymentStatusTimeline isActiveLoan={isActiveLoan} />

      <section
        id="status-alerts"
        className="animate-in fade-in slide-in-from-top-4 duration-500"
      >
        <LoanStatusBanner loan={pendingOrCancelled} />
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 2. Primary Loan Card */}
        <div className="lg:col-span-2">
          {isActiveLoan ? (
            <ActiveLoanCard activeLoanDetails={activeLoanDetails} />
          ) : (
            <EmptyLoanState />
          )}
        </div>

        <div className="space-y-6">
          <InvestmentSummary />
          {user?.role === "admin" && <AgentNudgeCard />}
        </div>
      </div>
    </main>
  );
}
