// src/app/admin/page.tsx
import { authGuard } from "@/lib/auth-utils";
import InviteMemberCard from "@/components/admin/InviteMemberCard";
import { prisma } from "@/lib/db";
import MemberList from "@/components/admin/MemberList";

export default async function AdminPage() {
  const session = await authGuard({ adminOnly: true });
  const adminGroupId = session.user.groupId!;

  // Fetch group name for the header
  const group = await prisma.group.findUnique({
    where: { id: adminGroupId },
    select: { name: true },
  });

  return (
    <main className="max-w-6xl mx-auto p-6 space-y-12">
      {/* Header */}
      <header className="space-y-1">
        <h1 className="text-4xl font-black text-white tracking-tighter">
          {group?.name || "Group"} <span className="text-blue-500">Admin</span>
        </h1>
        <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">
          Management Console
        </p>
      </header>

      {/* Primary Action: Invite */}
      <section>
        <InviteMemberCard groupId={adminGroupId} />
      </section>

      {/* Member Management: The List */}
      <section className="animate-in fade-in slide-in-from-bottom-4 duration-700 mt-6">
        <div className="flex items-center justify-between mb-6 px-4">
          <h2 className="text-sm font-black text-white uppercase tracking-[0.2em]">
            Active Roster
          </h2>
          <span className="text-[10px] text-slate-500 font-bold bg-white/5 px-3 py-1 rounded-full border border-white/10">
            Updated Real-time
          </span>
        </div>

        <MemberList groupId={adminGroupId} />
      </section>
    </main>
  );
}
