"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock, Loader2, AlertCircle } from "lucide-react";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

type LoginValues = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (values: LoginValues) => {
    setLoading(true);
    setError(null);

    const { data, error: authError } = await authClient.signIn.email({
      email: values.email,
      password: values.password,
      callbackURL: "/",
    });

    if (authError) {
      setError(authError.message || "Invalid email or password");
      setLoading(false);
    } else {
      router.push("/");
      router.refresh(); // Crucial to update Server Components
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-black text-white tracking-tighter">
          Login
        </h1>
        <p className="text-app-bg0 text-sm">Access your FinEase portal</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Email */}
        <div className="relative group">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-app-bg0 group-focus-within:text-blue-500 transition-colors" />
          <input
            {...register("email")}
            type="email"
            placeholder="Email Address"
            className="w-full p-4 pl-12 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-slate-600 outline-none focus:ring-2 focus:ring-blue-600/50 transition-all"
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1 ml-2">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div className="relative group">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-app-bg0 group-focus-within:text-blue-500 transition-colors" />
          <input
            {...register("password")}
            type="password"
            placeholder="Password"
            className="w-full p-4 pl-12 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-slate-600 outline-none focus:ring-2 focus:ring-blue-600/50 transition-all"
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-1 ml-2">
              {errors.password.message}
            </p>
          )}
        </div>

        {error && (
          <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-400 text-sm">
            <AlertCircle className="w-5 h-5" />
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-900 text-white font-bold rounded-2xl shadow-lg shadow-blue-600/20 transition-all transform active:scale-[0.98] flex items-center justify-center gap-2"
        >
          {loading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            "Secure Login"
          )}
        </button>
      </form>
    </div>
  );
}
