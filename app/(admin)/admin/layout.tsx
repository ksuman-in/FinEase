import AdminMobileMenu from "@/components/admin/AdminMobileMenu";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <div className="hidden lg:block w-72 shrink-0 border-r border-slate-200/60 bg-white/50 backdrop-blur-md">
        <AdminSidebar />
      </div>

      <main className="flex-1 relative">
        <div className="hidden lg:block absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[500px] h-[500px] bg-blue-100/40 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 p-4 md:p-8 lg:p-10 xl:p-14 pb-32 lg:pb-14">
          <div className="max-w-[1400px] mx-auto">{children}</div>
        </div>
      </main>

      <div className="lg:hidden">
        <AdminMobileMenu />
      </div>
    </div>
  );
}
