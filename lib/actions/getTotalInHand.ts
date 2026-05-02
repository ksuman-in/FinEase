import { TransactionType } from "@prisma/client";
import { prisma } from "../db";

export default async function getTotalInHand(groupId?: string) {
  if (!groupId) {
    throw new Error("Unauthorized");
  }

  const [
    totalDisbursed,
    totalContribution,
    totalTopup,
    activeLoanInterest,
    archivedLoanInterest,
    totalPrincipalReturn,
    activeLoans,
  ] = await Promise.all([
    prisma.memberTransaction.aggregate({
      where: { groupId, type: TransactionType.NEW_LOAN },
      _sum: { amount: true },
    }),
    prisma.memberTransaction.aggregate({
      where: { groupId, type: TransactionType.CONTRIB },
      _sum: { amount: true },
    }),
    prisma.memberTransaction.aggregate({
      where: { groupId, type: TransactionType.TOP_UP },
      _sum: { amount: true },
    }),
    prisma.repayment.aggregate({
      where: {
        loan: {
          membership: { groupId },
        },
      },
      _sum: { interestPaid: true },
    }),
    prisma.loanArchive.aggregate({
      where: {
        membership: { groupId },
      },
      _sum: { totalInterestPaid: true },
    }),
    prisma.memberTransaction.aggregate({
      where: { groupId, type: TransactionType.PRIN_REPAY },
      _sum: { amount: true },
    }),
    prisma.loan.aggregate({
      where: { membership: { groupId } },
      _sum: { remainingPrincipal: true },
    }),
  ]);

  const disbursed = Number(totalDisbursed._sum.amount ?? 0);
  const contributions = Number(totalContribution._sum.amount ?? 0);
  const topupRequest = Number(totalTopup._sum.amount ?? 0);
  const principalReturn = Number(totalPrincipalReturn._sum.amount ?? 0);
  const currentActivePrincipal = Number(
    activeLoans._sum.remainingPrincipal ?? 0,
  );

  const totalInterestYield =
    Number(activeLoanInterest._sum.interestPaid ?? 0) +
    Number(archivedLoanInterest._sum.totalInterestPaid ?? 0);

  const liquidCash =
    contributions +
    totalInterestYield +
    principalReturn -
    (disbursed + topupRequest + currentActivePrincipal);

  return liquidCash;
}
