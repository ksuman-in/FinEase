"use server";

import { GroupRole } from "@prisma/client";
import { authGuard } from "../auth-utils";
import { prisma } from "../db";

export default async function getTransactions() {
  const { user, membership } = await authGuard();
  const userId = user.id;
  const isOwner = membership?.role === GroupRole.OWNER;

  const transactions = await prisma.memberTransaction.findMany({
    where: isOwner ? {} : { userId: userId },
    orderBy: {
      date: "desc",
    },
    include: {
      user: isOwner ? { select: { name: true } } : false,
    },
  });
  return transactions;
}
