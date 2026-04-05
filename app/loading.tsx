import React from "react";

export default function Loading() {
  const items = Array.from({ length: 6 });

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 p-10">
      <div className="h-8 w-64 bg-white/20 rounded-md animate-pulse mb-8" />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {items.map((_, index) => (
          <div
            key={index}
            className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-6 shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div className="h-4 w-32 bg-white/20 rounded animate-pulse" />
              <div className="h-6 w-6 bg-white/20 rounded animate-pulse" />
            </div>

            <div className="h-8 w-40 bg-white/20 rounded mt-6 animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
}
