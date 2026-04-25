"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Lock, Mail, Phone, Loader2, AlertCircle } from "lucide-react";
import { useState } from "react";
import { signUpMemberAction } from "@/lib/actions/auth/signUpMemberAction";

const activationSchema = z.object({
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(32, "Password is too long"),
});

type ActivationValues = z.infer<typeof activationSchema>;

interface RegisterFormProps {
  token: string;
  initialData: {
    email: string;
    phoneNumber: string;
    groupId: string;
  } | null;
  serverError: string | null;
}

export default function RegisterForm({
  token,
  initialData,
  serverError: initialError,
}: RegisterFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(initialError);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ActivationValues>({
    resolver: zodResolver(activationSchema),
  });

  const onSubmit = async (values: ActivationValues) => {
    setLoading(true);
    setError(null);

    try {
      const res = await signUpMemberAction({
        token,
        password: values.password,
      });

      if (res?.error) {
        setError(res.error);
        setLoading(false);
        return;
      }

      window.location.replace("/dashboard");
    } catch (err) {
      const error =
        (err instanceof Error && err.message) ||
        "An unexpected error occurred.";
      setError(error);
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-700"
    >
      {error && (
        <div className="p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
          <p className="text-[10px] text-red-600 font-black uppercase tracking-widest leading-tight">
            {error}
          </p>
        </div>
      )}

      {/* Invitation Email (Locked) */}
      <div className="space-y-1.5 opacity-80">
        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">
          Invitation Email
        </label>
        <div className="relative">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
          <input
            value={initialData?.email || ""}
            readOnly
            className="w-full h-14 pl-12 pr-6 rounded-2xl bg-slate-100/50 border border-slate-200 text-slate-500 font-bold cursor-not-allowed italic focus:outline-none"
          />
        </div>
      </div>

      {/* Verified Phone (Locked) */}
      <div className="space-y-1.5 opacity-80">
        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">
          Verified Phone
        </label>
        <div className="relative">
          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
          <input
            value={initialData?.phoneNumber || ""}
            readOnly
            className="w-full h-14 pl-12 pr-6 rounded-2xl bg-slate-100/50 border border-slate-200 text-slate-500 font-bold cursor-not-allowed italic focus:outline-none"
          />
        </div>
      </div>

      {/* Password (Interactive) */}
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
            placeholder="Min. 8 characters"
            disabled={!!error}
            className="w-full h-16 pl-12 pr-6 rounded-2xl bg-white border border-slate-200 text-slate-900 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500/50 transition-all font-bold placeholder-slate-300 disabled:bg-slate-50 disabled:cursor-not-allowed"
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
        disabled={loading || !!error}
        className="w-full h-16 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-black uppercase text-xs tracking-[0.2em] shadow-xl shadow-slate-900/10 transition-all active:scale-[0.98] flex items-center justify-center gap-3 disabled:bg-slate-200 disabled:shadow-none"
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
