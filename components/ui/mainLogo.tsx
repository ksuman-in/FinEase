export default function FineaseLogo() {
  return (
    <div className="relative w-[100px] h-[100px] bg-[#0F172A] rounded-[28px] overflow-hidden shadow-xl">
      {/* 1. Glossy Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/15 to-transparent pointer-events-none" />

      {/* 2. The Mark (Translate 28, 28 to match SVG g transform) */}
      <div className="absolute top-[28px] left-[28px] w-[44px] h-[44px]">
        {/* White Pillar (Stable Foundation) - x:0, y:14, w:14, h:30 */}
        <div className="absolute left-0 top-[14px] w-[14px] h-[30px] bg-white rounded-[7px]">
          {/* Bridge - x:0, y:24 (10px relative to pillar top), w:30, h:10 */}
          <div className="absolute top-[10px] left-0 w-[30px] h-[10px] bg-white/30 rounded-[5px]" />
        </div>

        {/* Blue Pillar (Growth) - x:30, y:0, w:14, h:44 */}
        <div className="absolute left-[30px] top-0 w-[14px] h-[44px] bg-[#3B82F6] rounded-[7px]">
          {/* Arrow Head - Precision Path */}
          <div
            className="absolute -top-[6px] left-1/2 -translate-x-1/2 w-0 h-0 
                       border-l-[5px] border-r-[5px] border-b-[6px] 
                       border-l-transparent border-r-transparent border-b-[#3B82F6]"
          />
        </div>
      </div>
    </div>
  );
}
