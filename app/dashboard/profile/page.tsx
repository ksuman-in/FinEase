import { authGuard } from "@/lib/auth-utils";
import ProfileCard from "@/components/dashboard/ProfileCard";

export default async function ProfilePage() {
  const { user } = await authGuard();

  const displayName = user.name?.trim() || "User";

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 lg:py-20">
      <header className="mb-12">
        <h1 className="text-4xl font-black tracking-tighter text-white">
          Account
        </h1>
        <p className="text-slate-500">
          Manage your identity and security settings.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left: Avatar & Quick Info */}
        <div className="md:col-span-1 space-y-6">
          <div className="p-8 bg-white/5 border border-white/10 rounded-[2.5rem] flex flex-col items-center text-center">
            <div className="w-24 h-24 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-3xl flex items-center justify-center text-3xl font-black text-white shadow-2xl shadow-blue-500/20 mb-4">
              {displayName[0].toUpperCase()}
            </div>
            <h3 className="text-xl font-bold text-white">{displayName}</h3>
            <span className="mt-2 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-[10px] font-black uppercase tracking-widest text-blue-400">
              {user.role || "Member"}
            </span>
          </div>
        </div>

        {/* Right: Detailed Info */}
        <div className="md:col-span-2">
          <ProfileCard user={user} />
        </div>
      </div>
    </div>
  );
}
