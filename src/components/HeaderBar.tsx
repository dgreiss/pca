import { Building2, Bell, User } from 'lucide-react';

export function HeaderBar() {
  return (
    <header className="bg-[#00373a] h-12 flex items-center justify-between px-4 border-b border-white/10 shrink-0">
      {/* Left: Logo + App Name */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/15">
          <Building2 className="w-[18px] h-[18px] text-white" />
        </div>
        <span className="text-white text-[14px] tracking-wide">PharmaCRM</span>
      </div>

      {/* Right: Notifications + User */}
      <div className="flex items-center gap-2">
        <div className="w-px h-5 bg-white/15 mx-1" />
        <button className="flex items-center gap-2 px-2 py-1.5 rounded-md text-white/70 hover:bg-white/10 hover:text-white transition-colors">
          <div className="w-7 h-7 rounded-full bg-white/15 flex items-center justify-center">
            <User className="w-4 h-4" />
          </div>
          <span className="text-[13px]">J. Smith</span>
        </button>
      </div>
    </header>
  );
}
