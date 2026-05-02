import { authGuard } from "@/lib/auth-utils";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
import AdminLayoutClient from "./AdminLayoutClient";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 1. Authenticate the Super Admin
  const { user } = await authGuard();

  // 2. Verify Super Admin status
  // Assuming isSuperAdmin is a boolean on your User model
  if (!user.isSuperAdmin) {
    redirect("/dashboard");
  }

  // 3. Fetch basic group info for the sidebar if needed
  const membership = await prisma.membership.findFirst({
    where: { userId: user.id },
    include: { group: { select: { name: true } } },
  });

  return (
    <AdminLayoutClient membership={membership}>{children}</AdminLayoutClient>
  );
}
