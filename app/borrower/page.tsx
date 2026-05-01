import BorrowerClientView from "@/components/borrower/BorrowerClientView";
import NoLoan from "@/components/borrower/NoLoan";
import ProtocolSettled from "@/components/borrower/ProtocolSettled";
import { authGuard } from "@/lib/auth-utils";
import { prisma } from "@/lib/db";
import { LoanStatus } from "@prisma/client";

export default async function BorrowerDashboard() {
  const { user } = await authGuard();

  const membership = await prisma.membership.findFirst({
    where: { userId: user.id },
    include: {
      group: { include: { config: true } },
      loan: {
        include: {
          repayments: {
            orderBy: {
              paymentDate: "desc",
            },
          },
        },
      },
    },
  });

  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();
  const loan = membership?.loan;

  const existingRepayment = await prisma.repayment.findFirst({
    where: {
      loanId: loan?.id,
      billingMonth: currentMonth,
      billingYear: currentYear,
    },
  });

  const isPaidThisMonth = !!existingRepayment;

  if (!loan) {
    return <NoLoan />;
  }

  if (loan.status === LoanStatus.CLOSED) {
    return <ProtocolSettled />;
  }

  return (
    <BorrowerClientView
      initialMembership={membership}
      loan={loan}
      isPaidThisMonth={isPaidThisMonth}
    />
  );
}
