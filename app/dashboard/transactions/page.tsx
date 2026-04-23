import { authGuard } from "@/lib/auth-utils";
import { prisma } from "@/lib/db"; //
import TransactionsPageClient from "./TransactionsPageClient";
import { redirect } from "next/navigation";

export default async function TransactionsPage() {
  const { user } = await authGuard();

  const membership = await prisma.membership.findFirst({
    where: { userId: user.id },
    select: {
      groupId: true,
      role: true,
      group: {
        select: {
          name: true,
        },
      },
    },
  });

  if (!membership) redirect("/dashboard");

  const transactions = await prisma.memberTransaction.findMany({
    where: { groupId: membership.groupId },
    include: { user: { select: { name: true } } },
    orderBy: { date: "desc" },
  });

  return (
    <TransactionsPageClient
      data={JSON.parse(JSON.stringify(transactions))}
      membership={membership}
    />
  );
}
