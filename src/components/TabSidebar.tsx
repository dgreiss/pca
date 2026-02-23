import { ClipboardList, Paperclip, Activity, FileText, Layers, Receipt, ShieldAlert, FlaskConical, Tag } from 'lucide-react';

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
    <div className="border-b border-slate-200 bg-white/95 px-6">
      <div className="flex items-center justify-center gap-6 overflow-x-auto py-2">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center whitespace-nowrap border-b px-2 py-3 text-[13px] font-semibold transition-colors ${
                isActive
                  ? 'border-slate-700 text-slate-700'
                  : 'border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700'
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
