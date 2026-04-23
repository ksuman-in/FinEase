import { prisma } from "@/lib/db";
import { User, Mail, Phone } from "lucide-react";

export default async function MemberList() {
  const members = await prisma.user.findMany({
    where: {},
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="bg-white border border-slate-100 rounded-[2.5rem] overflow-hidden shadow-2xl">
      <table className="w-full text-left border-collapse">
        <thead className="bg-slate-50/50 border-b border-slate-100">
          <tr>
            <th className="px-8 py-5 text-[10px] font-black text-slate-900 uppercase tracking-widest">
              Member
            </th>
            <th className="px-8 py-5 text-[10px] font-black text-slate-900 uppercase tracking-widest">
              Contact
            </th>
            <th className="px-8 py-5 text-[10px] font-black text-slate-900 uppercase tracking-widest text-right">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-900">
          {members.map((member) => (
            <tr
              key={member.id}
              className="group hover:bg-slate-50/50 transition-colors"
            >
              <td className="px-8 py-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center font-black text-sm shadow-lg shadow-slate-200">
                    {member.name?.charAt(0)}
                  </div>
                  <div>
                    <p className="font-black text-slate-900 text-sm">
                      {member.name}
                    </p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">
                      Joined {new Date(member.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </td>
              <td className="px-8 py-6">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-slate-600">
                    <Mail size={12} className="text-slate-300" />
                    <span className="text-xs font-medium">{member.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <Phone size={12} className="text-slate-300" />
                    <span className="text-xs font-medium">
                      {member.phoneNumber || "No Phone"}
                    </span>
                  </div>
                </div>
              </td>
              <td className="px-8 py-6 text-right">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-900 text-green-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-green-100">
                  <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse" />
                  Active
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {members.length === 0 && (
        <div className="p-20 text-center space-y-4">
          <div className="inline-flex p-4 bg-slate-50 rounded-3xl text-slate-300">
            <User size={32} />
          </div>
          <p className="text-slate-400 font-bold text-sm">
            No members registered yet.
          </p>
        </div>
      )}
    </div>
  );
}
