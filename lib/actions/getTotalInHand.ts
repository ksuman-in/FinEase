import { LoanStatus, TransactionType } from "@prisma/client";
import { prisma } from "../db";

export default async function getTotalInHand(groupId?: string) {
  if (!groupId) {
    throw new Error("Unauthorized");
  }

  const [totalDisbursed, totalContribution, totalInterest] = await Promise.all([
    prisma.memberLoan.aggregate({
      where: {
        groupId,
        status: { in: [LoanStatus.ACTIVE] },
      },
      _sum: { amount: true },
    }),
    prisma.memberTransaction.aggregate({
      where: {
        groupId,
        type: TransactionType.CONTRIB,
      },
      _sum: { amount: true },
    }),
    prisma.memberTransaction.aggregate({
      where: {
        groupId,
        type: TransactionType.INT_PAID,
      },
      _sum: { amount: true },
    }),
  ]);

  const contributions = Number(totalContribution._sum.amount ?? 0);
  const interests = Number(totalInterest._sum.amount ?? 0);
  const disbursed = Number(totalDisbursed._sum.amount ?? 0);
  // In Hand = (Money In) - (Money Out)
  return contributions + interests - disbursed;
}
