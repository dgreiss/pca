import { useState } from 'react';
import {
  Home,
  LayoutDashboard,
  BarChart3,
  ListTodo,
  Hash,
  Stethoscope,
  Search,
  Settings,
  HelpCircle,
  PanelLeftClose,
  PanelLeftOpen,
} from 'lucide-react';

type NavigationItem = {
  id: string;
  icon: typeof Home;
  label: string;
};

type NavigationSection = {
  title: string;
  items: NavigationItem[];
};

type NavigationProps = {
  activeItem: string;
  onSelect: (id: string) => void;
};

export function Navigation({ activeItem, onSelect }: NavigationProps) {
  const [expanded, setExpanded] = useState(true);

  const navSections: NavigationSection[] = [
    {
      title: 'Submissions',
      items: [
        { id: 'intake', icon: LayoutDashboard, label: 'Intake' },
        { id: 'search', icon: Search, label: 'Search' },
      ],
    },
    {
      title: 'Assessments',
      items: [
        { id: 'home', icon: Home, label: 'Home' },
        { id: 'dashboard', icon: BarChart3, label: 'Reports' },
        { id: 'queue', icon: ListTodo, label: 'Queue' },
        { id: 'ppn', icon: Hash, label: 'PPN' },
        { id: 'pharm', icon: Stethoscope, label: 'Pharm Consult' },
        { id: 'search', icon: Search, label: 'Search' },
      ],
    },
  ];

  const bottomItems = [
    { icon: Settings, label: 'Settings' },
    { icon: HelpCircle, label: 'Help' },
  ];

  return (
    <div
      className={`bg-slate-50 flex flex-col py-4 border-r border-slate-200 transition-all duration-200 ${
        expanded ? 'w-[170px] px-3' : 'w-[72px] items-center'
      }`}
    >
      {/* Collapse Toggle */}
      <div
        className={`flex items-center mb-4 ${expanded ? 'justify-end px-2.5' : 'justify-center'}`}
      >
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-7 h-7 rounded-md flex items-center justify-center text-slate-500 hover:bg-slate-200 hover:text-slate-700 transition-colors"
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
      <nav className="flex-1 flex flex-col gap-3">
        {navSections.map((section, sectionIndex) => (
          <div
            key={section.title}
            className={`${expanded ? '' : 'w-full'} ${sectionIndex > 0 ? 'pt-2 border-t border-slate-200' : ''}`}
          >
            {expanded && (
              <div className="px-2.5 pb-1 text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                {section.title}
              </div>
            )}
            <div className="flex flex-col gap-1">
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = activeItem === item.id;
                return expanded ? (
                  <button
                    key={item.id}
                    onClick={() => onSelect(item.id)}
                    className={`flex items-center gap-2.5 px-2.5 py-2 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-white text-[#00373a] shadow-sm'
                        : 'text-slate-500 hover:bg-white hover:text-slate-800'
                    }`}
                  >
                    <Icon className="w-[18px] h-[18px] shrink-0" />
                    <span className="text-[13px] truncate">{item.label}</span>
                  </button>
                ) : (
                  <button
                    key={item.id}
                    onClick={() => onSelect(item.id)}
                    className={`w-16 py-1.5 rounded-lg flex flex-col items-center justify-center gap-0.5 transition-colors ${
                      isActive
                        ? 'bg-white text-[#00373a] shadow-sm'
                        : 'text-slate-500 hover:bg-white hover:text-slate-800'
                    }`}
                    title={item.label}
                  >
                    <Icon className="w-[18px] h-[18px]" />
                    <span className="text-[9px] leading-tight">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Bottom Navigation */}
      <div className="flex flex-col gap-1">
        {bottomItems.map((item, idx) => {
          const Icon = item.icon;
          return expanded ? (
            <button
              key={idx}
              className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-slate-500 hover:bg-white hover:text-slate-800 transition-colors"
            >
              <Icon className="w-[18px] h-[18px] shrink-0" />
              <span className="text-[13px] truncate">{item.label}</span>
            </button>
          ) : (
            <button
              key={idx}
              className="w-16 py-1.5 rounded-lg flex flex-col items-center justify-center gap-0.5 text-slate-500 hover:bg-white hover:text-slate-800 transition-colors"
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
