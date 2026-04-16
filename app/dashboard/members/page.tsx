import MemberGrid from "@/components/layout/MemberGrid";
import getAllMembers from "@/lib/database/getAllMembers";

export default async function MemberPage() {
  const members = await getAllMembers();
  return <MemberGrid members={members || []} />;
}
