"use server";

import { authGuard } from "../auth-utils";
import { prisma } from "../db";

export default async function getTransactions() {
  const session = await authGuard();
  const userId = session.user.id;
  const isAdmin = session.user.role === "admin";

  const transactions = await prisma.memberTransaction.findMany({
    where: isAdmin ? {} : { userId: userId },
    orderBy: {
      date: "desc",
    },
    include: {
      user: isAdmin ? { select: { name: true } } : false,
    },
  });
  return transactions;
}
