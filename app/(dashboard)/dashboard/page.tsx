import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
import { GroupRole } from "@prisma/client";
import { getSession } from "@/lib/auth-utils";
import GroupSelectionCard from "@/components/dashboard/GroupSelectionCard";

export default async function DashboardRedirectPage() {
  const session = await getSession();

  const memberships = await prisma.membership.findMany({
    where: { userId: session?.user.id },
    include: {
      group: true,
    },
    orderBy: { createdAt: "desc" },
  });

  const membershipsLength = memberships.length;

  if (membershipsLength === 0) {
    redirect("/onboarding");
  }

  if (membershipsLength === 1) {
    const firstMember = memberships.at(0);
    if (firstMember?.role === GroupRole.BORROWER) {
      redirect(`/borrower`);
    }
    redirect(`/dashboard/${firstMember?.groupId}`);
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        <header className="mb-10">
          <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">
            Your Active Vaults
          </h1>
          <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-2">
            Select a portfolio to manage your 12% savings or 18% loan repayment.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {memberships.map((m) => (
            <GroupSelectionCard key={m.id} membership={m} />
          ))}
        </div>
      </div>
    </div>
  );
}
