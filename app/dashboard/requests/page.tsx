import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
import AgentRequestSection from "./AgentRequestSection";
import { authGuard } from "@/lib/auth-utils";
import { GroupRole, LoanStatus, TransactionType } from "@prisma/client";
import { formatCurrency } from "@/lib/utils/date-logic";
import getTotalInHand from "@/lib/actions/getTotalInHand";

export default async function RequestsPage() {
  const { user } = await authGuard();

  const membership = await prisma.membership.findFirst({
    where: { userId: user.id },
    include: { group: true },
  });

  if (membership?.role !== GroupRole.OWNER) {
    redirect("/dashboard");
  }

  const cashAvailable = await getTotalInHand();

  const requests = await prisma.memberLoan.findMany({
    where: {
      status: "REQUEST",
      groupId: membership.groupId,
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
            Loan Approvals
          </h1>
          <p className="text-slate-500 font-medium text-sm mt-1">
            Authorized Agent:{" "}
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

      {/* Main Content Area: Deep Milk Glass Panel */}
      <section className="relative z-10 rounded-[3rem] bg-white/30 border border-white/50 backdrop-blur-lg shadow-2xl shadow-slate-200/50 p-2">
        <div className="bg-white/20 rounded-[2.8rem] p-4 min-h-[400px]">
          <AgentRequestSection requests={requests} />
        </div>
      </section>
    </main>
  );
}
