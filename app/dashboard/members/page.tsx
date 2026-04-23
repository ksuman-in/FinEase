import MemberGrid from "@/components/layout/MemberGrid";
import { prisma } from "@/lib/db";
import { authGuard } from "@/lib/auth-utils";
import { redirect } from "next/navigation";

export default async function MemberPage() {
  const { user } = await authGuard();

  const membership = await prisma.membership.findFirst({
    where: { userId: user.id },
    include: { group: true },
  });

  if (!membership) {
    redirect("/dashboard"); // No group, no member list
  }

  const membersRaw = await prisma.user.findMany({
    where: {
      memberships: {
        some: { groupId: membership.groupId },
      },
    },
    include: {
      memberships: {
        where: { groupId: membership.groupId },
        select: { role: true },
      },
      loans: {
        where: { status: "ACTIVE" },
        select: { amount: true },
      },
    },
    orderBy: { name: "asc" },
  });

  const members = membersRaw.map((m) => ({
    ...m,
    role: m.memberships[0]?.role || "MEMBER",
  }));

  return (
    <main className="min-h-screen bg-[#F8FAFC] relative overflow-hidden p-6 md:p-10">
      <header className="relative z-10 mb-10 p-8 rounded-[2.5rem] bg-white/40 border border-white/60 backdrop-blur-md shadow-xl shadow-slate-200/40">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <span className="text-blue-600/70 font-bold text-[10px] uppercase tracking-[0.3em]">
              {membership.group.name}
            </span>
            <h1 className="text-4xl font-black text-slate-800 tracking-tight">
              Member Directory
            </h1>
            <p className="text-slate-500 text-sm font-medium mt-1">
              Managing {members.length} verified capital partners.
            </p>
          </div>

          <div className="bg-white/60 px-6 py-3 rounded-2xl border border-white shadow-sm backdrop-blur-sm">
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1">
              Total Members
            </p>
            <span className="text-2xl font-black text-slate-900">
              {members.length} / 10
            </span>
          </div>
        </div>
      </header>

      <section className="relative z-10 rounded-[3rem] bg-white/30 border border-white/50 backdrop-blur-lg shadow-2xl shadow-slate-200/50 p-6">
        <MemberGrid members={members} />
      </section>
    </main>
  );
}
