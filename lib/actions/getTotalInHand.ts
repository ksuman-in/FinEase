import { LoanStatus, TransactionType } from "@prisma/client";
import { authGuard } from "../auth-utils";
import { prisma } from "../db";

export default async function getTotalInHand() {
  const { membership } = await authGuard();
  const groupId = membership?.groupId;

  if (!groupId) {
    throw new Error("Unauthorized");
  }

  const [totalDisbursed, totalContribution, totalRepayments] =
    await Promise.all([
      prisma.memberLoan.aggregate({
        where: {
          groupId,
          status: { in: [LoanStatus.ACTIVE, LoanStatus.PAID] },
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
          type: TransactionType.PRIN_REPAY,
        },
        _sum: { amount: true },
      }),
    ]);

  const contributions = Number(totalContribution._sum.amount ?? 0);
  const repayments = Number(totalRepayments._sum.amount ?? 0);
  const disbursed = Number(totalDisbursed._sum.amount ?? 0);

  // In Hand = (Money In) - (Money Out)
  return contributions + repayments - disbursed;
}
