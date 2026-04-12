import { GlassTable } from "@/components/glass/Table";
import MemberList from "@/components/layout/MemberList";
import WelcomeScreen from "@/components/layout/Welcome";
import checkMember from "@/lib/checkMember";
import globalSettings from "@/lib/database/globalSettings";
import { auth } from "@clerk/nextjs/server";
import {
  Wallet,
  BarChart3,
  Users,
  Banknote,
  TrendingUp,
  Landmark,
} from "lucide-react";

const stats = [
  {
    title: "Cash in Hand",
    value: "₹135,000",
    icon: Wallet,
  },
  {
    title: "Group Value",
    value: "₹480,000",
    icon: BarChart3,
  },
  {
    title: "Members Fund",
    value: "₹10,000",
    icon: Users,
  },
  {
    title: "Loans Outstanding",
    value: "₹3,45,000",
    icon: Banknote,
  },
  {
    title: "Interest (Members)",
    value: "₹2,350",
    icon: TrendingUp,
  },
  {
    title: "Interest (Market)",
    value: "₹3,200",
    icon: Landmark,
  },
];

export default async function Dashboard() {
  const { userId } = await auth();
  await checkMember();
  if (!userId) {
    return <WelcomeScreen />;
  }
  return (
    <div className="space-y-4 min-dvh bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 p-10">
      <h1 className="text-3xl font-bold text-white mb-8">Finance Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {stats.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-6 shadow-lg hover:scale-[1.02] transition"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-sm text-gray-300">{item.title}</h3>
                <Icon className="text-white/80" size={22} />
              </div>

              <p className="text-2xl font-semibold text-white mt-4">
                {item.value}
              </p>
            </div>
          );
        })}
      </div>
      {/* <GlassTable
        title="Member Loan Ledger - April 2026"
        headers={[
          "Member",
          "Int. Paid (1%)",
          "Prin. Repaid",
          "New Loan",
          "Balance",
        ]}
      >
        <MemberList />
      </GlassTable> */}
    </div>
  );
}
