import { TransactionType } from "@prisma/client";
import { prisma } from "../db";

export default async function getTotalInHand(groupId?: string) {
  if (!groupId) {
    throw new Error("Unauthorized");
  }

  const [
    totalDisbursed,
    totalContribution,
    totalInterest,
    totalPrincipalReturn,
    totalTopup,
  ] = await Promise.all([
    prisma.memberTransaction.aggregate({
      where: {
        groupId,
        type: TransactionType.NEW_LOAN,
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
    prisma.memberTransaction.aggregate({
      where: {
        groupId,
        type: TransactionType.PRIN_REPAY,
      },
      _sum: { amount: true },
    }),
    prisma.memberTransaction.aggregate({
      where: {
        groupId,
        type: TransactionType.TOP_UP,
      },
      _sum: { amount: true },
    }),
  ]);

  const disbursed = Number(totalDisbursed._sum.amount ?? 0);
  const contributions = Number(totalContribution._sum.amount ?? 0);
  const interests = Number(totalInterest._sum.amount ?? 0);
  const principalReturn = Number(totalPrincipalReturn._sum.amount ?? 0);
  const topupRequest = Number(totalTopup._sum.amount ?? 0);

  return (
    contributions + interests - (disbursed + topupRequest - principalReturn)
  );
}
