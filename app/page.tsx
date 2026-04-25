import { getSession } from "@/lib/auth-utils";
import { prisma } from "@/lib/db";
import DisclaimerLanding from "@/components/layout/DisclaimerLanding";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const session = await getSession();
  if (!session) return <DisclaimerLanding />;

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { isVerified: true, isSuperAdmin: true, role: true },
  });

  if (!user) redirect("/login");

  // If already verified, send to the logic-heavy dashboard redirector
  if (user.isVerified || user.isSuperAdmin) {
    redirect("/dashboard");
  }

  // Otherwise, stay in the onboarding flow
  redirect("/onboarding");
}
