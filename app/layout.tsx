import { Toaster } from "sonner";
import "./globals.css";

export const metadata = {
  title: "VaultEase | Group Savings & Lending",
  description:
    "Secure, transparent, and easy management for group financial vaults.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#E5E7EB] text-slate-900 antialiased min-h-screen">
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          {/* Large Organic "Spheres" */}
          <div className="absolute top-[-20%] left-[-10%] w-[80%] h-[80%] rounded-full bg-white opacity-80 blur-[100px]" />

          <div className="absolute bottom-[0%] right-[-5%] w-[60%] h-[70%] rounded-full bg-slate-300/50 blur-[120px]" />

          {/* Light Source from Top Right */}
          <div className="absolute top-[10%] right-[10%] w-[40%] h-[40%] rounded-full bg-blue-100/40 blur-[80px]" />
        </div>

        <main className="relative z-10 min-h-screen">{children}</main>
        <Toaster
          position="top-right"
          richColors
          toastOptions={{
            unstyled: false,
            classNames: {
              toast:
                "rounded-[1.5rem] border-white/40 backdrop-blur-2xl shadow-2xl font-bold",
              success:
                "bg-emerald-500/20 text-emerald-900 border-emerald-200/50",
              error: "bg-rose-500/20 text-rose-900 border-rose-200/50",
              info: "bg-blue-500/20 text-blue-900 border-blue-200/50",
              warning: "bg-amber-500/20 text-amber-900 border-amber-200/50",
            },
          }}
        />
      </body>
    </html>
  );
}
