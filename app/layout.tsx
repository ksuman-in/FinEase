import { getSession } from "@/lib/auth-utils";
import Navbar from "@/components/layout/Navbar";
import "./globals.css";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  return (
    <html lang="en" className="dark">
      <body
        suppressHydrationWarning
        className="bg-slate-950 text-slate-50 antialiased min-h-screen"
      >
        <Navbar session={session} />

        <main className="relative">
          {session ? (
            /* User is logged in: Show the App */
            <div className="pt-20">{children}</div>
          ) : (
            /* User is NOT logged in: Determine what to show */
            <div className="pt-20">
              {/* We move the Landing logic to the actual page level 
                or use a dedicated route for it to avoid blocking /login 
              */}
              {children}
            </div>
          )}
        </main>
      </body>
    </html>
  );
}
