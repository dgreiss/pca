import { FileText, ExternalLink, Clock, CheckCircle2, AlertCircle, XCircle } from 'lucide-react';

const relatedSubmissions = [
  {
    id: 'PA-2024-001198',
    receivedDate: 'Jan 10, 2026',
    completedDate: 'Jan 12, 2026',
    medication: 'Methotrexate 2.5mg oral tablet',
    status: 'approved',
    agentName: 'Maria Santos',
    comments: 'Initial DMARD therapy approved for rheumatoid arthritis.',
  },
  {
    id: 'PA-2024-001210',
    receivedDate: 'Jan 15, 2026',
    completedDate: 'Jan 18, 2026',
    medication: 'Prednisone 10mg oral tablet',
    status: 'approved',
    agentName: 'Maria Santos',
    comments: 'Short-term corticosteroid bridge therapy approved.',
  },
  {
    id: 'EX-2024-000487',
    receivedDate: 'Feb 1, 2026',
    completedDate: '—',
    medication: 'Humira 40mg/0.8mL subcutaneous',
    status: 'pending',
    agentName: 'Kevin Tran',
    comments: 'Biologic escalation request — awaiting clinical review.',
  },
  {
    id: 'PA-2024-001156',
    receivedDate: 'Dec 2, 2025',
    completedDate: 'Dec 5, 2025',
    medication: 'Sulfasalazine 500mg oral tablet',
    status: 'denied',
    agentName: 'Rachel Kim',
    comments: 'Denied — insufficient documentation of methotrexate failure.',
  },
  {
    id: 'PA-2024-001220',
    receivedDate: 'Jan 22, 2026',
    completedDate: 'Jan 25, 2026',
    medication: 'Hydroxychloroquine 200mg oral tablet',
    status: 'approved',
    agentName: 'Maria Santos',
    comments: 'Adjunct therapy approved as part of combination DMARD regimen.',
  },
];

const statusConfig: Record<string, { label: string; icon: typeof CheckCircle2; colorClass: string; bgClass: string }> = {
  approved: { label: 'Approved', icon: CheckCircle2, colorClass: 'text-green-700', bgClass: 'bg-green-50 border-green-200' },
  pending: { label: 'Pending', icon: Clock, colorClass: 'text-yellow-700', bgClass: 'bg-yellow-50 border-yellow-200' },
  denied: { label: 'Denied', icon: XCircle, colorClass: 'text-red-700', bgClass: 'bg-red-50 border-red-200' },
};

export function RelatedSubmissionsContent() {
  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold text-slate-900 mb-2">Related Submissions</h2>
        <p className="text-sm text-slate-500">
          Prior authorizations, exceptions, and other submissions linked to this member and assessment.
        </p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-green-50 border border-green-100 rounded-xl p-4">
          <div className="text-2xl font-semibold text-green-700">3</div>
          <div className="text-xs text-green-600 mt-1">Approved</div>
        </div>
        <div className="bg-yellow-50 border border-yellow-100 rounded-xl p-4">
          <div className="text-2xl font-semibold text-yellow-700">1</div>
          <div className="text-xs text-yellow-600 mt-1">Pending</div>
        </div>
        <div className="bg-red-50 border border-red-100 rounded-xl p-4">
          <div className="text-2xl font-semibold text-red-700">1</div>
          <div className="text-xs text-red-600 mt-1">Denied</div>
        </div>
      </div>

      {/* Submissions List */}
      <div className="space-y-4">
        {relatedSubmissions.map((submission) => {
          const config = statusConfig[submission.status];
          const StatusIcon = config.icon;
          return (
            <div
              key={submission.id}
              className={`border rounded-xl p-3.5 transition-colors hover:shadow-sm ${config.bgClass}`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 shrink-0" style={{ color: '#00373a' }} />
                  <span className="text-sm font-semibold text-slate-900">{submission.id}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full ${config.colorClass} ${config.bgClass}`}>
                    <StatusIcon className="w-3.5 h-3.5" />
                    {config.label}
                  </span>
                  <button className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-white/60 transition-colors">
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-x-6 gap-y-1.5 text-xs ml-8 mb-2">
                <div>
                  <span className="text-slate-400">Received Date</span>
                  <p className="text-slate-700 mt-0.5">{submission.receivedDate}</p>
                </div>
                <div>
                  <span className="text-slate-400">Completed Date</span>
                  <p className="text-slate-700 mt-0.5">{submission.completedDate}</p>
                </div>
                <div>
                  <span className="text-slate-400">Requested Medication</span>
                  <p className="text-slate-700 mt-0.5">{submission.medication}</p>
                </div>
                <div>
                  <span className="text-slate-400">Agent Name</span>
                  <p className="text-slate-700 mt-0.5">{submission.agentName}</p>
                </div>
              </div>

              <div className="text-xs ml-8">
                <span className="text-slate-400">Comments</span>
                <p className="text-slate-500 mt-0.5">{submission.comments}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}