import { prisma } from "@/lib/db";
import { Plus, Users, Percent, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils/date-logic";
import { getOrdinal } from "@/lib/utils/helper";

export default async function AdminGroupsPage() {
  const groups = await prisma.group.findMany({
    include: {
      config: true,
      _count: { select: { memberships: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Vault Directory
          </h1>
          <p className="text-slate-500 font-medium">
            Manage and monitor all active group protocols
          </p>
        </div>
        <Link
          href="/admin/groups/create"
          className="bg-slate-900 text-white px-6 py-3 rounded-2xl font-black text-xs flex items-center gap-2 hover:shadow-xl transition-all active:scale-95"
        >
          <Plus size={18} /> INITIALIZE NEW VAULT
        </Link>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {groups.map((group) => (
          <div
            key={group.id}
            className="glass-morphism p-6 rounded-[2.5rem] border border-white shadow-xl hover:shadow-2xl transition-all group relative overflow-hidden"
          >
            <div className="absolute top-6 right-6">
              <span className="text-[8px] font-black bg-slate-100 text-slate-400 px-2 py-1 rounded-md tracking-widest uppercase">
                ID: {group.id.slice(-6)}
              </span>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <div className="h-14 w-14 bg-slate-900 rounded-[1.25rem] flex items-center justify-center text-white text-xl font-black shadow-lg group-hover:scale-110 transition-transform">
                {group.name[0]}
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-800">
                  {group.name}
                </h3>
                <div className="flex items-center gap-1 text-emerald-500">
                  <ShieldCheck size={12} />
                  <span className="text-[10px] font-black uppercase tracking-widest">
                    Active Protocol
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Metrics Grid */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="bg-white/50 p-3 rounded-2xl border border-white">
                <p className="text-[9px] font-black text-slate-400 uppercase mb-1">
                  Members
                </p>
                <div className="flex items-center gap-2 text-slate-700">
                  <Users size={14} />
                  <span className="font-bold text-sm">
                    {group._count.memberships}
                  </span>
                </div>
              </div>
              <div className="bg-white/50 p-3 rounded-2xl border border-white">
                <p className="text-[9px] font-black text-slate-400 uppercase mb-1">
                  Target
                </p>
                <div className="flex items-center gap-2 text-blue-600">
                  <span className="font-bold text-sm">
                    {group.config?.memberInterestRate}
                  </span>
                  <Percent size={14} />
                </div>
              </div>
            </div>

            <div className="space-y-2 pt-4 border-t border-slate-100/50">
              <div className="flex justify-between text-[10px] font-bold text-slate-500 uppercase tracking-tight">
                <span>Monthly Min</span>
                <span className="text-slate-900">
                  {formatCurrency(group.config?.monthlyContribution || 0)}
                </span>
              </div>
              <div className="flex justify-between text-[10px] font-bold text-slate-500 uppercase tracking-tight">
                <span>Interest Window</span>
                <span className="text-slate-900">
                  {getOrdinal(group.config?.interestStartDay || 0)} -{" "}
                  {getOrdinal(group.config?.interestEndDay || 0)}
                </span>
              </div>
              <div className="flex justify-between text-[10px] font-bold text-slate-500 uppercase tracking-tight">
                <span>Principal Window</span>
                <span className="text-slate-900">
                  {getOrdinal(group.config?.principalStartDay || 0)} -{" "}
                  {getOrdinal(group.config?.principalEndDay || 0)}
                </span>
              </div>
            </div>

            <Link
              href={`/admin/groups/${group.id}`}
              className="w-full mt-6 py-3 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-slate-800 transition-colors"
            >
              Enter Vault Management
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
