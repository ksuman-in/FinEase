import { getOrdinal } from "@/lib/utils/helper";
import { configTimeline } from "@/utils/constant";
import { Lock, Unlock, Zap, ShieldCheck } from "lucide-react";

export function PaymentStatusTimeline({
  isActiveLoan,
}: {
  isActiveLoan: boolean;
}) {
  const day = new Date().getDate();
  const interestStart = configTimeline.INTEREST.start;
  const interestEnd = configTimeline.INTEREST.end;
  const principalStart = configTimeline.PRINCIPAL.start;
  const principalEnd = configTimeline.PRINCIPAL.end;

  const windows = [
    {
      label: "Interest/Contribution Window",
      range: `${getOrdinal(interestStart)} — ${getOrdinal(interestEnd)}`,
      start: interestStart,
      end: interestEnd,
      accent: "blue",
      icon: <Zap size={14} />,
    },
    {
      label: "Principal Window",
      range: `${getOrdinal(principalStart)} — ${getOrdinal(principalEnd)}`,
      start: principalStart,
      end: principalEnd,
      accent: "green",
      icon: <ShieldCheck size={14} />,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
      {windows.map((win) => {
        const isOpen = isActiveLoan && day >= win.start && day <= win.end;
        const isFuture = day < win.start;
        const isPast = day > win.end;

        const totalWindowDays = win.end - win.start + 1;
        const daysIntoWindow = day - win.start + 1;
        const progress = isFuture
          ? 0
          : isPast
            ? 100
            : (daysIntoWindow / totalWindowDays) * 100;

        return (
          <div
            key={win.label}
            className={`glass-morphism p-8 rounded-[3rem] relative transition-all duration-700 border border-white
              ${isOpen ? "opacity-100 shadow-2xl scale-100" : "opacity-60 grayscale-[0.6] scale-[0.98] border-white/40"}
            `}
          >
            <div className="absolute inset-0 rounded-[3rem] border-t border-l border-white/60 pointer-events-none" />

            <div className="flex justify-between items-start mb-8">
              <div className="space-y-1">
                <div
                  className={`flex items-center gap-2 font-black text-[10px] uppercase tracking-[0.2em] transition-colors ${
                    isOpen ? `text-${win.accent}-600` : "text-slate-400"
                  }`}
                >
                  <span
                    className={`p-1.5 rounded-lg ${isOpen ? `bg-${win.accent}-100` : "bg-slate-100"}`}
                  >
                    {win.icon}
                  </span>
                  {win.label}
                </div>
                <p className="text-3xl font-black text-slate-900 tracking-tighter">
                  {win.range}
                </p>
              </div>

              <div
                className={`
                w-12 h-12 rounded-2xl flex items-center justify-center border-2 transition-all duration-500
                ${
                  isOpen
                    ? `bg-white border-white shadow-xl text-blue-600`
                    : "bg-slate-50 border-slate-100 text-slate-300"
                }
              `}
              >
                {isOpen ? (
                  <Unlock
                    size={20}
                    strokeWidth={3}
                    className="animate-in fade-in zoom-in duration-500"
                  />
                ) : (
                  <Lock size={20} strokeWidth={3} />
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-400">
                <span>
                  {isFuture
                    ? "Status: Opening Soon"
                    : isOpen
                      ? "Status: Active Window"
                      : "Status: Cycle Ended"}
                </span>
                <span className={isOpen ? "text-slate-900" : ""}>
                  {isOpen
                    ? `Progress: Day ${daysIntoWindow} / ${totalWindowDays}`
                    : `Current: Day ${day}`}
                </span>
              </div>

              <div className="h-3 w-full bg-slate-200/50 rounded-full overflow-hidden p-[1px] border border-white/20 shadow-inner">
                <div
                  className={`h-full transition-all duration-1000 ease-out rounded-full ${
                    isOpen
                      ? `bg-${win.accent}-500 shadow-[0_0_15px_rgba(var(--${win.accent}-rgb),0.5)]`
                      : "bg-slate-300"
                  }`}
                  style={{
                    width: `${progress}%`,
                    boxShadow: isOpen
                      ? `0 0 12px var(--color-${win.accent}-500)`
                      : "none",
                  }}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
