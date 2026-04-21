"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useSearchParams } from "next/navigation";
import { Lock, Mail, Phone, Loader2, Info } from "lucide-react";
import { useState, useMemo } from "react";
import { signUpMemberAction } from "@/lib/actions/auth-actions";
import LogoIcon from "@/components/ui/logo-icon";

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
    <div className="w-full max-w-md mx-auto p-1 bg-gradient-to-b from-blue-500/20 to-transparent rounded-[2rem]">
      <div className="bg-[#0f172a]/95 backdrop-blur-3xl p-8 md:p-10 rounded-[2.4rem] border border-white/10 shadow-2xl">
        <div className="flex justify-center mb-6">
          <div className="p-3 bg-blue-500/10 rounded-2xl border border-blue-500/20">
            <LogoIcon />
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="text-center space-y-2 mb-8">
            <h2 className="text-2xl font-black text-white tracking-tight">
              Finalize Access
            </h2>
            <p className="text-slate-400 text-sm font-medium">
              Your invitation is verified.
            </p>
          </div>

          {serverError && (
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl">
              <p className="text-[10px] text-red-500 font-black uppercase text-center tracking-widest">
                {serverError}
              </p>
            </div>
          )}

          {/* Email Field (Disabled) */}
          <div className="space-y-2">
            <div className="flex justify-between items-center px-1">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                Email Address
              </label>
              <div className="group relative flex items-center gap-1 cursor-help">
                <Info size={12} className="text-slate-600" />
                <span className="absolute bottom-full right-0 mb-2 w-48 p-3 bg-slate-800 text-[10px] text-slate-300 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-white/10 shadow-2xl z-10 leading-relaxed">
                  Locked to your invitation for security.
                </span>
              </div>
            </div>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-600 transition-colors group-focus-within:text-slate-400" />
              <input
                value={email}
                disabled
                className="w-full h-14 pl-12 pr-6 rounded-2xl bg-white/5 border border-white/5 text-slate-500 font-bold cursor-not-allowed select-none"
              />
            </div>
          </div>

          {/* Phone Field (Disabled) */}
          <div className="space-y-2">
            <div className="flex justify-between items-center px-1">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                Phone Number
              </label>
              <div className="group relative flex items-center gap-1 cursor-help">
                <Info size={12} className="text-slate-600" />
                <span className="absolute bottom-full right-0 mb-2 w-48 p-3 bg-slate-800 text-[10px] text-slate-300 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-white/10 shadow-2xl z-10 leading-relaxed">
                  Verified by your group administrator.
                </span>
              </div>
            </div>
            <div className="relative group">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-600 transition-colors group-focus-within:text-slate-400" />
              <input
                value={phone}
                disabled
                className="w-full h-14 pl-12 pr-6 rounded-2xl bg-white/5 border border-white/5 text-slate-500 font-bold cursor-not-allowed select-none"
              />
            </div>
          </div>

          {/* Password Field (Interactive) */}
          <div className="space-y-2">
            <label className="text-[10px] font-black text-blue-500 uppercase tracking-widest px-1">
              Create Secure Password
            </label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-500 group-focus-within:text-blue-400 transition-colors" />
              <input
                {...register("password")}
                type="password"
                placeholder="**********"
                autoComplete="new-password"
                className={`w-full h-16 pl-12 pr-6 rounded-2xl bg-white/5 border ${
                  errors.password ? "border-red-500/50" : "border-blue-500/30"
                } text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all font-medium`}
              />
            </div>
            {errors.password && (
              <p className="text-[10px] text-red-500 font-bold ml-2 uppercase tracking-tighter">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-16 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black uppercase text-xs tracking-[0.2em] shadow-lg shadow-blue-900/40 transition-all active:scale-[0.98] flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              "Unlock My Vault"
            )}
          </button>
        </form>

        <p className="mt-8 text-center text-slate-600 text-[10px] font-bold uppercase tracking-widest">
          Secured by Power 10 Protocol
        </p>
      </div>
    </div>
  );
}
