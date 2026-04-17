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

    const activeLoan = await prisma.memberLoan.findUnique({
      where: { id: loanId },
      include: {
        transactions: {
          where: { type: TransactionType.PRIN_REPAY },
        },
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
      (sum, tx) => sum + tx.amount,
      0,
    );
    const remaining = activeLoan.amount - totalRepaid;

    if (amount > remaining) {
      throw new Error(`Repayment exceeds remaining principal (₹${remaining}).`);
    }

    const result = await prisma.memberTransaction.create({
      data: {
        userId,
        loanId,
        amount,
        type: TransactionType.PRIN_REPAY,
        description: description || "Principal Repayment",
      },
    });

    if (amount === remaining) {
      await prisma.memberLoan.update({
        where: { id: loanId },
        data: { status: LoanStatus.CLOSED },
      });
    }

    revalidatePath("/dashboard");
    return { success: true, data: result };
  } catch (err) {
    return { error: err || "An unexpected error occurred" };
  }
}
