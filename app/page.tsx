import { getSession } from "@/lib/auth-utils";
import { prisma } from "@/lib/db";
import DisclaimerLanding from "@/components/layout/DisclaimerLanding";
import { redirect } from "next/navigation";
import { GroupRole } from "@prisma/client";

export default async function HomePage() {
  const session = await getSession();
  if (!session) return <DisclaimerLanding />;

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { isVerified: true, isSuperAdmin: true, role: true },
  });

  if (!user) redirect("/login");

  if (!user.isVerified) {
    if (user.role === GroupRole.BORROWER) {
      redirect("/borrower/onboarding");
    } else {
      redirect("/onboarding");
    }
  } else {
    if (user.role === GroupRole.BORROWER) {
      redirect("/borrower");
    } else {
      redirect("/dashboard");
    }
  }
}
