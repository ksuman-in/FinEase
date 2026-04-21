import { ArrowUpRight, ShieldCheck } from "lucide-react";
import Link from "next/link";

export function AgentNudgeCard() {
  return (
    <Link href="/dashboard/requests" className="block group">
      <div className="p-6 bg-gradient-to-br from-indigo-600 to-blue-700 rounded-[2rem] text-white shadow-xl hover:scale-[1.02] transition-all">
        <div className="flex justify-between items-start mb-4">
          <div className="p-2 bg-white/20 rounded-xl">
            <ShieldCheck size={20} />
          </div>
          <ArrowUpRight
            size={18}
            className="opacity-50 group-hover:opacity-100"
          />
        </div>
        <h3 className="font-black text-lg">Agent Portal</h3>
        <p className="text-white/70 text-xs mt-1">
          There are pending loan requests that need your approval.
        </p>
      </div>
    </Link>
  );
}
