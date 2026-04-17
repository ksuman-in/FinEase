"use server";

import { TransactionType, LoanStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { prisma } from "../db";
import { authGuard } from "../auth-utils";

export async function repayPrincipalAction({
  loanId,
  amount,
  description,
}: {
  loanId: string;
  amount: number;
  description?: string;
}) {
  try {
    const session = await authGuard();
    const userId = session.user.id;

    const result = await prisma.$transaction(async (tx) => {
      const activeLoan = await tx.memberLoan.findUnique({
        where: { id: loanId },
        include: {
          transactions: { where: { type: TransactionType.PRIN_REPAY } },
        },
      });
      if (
        !activeLoan ||
        activeLoan.userId !== userId ||
        activeLoan.status !== LoanStatus.ACTIVE
      ) {
        throw new Error("Active loan not found.");
      }
      const totalRepaid = activeLoan.transactions.reduce(
        (s, t) => s + t.amount,
        0,
      );
      const remaining = activeLoan.amount - totalRepaid;
      if (amount > remaining) {
        throw new Error(
          `Repayment exceeds remaining principal (₹${remaining}).`,
        );
      }
      const created = await tx.memberTransaction.create({
        data: {
          userId,
          loanId,
          amount,
          type: TransactionType.PRIN_REPAY,
          description: description || "Principal Repayment",
        },
      });
      if (Math.abs(remaining - amount) < 0.01) {
        await tx.memberLoan.update({
          where: { id: loanId },
          data: { status: LoanStatus.CLOSED },
        });
      }
      return created;
    });

    revalidatePath("/dashboard");
    return { success: true, data: result };
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "An unexpected error occurred";
    return { error: message };
  }
}
