import { Calendar, Download, RefreshCw } from 'lucide-react';

export function AssessmentDatesOverview() {
  return (
    <div className="bg-slate-100 rounded-lg p-3">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="flex items-center gap-3">
          <Download className="w-4 h-4" style={{ color: '#00373a' }} />
          <div>
            <div className="text-xs text-slate-500">Received</div>
            <div className="text-xs font-medium text-slate-900">Jan 28, 2026 9:12 AM</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Calendar className="w-4 h-4" style={{ color: '#00373a' }} />
          <div>
            <div className="text-xs text-slate-500">Imported</div>
            <div className="text-xs font-medium text-slate-900">Jan 29, 2026 8:03 AM</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Calendar className="w-4 h-4" style={{ color: '#00373a' }} />
          <div>
            <div className="text-xs text-slate-500">Created</div>
            <div className="text-xs font-medium text-slate-900">Feb 1, 2026 10:27 AM</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <RefreshCw className="w-4 h-4" style={{ color: '#00373a' }} />
          <div>
            <div className="text-xs text-slate-500">Updated</div>
            <div className="text-xs font-medium text-slate-900">Feb 5, 2026 4:41 PM</div>
          </div>
        </div>
      </div>
    </div>
  );
}
