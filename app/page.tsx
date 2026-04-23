import { getSession } from "@/lib/auth-utils";
import { prisma } from "@/lib/db";
import DisclaimerLanding from "@/components/layout/DisclaimerLanding";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const session = await getSession();
  if (!session) {
    return <DisclaimerLanding />;
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { isVerified: true, isSuperAdmin: true },
  });

  if (user?.isVerified || user?.isSuperAdmin) {
    redirect("/dashboard");
  } else {
    redirect("/verification-pending");
  }
}
