import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import dayjs from "dayjs";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateStr: Date) {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    month: "long",
    year: "numeric",
  });
}

export function getLoanSnapshot(loan: any, transactions: any[]) {
  // 1. Calculate how much Principal has been paid so far
  const totalPrincipalPaid = transactions
    .filter((tx) => tx.type === "PRINCIPAL_REPAY")
    .reduce((acc, tx) => acc + tx.amount, 0);

  const remainingPrincipal = loan.amount - totalPrincipalPaid;

  // 2. Calculate next month's interest based on REDUCING balance
  const nextMonthInterest = remainingPrincipal * (loan.interestRate / 100);

  return {
    remainingPrincipal,
    nextMonthInterest,
    totalToPayNextMonth: remainingPrincipal + nextMonthInterest, // If they wanted to close it
  };
}
