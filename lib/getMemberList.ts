import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "./db";

export default async function getMemberList() {
  const user = await currentUser();

  if (!user?.id) {
    return null;
  }

  const userList = await prisma.member.findMany({
    where: {
      memberId: user.id,
    },
  });
  return { userList };
}
