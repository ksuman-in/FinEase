import { authGuard } from "@/lib/auth-utils";
import StatCard from "@/components/dashboard/StatCard";
import ActivityTable from "@/components/dashboard/AdminActions";
import AdminActions from "@/components/dashboard/AdminActions";

export default async function DashboardPage() {
  const { user } = await authGuard();

  // Fetch group data (Total pool, active loans, etc.)
  const totalPool = 10000;
  const activeLoans = [];

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-12 py-10 space-y-10">
      {/* 1. Welcome Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black tracking-tighter text-white">
            <span className="text-blue-500">{user.name?.toUpperCase()}</span>
          </h1>
        </div>

        {/* Quick Action Button */}
        <button className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-600/20">
          Request Loan
        </button>
      </header>

      {/* 2. Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Group Total Pool"
          value={`₹${totalPool || 0}`}
          description="Total combined contributions"
        />
        <StatCard
          title="Active Loans"
          value={activeLoans.length.toString()}
          description="Loans currently in repayment"
        />
        <StatCard
          title="Interest Earned"
          value="₹1,250"
          description="Total growth this quarter"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* 3. Main Activity Feed (2/3 width) */}
        <div className="lg:col-span-2 space-y-6">
          <h3 className="text-xl font-bold text-white px-2">
            Recent Transactions
          </h3>
          <ActivityTable />
        </div>

        {/* 4. Conditional Sidebar (1/3 width) */}
        <div className="space-y-8">
          {user?.role === "admin" ? (
            <AdminActions />
          ) : (
            <div className="p-6 bg-white/5 border border-white/10 rounded-3xl">
              <h4 className="text-white font-bold mb-2">Member Notice</h4>
              <p className="text-sm text-slate-400">
                Your next monthly contribution of ₹2,000 is due on May 1st.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
