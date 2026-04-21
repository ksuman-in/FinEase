"use client";

import { FieldValues, Path, useForm, UseFormRegister } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Mail,
  Lock,
  User,
  Phone,
  Loader2,
  AlertTriangle,
  LucideIcon,
} from "lucide-react";
import Link from "next/link";

// Standard validation schema
const registerSchema = z.object({
  name: z.string().min(2, "Name is required (at least 2 chars)"),
  email: z.string().email("Please enter a valid email"),
  phone: z
    .string()
    .regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone format (+91...)"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type RegisterValues = z.infer<typeof registerSchema>;

export default function RegisterForm() {
  const [authError, setAuthError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (values: RegisterValues) => {
    setIsLoading(true);
    setAuthError(null);

    // Better Auth sign-up call
    const { data, error } = await authClient.signUp.email({
      email: values.email,
      password: values.password,
      name: values.name,
      callbackURL: "/",
      ...{ phoneNumber: values.phone },
    });

    if (error) {
      setAuthError(error.message || "Failed to create account.");
      setIsLoading(false);
    } else {
      router.push("/"); // Successful login
    }
  };

  return (
    <div>
      <h3 className="text-3xl font-extrabold text-white tracking-tighter mb-2">
        Create Account
      </h3>
      <p className="text-slate-400 mb-9">
        Secure access to your group finance hub.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <InputField
          icon={User}
          placeholder="Full Name (e.g., John Doe)"
          name="name"
          error={errors.name?.message}
          register={register}
        />
        <InputField
          icon={Mail}
          type="email"
          placeholder="Email Address"
          name="email"
          error={errors.email?.message}
          register={register}
        />
        <InputField
          icon={Phone}
          placeholder="Phone Number (+91...)"
          name="phone"
          error={errors.phone?.message}
          register={register}
        />
        <InputField
          icon={Lock}
          type="password"
          placeholder="Password (8+ chars)"
          name="password"
          error={errors.password?.message}
          register={register}
        />

        {/* Auth Error Display */}
        {authError && (
          <div className="flex items-start gap-3 p-4 bg-red-950/60 border border-red-800 rounded-xl text-red-200 text-sm">
            <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <p>{authError}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-3 py-4 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-900 disabled:text-slate-400 text-white font-bold rounded-2xl shadow-lg shadow-blue-600/30 transition-all transform active:scale-95 group"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Verifying Details...</span>
            </>
          ) : (
            <span>Start Your Ledger</span>
          )}
        </button>
      </form>
    </div>
  );
}

interface InputFieldProps<T extends FieldValues> {
  register: UseFormRegister<T>;
  error: string | undefined;
  icon: LucideIcon;
  type?: string;
  placeholder: string;
  name: Path<T>;
}

const InputField = <T extends FieldValues>({
  icon: Icon,
  type = "text",
  placeholder,
  name,
  error,
  register,
}: InputFieldProps<T>) => (
  <div className="relative group">
    <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-app-bg0 group-focus-within:text-blue-500 transition-colors" />
    <input
      {...register(name)}
      type={type}
      placeholder={placeholder}
      className={`w-full p-4 pl-12 bg-white/5 border ${error ? "border-red-600/80" : "border-white/10"} rounded-2xl text-white placeholder-app-bg0 outline-none focus:ring-2 focus:ring-blue-600/80 transition-all`}
    />
    {error && <p className="text-red-500 text-xs mt-1.5 ml-2">{error}</p>}
  </div>
);
