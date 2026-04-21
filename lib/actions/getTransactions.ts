"use server";

import { UserType } from "@prisma/client";
import { authGuard } from "../auth-utils";
import { prisma } from "../db";

export default async function getTransactions() {
  const session = await authGuard();
  const userId = session.user.id;
  const isAdmin = session.user.role === UserType.ADMIN;

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
