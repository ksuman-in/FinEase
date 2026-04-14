import { prisma } from "./db";

export default async function getMemberList() {
  const userList = await prisma.user.findMany({});
  return { userList };
}
