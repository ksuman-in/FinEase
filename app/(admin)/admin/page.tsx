import GroupPulseCard from "@/components/admin/GroupPulseCard";
import InviteMemberCard from "@/components/admin/InviteMemberCard";
import { authGuard } from "@/lib/auth-utils";

const mockGroup = {
  id: "power-10-main-id",
  name: "Power 10 Finance",
  membersCount: 8,
  maxMembers: 10,
  members: [
    { id: "1", name: "Agent Alpha", email: "admin@power10.com" },
    { id: "2", name: "John Doe", email: "john@example.com" },
    { id: "3", name: "Sarah Smith", email: "sarah@example.com" },
  ],
};

export default async function AdminDashboard() {
  const session = await authGuard();

  //   // SECURITY: Redirect non-admins back to the member dashboard
  //   if (session.user.role !== "ADMIN") {
  //     redirect("/dashboard");
  //   }

  //   // Fetch Group Data
  //   const group = await prisma.group.findFirst({
  //     include: {
  //       _count: { select: { members: true } },
  //       members: { select: { id: true, name: true, email: true } }
  //     }
  //   });

  //   if (!group) return <div className="p-10">Please seed your Group in the DB first.</div>;

  return (
    <main className="min-h-screen bg-white/50 p-6 md:p-12">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tighter">
              Admin Command
            </h1>
            <p className="text-slate-900 font-bold uppercase text-[10px] tracking-[0.2em]">
              Managing: {mockGroup.name}
            </p>
          </div>
          <div className="px-4 py-2 bg-white border border-slate-200 rounded-2xl text-[10px] font-black text-slate-400">
            SYSTEM STATUS: <span className="text-emerald-500">OPTIMAL</span>
          </div>
        </div>

        {/* Top Grid: Pulse and Invite */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <GroupPulseCard
            membersCount={mockGroup.membersCount}
            maxMembers={mockGroup.maxMembers}
          />
          <InviteMemberCard groupId={mockGroup.id} />
        </div>

        {/* Bottom Section: Member Quick List */}
        <section className="bg-white border border-slate-100 rounded-[3rem] p-10 shadow-xl shadow-slate-200/50">
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-6">
            Current Members ({mockGroup.membersCount}/10)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockGroup.members.map((member) => (
              <div
                key={member.id}
                className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-3"
              >
                <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white font-black text-xs">
                  {member.name?.[0] || "U"}
                </div>
                <div>
                  <p className="text-xs font-black text-slate-900">
                    {member.name}
                  </p>
                  <p className="text-[10px] font-medium text-slate-400">
                    {member.email}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
