import { prisma } from "@/lib/db";
import { authGuard } from "@/lib/auth-utils";
import { ShieldAlert, UserCheck, Clock, Search } from "lucide-react";
import KycTableClient from "./KycTableClient";

export default async function AdminKycPage() {
  // 1. Super Admin Protection
  const { user } = await authGuard();

  // 2. Fetch pending and recently verified members
  const kycRequests = await prisma.user.findMany({
    where: {
      memberships: {
        some: { role: "MEMBER" },
      },
    },
    select: {
      id: true,
      name: true,
      email: true,
      isVerified: true,
      createdAt: true,
      // Assuming you store a document URL in your schema
      // kycDocumentUrl: true
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Identity Vetting
          </h1>
          <p className="text-slate-500 font-medium">
            Review and verify member credentials for protocol access
          </p>
        </div>

        <div className="flex items-center gap-3 bg-amber-50 border border-amber-100 px-4 py-2 rounded-2xl">
          <Clock className="text-amber-600" size={18} />
          <span className="text-[10px] font-black text-amber-700 uppercase tracking-widest">
            {kycRequests.filter((r) => !r.isVerified).length} Pending Reviews
          </span>
        </div>
      </header>

      {/* KYC Table logic handles Approval/Rejection actions */}
      <KycTableClient data={JSON.parse(JSON.stringify(kycRequests))} />
    </div>
  );
}
