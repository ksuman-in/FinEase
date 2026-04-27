import { authGuard } from "@/lib/auth-utils";
import { prisma } from "@/lib/db";
import { ShieldCheck, UserCircle, CalendarDays } from "lucide-react";
import { formatTime } from "@/lib/utils/date-logic";

export default async function MembersPage({
  params,
}: {
  params: Promise<{ groupId: string }>;
}) {
  const { groupId } = await params;
  const { user: currentUser } = await authGuard(groupId);

  const members = await prisma.membership.findMany({
    where: { groupId: groupId },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          isVerified: true,
          createdAt: true,
        },
      },
    },
    orderBy: { role: "asc" },
  });

  return (
    <div className="space-y-8 p-4 md:p-8">
      {/* Header Section */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">
          Vault Community
        </h1>
        <p className="text-slate-500 font-medium">
          {members.length} verified participants in this protocol
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {members.map((membership) => (
          <div
            key={membership.id}
            className="glass-morphism p-5 rounded-[2rem] border border-white shadow-xl relative overflow-hidden group"
          >
            <div
              className={`absolute top-4 right-4 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                membership.role === "OWNER"
                  ? "bg-amber-100 text-amber-600"
                  : "bg-slate-100 text-slate-500"
              }`}
            >
              {membership.role}
            </div>

            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-slate-900 rounded-2xl flex items-center justify-center text-white text-xl font-black shadow-lg">
                {membership.user.name?.[0] || <UserCircle />}
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <p className="font-black text-slate-900 truncate">
                    {membership.user.name}
                    {membership.user.id === currentUser.id && " (You)"}
                  </p>
                  {membership.user.isVerified && (
                    <ShieldCheck size={14} className="text-blue-500 shrink-0" />
                  )}
                </div>

                <div className="flex items-center gap-1 text-slate-400 mt-1">
                  <CalendarDays size={12} />
                  <p className="text-[10px] font-bold uppercase tracking-tight">
                    Joined{" "}
                    {formatTime({
                      time: membership.user.createdAt,
                      format: "DD-MMM YYYY",
                    })}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-100/50 flex justify-between items-center">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                Account Status
              </span>
              <span className="text-[10px] font-black text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-md">
                Active Member
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
