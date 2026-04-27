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

export default async function DashboardPage() {
  const { session, user, membership } = await authGuard();
  const hasGroup = membership?.groupId;
  const isOwner = membership?.role === GroupRole.OWNER;
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
    <main className="space-y-8 animate-in fade-in duration-700">
      {/* Timeline - Floating above the glass */}
      {hasGroup && (
        <div className="glass-morphism p-2 rounded-[2.5rem] border border-white/60">
          {/* <PaymentStatusTimeline isActiveLoan={isActiveLoan} /> */}
        </div>
      )}

      {hasGroup && (
        <section
          id="status-alerts"
          className="animate-in slide-in-from-top-4 duration-500"
        >
          <LoanStatusBanner loan={pendingOrCancelled} />
        </section>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {!hasGroup ? (
            /* Empty State with Soft UI Indentation */
            <div className="flex flex-col items-center justify-center p-12 glass-morphism rounded-[3rem] border-2 border-dashed border-white/80 text-center">
              <div className="w-16 h-16 bg-white/50 rounded-2xl flex items-center justify-center mb-6 shadow-inner">
                <ShieldAlert className="text-slate-400" />
              </div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                Account Pending
              </h2>
              <p className="text-slate-500 font-medium mt-2 max-w-xs">
                You are not currently assigned to any financial group. Contact
                your admin.
              </p>
            </div>
          ) : isActiveLoan ? (
            /* Active Loan - Thickest Glass Layer */
            <div className="glass-morphism rounded-[3rem] p-1 border border-white shadow-xl hover:shadow-2xl transition-shadow">
              {/* <ActiveLoanCard activeLoanDetails={activeLoanDetails} /> */}
            </div>
          ) : (
            // <EmptyLoanState
            //   loan={pendingOrCancelled}
            //   user={{ ...user, groupId: membership?.groupId }}
            // />
            <></>
          )}
        </div>

        {/* Sidebar Widgets */}
        {hasGroup && (
          <div className="space-y-6">
            <div className="glass-morphism p-1 rounded-[2.5rem] border border-white shadow-lg">
              <InvestmentSummary groupId="" />
            </div>

            {isOwner && (
              <div className="glass-morphism p-1 rounded-[2.5rem] border border-white/40 overflow-hidden relative">
                {/* Added a subtle blue glow for the Admin Nudge */}
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
