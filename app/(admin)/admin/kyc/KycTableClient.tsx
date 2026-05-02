"use client";

import { CheckCircle2, XCircle, Eye, ShieldAlert } from "lucide-react";
import { format } from "date-fns";

export default function KycTableClient({ data }: { data: any[] }) {
  return (
    <div className="bg-white/40 backdrop-blur-md rounded-[2.5rem] border border-white/60 shadow-xl overflow-hidden">
      <table className="w-full text-left">
        <thead className="bg-slate-900 text-white">
          <tr>
            <th className="p-6 text-[10px] font-black uppercase tracking-widest">
              Applicant
            </th>
            <th className="p-6 text-[10px] font-black uppercase tracking-widest">
              Status
            </th>
            <th className="p-6 text-[10px] font-black uppercase tracking-widest">
              Submission Date
            </th>
            <th className="p-6 text-[10px] font-black uppercase tracking-widest text-right">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {data.map((request) => (
            <tr
              key={request.id}
              className="hover:bg-white/60 transition-colors"
            >
              <td className="p-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center font-black text-slate-400">
                    {request.name?.[0]}
                  </div>
                  <div>
                    <p className="text-sm font-black text-slate-900">
                      {request.name}
                    </p>
                    <p className="text-[10px] text-slate-400 font-bold">
                      {request.email}
                    </p>
                  </div>
                </div>
              </td>
              <td className="p-6">
                <span
                  className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                    request.isVerified
                      ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                      : "bg-amber-50 text-amber-600 border border-amber-100"
                  }`}
                >
                  {request.isVerified ? "Verified" : "Pending Review"}
                </span>
              </td>
              <td className="p-6 text-[10px] font-bold text-slate-500 uppercase">
                {format(new Date(request.createdAt), "dd MMM yyyy")}
              </td>
              <td className="p-6 text-right">
                <div className="flex justify-end gap-2">
                  <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-900 transition-colors">
                    <Eye size={18} />
                  </button>
                  {!request.isVerified && (
                    <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:shadow-lg transition-all active:scale-95">
                      <CheckCircle2 size={14} />
                      Approve
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
