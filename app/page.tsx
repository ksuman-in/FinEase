import { getSession } from "@/lib/auth-utils";
import DisclaimerLanding from "@/components/layout/DisclaimerLanding";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const session = await getSession();

  if (session) {
    redirect("/dashboard");
  }

  // If not logged in, show the Disclaimer
  return <DisclaimerLanding />;
}
