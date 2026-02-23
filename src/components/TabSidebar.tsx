import {
  ClipboardList,
  Paperclip,
  Activity,
  FileText,
  Layers,
  Receipt,
  ShieldAlert,
  FlaskConical,
  Tag,
} from 'lucide-react';

interface TabSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function TabSidebar({ activeTab, setActiveTab }: TabSidebarProps) {
  const tabs = [
    { id: 'assessment', label: 'Assessment', icon: ClipboardList },
    { id: 'attachments', label: 'Attachments', icon: Paperclip },
    { id: 'decision-codes', label: 'Decision Codes', icon: Tag },
    { id: 'mock-claim', label: 'Mock Claim', icon: FlaskConical },
    { id: 'claim-history', label: 'Claim History', icon: Receipt },
    { id: 'related-submissions', label: 'Related Submissions', icon: Layers },
    { id: 'exceptions', label: 'Exceptions', icon: ShieldAlert },
    { id: 'notes', label: 'Notes', icon: FileText },
    { id: 'activity', label: 'Activity', icon: Activity },
  ];

  return (
    <div className="bg-white/95 px-6">
      <div className="flex items-center justify-center gap-0 overflow-x-auto">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center whitespace-nowrap py-2 px-4 text-[13px] border-b-2 font-semibold transition-colors ${
                isActive
                  ? 'border-slate-900 text-slate-800'
                  : 'border-slate-200 text-slate-500 hover:border-slate-400 hover:text-slate-700'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
