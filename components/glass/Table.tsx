import { ReactNode } from "react";

interface GlassTableProps {
  headers: string[];
  children: ReactNode;
  title?: string;
}

export const GlassTable = ({ headers, children, title }: GlassTableProps) => {
  return (
    <div className="w-full overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md shadow-2xl">
      {title && (
        <div className="border-b border-white/10 bg-white/5 px-6 py-4">
          <h2 className="text-lg font-semibold text-white tracking-tight">
            {title}
          </h2>
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white/5">
              {headers.map((header, i) => (
                <th
                  key={i}
                  className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-400 border-b border-white/10"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">{children}</tbody>
        </table>
      </div>
    </div>
  );
};
