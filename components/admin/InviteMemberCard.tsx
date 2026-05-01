"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { UserPlus, Loader2, CheckCircle2, LayoutGrid } from "lucide-react";
import { useState, useEffect } from "react";
import { inviteMemberAction } from "@/lib/actions/invite";

const inviteSchema = z.object({
  email: z.string().email("Invalid email"),
  phone: z.string().min(10, "Invalid phone"),
  selectedGroupId: z.string().min(1, "Please select a group"),
  role: z.enum(["MEMBER", "OWNER", "BORROWER"]),
});

type InviteFormValues = z.infer<typeof inviteSchema>;

interface GroupOption {
  id: string;
  name: string;
}

export default function InviteMemberCard({
  groupId,
  availableGroups = [],
}: {
  groupId?: string | null;
  availableGroups?: GroupOption[];
}) {
  const [isSuccess, setIsSuccess] = useState(false);
  const [generatedLink, setGeneratedLink] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<InviteFormValues>({
    resolver: zodResolver(inviteSchema),
    defaultValues: {
      selectedGroupId: groupId || "",
      role: "MEMBER",
    },
  });

  const selectedRole = watch("role");

  useEffect(() => {
    if (groupId) setValue("selectedGroupId", groupId);
  }, [groupId, setValue]);

  const onSubmit = async (values: InviteFormValues) => {
    try {
      const result = await inviteMemberAction(
        values.email,
        values.phone,
        values.selectedGroupId,
        values.role,
      );
      setGeneratedLink(result.inviteLink);
      reset({ selectedGroupId: values.selectedGroupId, email: "", phone: "" });
    } catch (err) {
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <section className="p-6 md:p-10 bg-white/60 backdrop-blur-xl border border-white rounded-[3rem] shadow-2xl max-w-4xl mx-auto relative overflow-hidden">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-blue-600 text-white rounded-2xl shadow-lg shadow-blue-200">
          <UserPlus size={24} />
        </div>
        <div>
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-[0.2em]">
            Whitelist New Member
          </h3>
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">
            {groupId ? "Group-Specific Invitation" : "Global Admin Dispatch"}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">
            Target Vault/Group
          </label>
          <div className="relative">
            <select
              {...register("selectedGroupId")}
              className="w-full h-16 px-6 rounded-2xl bg-slate-50 border border-slate-100 focus:ring-2 focus:ring-blue-500 appearance-none font-bold text-slate-900 transition-all cursor-pointer"
            >
              <option value="" disabled>
                Select a Group
              </option>
              {availableGroups.length === 0 && groupId ? (
                <option value={groupId}>Current Group</option>
              ) : (
                availableGroups.map((g) => (
                  <option key={g.id} value={g.id}>
                    {g.name}
                  </option>
                ))
              )}
            </select>
            <LayoutGrid
              className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
              size={18}
            />
          </div>
          {errors.selectedGroupId && (
            <p className="text-[10px] text-red-500 font-bold ml-2 uppercase tracking-tighter">
              {errors.selectedGroupId.message}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <input
              {...register("email")}
              placeholder="Member Email"
              className="w-full h-16 px-6 rounded-2xl bg-slate-50 border border-slate-100 focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium"
            />
            {errors.email && (
              <p className="text-[10px] text-red-500 font-bold mt-2 ml-2 uppercase">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <input
              {...register("phone")}
              placeholder="Phone No."
              className="w-full h-16 px-6 rounded-2xl bg-slate-50 border border-slate-100 focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium"
            />
            {errors.phone && (
              <p className="text-[10px] text-red-500 font-bold mt-2 ml-2 uppercase">
                {errors.phone.message}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-3 mb-8">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">
            Invitation Authority Level
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Member Radio */}
            <label
              className={`cursor-pointer p-4 rounded-2xl border-2 transition-all flex flex-col gap-2 ${
                selectedRole === "MEMBER"
                  ? "border-blue-600 bg-blue-50/30 shadow-md"
                  : "border-slate-100 bg-slate-50"
              }`}
            >
              <input
                {...register("role")}
                type="radio"
                value="MEMBER"
                className="hidden"
              />
              <div className="flex justify-between items-start">
                <span className="text-[10px] font-black text-slate-900 uppercase">
                  Member
                </span>
                <div
                  className={`w-3 h-3 rounded-full border-2 ${selectedRole === "MEMBER" ? "border-blue-600 bg-blue-600" : "border-slate-300"}`}
                />
              </div>
              <p className="text-[8px] text-slate-500 font-bold leading-tight">
                12% Savings Rate participant.
              </p>
            </label>

            {/* Owner Radio */}
            <label
              className={`cursor-pointer p-4 rounded-2xl border-2 transition-all flex flex-col gap-2 ${
                selectedRole === "OWNER"
                  ? "border-indigo-600 bg-indigo-50/30 shadow-md"
                  : "border-slate-100 bg-slate-50"
              }`}
            >
              <input
                {...register("role")}
                type="radio"
                value="OWNER"
                className="hidden"
              />
              <div className="flex justify-between items-start">
                <span className="text-[10px] font-black text-slate-900 uppercase">
                  Owner
                </span>
                <div
                  className={`w-3 h-3 rounded-full border-2 ${selectedRole === "OWNER" ? "border-indigo-600 bg-indigo-600" : "border-slate-300"}`}
                />
              </div>
              <p className="text-[8px] text-slate-500 font-bold leading-tight">
                Full Group Oversight.
              </p>
            </label>

            <label
              className={`cursor-pointer p-4 rounded-2xl border-2 transition-all flex flex-col gap-2 ${
                selectedRole === "BORROWER"
                  ? "border-rose-600 bg-rose-50/30 shadow-md"
                  : "border-slate-100 bg-slate-50"
              }`}
            >
              <input
                {...register("role")}
                type="radio"
                value="BORROWER"
                className="hidden"
              />
              <div className="flex justify-between items-start">
                <span className="text-[10px] font-black text-slate-900 uppercase">
                  Borrower
                </span>
                <div
                  className={`w-3 h-3 rounded-full border-2 ${selectedRole === "BORROWER" ? "border-rose-600 bg-rose-600" : "border-slate-300"}`}
                />
              </div>
              <p className="text-[8px] text-slate-500 font-bold leading-tight">
                Active 18% Loan interest status.
              </p>
            </label>
          </div>
        </div>

        {generatedLink && (
          <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-center justify-between animate-in fade-in zoom-in-95">
            <div className="overflow-hidden mr-4">
              <p className="text-[10px] font-black text-emerald-600 uppercase mb-1 tracking-widest">
                Shareable Invite Link
              </p>
              <p className="text-xs text-slate-600 truncate font-medium">
                {generatedLink}
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                navigator.clipboard.writeText(generatedLink);
                alert("Copied!");
              }}
              className="px-6 py-3 bg-white border border-emerald-200 text-emerald-600 rounded-xl text-[10px] font-black uppercase hover:bg-emerald-100 transition-all shrink-0"
            >
              Copy Link
            </button>
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full h-16 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] flex items-center justify-center gap-2 transition-all active:scale-95 shadow-xl ${
            isSuccess ? "bg-emerald-600" : "bg-slate-900 hover:bg-blue-600"
          } text-white disabled:opacity-50`}
        >
          {isSubmitting ? (
            <Loader2 className="animate-spin w-5 h-5" />
          ) : (
            "Whitelist & Generate Link"
          )}
        </button>
      </form>
    </section>
  );
}
