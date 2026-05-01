import { prisma } from "@/lib/db";
import {
  Users,
  TrendingUp,
  ShieldCheck,
  AlertCircle,
  ArrowLeftRight,
  Info,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function GroupDetailsPage({
  params,
}: {
  params: Promise<{ groupId: string }>;
}) {
  const { groupId } = await params;
  if (!groupId) {
    redirect("/admin/groups");
  }
  const group = await prisma.group.findUnique({
    where: { id: groupId },
    include: {
      config: true,
      memberships: {
        include: { user: { select: { name: true, isVerified: true } } },
      },
      _count: { select: { memberships: true } },
    },
  });

  if (!group) redirect("/admin/groups");

  const totalLiquidity = await prisma.memberTransaction.aggregate({
    where: { groupId: groupId },
    _sum: { amount: true },
  });

  return (
    <div className="space-y-8 pb-20">
      {/* Header Section */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-2">
          <Link
            href={`/admin/groups/`}
            className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-slate-900 transition-colors"
          >
            <ArrowLeft size={14} /> Back to Directory
          </Link>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 bg-slate-900 text-white text-[8px] font-black uppercase tracking-widest rounded-md">
              Vault ID: {groupId}
            </span>
          </div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter">
            {group.name}
          </h1>
          <p className="text-slate-500 font-medium text-sm">
            Protocol Management Interface
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
              Growth Phase
            </p>
            <p className="text-xl font-black text-blue-600 tracking-tight">
              Active
            </p>
          </div>
        </div>
      </header>

      {/* High-Level Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          label="Total Liquidity"
          value={`₹${totalLiquidity._sum.amount?.toLocaleString() || 0}`}
          icon={<TrendingUp className="text-emerald-500" />}
          sub="Current Capital Pool"
        />
        <MetricCard
          label="Participants"
          value={`${group._count.memberships}/10`}
          icon={<Users className="text-blue-500" />}
          sub="Fixed Group Limit"
        />
        <MetricCard
          label="Saver Rate"
          value={`${group.config?.memberInterestRate}%`}
          icon={<ShieldCheck className="text-indigo-500" />}
          sub="Protocol Standard"
        />
        <MetricCard
          label="Borrower Rate"
          value={`${group.config?.borrowerInterestRate}%`}
          icon={<AlertCircle className="text-rose-500" />}
          sub="Applied on Principal"
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        {/* Member Directory for this Group */}
        <div className="xl:col-span-8">
          <section className="bg-white/40 backdrop-blur-xl border border-white rounded-[2.5rem] shadow-xl overflow-hidden">
            <div className="p-8 border-b border-white/60 bg-white/40 flex justify-between items-center">
              <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest">
                Vault Participants
              </h3>
              <button className="text-[10px] font-black text-blue-600 uppercase hover:underline">
                Manage All
              </button>
            </div>
            <div className="divide-y divide-white/60">
              {group.memberships.map((m) => (
                <div
                  key={m.id}
                  className="p-6 flex items-center justify-between hover:bg-white/40 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center font-black text-slate-400">
                      {m.user.name?.[0]}
                    </div>
                    <div>
                      <p className="text-sm font-black text-slate-900 flex items-center gap-2">
                        {m.user.name}
                        {m.user.isVerified && (
                          <ShieldCheck size={14} className="text-blue-500" />
                        )}
                      </p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase">
                        {m.role}
                      </p>
                    </div>
                  </div>
                  <ArrowLeftRight size={16} className="text-slate-200" />
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Configuration Summary Card */}
        <div className="xl:col-span-4">
          <section className="bg-slate-900 p-8 rounded-[2.5rem] text-white shadow-2xl space-y-6">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <Info size={16} /> Protocol Enforcement
            </h3>

            <div className="space-y-4">
              <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                <p className="text-[8px] font-black text-slate-500 uppercase mb-1">
                  Monthly Contribution
                </p>
                <p className="text-lg font-black tracking-tight">
                  ₹{group.config?.monthlyContribution?.toLocaleString()}
                </p>
              </div>

              <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                <p className="text-[8px] font-black text-slate-500 uppercase mb-1">
                  Payment Window
                </p>
                <p className="text-sm font-bold">
                  {group.config?.interestStartDay}th —{" "}
                  {group.config?.interestEndDay}th
                </p>
              </div>

              <Link
                href={`/admin/groups/${groupId}/config`}
                className="block w-full py-4 bg-white text-slate-900 text-center rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-[1.02] transition-transform"
              >
                Global Protocol Config
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function MetricCard({
  label,
  value,
  icon,
  sub,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
  sub: string;
}) {
  return (
    <div className="glass-morphism p-6 rounded-[2rem] border border-white shadow-xl">
      <div className="flex justify-between items-start mb-4">
        <div className="p-2 bg-white rounded-xl shadow-sm border border-slate-100">
          {icon}
        </div>
        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
          {label}
        </p>
      </div>
      <p className="text-2xl font-black text-slate-900 tracking-tighter mb-1">
        {value}
      </p>
      <p className="text-[9px] text-slate-400 font-bold uppercase">{sub}</p>
    </div>
  );
}
