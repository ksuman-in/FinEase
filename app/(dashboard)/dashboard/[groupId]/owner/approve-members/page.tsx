// app/dashboard/[groupId]/owner/approve-members/page.tsx
import { authGuard } from "@/lib/auth-utils";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
import { ShieldCheck, Users } from "lucide-react";
import { GroupRole } from "@prisma/client";
import MemberApprovalTable from "./MemberApprovalTable";

export default async function ApproveMembersPage({
  params,
}: {
  params: Promise<{ groupId: string }>;
}) {
  const session = await authGuard();
  const { groupId } = await params;

  const membership = await prisma.membership.findUnique({
    where: {
      userId_groupId: { userId: session.user.id, groupId },
    },
  });

  if (!membership || membership.role !== GroupRole.OWNER) {
    redirect(`/dashboard/${groupId}`);
  }

  // 2. Fetch Members whose physical documents or memberships are awaiting verification
  const pendingMemberships = await prisma.membership.findMany({
    where: {
      groupId,
      user: { isVerified: false },
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          phoneNumber: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="min-h-screen p-6 md:p-10 space-y-8">
      <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 text-blue-500 font-black uppercase tracking-widest text-xs mb-1">
            <ShieldCheck size={14} /> Compliance Registry Desk
          </div>
          <h1 className="text-3xl font-black uppercase tracking-tighter text-slate-900">
            Member Verifications
          </h1>
          <p className="text-slate-500 text-sm font-medium">
            Vault ID:{" "}
            <code className="bg-slate-200/60 px-1.5 py-0.5 rounded text-xs font-mono">
              {groupId}
            </code>
          </p>
        </div>

        <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl px-4 py-3 flex items-center gap-3 max-w-sm">
          <Users className="text-blue-600 shrink-0" size={20} />
          <p className="text-[11px] text-blue-900 leading-tight font-medium">
            Cross-check physical **Aadhaar, PAN, and Cancelled Cheques**
            received at the office before toggling active status.
          </p>
        </div>
      </header>

      <main className="bg-white/40 backdrop-blur-xl border border-white rounded-[2.5rem] p-6 shadow-2xl overflow-hidden">
        <MemberApprovalTable
          memberships={pendingMemberships}
          groupId={groupId}
        />
      </main>
    </div>
  );
}
