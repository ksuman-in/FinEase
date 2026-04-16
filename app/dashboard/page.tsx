import { authGuard } from "@/lib/auth-utils";
import StatCard from "@/components/dashboard/StatCard";
import TransactionListSnippet from "@/components/dashboard/TransactionListSnippet";
import { prisma } from "@/lib/db";
import Link from "next/link";
import TransactionUpdateDrawer from "@/components/transactions/TransactionUpdateDrawer";
import userDetails from "@/lib/actions/users";

export default async function DashboardPage() {
  const { user } = await authGuard();
  const isAdmin = user.role === "admin";

  const { users } = await userDetails();

  const now = new Date();
  const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const currentMonthContribution = await prisma.memberTransaction.findFirst({
    where: {
      userId: user.id,
      type: "CONTRIB",
      date: {
        gte: firstDayOfMonth,
      },
    },
  });

  const isPaymentPending = !currentMonthContribution;

  const transactions = await prisma.memberTransaction.findMany({
    where: {
      userId: isAdmin ? undefined : user.id,
    },
    take: 5,
  });

  const serializedTransactions = JSON.parse(JSON.stringify(transactions));

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-4xl font-black tracking-tighter text-white">
            {user.name.split(" ")[0]}
          </h2>
        </div>
        <div className="flex gap-3">
          <TransactionUpdateDrawer
            label="Repay Principal Amount"
            isPaymentPending={isPaymentPending}
            isAdmin={isAdmin}
            users={users}
          />
        </div>
      </div>

      {/* 2. Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Total Savings"
          amount="4,50,000"
          trend="+12%"
          color="emerald"
        />
        <StatCard
          label="Active Loan"
          amount="85,000"
          trend="Due in 12 days"
          color="rose"
        />
        <StatCard
          label="Interest Paid"
          amount="12,400"
          trend="Yearly"
          color="blue"
        />
        <StatCard
          label="Next SIP"
          amount="25,000"
          trend="May 01"
          color="violet"
        />
      </div>

      {/* 3. Main Content Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Growth Chart */}
        <div className="lg:col-span-2 bg-white/5 border border-white/10 rounded-[3rem] p-8 backdrop-blur-md">
          <div className="flex justify-between items-center mb-8">
            <h3 className="font-bold text-white uppercase tracking-widest text-xs">
              Portfolio Growth
            </h3>
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500" />
              <div className="w-3 h-3 rounded-full bg-slate-700" />
            </div>
          </div>
          <div className="h-75 w-full bg-white/2 rounded-3xl flex items-center justify-center border border-dashed border-white/5">
            {/* Replace with <SavingsChart /> */}
            <p className="text-slate-600 text-xs italic">
              Chart Visualization Engine
            </p>
          </div>
        </div>

        {/* Right: Quick Activity Snippet */}
        <div className="bg-white/5 border border-white/10 rounded-[3rem] p-8 backdrop-blur-md">
          <h3 className="font-bold text-white uppercase tracking-widest text-xs mb-8">
            Quick Ledger
          </h3>
          <TransactionListSnippet transactions={serializedTransactions} />
          <Link
            href="/dashboard/transactions"
            className="block w-full mt-6 py-4 text-center border border-white/5 rounded-2xl text-[10px] font-black uppercase tracking-widest text-app-bg0 hover:text-white hover:bg-white/5 transition-all"
          >
            View Full History
          </Link>
        </div>
      </div>
    </div>
  );
}
