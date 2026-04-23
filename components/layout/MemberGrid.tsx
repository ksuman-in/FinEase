type MemberType = {
  id: string | number;
  name: string;
  email: string | null;
  phoneNumber?: string | null;
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
    <section className="max-w-7xl mx-auto px-6 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {members?.map((member: MemberType) => (
          <div
            key={member?.id}
            className="group relative overflow-hidden rounded-[3rem] bg-white/40 backdrop-blur-md border border-white/60 p-8 transition-all duration-500 hover:bg-white/60 hover:shadow-2xl hover:shadow-slate-200/50 hover:-translate-y-1"
          >
            {/* VaultEase Inner Glow Effect */}
            <div className="absolute inset-0 rounded-[3rem] shadow-[inset_0_1px_2px_rgba(255,255,255,0.8)] pointer-events-none" />

            {/* Member Header */}
            <div className="flex mb-8 w-full justify-between items-start relative z-10">
              <div className="flex gap-5 items-center w-full">
                {/* Avatar with "Milk Glass" Soft Gradient */}
                <div className="h-16 w-16 shrink-0 rounded-[1.5rem] bg-gradient-to-br from-slate-100 to-white border border-white shadow-sm flex items-center justify-center text-slate-800 text-2xl font-black">
                  {member.name?.at(0)?.toUpperCase()}
                </div>

                <div className="flex flex-col min-w-0">
                  <h3 className="text-xl font-black text-slate-800 truncate tracking-tight">
                    {member.name}
                  </h3>
                  <span className="inline-flex w-fit px-3 py-1 rounded-full bg-blue-50 text-[9px] font-bold text-blue-600 uppercase tracking-widest mt-1 border border-blue-100">
                    {member.role || "Member"}
                  </span>
                </div>
              </div>
            </div>

            {/* Contact Info with Slate Palette */}
            <div className="mb-8 space-y-2 relative z-10">
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Email Address
                </span>
                <p className="text-sm text-slate-600 truncate font-semibold">
                  {member.email}
                </p>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Phone
                </span>
                <p className="text-xs text-slate-800 font-black">
                  {member.phoneNumber || "Verified No Contact"}
                </p>
              </div>
            </div>

            {/* Action Buttons: "Milk Glass" Styled */}
            <div className="flex gap-3 relative z-10">
              <button className="flex-1 py-4 bg-white/40 hover:bg-white/80 text-slate-600 text-[10px] font-bold uppercase tracking-[0.2em] rounded-2xl border border-white/80 transition-all active:scale-95 shadow-sm">
                Profile
              </button>
              <button className="flex-1 py-4 bg-slate-900 hover:bg-slate-800 text-white text-[10px] font-bold uppercase tracking-[0.2em] rounded-2xl shadow-lg shadow-slate-900/10 transition-all active:scale-95">
                Manage
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
