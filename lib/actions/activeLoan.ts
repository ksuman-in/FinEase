"use server";
import { LoanStatus, TransactionType } from "@prisma/client";
import { authGuard } from "../auth-utils";
import { prisma } from "../db";

/**
 * Fetches the active loan for a specific user within a specific group.
 * @param groupId - The ID of the group context from the URL.
 */
export default async function activeLoan(groupId?: string) {
  const { user } = await authGuard(groupId);
  const userId = user.id;
  const userWithLoanStatus = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      loans: {
        where: {
          status: LoanStatus.ACTIVE,
          groupId: groupId,
        },
        take: 1,
        select: {
          id: true,
          amount: true,
          interestRate: true,
          issuedAt: true,
          groupId: true,
          transactions: {
            where: { type: TransactionType.PRIN_REPAY },
            select: { amount: true },
          },
        },
      },
    },
  });

  const loan = userWithLoanStatus?.loans?.at(0);

  if (!loan) return null;

  const totalRepaid = loan.transactions.reduce((sum, t) => sum + t.amount, 0);

  return {
    ...loan,
    totalRepaid,
    remainingPrincipal: loan.amount - totalRepaid,
  };
}
