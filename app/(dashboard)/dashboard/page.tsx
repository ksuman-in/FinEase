import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
import { GroupRole } from "@prisma/client";
import { authGuard } from "@/lib/auth-utils";

export default async function DashboardRedirectPage({
  params,
}: {
  params: Promise<{ groupId: string }>;
}) {
  const { groupId } = await params;
  const { user } = await authGuard(groupId);

  if (user?.role === GroupRole.BORROWER) {
    redirect("/borrower");
  }

  const membership = await prisma.membership.findFirst({
    where: { userId: user.id, groupId },
    orderBy: { createdAt: "asc" },
    select: { groupId: true },
  });

  if (membership?.groupId && user.isVerified) {
    redirect(`/dashboard/${membership.groupId}`);
  }

  redirect("/onboarding");
}
