import { LoanStatus, TransactionType } from "@prisma/client";
import { authGuard } from "../auth-utils";
import { prisma } from "../db";

export default async function getTotalInHand() {
  const session = await authGuard();
  const groupId = session.user.groupId;

  if (!groupId) {
    throw new Error("Unauthorized");
  }

  const [totalActiveLoan, totalContribution] = await Promise.all([
    prisma.memberLoan.aggregate({
      where: {
        groupId,
        status: LoanStatus.ACTIVE,
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
  ]);

  const contributions = totalContribution._sum.amount ?? 0;
  const loans = totalActiveLoan._sum.amount ?? 0;

  return Number(contributions) - Number(loans);
}
