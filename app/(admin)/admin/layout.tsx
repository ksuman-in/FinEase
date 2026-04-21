import AdminMobileMenu from "@/components/admin/AdminMobileMenu";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-slate-50/50">
      {/* Left Side: Desktop Sidebar */}
      <AdminSidebar />

      {/* Main Content Area */}
      <main className="flex-1 p-4 md:p-8 lg:p-12 pb-32 lg:pb-12">
        <div className="max-w-6xl mx-auto">{children}</div>
      </main>

      {/* Bottom: Mobile Menu (Visible only on small screens) */}
      <div className="lg:hidden">
        <AdminMobileMenu />
      </div>
    </div>
  );
}
