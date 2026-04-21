import { User as Users } from "@/lib/auth-types";
import { Mail, Phone, Shield, Calendar, Fingerprint, User } from "lucide-react";
interface MemberCardProps {
  user: Users;
}
export default function ProfileCard({ user }: MemberCardProps) {
  const infoItems = [
    { label: "Full Name", value: user.name, icon: User },
    { label: "Email Address", value: user.email, icon: Mail },
    {
      label: "Phone Number",
      value: user.phoneNumber || "Not provided",
      icon: Phone,
    },
    { label: "Account Role", value: user.role?.toUpperCase(), icon: Shield },
    {
      label: "Member Since",
      value: new Date(user.createdAt).toLocaleDateString(),
      icon: Calendar,
    },
    { label: "User ID", value: user.id, icon: Fingerprint },
  ];

  return (
    <div className="bg-app-foreground/50 border border-white/10 rounded-[2.5rem] overflow-hidden backdrop-blur-xl">
      <div className="p-8 border-b border-white/5">
        <h3 className="text-white font-bold">Personal Information</h3>
      </div>

      <div className="divide-y divide-white/5">
        {infoItems.map((item, i) => (
          <div
            key={i}
            className="p-6 flex items-center justify-between hover:bg-white/[0.02] transition-colors group"
          >
            <div className="flex items-center gap-4">
              <div className="p-2.5 bg-white/5 rounded-xl group-hover:bg-blue-500/10 transition-colors">
                <item.icon className="w-5 h-5 text-slate-400 group-hover:text-blue-400 transition-colors" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-app-bg0">
                  {item.label}
                </p>
                <p className="text-slate-200 font-medium">{item.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-6 bg-white/[0.02] flex justify-end">
        <button className="px-6 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white text-sm font-bold rounded-xl transition-all">
          Edit Profile
        </button>
      </div>
    </div>
  );
}
