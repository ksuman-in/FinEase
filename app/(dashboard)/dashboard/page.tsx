import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
import { UserRole } from "@prisma/client";
import { authGuard } from "@/lib/auth-utils";

export default async function DashboardRedirectPage({
  params,
}: {
  params: Promise<{ groupId: string }>;
}) {
  const { groupId } = await params;
  const { user } = await authGuard(groupId);

  if (!user.id) redirect("/login");

  if (user?.role === UserRole.BORROWER) {
    redirect("/borrower/dashboard");
  }

  const membership = await prisma.membership.findFirst({
    where: { userId: user.id },
    orderBy: { createdAt: "asc" },
    select: { groupId: true },
  });

  if (membership?.groupId && user.isVerified) {
    redirect(`/dashboard/${membership.groupId}`);
  }

  redirect("/onboarding");
}
