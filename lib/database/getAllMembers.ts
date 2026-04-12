import { auth } from "@clerk/nextjs/server";
import { prisma } from "../db";

export default async function getAllMembers() {
  const user = await auth();

  if (!user.userId) {
    return null;
  }

  const members = await prisma.member.findMany();

  return members;
}
