import { prisma } from "@/lib/db";

export async function getGroupConfig(groupId: string) {
  const config = await prisma.groupConfig.findUnique({
    where: { groupId },
  });

  if (!config) {
    return {
      memberInterestRate: 12,
      borrowerInterestRate: 18,
      monthlyContribution: 1000,
      minPrincipalPayment: 10000,
      interestStartDay: 1,
      interestEndDay: 5,
      principalStartDay: 1,
      principalEndDay: 10,
    };
  }

  return {
    ...config,
  };
}
