import { Plus, MoreVertical } from 'lucide-react';

export function NotesContent() {
  const notes = [
    {
      author: 'Sarah Smith',
      date: 'Feb 5, 2026 10:15 AM',
      content: 'Patient responded well to initial consultation. Confirmed previous treatment failures and documented all adverse reactions. Will monitor for biologic therapy approval.'
    },
    {
      author: 'John Lee',
      date: 'Feb 3, 2026 2:00 PM',
      content: 'Clinical documentation appears complete. However, need to verify insurance coverage details and obtain pre-authorization from secondary insurer.'
    },
    {
      author: 'Michael Johnson',
      date: 'Feb 1, 2026 4:30 PM',
      content: 'Initial assessment indicates strong clinical need for biologic therapy. Patient meets all criteria per treatment guidelines. Forwarding to pharmacy benefits team.'
    },
  ];

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900 mb-2">Notes</h2>
          <p className="text-sm text-slate-500">Internal notes and comments</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 text-white rounded-lg font-medium transition-colors" style={{ backgroundColor: '#00373a' }} onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'} onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}>
          <Plus className="w-4 h-4" />
          Add Note
        </button>
      </div>

      <div className="space-y-4">
        {notes.map((note, idx) => (
          <div key={idx} className="border border-slate-200 rounded-lg p-5 hover:border-slate-300 transition-colors">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-semibold text-slate-900">{note.author}</h3>
                <p className="text-xs text-slate-500 mt-1">{note.date}</p>
              </div>
              <button className="p-1 hover:bg-slate-100 rounded transition-colors">
                <MoreVertical className="w-4 h-4 text-slate-400" />
              </button>
            </div>
            <p className="text-sm text-slate-700 leading-relaxed">{note.content}</p>
          </div>
        ))}
      </div>

      {/* Add Note Form */}
      <div className="border border-slate-200 rounded-lg p-5 bg-slate-50">
        <textarea
          placeholder="Add a new note..."
          rows={4}
          className="w-full px-4 py-3 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:border-transparent resize-none bg-white"
          style={{ '--tw-ring-color': '#00373a' } as React.CSSProperties}
        />
        <div className="flex items-center justify-end gap-2 mt-3">
          <button className="px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
            Cancel
          </button>
          <button className="px-4 py-2 text-sm text-white rounded-lg transition-colors" style={{ backgroundColor: '#00373a' }} onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'} onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}>
            Save Note
          </button>
        </div>
      </div>
    </div>
  );
}