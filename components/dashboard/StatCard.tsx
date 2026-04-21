import { IndianRupee } from "lucide-react";

export default function StatCard({ label, amount, trend, color }: any) {
  const colorMap: any = {
    emerald: "text-emerald-500 bg-emerald-500/10",
    rose: "text-rose-500 bg-rose-500/10",
    blue: "text-blue-500 bg-blue-500/10",
    violet: "text-violet-500 bg-violet-500/10",
  };

  return (
    <div className="group p-8 bg-white/5 border border-white/10 rounded-[2.5rem] hover:bg-white/[0.07] transition-all duration-500">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-2 rounded-xl ${colorMap[color]}`}>
          <IndianRupee size={16} />
        </div>
        <span
          className={`text-[10px] font-black px-2 py-1 rounded-lg ${colorMap[color]}`}
        >
          {trend}
        </span>
      </div>
      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-app-bg0 mb-1">
        {label}
      </p>
      <h4 className="text-2xl font-mono font-black text-white">₹{amount}</h4>
    </div>
  );
}
