import { useState } from 'react';
import { NavLink } from 'react-router-dom';
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
  path: string;
  icon: typeof Home;
  label: string;
};

type NavigationSection = {
  title: string;
  items: NavigationItem[];
};

export function Navigation() {
  const [expanded, setExpanded] = useState(true);

  const navSections: NavigationSection[] = [
    {
      title: 'Submissions',
      items: [
        { path: '/intake', icon: LayoutDashboard, label: 'Intake' },
        { path: '/search', icon: Search, label: 'Search' },
      ],
    },
    {
      title: 'Assessments',
      items: [
        { path: '/assessments/home', icon: Home, label: 'Home' },
        { path: '/reports', icon: BarChart3, label: 'Reports' },
        { path: '/assessments/queue', icon: ListTodo, label: 'Queue' },
        { path: '/assessments/ppn', icon: Hash, label: 'PPN' },
        { path: '/assessments/pharm-consult', icon: Stethoscope, label: 'Pharm Consult' },
        { path: '/search', icon: Search, label: 'Search' },
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
                return expanded ? (
                  <NavLink
                    key={item.path + item.label}
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center gap-2.5 px-2.5 py-2 rounded-lg transition-colors ${
                        isActive
                          ? 'bg-white text-[#00373a] shadow-sm'
                          : 'text-slate-500 hover:bg-white hover:text-slate-800'
                      }`
                    }
                  >
                    <Icon className="w-[18px] h-[18px] shrink-0" />
                    <span className="text-[13px] truncate">{item.label}</span>
                  </NavLink>
                ) : (
                  <NavLink
                    key={item.path + item.label}
                    to={item.path}
                    className={({ isActive }) =>
                      `w-16 py-1.5 rounded-lg flex flex-col items-center justify-center gap-0.5 transition-colors ${
                        isActive
                          ? 'bg-white text-[#00373a] shadow-sm'
                          : 'text-slate-500 hover:bg-white hover:text-slate-800'
                      }`
                    }
                    title={item.label}
                  >
                    <Icon className="w-[18px] h-[18px]" />
                    <span className="text-[9px] leading-tight">{item.label}</span>
                  </NavLink>
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
