// components/members/MemberGrid.tsx
import { User, ArrowUpRight, ArrowDownLeft, Clock } from "lucide-react";

type MemberType = {
  id: number;
  memberId: string;
  name: string;
  phone: string | null;
  email: string | null;
  clerkId: string;
  createdAt: Date;
  updatedAt: Date;
};

export default function MemberList({ members }: { members: MemberType[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {members?.map((member: MemberType) => (
        <div
          key={member?.id}
          className="glass group relative overflow-hidden rounded-[2rem] border border-white/10 p-6 transition-all hover:border-cyan-500/30 hover:shadow-2xl hover:shadow-cyan-500/10"
        >
          {/* Member Header */}
          <div className="flex mb-6 w-full justify-between items-start">
            <div className="flex gap-4 items-start w-full">
              <div className="h-12 w-12 rounded-full bg-linear-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold shadow-lg shadow-cyan-500/20">
                <User />
              </div>
              <div className="flex flex-wrap flex-col">
                <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">
                  {member.name}
                </h3>
                <p className="text-xs font-mono text-slate-500 uppercase tracking-widest break-all">
                  {member.memberId}
                </p>
              </div>
            </div>
          </div>
          {/* Action Buttons */}
          <div className="flex gap-3">
            <button className="flex-1 py-3 bg-white/5 hover:bg-white/10 text-white text-sm font-semibold rounded-xl border border-white/5 transition-all">
              Details
            </button>
            <button className="flex-1 py-3 bg-cyan-500 hover:bg-cyan-600 text-black text-sm font-bold rounded-xl shadow-lg shadow-cyan-500/20 transition-all">
              Log Action
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

const StatusBadge = ({ status }: { status: string }) => (
  <span
    className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
      status === "Borrowing"
        ? "bg-rose-500/10 text-rose-400 border border-rose-500/20"
        : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
    }`}
  >
    {status}
  </span>
);
