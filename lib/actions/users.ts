import { authGuard } from "../auth-utils";
import { prisma } from "../db";

export default async function userDetails() {
  const session = await authGuard();
  const user = session.user;
  const isAdmin = session.user.role === "admin";

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
