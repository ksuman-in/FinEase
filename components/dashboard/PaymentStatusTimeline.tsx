import { Lock, Unlock, Zap, ShieldCheck } from "lucide-react";

interface TimelineProps {
  mockDay?: number;
}

export function PaymentStatusTimeline({ mockDay }: TimelineProps) {
  const day = mockDay ?? new Date().getDate();

  const windows = [
    {
      label: "Interest Window",
      range: "1st — 5th",
      start: 1,
      end: 5,
      accent: "blue",
      icon: <Zap size={14} />,
      shadow: "shadow-blue-200/40",
    },
    {
      label: "Principal Window",
      range: "1st — 10th",
      start: 1,
      end: 10,
      accent: "emerald",
      icon: <ShieldCheck size={14} />,
      shadow: "shadow-emerald-200/40",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
      {windows.map((win) => {
        // NEW DYNAMIC LOGIC
        const isOpen = day >= win.start && day <= win.end;
        const isFuture = day < win.start;
        const isPast = day > win.end;

        // Progress bar calculation based on the specific window span
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
            className={`
              relative p-6 rounded-[2.5rem] transition-all duration-700
              bg-white/40 backdrop-blur-2xl border border-white/80
              ${isOpen ? `shadow-2xl ${win.shadow}` : "opacity-60 grayscale-[0.8] shadow-sm"}
            `}
          >
            <div className="flex justify-between items-start mb-6">
              <div className="space-y-1">
                <div
                  className={`flex items-center gap-2 font-black text-[10px] uppercase tracking-[0.2em] ${isOpen ? `text-${win.accent}-600` : "text-slate-400"}`}
                >
                  {win.icon}
                  {win.label}
                </div>
                <p className="text-2xl font-black text-slate-900 tracking-tighter">
                  {win.range}
                </p>
              </div>

              <div
                className={`
                w-10 h-10 rounded-2xl flex items-center justify-center border transition-all
                ${
                  isOpen
                    ? `bg-${win.accent}-50 border-${win.accent}-100 text-${win.accent}-600`
                    : "bg-slate-50 border-slate-100 text-slate-300"
                }
              `}
              >
                {isOpen ? (
                  <Unlock size={16} strokeWidth={3} />
                ) : (
                  <Lock size={16} strokeWidth={3} />
                )}
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-400">
                <span>
                  {isFuture
                    ? "Opening Soon"
                    : isOpen
                      ? "Window Active"
                      : "Cycle Ended"}
                </span>
                <span>
                  {isOpen
                    ? `Day ${daysIntoWindow} of ${totalWindowDays}`
                    : `Day ${day}`}
                </span>
              </div>
              <div className="h-2 w-full bg-slate-100/50 rounded-full overflow-hidden border border-white/20">
                <div
                  className={`h-full transition-all duration-1000 ease-out rounded-full ${
                    isOpen ? `bg-${win.accent}-500 shadow-lg` : "bg-slate-300"
                  }`}
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
