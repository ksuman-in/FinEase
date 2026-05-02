import Link from "next/link";
import { Wallet, Landmark, ChevronRight } from "lucide-react";
import { GroupRole } from "@prisma/client";

export default function GroupSelectionCard({
  membership,
}: {
  membership: { role: GroupRole; groupId: string; group: { name: string } };
}) {
  const isBorrower = membership.role === "BORROWER";

  const href = isBorrower ? `/borrower` : `/dashboard/${membership.groupId}`;

  return (
    <Link href={href} className="group block">
      <div className="h-full p-8 bg-white/60 backdrop-blur-xl border border-white rounded-[2.5rem] shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start mb-6">
            <div
              className={`p-3 rounded-2xl ${isBorrower ? "bg-rose-100 text-rose-600" : "bg-blue-100 text-blue-600"}`}
            >
              {isBorrower ? <Landmark size={24} /> : <Wallet size={24} />}
            </div>
            <span
              className={`text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-[0.15em] border ${
                isBorrower
                  ? "border-rose-200 text-rose-600 bg-rose-50"
                  : "border-blue-200 text-blue-600 bg-blue-50"
              }`}
            >
              {membership.role}
            </span>
          </div>

          <h3 className="text-xl font-black text-slate-900 tracking-tight mb-2">
            {membership.group.name}
          </h3>
          <p className="text-xs text-slate-500 font-bold leading-relaxed mb-6">
            {isBorrower
              ? "Manage active loan principal and interest tracking."
              : "Track SIP contributions toward the 1Cr milestone."}
          </p>
        </div>

        <div className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 group-hover:text-blue-600 transition-colors">
          Open Vault{" "}
          <ChevronRight
            size={14}
            className="group-hover:translate-x-1 transition-transform"
          />
        </div>
      </div>
    </Link>
  );
}
