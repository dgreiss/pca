import { Clock, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';

export function HistoryContent() {
  const history = [
    { 
      date: 'Feb 5, 2026 10:30 AM', 
      action: 'Assessment updated', 
      user: 'Dr. Sarah Smith',
      status: 'info',
      details: 'Clinical justification updated with additional information'
    },
    { 
      date: 'Feb 3, 2026 2:15 PM', 
      action: 'More information requested', 
      user: 'PharmD Review Team',
      status: 'warning',
      details: 'Requested lab results and prior treatment documentation'
    },
    { 
      date: 'Feb 1, 2026 9:00 AM', 
      action: 'Assessment created', 
      user: 'Dr. Sarah Smith',
      status: 'success',
      details: 'Initial prior authorization request submitted'
    },
    { 
      date: 'Jan 28, 2026 3:45 PM', 
      action: 'Previous PA denied', 
      user: 'System',
      status: 'error',
      details: 'Insufficient clinical documentation for alternative medication'
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return <CheckCircle2 className="w-5 h-5 text-green-600" />;
      case 'error': return <XCircle className="w-5 h-5 text-red-600" />;
      case 'warning': return <AlertCircle className="w-5 h-5 text-orange-600" />;
      default: return <Clock className="w-5 h-5" style={{ color: '#00373a' }} />;
    }
  };

  return (
    <div className="p-8 space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-slate-900 mb-2">Assessment History</h2>
        <p className="text-sm text-slate-500">Timeline of all changes and actions</p>
      </div>

      <div className="space-y-4">
        {history.map((item, idx) => (
          <div key={idx} className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
                {getStatusIcon(item.status)}
              </div>
              {idx < history.length - 1 && (
                <div className="w-0.5 h-full bg-slate-200 mt-2" />
              )}
            </div>
            <div className="flex-1 pb-8">
              <div className="flex items-start justify-between mb-1">
                <h3 className="font-semibold text-slate-900">{item.action}</h3>
                <span className="text-xs text-slate-500">{item.date}</span>
              </div>
              <p className="text-sm text-slate-600 mb-2">{item.details}</p>
              <p className="text-xs text-slate-500">by {item.user}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}