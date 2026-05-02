import { prisma } from "@/lib/db";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import ConfigFormClient from "./ConfigFormClient";

export default async function GroupConfigPage({
  params,
}: {
  params: Promise<{ groupId: string }>;
}) {
  const { groupId } = await params;

  // Fetch the specific group config linked to this ID
  const config = await prisma.groupConfig.findUnique({
    where: { groupId: groupId },
    include: { group: { select: { name: true } } },
  });

  if (!config) return notFound();

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <header className="space-y-4">
        <Link
          href={`/admin/groups/${groupId}`}
          className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-slate-900 transition-colors"
        >
          <ArrowLeft size={14} /> Back to Vault
        </Link>

        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Configure {config.group.name}
          </h1>
          <p className="text-slate-500 font-medium text-sm">
            Updating protocol parameters for Vault ID:{" "}
            <span className="font-mono text-slate-900">{groupId}</span>
          </p>
        </div>
      </header>

      {/* Pass the groupId to the client form for the update action */}
      <ConfigFormClient
        initialData={JSON.parse(JSON.stringify(config))}
        groupId={groupId}
      />
    </div>
  );
}
