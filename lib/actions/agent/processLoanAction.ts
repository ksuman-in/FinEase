"use server";

import { authGuard } from "@/lib/auth-utils";
import { prisma } from "@/lib/db";
import { GroupRole, LoanStatus, TransactionType } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function processLoanAction(
  loanId: string,
  action: LoanStatus,
  groupId: string,
) {
  const { membership } = await authGuard();
  if (membership?.role !== GroupRole.OWNER) {
    throw new Error("Forbidden");
  }

  if (action !== LoanStatus.ACTIVE && action !== LoanStatus.CANCELLED) {
    throw new Error("Invalid action");
  }

  const request = await prisma.memberLoan.findUnique({
    where: { id: loanId },
  });

  if (!request || request.status !== LoanStatus.REQUEST)
    throw new Error("Request not found");

  if (action === LoanStatus.CANCELLED) {
    await prisma.memberLoan.update({
      where: { id: loanId, groupId },
      data: { status: LoanStatus.CANCELLED },
    });
    revalidatePath("/admin");
    revalidatePath("/dashboard");
    return { success: true };
  }

  const existingActiveLoan = await prisma.memberLoan.findFirst({
    where: {
      userId: request.userId,
      status: LoanStatus.ACTIVE,
      id: { not: loanId },
    },
  });

  if (existingActiveLoan) {
    /**
     * CASE: TOP-UP
     */
    await prisma.$transaction([
      prisma.memberLoan.update({
        where: { id: existingActiveLoan.id, groupId },
        data: { amount: { increment: request.amount } },
      }),

      prisma.memberLoan.update({
        where: { id: loanId, groupId },
        data: { status: LoanStatus.CLOSED },
      }),

      prisma.memberTransaction.create({
        data: {
          userId: request.userId,
          groupId,
          loanId: existingActiveLoan.id,
          amount: request.amount,
          type: TransactionType.TOP_UP,
          description: `Top-up Approved: ${request.description || "Capital Addition"}`,
        },
      }),
    ]);
  } else {
    /**
     * CASE: NEW LOAN
     */
    await prisma.$transaction([
      prisma.memberLoan.update({
        where: { id: loanId },
        data: { status: LoanStatus.ACTIVE, issuedAt: new Date() },
      }),
      prisma.memberTransaction.create({
        data: {
          userId: request.userId,
          loanId: request.id,
          groupId,
          amount: request.amount,
          type: TransactionType.NEW_LOAN,
          description: `Initial Loan Approved: ${request.description || "Principal"}`,
        },
      }),
    ]);
  }

  revalidatePath("/admin");
  revalidatePath("/dashboard");
  return { success: true };
}
