import { CheckCircle2, AlertTriangle, XCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

interface ClaimRecord {
  id: string;
  serviceDate: string;
  claimStatus: 'Paid' | 'Denied' | 'Pending';
  din: string;
  medicationName: string;
  renderedAmount: string;
  allowedAmount: string;
  deductible: string;
  copay: string;
  paidAmount: string;
  cob: string;
  daysSupply: number;
  quantity: number;
  allowedQuantity: number;
}

const claimHistory: ClaimRecord[] = [
  {
    id: 'CLM-2026-004821',
    serviceDate: 'Jan 10, 2026',
    claimStatus: 'Paid',
    din: '02182963',
    medicationName: 'Methotrexate 2.5mg oral tablet',
    renderedAmount: '$32.00',
    allowedAmount: '$32.00',
    deductible: '$0.00',
    copay: '$8.00',
    paidAmount: '$24.00',
    cob: '$0.00',
    daysSupply: 30,
    quantity: 12,
    allowedQuantity: 12,
  },
  {
    id: 'CLM-2026-004590',
    serviceDate: 'Dec 15, 2025',
    claimStatus: 'Paid',
    din: '00585840',
    medicationName: 'Hydroxychloroquine 200mg oral tablet',
    renderedAmount: '$45.00',
    allowedAmount: '$42.50',
    deductible: '$0.00',
    copay: '$10.00',
    paidAmount: '$32.50',
    cob: '$0.00',
    daysSupply: 30,
    quantity: 60,
    allowedQuantity: 60,
  },
  {
    id: 'CLM-2026-004312',
    serviceDate: 'Dec 20, 2025',
    claimStatus: 'Denied',
    din: '02258595',
    medicationName: 'Humira 40mg/0.8mL subcutaneous',
    renderedAmount: '$1,950.00',
    allowedAmount: '$0.00',
    deductible: '$0.00',
    copay: '$0.00',
    paidAmount: '$0.00',
    cob: '$0.00',
    daysSupply: 14,
    quantity: 1,
    allowedQuantity: 0,
  },
  {
    id: 'CLM-2026-004100',
    serviceDate: 'Dec 8, 2025',
    claimStatus: 'Paid',
    din: '02182963',
    medicationName: 'Methotrexate 2.5mg oral tablet',
    renderedAmount: '$32.00',
    allowedAmount: '$32.00',
    deductible: '$0.00',
    copay: '$8.00',
    paidAmount: '$24.00',
    cob: '$0.00',
    daysSupply: 30,
    quantity: 12,
    allowedQuantity: 12,
  },
  {
    id: 'CLM-2026-003887',
    serviceDate: 'Nov 15, 2025',
    claimStatus: 'Pending',
    din: '00235822',
    medicationName: 'Sulfasalazine 500mg oral tablet',
    renderedAmount: '$33.00',
    allowedAmount: '$33.00',
    deductible: '$2.00',
    copay: '$10.00',
    paidAmount: '$21.00',
    cob: '$5.00',
    daysSupply: 30,
    quantity: 60,
    allowedQuantity: 60,
  },
  {
    id: 'CLM-2025-003650',
    serviceDate: 'Nov 1, 2025',
    claimStatus: 'Paid',
    din: '02242903',
    medicationName: 'Enbrel 50mg/mL subcutaneous',
    renderedAmount: '$1,120.00',
    allowedAmount: '$1,120.00',
    deductible: '$50.00',
    copay: '$25.00',
    paidAmount: '$1,045.00',
    cob: '$0.00',
    daysSupply: 28,
    quantity: 4,
    allowedQuantity: 4,
  },
  {
    id: 'CLM-2025-003412',
    serviceDate: 'Oct 18, 2025',
    claimStatus: 'Paid',
    din: '02497514',
    medicationName: 'Rinvoq 15mg oral tablet',
    renderedAmount: '$1,680.00',
    allowedAmount: '$1,680.00',
    deductible: '$0.00',
    copay: '$35.00',
    paidAmount: '$1,645.00',
    cob: '$0.00',
    daysSupply: 30,
    quantity: 30,
    allowedQuantity: 30,
  },
  {
    id: 'CLM-2025-003198',
    serviceDate: 'Oct 5, 2025',
    claimStatus: 'Denied',
    din: '02444550',
    medicationName: 'Cosentyx 150mg/mL subcutaneous',
    renderedAmount: '$2,250.00',
    allowedAmount: '$0.00',
    deductible: '$0.00',
    copay: '$0.00',
    paidAmount: '$0.00',
    cob: '$0.00',
    daysSupply: 28,
    quantity: 2,
    allowedQuantity: 0,
  },
  {
    id: 'CLM-2025-002975',
    serviceDate: 'Sep 22, 2025',
    claimStatus: 'Paid',
    din: '02413728',
    medicationName: 'Xeljanz 5mg oral tablet',
    renderedAmount: '$980.00',
    allowedAmount: '$980.00',
    deductible: '$0.00',
    copay: '$20.00',
    paidAmount: '$960.00',
    cob: '$0.00',
    daysSupply: 30,
    quantity: 60,
    allowedQuantity: 60,
  },
  {
    id: 'CLM-2025-002740',
    serviceDate: 'Sep 8, 2025',
    claimStatus: 'Paid',
    din: '02182963',
    medicationName: 'Methotrexate 2.5mg oral tablet',
    renderedAmount: '$32.00',
    allowedAmount: '$32.00',
    deductible: '$0.00',
    copay: '$8.00',
    paidAmount: '$24.00',
    cob: '$0.00',
    daysSupply: 30,
    quantity: 12,
    allowedQuantity: 12,
  },
  {
    id: 'CLM-2025-002510',
    serviceDate: 'Aug 25, 2025',
    claimStatus: 'Pending',
    din: '02350092',
    medicationName: 'Actemra 162mg/0.9mL subcutaneous',
    renderedAmount: '$1,540.00',
    allowedAmount: '$1,540.00',
    deductible: '$25.00',
    copay: '$30.00',
    paidAmount: '$1,485.00',
    cob: '$10.00',
    daysSupply: 28,
    quantity: 4,
    allowedQuantity: 4,
  },
  {
    id: 'CLM-2025-002288',
    serviceDate: 'Aug 10, 2025',
    claimStatus: 'Paid',
    din: '02438917',
    medicationName: 'Otezla 30mg oral tablet',
    renderedAmount: '$1,150.00',
    allowedAmount: '$1,150.00',
    deductible: '$0.00',
    copay: '$25.00',
    paidAmount: '$1,125.00',
    cob: '$0.00',
    daysSupply: 30,
    quantity: 60,
    allowedQuantity: 60,
  },
  {
    id: 'CLM-2025-002050',
    serviceDate: 'Jul 28, 2025',
    claimStatus: 'Paid',
    din: '00585840',
    medicationName: 'Hydroxychloroquine 200mg oral tablet',
    renderedAmount: '$45.00',
    allowedAmount: '$42.50',
    deductible: '$0.00',
    copay: '$10.00',
    paidAmount: '$32.50',
    cob: '$0.00',
    daysSupply: 30,
    quantity: 60,
    allowedQuantity: 60,
  },
  {
    id: 'CLM-2025-001820',
    serviceDate: 'Jul 12, 2025',
    claimStatus: 'Denied',
    din: '02324776',
    medicationName: 'Stelara 45mg/0.5mL subcutaneous',
    renderedAmount: '$5,200.00',
    allowedAmount: '$0.00',
    deductible: '$0.00',
    copay: '$0.00',
    paidAmount: '$0.00',
    cob: '$0.00',
    daysSupply: 84,
    quantity: 1,
    allowedQuantity: 0,
  },
  {
    id: 'CLM-2025-001590',
    serviceDate: 'Jun 30, 2025',
    claimStatus: 'Paid',
    din: '02280132',
    medicationName: 'Orencia 125mg/mL subcutaneous',
    renderedAmount: '$1,320.00',
    allowedAmount: '$1,320.00',
    deductible: '$0.00',
    copay: '$30.00',
    paidAmount: '$1,290.00',
    cob: '$15.00',
    daysSupply: 28,
    quantity: 4,
    allowedQuantity: 4,
  },
];

const ROWS_PER_PAGE = 5;

const statusConfig = {
  Paid: { icon: CheckCircle2, className: 'bg-green-50 text-green-700 border-green-200' },
  Denied: { icon: XCircle, className: 'bg-red-50 text-red-700 border-red-200' },
  Pending: { icon: AlertTriangle, className: 'bg-amber-50 text-amber-700 border-amber-200' },
};

export function ClaimHistoryContent() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(claimHistory.length / ROWS_PER_PAGE);
  const startIndex = (currentPage - 1) * ROWS_PER_PAGE;
  const paginatedClaims = claimHistory.slice(startIndex, startIndex + ROWS_PER_PAGE);

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold text-slate-900 mb-2">Claim History</h2>
        <p className="text-sm text-slate-500">
          Previous treatments and prescription claim records for this member.
        </p>
      </div>

      {/* Recent Claims */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-slate-900">Recent Claims</h3>
        <div className="border border-slate-200 rounded-xl overflow-x-auto">
          <table className="w-full text-sm whitespace-nowrap">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="text-left px-4 py-3 font-medium text-slate-600">Service Date</th>
                <th className="text-left px-4 py-3 font-medium text-slate-600">Claim Status</th>
                <th className="text-left px-4 py-3 font-medium text-slate-600">DIN</th>
                <th className="text-left px-4 py-3 font-medium text-slate-600">Medication Name</th>
                <th className="text-right px-4 py-3 font-medium text-slate-600">Rendered Amt</th>
                <th className="text-right px-4 py-3 font-medium text-slate-600">Allowed Amt</th>
                <th className="text-right px-4 py-3 font-medium text-slate-600">Deductible</th>
                <th className="text-right px-4 py-3 font-medium text-slate-600">Copay</th>
                <th className="text-right px-4 py-3 font-medium text-slate-600">Paid Amt</th>
                <th className="text-right px-4 py-3 font-medium text-slate-600">COB</th>
                <th className="text-right px-4 py-3 font-medium text-slate-600">Days Supply</th>
                <th className="text-right px-4 py-3 font-medium text-slate-600">Quantity</th>
                <th className="text-right px-4 py-3 font-medium text-slate-600">Allowed Qty</th>
              </tr>
            </thead>
            <tbody>
              {paginatedClaims.map((claim) => {
                const StatusIcon = statusConfig[claim.claimStatus].icon;
                return (
                  <tr
                    key={claim.id}
                    className="border-b border-slate-100 last:border-b-0 hover:bg-slate-50 transition-colors"
                  >
                    <td className="px-4 py-3 text-slate-700">{claim.serviceDate}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full border ${statusConfig[claim.claimStatus].className}`}
                      >
                        <StatusIcon className="w-3 h-3" />
                        {claim.claimStatus}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-500 font-mono">{claim.din}</td>
                    <td className="px-4 py-3 text-slate-900">{claim.medicationName}</td>
                    <td className="px-4 py-3 text-right text-slate-700">{claim.renderedAmount}</td>
                    <td className="px-4 py-3 text-right text-slate-700">{claim.allowedAmount}</td>
                    <td className="px-4 py-3 text-right text-slate-700">{claim.deductible}</td>
                    <td className="px-4 py-3 text-right text-slate-700">{claim.copay}</td>
                    <td className="px-4 py-3 text-right text-slate-900 font-medium">
                      {claim.paidAmount}
                    </td>
                    <td className="px-4 py-3 text-right text-slate-700">{claim.cob}</td>
                    <td className="px-4 py-3 text-right text-slate-700">{claim.daysSupply}</td>
                    <td className="px-4 py-3 text-right text-slate-700">{claim.quantity}</td>
                    <td className="px-4 py-3 text-right text-slate-700">{claim.allowedQuantity}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between pt-2">
          <span className="text-xs text-slate-500">
            Showing {startIndex + 1}–{Math.min(startIndex + ROWS_PER_PAGE, claimHistory.length)} of{' '}
            {claimHistory.length} claims
          </span>
          <div className="flex items-center gap-1">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="inline-flex items-center justify-center w-8 h-8 rounded border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                type="button"
                onClick={() => setCurrentPage(page)}
                className={`inline-flex items-center justify-center w-8 h-8 rounded text-xs font-medium transition-colors ${
                  currentPage === page
                    ? 'text-white'
                    : 'border border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
                style={currentPage === page ? { backgroundColor: '#00373a' } : {}}
              >
                {page}
              </button>
            ))}
            <button
              type="button"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="inline-flex items-center justify-center w-8 h-8 rounded border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
