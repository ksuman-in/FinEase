import Sidebar from "@/components/dashboard/Sidebar";
import TopNav from "@/components/dashboard/PageHeader";
import { authGuard } from "@/lib/auth-utils";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await authGuard();

  return (
    <div className="flex min-h-screen bg-app-foreground text-app-bg">
      <aside className="hidden lg:flex w-64 flex-col border-r border-white/5 bg-app-foreground fixed inset-y-0 z-50">
        <div className="p-8">
          <h2 className="text-xl font-black text-white tracking-tighter">
            FIN<span className="text-blue-500">EASE.</span>
          </h2>
        </div>

        {/* Scrollable area inside the sidebar if you have many links */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <Sidebar />
        </div>
      </aside>

      {/* 2. Main Content Area */}
      <main className="flex-1 lg:pl-64 flex flex-col">
        <div className="flex flex-col min-h-screen">
          {/* 3. Top Navigation (Search, Profile, Notifications) */}
          <header className="sticky top-0 z-40 border-b border-white/5 bg-app-foreground/80 backdrop-blur-md">
            <TopNav />
          </header>

          {/* 4. Dynamic Page Content */}
          <section className="p-6 lg:p-10 max-w-[1600px] mx-auto w-full">
            {children}
          </section>
        </div>
      </main>
    </div>
  );
}
