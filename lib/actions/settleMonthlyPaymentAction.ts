"use server";

import { TransactionType } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { prisma } from "../db";
import { authGuard } from "../auth-utils";

export async function settleMonthlyPaymentAction({
  loanId,
  interestAmount,
  contributionAmount,
  description,
}: {
  loanId?: string;
  interestAmount: number;
  contributionAmount: number;
  description: string;
}) {
  const { user, membership } = await authGuard();
  const userId = user.id;
  const groupId = membership?.groupId;

  if (!userId || !groupId) throw new Error("Unauthorized");

  const operations = [];

  if (interestAmount > 0 && loanId) {
    operations.push(
      prisma.memberTransaction.create({
        data: {
          userId,
          loanId,
          groupId,
          amount: interestAmount,
          type: TransactionType.INT_PAID,
          description: `Monthly Interest Settlement (${new Date().toLocaleString("default", { month: "long" })}) ${description}`,
        },
      }),
    );
  }

  if (contributionAmount > 0) {
    operations.push(
      prisma.memberTransaction.create({
        data: {
          userId,
          groupId,
          amount: contributionAmount,
          type: TransactionType.CONTRIB,
          description: `Monthly Pool Contribution ${description}`,
        },
      }),
    );
  }

  if (operations.length === 0) {
    return { success: false, message: "No transaction amounts provided." };
  }

  const results = await prisma.$transaction(operations);
  revalidatePath("/dashboard");
  return {
    success: true,
    count: results.length,
    transactions: results.map((r) => r.id),
  };
}
