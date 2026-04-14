export default function StatCard({
  title,
  value,
  description,
}: {
  title: string;
  value: string;
  description: string;
}) {
  return (
    <div className="p-8 bg-slate-900/50 border border-white/10 rounded-[2rem] backdrop-blur-xl hover:border-blue-500/30 transition-all group">
      <p className="text-slate-500 text-sm font-bold uppercase tracking-widest mb-2">
        {title}
      </p>
      <h2 className="text-3xl font-black text-white group-hover:text-blue-400 transition-colors">
        {value}
      </h2>
      <p className="text-slate-400 text-xs mt-4">{description}</p>
    </div>
  );
}
