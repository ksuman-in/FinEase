import { User } from "lucide-react";

// Updated type to match your Better Auth User model if needed
type MemberType = {
  id: string | number;
  name: string;
  email: string | null;
  phoneNumber?: string | null; // Using the custom field we added
  role?: string | null;
  createdAt: Date;
  emailVerified?: boolean;
};

export default function MemberList({
  members,
}: {
  members: MemberType[] | null;
}) {
  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-12 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {members?.map((member: MemberType) => (
          <div
            key={member?.id}
            className="bg-app-foreground/50 backdrop-blur-xl group relative overflow-hidden rounded-[2.5rem] border border-white/10 p-8 transition-all hover:border-cyan-500/30 hover:shadow-2xl hover:shadow-cyan-500/10"
          >
            {/* Top Glow Decor */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-cyan-500/10 blur-[80px] group-hover:bg-cyan-500/20 transition-all" />

            {/* Member Header */}
            <div className="flex mb-8 w-full justify-between items-start">
              <div className="flex gap-5 items-start w-full">
                {/* Avatar with dynamic Initial */}
                <div className="h-14 w-14 shrink-0 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white text-xl font-black shadow-lg shadow-cyan-500/20">
                  {member.name?.at(0)?.toUpperCase()}
                </div>

                <div className="flex flex-col min-w-0">
                  <h3 className="text-xl font-bold text-white truncate group-hover:text-cyan-400 transition-colors">
                    {member.name?.toUpperCase()}
                  </h3>
                  <p className="text-[10px] font-black text-app-bg0 uppercase tracking-widest mt-1">
                    {member.role || "Member"}
                  </p>
                </div>
              </div>
            </div>

            {/* Subtle Contact Info */}
            <div className="mb-8 space-y-2">
              <p className="text-sm text-slate-400 truncate font-medium">
                {member.email}
              </p>
              {/* Displaying our custom phoneNumber field */}
              <p className="text-xs text-app-bg0">
                {member.phoneNumber || "No contact linked"}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button className="flex-1 py-4 bg-white/5 hover:bg-white/10 text-white text-xs font-bold uppercase tracking-widest rounded-2xl border border-white/5 transition-all active:scale-95">
                Details
              </button>
              <button className="flex-1 py-4 bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-black uppercase tracking-widest rounded-2xl shadow-lg shadow-cyan-500/20 transition-all active:scale-95">
                Action
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
