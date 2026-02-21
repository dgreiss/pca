import { useState } from 'react';
import { Home, BarChart3, ListTodo, Hash, Stethoscope, Search, Settings, HelpCircle, PanelLeftClose, PanelLeftOpen } from 'lucide-react';

export function Navigation() {
  const [expanded, setExpanded] = useState(true);

  const navItems = [
    { icon: Home, label: 'Home', active: false },
    { icon: BarChart3, label: 'Reports', active: false },
    { icon: ListTodo, label: 'Queue', active: true },
    { icon: Hash, label: 'PPN', active: false },
    { icon: Stethoscope, label: 'Pharm Consult', active: false },
    { icon: Search, label: 'Search', active: false },
  ];

  const bottomItems = [
    { icon: Settings, label: 'Settings' },
    { icon: HelpCircle, label: 'Help' },
  ];

  return (
    <div
      className={`bg-[#00373a] flex flex-col py-4 border-r border-white/10 transition-all duration-200 ${
        expanded ? 'w-[170px] px-3' : 'w-[72px] items-center'
      }`}
    >
      {/* Collapse Toggle */}
      <div className={`flex items-center mb-4 ${expanded ? 'justify-end px-2.5' : 'justify-center'}`}>
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-7 h-7 rounded-md flex items-center justify-center text-white/50 hover:bg-white/10 hover:text-white transition-colors"
          title={expanded ? 'Collapse menu' : 'Expand menu'}
        >
          {expanded ? (
            <PanelLeftClose className="w-4 h-4" />
          ) : (
            <PanelLeftOpen className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 flex flex-col gap-1">
        {navItems.map((item, idx) => {
          const Icon = item.icon;
          return expanded ? (
            <button
              key={idx}
              className={`flex items-center gap-2.5 px-2.5 py-2 rounded-lg transition-colors ${
                item.active
                  ? 'bg-white/20 text-white'
                  : 'text-white/60 hover:bg-white/10 hover:text-white'
              }`}
            >
              <Icon className="w-[18px] h-[18px] shrink-0" />
              <span className="text-[13px] truncate">{item.label}</span>
            </button>
          ) : (
            <button
              key={idx}
              className={`w-16 py-1.5 rounded-lg flex flex-col items-center justify-center gap-0.5 transition-colors ${
                item.active
                  ? 'bg-white/20 text-white'
                  : 'text-white/60 hover:bg-white/10 hover:text-white'
              }`}
              title={item.label}
            >
              <Icon className="w-[18px] h-[18px]" />
              <span className="text-[9px] leading-tight">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Bottom Navigation */}
      <div className="flex flex-col gap-1">
        {bottomItems.map((item, idx) => {
          const Icon = item.icon;
          return expanded ? (
            <button
              key={idx}
              className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-white/60 hover:bg-white/10 hover:text-white transition-colors"
            >
              <Icon className="w-[18px] h-[18px] shrink-0" />
              <span className="text-[13px] truncate">{item.label}</span>
            </button>
          ) : (
            <button
              key={idx}
              className="w-16 py-1.5 rounded-lg flex flex-col items-center justify-center gap-0.5 text-white/60 hover:bg-white/10 hover:text-white transition-colors"
              title={item.label}
            >
              <Icon className="w-[18px] h-[18px]" />
              <span className="text-[9px] leading-tight">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}