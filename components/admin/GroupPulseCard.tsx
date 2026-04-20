export default function GroupPulseCard({
  membersCount,
  maxMembers,
}: {
  membersCount: number;
  maxMembers: number;
}) {
  const percentage = (membersCount / maxMembers) * 100;

  return (
    <div className="p-8 bg-slate-900 rounded-[2.5rem] text-white shadow-2xl shadow-blue-900/20 relative overflow-hidden">
      <div className="relative z-10 space-y-6">
        <div className="flex justify-between items-center">
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
            Group Capacity
          </span>
          <span className="px-3 py-1 bg-blue-500 rounded-full text-[10px] font-black">
            {percentage}% FULL
          </span>
        </div>

        <div>
          <h2 className="text-5xl font-black tracking-tighter mb-2">
            {membersCount}
            <span className="text-xl text-slate-500 ml-2">/ {maxMembers}</span>
          </h2>
          <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.5)] transition-all duration-1000"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>

        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">
          Next available spot:{" "}
          <span className="text-emerald-400">Slot #{membersCount + 1}</span>
        </p>
      </div>

      {/* Decorative Background Element */}
      <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-blue-600/20 blur-[60px]" />
    </div>
  );
}
