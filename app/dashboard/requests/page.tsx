import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
import AgentRequestSection from "./AgentRequestSection";
import { authGuard } from "@/lib/auth-utils";
import { UserType } from "@prisma/client";

export default async function RequestsPage() {
  const session = await authGuard();

  const user = await prisma.user.findUnique({
    where: { id: session?.user?.id },
    select: { role: true },
  });

  if (user?.role !== UserType.ADMIN) {
    redirect("/dashboard");
  }

  const requests = await prisma.memberLoan.findMany({
    where: { status: "REQUEST" },
    include: {
      user: {
        include: {
          loans: {
            where: { status: "ACTIVE" },
          },
        },
      },
    },
    orderBy: { issuedAt: "desc" },
  });
  return (
    <main className="p-8 space-y-8">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tighter">
            Loan Approvals
          </h1>
          <p className="text-slate-500 text-sm">
            Review and authorize member capital requests.
          </p>
        </div>
        <div className="bg-blue-50 px-4 py-2 rounded-2xl text-blue-600 font-bold text-xs">
          Active Pool: ₹12,40,000
        </div>
      </header>

      <AgentRequestSection requests={requests} />
    </main>
  );
}
