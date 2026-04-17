"use server";
import { LoanStatus, TransactionType } from "@prisma/client";
import { authGuard } from "../auth-utils";
import { prisma } from "../db";

export default async function activeLoan() {
  const session = await authGuard();
  const userId = session.user.id;

  const userWithLoanStatus = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      loans: {
        where: { status: LoanStatus.ACTIVE },
        take: 1,
        select: {
          id: true,
          amount: true,
          interestRate: true,
          issuedAt: true,
          // FIX: Move transactions inside this select block
          transactions: {
            where: { type: TransactionType.PRIN_REPAY },
            select: { amount: true },
          },
        },
      },
    },
  });

  return userWithLoanStatus?.loans?.at(0);
}
