"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { UserPlus, Loader2, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { inviteMemberAction } from "@/lib/actions/invite";

const inviteSchema = z.object({
  email: z.string().email("Invalid email"),
  phone: z.string().min(10, "Invalid phone"),
});

type InviteFormValues = z.infer<typeof inviteSchema>;

export default function InviteMemberCard({ groupId }: { groupId: string }) {
  const [isSuccess, setIsSuccess] = useState(false);
  const [generatedLink, setGeneratedLink] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<InviteFormValues>({
    resolver: zodResolver(inviteSchema),
  });

  const onSubmit = async (values: InviteFormValues) => {
    setIsSuccess(true);
    try {
      // We pass the groupId that was passed as a prop to this component
      const result = await inviteMemberAction(
        values.email,
        values.phone,
        groupId,
      );
      setGeneratedLink(result.inviteLink);
      reset();
    } catch (err) {
      if (err instanceof Error && err.message?.includes("Unique constraint")) {
        alert("This member is already whitelisted.");
      } else {
        alert("Something went wrong. Please try again.");
      }
    } finally {
      setIsSuccess(false);
    }
  };

  return (
    <section className="p-6 md:p-10 bg-white border border-slate-100 rounded-[2.5rem] shadow-2xl max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
          <UserPlus size={24} />
        </div>
        <h3 className="text-sm font-black text-slate-900 uppercase tracking-[0.2em]">
          Whitelist New Member
        </h3>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {generatedLink && (
          <div className="mt-6 p-4 bg-blue-50 rounded-2xl border border-blue-100 flex items-center justify-between">
            <div className="overflow-hidden mr-4">
              <p className="text-[10px] font-black text-blue-600 uppercase mb-1">
                Backup Invite Link
              </p>
              <p className="text-xs text-slate-500 truncate">{generatedLink}</p>
            </div>
            <button
              onClick={() => {
                navigator.clipboard.writeText(generatedLink);
                alert("Link copied to clipboard!");
              }}
              className="px-4 py-2 bg-white border border-blue-200 text-blue-600 rounded-xl text-[10px] font-bold uppercase hover:bg-blue-100 transition-colors shrink-0"
            >
              Copy Link
            </button>
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
          <div className="md:col-span-12">
            <input
              {...register("email")}
              placeholder="Member Email"
              className="w-full h-16 px-6 rounded-2xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium text-slate-900"
            />
            {errors.email && (
              <p className="text-[10px] text-red-500 font-bold mt-2 ml-2 uppercase">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Phone Input - Spans 4 columns on desktop */}
          <div className="md:col-span-12">
            <input
              {...register("phone")}
              placeholder="Phone No."
              className="w-full h-16 px-6 rounded-2xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium text-slate-900"
            />
            {errors.phone && (
              <p className="text-[10px] text-red-500 font-bold mt-2 ml-2 uppercase">
                {errors.phone.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`md:col-span-12 h-16 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg ${
              isSuccess
                ? "bg-green-600 text-white"
                : "bg-[#0f172a] hover:bg-blue-600 text-white"
            } disabled:opacity-50`}
          >
            {isSubmitting ? (
              <Loader2 className="animate-spin w-4 h-4" />
            ) : isSuccess ? (
              <CheckCircle2 size={18} />
            ) : (
              "Add Member"
            )}
          </button>
        </div>
      </form>

      <p className="mt-6 text-[10px] text-slate-400 font-bold uppercase tracking-[0.15em] text-center md:text-left leading-relaxed">
        Member will be able to register once whitelisted.
      </p>
    </section>
  );
}
