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
    <div className="w-54 bg-slate-50 border-r border-slate-200 p-4 overflow-y-auto shrink-0">
      <div className="space-y-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-xs font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-slate-600'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
              style={activeTab === tab.id ? { color: '#FFFFFF' } : {}}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}