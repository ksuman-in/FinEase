import { GroupRole } from "@prisma/client";
import { authGuard } from "../auth-utils";
import { prisma } from "../db";

export default async function userDetails() {
  const { membership, user } = await authGuard();
  const isAdmin = membership?.role === GroupRole.OWNER;

  if (user.id) {
    if (isAdmin) {
      const users = await prisma.user.findMany();
      return { users, currentUser: user };
    } else {
      return { users: [], currentUser: user };
    }
  }

  return { users: [], currentUser: {} };
}
