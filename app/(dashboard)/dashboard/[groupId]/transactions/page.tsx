import { authGuard } from "@/lib/auth-utils";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
import TransactionsPageClient from "./TransactionsPageClient";
import { GroupRole } from "@prisma/client";

export default async function TransactionsPage({
  params,
}: {
  params: Promise<{ groupId: string }>;
}) {
  const { groupId } = await params;
  const { user } = await authGuard(groupId);

  const membership = await prisma.membership.findFirst({
    where: { userId: user.id, groupId: groupId },
    include: {
      group: { select: { name: true } },
    },
  });

  if (!membership) redirect("/dashboard");

  const transactions = await prisma.memberTransaction.findMany({
    where: {
      groupId: groupId,
      ...(membership.role !== GroupRole.OWNER ? { userId: user.id } : {}),
    },
    include: {
      user: { select: { name: true } },
    },
    orderBy: { date: "desc" },
  });

  const serializedData = transactions.map((tx) => ({
    id: tx.id,
    userId: tx.userId,
    groupId: tx.groupId,
    amount: tx.amount,
    type: tx.type,
    description: tx.description,
    date: tx.date.toISOString(),
    user: {
      name: tx.user.name,
    },
  }));

  return (
    <TransactionsPageClient data={serializedData} membership={membership} />
  );
}
