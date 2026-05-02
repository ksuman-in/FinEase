import { authGuard } from "@/lib/auth-utils";
import InviteMemberCard from "@/components/admin/InviteMemberCard";
import { prisma } from "@/lib/db";
import { ShieldCheck, Globe, TrendingUp, Landmark } from "lucide-react";
import { redirect } from "next/navigation";

export default async function AdminPage() {
  const { user } = await authGuard();

  const membership = await prisma.membership.findFirst({
    where: { userId: user.id },
    include: { group: true },
  });

  if (!user.isSuperAdmin && membership?.role !== "OWNER") {
    redirect("/dashboard");
  }

  const allGroups = user.isSuperAdmin
    ? await prisma.group.findMany({
        select: {
          id: true,
          name: true,
          maxMembers: true,
          _count: { select: { memberships: true } },
        },
      })
    : [];

  const availableGroups = allGroups
    .filter((g) => g._count.memberships < g.maxMembers)
    .map((g) => ({
      id: g.id,
      name: `${g.name} (${g._count.memberships}/${g.maxMembers})`,
    }));

  const groupName = user.isSuperAdmin
    ? "Global Systems"
    : membership?.group?.name;

  return (
    <main className="space-y-10">
      <header className="relative p-10 rounded-[3rem] bg-white/40 border border-white/60 backdrop-blur-md shadow-xl">
        <div className="flex justify-between items-center">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div
                className={`p-2 rounded-xl shadow-lg ${user.isSuperAdmin ? "bg-indigo-600" : "bg-blue-600"}`}
              >
                {user.isSuperAdmin ? (
                  <Globe size={20} className="text-white" />
                ) : (
                  <ShieldCheck size={20} className="text-white" />
                )}
              </div>
              <span className="text-slate-500 font-black text-[10px] uppercase tracking-[0.3em]">
                {user.isSuperAdmin
                  ? "Super Admin Portal"
                  : "Group Owner Portal"}
              </span>
            </div>
            <h1 className="text-5xl font-black text-slate-900 tracking-tighter">
              {groupName} <span className="text-slate-400">Command</span>
            </h1>
          </div>
        </div>
      </header>

      {/* Primary Action & Overview Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Invitations & Quick Override */}
        <div className="lg:col-span-8 space-y-6">
          <h2 className="px-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
            Deployment Actions
          </h2>
          <InviteMemberCard
            groupId={membership?.groupId}
            availableGroups={availableGroups}
          />

          {user.isSuperAdmin && (
            <div className="p-8 rounded-[2.5rem] bg-slate-900 text-white shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Globe size={80} />
              </div>
              <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-4">
                Protocol Status
              </p>
              <p className="text-sm font-medium leading-relaxed relative z-10">
                System-wide override is{" "}
                <span className="text-emerald-400 font-black italic">
                  ACTIVE
                </span>
                . You are authorized to initialize vaults and modify global
                interest parameters (12% / 18%).
              </p>
            </div>
          )}
        </div>

        <div className="lg:col-span-4">
          <div className="grid grid-cols-1 gap-6">
            <div className="glass-morphism p-8 rounded-[2.5rem] border border-white shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
                  <TrendingUp size={20} />
                </div>
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Protocol Liquidity
                </h3>
              </div>
              <p className="text-4xl font-black text-slate-900 tracking-tighter">
                Monitoring...
              </p>
            </div>

            <div className="glass-morphism p-8 rounded-[2.5rem] border border-white shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
                  <Landmark size={20} />
                </div>
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Active Vaults
                </h3>
              </div>
              <p className="text-4xl font-black text-slate-900 tracking-tighter">
                {allGroups.length}
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
