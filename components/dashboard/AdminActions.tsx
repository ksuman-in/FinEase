import { UserPlus, CheckCircle, AlertCircle } from "lucide-react";

export default function AdminActions() {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-white px-2">Admin Tools</h3>

      <div className="p-2 bg-slate-900/80 border border-white/10 rounded-[2.5rem] overflow-hidden">
        {[
          {
            icon: CheckCircle,
            label: "Approve Loans",
            count: 3,
            color: "text-green-400",
          },
          {
            icon: UserPlus,
            label: "Invite Members",
            count: null,
            color: "text-blue-400",
          },
          {
            icon: AlertCircle,
            label: "Overdue Alerts",
            count: 1,
            color: "text-red-400",
          },
        ].map((action, i) => (
          <button
            key={i}
            className="w-full flex items-center justify-between p-4 hover:bg-white/5 rounded-2xl transition-all group"
          >
            <div className="flex items-center gap-3">
              <action.icon className={`w-5 h-5 ${action.color}`} />
              <span className="text-slate-200 font-medium">{action.label}</span>
            </div>
            {action.count && (
              <span className="bg-white/10 px-2 py-0.5 rounded-lg text-xs font-bold text-white">
                {action.count}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
