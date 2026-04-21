import { prisma } from "@/lib/db";
import { authGuard } from "@/lib/auth-utils";
import { LoanStatus, TransactionType } from "@prisma/client";
import { startOfMonth, endOfMonth } from "date-fns";
import getTotalInHand from "./getTotalInHand";

export async function getMonthlyReport() {
  const session = await authGuard();
  const groupId = session.user.groupId;

  if (!groupId) return [];

  // Principal Recovered
  // Total Members Fund
  // Total Group Value
  // Cash in Hand

  const now = new Date();
  const monthStart = startOfMonth(now);
  const monthEnd = endOfMonth(now);

  const totalCash = await getTotalInHand();

  const currentMonthTransactions = await prisma.memberTransaction.findMany({
    where: {
      groupId,
      date: {
        gte: monthStart,
        lte: monthEnd,
      },
    },
    select: {
      id: true,
      amount: true,
      type: true,
      date: true,
      user: {
        select: {
          name: true,
        },
      },
    },
  });
  const currentMonthLoan = await prisma.memberLoan.findMany({
    where: {
      groupId,
      issuedAt: {
        gte: monthStart,
        lte: monthEnd,
      },
    },
    select: {
      id: true,
      amount: true,
      status: true,
    },
  });

  const lastFinalizedReport = await prisma.monthlyReport.findFirst({
    where: { groupId },
    orderBy: { reportDate: "desc" },
  });

  const groupLoans = await prisma.memberLoan.findMany({
    where: { user: { groupId } },
    select: { amount: true, status: true },
  });

  const currentMonthContributions = currentMonthTransactions
    .filter((t) => t.type === TransactionType.CONTRIB)
    .reduce((sum, t) => sum + t.amount, 0);

  // Total Interest (Members)
  const currentMonthInterest = currentMonthTransactions
    .filter((t) => t.type === TransactionType.CONTRIB)
    .reduce((sum, t) => sum + t.amount, 0);

  // Total Distributed (Members)
  const totalLoaned = groupLoans
    .filter((l) => l.status === LoanStatus.ACTIVE)
    .reduce((sum, l) => sum + l.amount, 0);

  // New Loans Issued

  console.log(
    { lastFinalizedReport },
    { groupLoans },
    { totalLoaned },
    { currentMonthTransactions },
    { currentMonthContributions },
    { currentMonthInterest },
    { currentMonthLoan },
    { totalCash },
  );

  return {
    memberCount: await prisma.user.count({ where: { groupId } }),
  };
}
