// components/ui/logo-icon.tsx
export default function LogoIcon({ size = 16 }: { size?: number }) {
  // size determines the height in tailwind units (h-16 is 64px)
  return (
    <div
      className={`relative flex items-center justify-center h-${size} w-${size} bg-white border border-slate-200 rounded-[2rem] shadow-lg shadow-blue-500/5 overflow-hidden group hover:scale-105 transition-all duration-300`}
    >
      {/* 1. Glassy Inner Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

      {/* 2. The Integrated "F-Graph" Icon */}
      {/* This uses nested divs to create a vector-like integrated shape */}
      <div className="relative h-1/2 w-1/2 flex items-end">
        {/* Vertical stem of 'F' / Foundation */}
        <div className="w-1/4 h-full bg-slate-900 rounded-sm" />

        {/* Horizontal bar / Stability */}
        <div className="absolute top-[30%] left-0 w-3/4 h-1/4 bg-slate-900 rounded-sm" />

        {/* Upward Arrow 'F' Stem / Growth */}
        <div className="absolute top-0 right-0 w-1/4 h-full flex flex-col items-center justify-between">
          {/* Arrow Head */}
          <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-b-[8px] border-l-transparent border-r-transparent border-b-blue-600 mb-1" />
          {/* Stem */}
          <div className="w-full h-full bg-blue-600 rounded-sm" />
        </div>
      </div>
    </div>
  );
}
