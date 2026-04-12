import React from "react";
import {
  TrendingUp,
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
  Users,
  PieChart,
  Calendar,
  ChevronRight,
} from "lucide-react";
import getMonthlyReport from "@/lib/database/getMonthlyReport";
import { formatDate } from "@/lib/utils";

export default async function Report() {
  const allReport = await getMonthlyReport();
  const reports = allReport || [];
  const history = [...reports]?.reverse().slice(1);

  const data = reports
    .sort(
      (prev, curr) =>
        new Date(curr?.reportDate).getTime() -
        new Date(prev?.reportDate).getTime(),
    )
    .at(0);

  if (!data) {
    return (
      <div className="p-6 bg-slate-950 text-slate-100 min-h-screen font-sans">
        <h1 className="text-3xl font-bold">No reports available</h1>
        <p className="text-slate-400">
          Financial reports will appear here once generated.
        </p>
      </div>
    );
  }

  const distributionPercentage =
    data.totalGroupValue > 0
      ? (data.totalDistributed / data.totalGroupValue) * 100
      : 0;

  return (
    <div className="p-6 bg-slate-950 text-slate-100 min-h-screen font-sans">
      {/* Header */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Financial Report
          </h1>
          <p className="text-slate-400">
            Snapshot for {formatDate(data?.reportDate)}
          </p>
        </div>
        <div className="bg-cyan-500/10 border border-cyan-500/20 px-4 py-2 rounded-lg">
          <span className="text-cyan-400 text-sm font-medium">
            Status: Locked
          </span>
        </div>
      </div>

      {/* Primary KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <ReportCard
          title="Total Group Value"
          value={data.totalGroupValue}
          icon={<TrendingUp className="text-emerald-400" />}
          description="Cash + Outstanding Loans"
          highlight
        />
        <ReportCard
          title="Cash in Hand"
          value={data.cashInHand}
          icon={<Wallet className="text-cyan-400" />}
          description="Liquid capital available"
        />
        <ReportCard
          title="Total Members Fund"
          value={data.totalMembersFund}
          icon={<Users className="text-purple-400" />}
          description="Total equity/savings"
        />
        <ReportCard
          title="Total Interest"
          value={data.totalInterest}
          icon={<PieChart className="text-amber-400" />}
          description="All-time group profit"
        />
      </div>

      {/* Monthly Flow Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Monthly Activity */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <h3 className="text-lg font-semibold mb-4">Monthly Activity</h3>
          <div className="space-y-4">
            <ActivityRow
              label="Interest (Members)"
              value={data.interestCollected}
              type="positive"
            />
            <ActivityRow
              label="Principal Recovered"
              value={data.principalRecovered}
              type="positive"
            />
            <ActivityRow
              label="New Loans Issued"
              value={data.loansDisbursed}
              type="negative"
            />
          </div>
        </div>

        {/* Distributed Assets Snapshot */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-semibold mb-2">Loan Distribution</h3>
            <p className="text-sm text-slate-400 mb-6">
              Active capital on the street
            </p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-mono font-bold text-white mb-2">
              ₹{data.totalDistributed.toLocaleString()}
            </div>
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
              <div
                className="bg-cyan-500 h-full"
                style={{
                  width: `${distributionPercentage}%`,
                }}
              />
            </div>
            <p className="text-xs text-slate-500 mt-4 uppercase tracking-widest">
              {distributionPercentage.toFixed(1)}% of Group Value
            </p>
          </div>
        </div>
      </div>

      {/* 2. HISTORY LIST VIEW */}
      <section className="mt-6">
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
          <Calendar size={18} className="text-slate-400" />
          Previous Reports
        </h2>

        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-800 text-slate-500 text-xs uppercase">
                <th className="p-4 font-medium">Month</th>
                <th className="p-4 font-medium">Group Value</th>
                <th className="p-4 font-medium">Cash Flow (Net)</th>
                <th className="p-4 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {history.map((report) => (
                <tr
                  key={report.id}
                  className="hover:bg-slate-800/50 transition-colors group"
                >
                  <td className="p-4 font-medium text-slate-200">
                    {formatDate(report.reportDate)}
                  </td>
                  <td className="p-4 font-mono">
                    ₹{report.totalGroupValue.toLocaleString()}
                  </td>
                  <td className="p-4">
                    <span className="text-xs px-2 py-1 rounded bg-slate-800 text-slate-400">
                      Collected: ₹{report.interestCollected.toLocaleString()}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button className="text-slate-500 group-hover:text-cyan-400 transition-colors">
                      <ChevronRight size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

// Sub-components for cleaner code
const ReportCard = ({
  title,
  value,
  icon,
  description,
  highlight = false,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
  description: string;
  highlight?: boolean;
}) => (
  <div
    className={`p-6 rounded-2xl border ${highlight ? "bg-slate-800 border-slate-700" : "bg-slate-900 border-slate-800"}`}
  >
    <div className="flex justify-between items-start mb-4">
      <div className="p-2 bg-slate-800 rounded-lg">{icon}</div>
      <div className="text-2xl font-mono font-bold">
        ₹{value.toLocaleString()}
      </div>
    </div>
    <h4 className="text-slate-400 text-sm font-medium">{title}</h4>
    <p className="text-slate-500 text-xs mt-1">{description}</p>
  </div>
);

const ActivityRow = ({
  label,
  value,
  type,
}: {
  label: string;
  value: number;
  type: string;
}) => (
  <div className="flex justify-between items-center p-4 bg-slate-950/50 rounded-xl border border-slate-800/50">
    <span className="text-slate-300 font-medium">{label}</span>
    <div className="flex items-center gap-2">
      {type === "positive" ? (
        <ArrowUpRight size={16} className="text-emerald-500" />
      ) : (
        <ArrowDownRight size={16} className="text-rose-500" />
      )}
      <span
        className={`font-mono font-bold ${type === "positive" ? "text-emerald-400" : "text-rose-400"}`}
      >
        {type === "positive" ? "+" : "-"} ₹{value.toLocaleString()}
      </span>
    </div>
  </div>
);
