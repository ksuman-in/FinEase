import MemberGrid from "@/components/layout/MemberGrid";
import getAllMembers from "@/lib/database/getAllMembers";

export default async function MemberPage() {
  const members = await getAllMembers();
  console.log({ members });
  return <MemberGrid members={members || []} />;
}
