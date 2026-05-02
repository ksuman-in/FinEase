"use server";

import { prisma } from "@/lib/db";
import { authGuard } from "@/lib/auth-utils";
import { redirect } from "next/navigation";

export async function createGroupAction(formData: FormData) {
  const { user } = await authGuard();
  if (!user.isSuperAdmin) throw new Error("Unauthorized Access");

  const name = formData.get("name") as string;

  const group = await prisma.$transaction(async (tx) => {
    const newGroup = await tx.group.create({
      data: {
        name,
        maxMembers: 10,
      },
    });

    await tx.groupConfig.create({
      data: {
        groupId: newGroup.id,
        memberInterestRate: 12,
        borrowerInterestRate: 18,
        monthlyContribution: 1000,
        interestStartDay: 1,
        interestEndDay: 5,
        principalStartDay: 1,
        principalEndDay: 10,
      },
    });

    return newGroup;
  });

  redirect(`/admin/groups/${group.id}`);
}
