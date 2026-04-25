// src/app/admin/page.tsx
import { authGuard } from "@/lib/auth-utils";
import InviteMemberCard from "@/components/admin/InviteMemberCard";
import { prisma } from "@/lib/db";
import MemberList from "@/components/admin/MemberList";
import { ShieldCheck, Globe } from "lucide-react";
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
          _count: {
            select: { memberships: true },
          },
        },
      })
    : [];

  const availableGroups = allGroups
    .filter((g) => g._count.memberships < g.maxMembers)
    .map((g) => ({
      id: g.id,
      name: `${g.name} (${g._count.memberships}/${g.maxMembers})`,
    }));

  const activeGroupId = user.isSuperAdmin ? null : membership?.groupId;
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
                  ? "Super Admin Access"
                  : "Group Owner Access"}
              </span>
            </div>
            <h1 className="text-5xl font-black text-slate-900 tracking-tighter">
              {groupName} <span className="text-slate-400">Control</span>
            </h1>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
        {/* Only show Invite if we have a specific group context */}
        {(activeGroupId || user.isSuperAdmin) && (
          <div className="xl:col-span-4 space-y-6">
            <h2 className="px-4 text-xs font-black text-slate-400 uppercase tracking-widest">
              Administrative Actions
            </h2>
            <InviteMemberCard
              groupId={membership?.groupId}
              availableGroups={availableGroups}
            />

            {user.isSuperAdmin && (
              <div className="p-6 rounded-[2.5rem] bg-indigo-900 text-white shadow-2xl">
                <p className="text-xs font-bold text-indigo-300 uppercase tracking-widest mb-2">
                  Global Override
                </p>
                <p className="text-sm font-medium leading-relaxed">
                  You are viewing this as a{" "}
                  <span className="font-black text-indigo-200">
                    Super Admin
                  </span>
                  . You can manage members across all vaults without local group
                  restrictions.
                </p>
              </div>
            )}
          </div>
        )}

        <div
          className={
            activeGroupId || user.isSuperAdmin
              ? "xl:col-span-8"
              : "xl:col-span-12"
          }
        >
          <div className="rounded-[3rem] bg-white/30 border border-white/50 backdrop-blur-lg p-2">
            <div className="bg-white/20 rounded-[2.8rem] p-4 min-h-[500px]">
              {/* MemberList should handle null groupId by showing all users if user is SuperAdmin */}
              <MemberList />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
