import { authGuard } from "@/lib/auth-utils";
import { prisma } from "@/lib/db";
import {
  ShieldCheck,
  UserCheck,
  BadgeCheck,
  UserPlus,
  History,
  ArrowRight,
  Landmark,
} from "lucide-react";
import Link from "next/link";

export default async function OwnerDashboard({
  params,
}: {
  params: Promise<{ groupId: string }>;
}) {
  const { groupId } = await params;
  const { user } = await authGuard(groupId);

  const membership = await prisma.membership.findFirst({
    where: { userId: user.id, groupId: groupId, role: "OWNER" },
    include: { group: true },
  });

  if (!membership) return <div>Unauthorized: Owner Access Required</div>;

  const managementNodes = [
    {
      title: "Approve Transactions",
      description:
        "Verify incoming repayments and interest for the digital ledger.",
      icon: BadgeCheck,
      href: `/dashboard/${groupId}/owner/approve-transactions`,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      title: "Approve Members",
      description: "Whitelist pending invites and verify member identities.",
      icon: UserCheck,
      href: `/dashboard/${groupId}/owner/approve-members`,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      title: "Generate Loan",
      description: "Issue new capital with unique ROI per borrower protocol.",
      icon: UserPlus,
      href: `/dashboard/${groupId}/owner/generate-loan`,
      color: "text-rose-600",
      bg: "bg-rose-50",
    },
  ];

  return (
    <div className="max-w-[1200px] mx-auto px-6 py-10 space-y-10">
      {/* 1. Header: Administrative Authority */}
      <header className="relative p-10 rounded-[3rem] bg-slate-900 text-white shadow-2xl flex justify-between items-end overflow-hidden">
        <div className="absolute top-0 right-0 p-10 opacity-10">
          <ShieldCheck size={120} />
        </div>
        <div className="space-y-2 relative z-10">
          <div className="flex items-center gap-2">
            <span className="text-blue-400 font-black text-[10px] uppercase tracking-[0.3em]">
              Vault Command Authority
            </span>
          </div>
          <h1 className="text-5xl font-black tracking-tighter">
            Owner <span className="text-slate-400">Dashboard</span>
          </h1>
        </div>
        <div className="text-right space-y-1 relative z-10">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
            Active Vault
          </p>
          <p className="text-sm font-bold text-white">
            {membership.group.name}
          </p>
        </div>
      </header>

      {/* 2. Management Sub-Menu Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {managementNodes.map((node) => (
          <Link
            key={node.title}
            href={node.href}
            className="group glass-morphism p-8 rounded-[2.5rem] border border-white shadow-xl bg-white/60 hover:bg-white transition-all hover:scale-[1.02] active:scale-95"
          >
            <div
              className={`p-4 ${node.bg} ${node.color} rounded-2xl w-fit mb-6`}
            >
              <node.icon size={28} />
            </div>
            <h3 className="font-black text-slate-900 uppercase text-xs tracking-widest mb-2 flex items-center justify-between">
              {node.title}
              <ArrowRight
                size={14}
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              />
            </h3>
            <p className="text-[11px] text-slate-500 font-bold leading-relaxed">
              {node.description}
            </p>
          </Link>
        ))}
      </div>

      {/* 3. Global Vault Stats (Snapshot for Owner) */}
      <section className="p-10 rounded-[3rem] border border-white bg-white/40 shadow-xl grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-1">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
            Total Group Capital
          </p>
          <p className="text-2xl font-black text-slate-900">₹45.5L</p>
        </div>
        <div className="space-y-1">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
            Active Borrowers
          </p>
          <p className="text-2xl font-black text-rose-600">04</p>
        </div>
        <div className="space-y-1">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
            Pending Approvals
          </p>
          <p className="text-2xl font-black text-blue-600">12</p>
        </div>
        <div className="space-y-1">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
            Portfolio 2032 Pace
          </p>
          <p className="text-2xl font-black text-emerald-600">On Track</p>
        </div>
      </section>
    </div>
  );
}
