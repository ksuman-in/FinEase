"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useSearchParams } from "next/navigation";
import { Lock, Mail, Phone, Loader2 } from "lucide-react";
import { useState, useMemo } from "react";
import { signUpMemberAction } from "@/lib/actions/auth-actions";

const activationSchema = z.object({
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(32, "Password is too long"),
});

type ActivationValues = z.infer<typeof activationSchema>;

export default function RegisterForm() {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const email = useMemo(() => searchParams.get("email") || "", [searchParams]);
  const phone = useMemo(() => searchParams.get("phone") || "", [searchParams]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ActivationValues>({
    resolver: zodResolver(activationSchema),
  });

  const onSubmit = async (values: ActivationValues) => {
    if (!email || !phone) {
      setServerError("Missing invitation details. Please check your link.");
      return;
    }

    setLoading(true);
    setServerError(null);

    try {
      const res = await signUpMemberAction(values, email, phone);
      if (res?.error) {
        setServerError(res.error);
        setLoading(false);
        return;
      }
      window.location.replace("/dashboard");
    } catch (error) {
      setServerError(
        (error instanceof Error && error.message) || "Something went wrong.",
      );
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {serverError && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-2xl">
          <p className="text-[10px] text-red-600 font-black uppercase text-center tracking-widest">
            {serverError}
          </p>
        </div>
      )}

      {/* Locked Email Field */}
      <div className="space-y-1.5">
        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">
          Invitation Email
        </label>
        <div className="relative">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
          <input
            value={email}
            disabled
            className="w-full h-14 pl-12 pr-6 rounded-2xl bg-slate-100/50 border border-slate-200 text-slate-400 font-bold cursor-not-allowed italic"
          />
        </div>
      </div>

      {/* Locked Phone Field */}
      <div className="space-y-1.5">
        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">
          Verified Phone
        </label>
        <div className="relative">
          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
          <input
            value={phone}
            disabled
            className="w-full h-14 pl-12 pr-6 rounded-2xl bg-slate-100/50 border border-slate-200 text-slate-400 font-bold cursor-not-allowed italic"
          />
        </div>
      </div>

      {/* Interactive Password Field */}
      <div className="space-y-1.5">
        <label
          htmlFor="password"
          className="text-[10px] font-black text-blue-600 uppercase tracking-widest px-1"
        >
          Create Access Password
        </label>
        <div className="relative group">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
          <input
            {...register("password")}
            type="password"
            id="password"
            autoComplete="new-password"
            placeholder="Min. 8 characters"
            className="w-full h-16 pl-12 pr-6 rounded-2xl bg-white/50 border border-white text-slate-900 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500/50 transition-all font-bold placeholder-slate-300"
          />
        </div>
        {errors.password && (
          <p className="text-[10px] text-red-500 font-bold ml-2 uppercase">
            {errors.password.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full h-16 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-black uppercase text-xs tracking-[0.2em] shadow-xl shadow-slate-900/10 transition-all active:scale-[0.98] flex items-center justify-center gap-3"
      >
        {loading ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          "Unlock My Vault"
        )}
      </button>
    </form>
  );
}
