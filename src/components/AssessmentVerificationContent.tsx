import { useState } from 'react';
import { ArrowRight } from 'lucide-react';

export function AssessmentVerificationContent() {
  const [checklist, setChecklist] = useState<Record<string, boolean>>({
    requestedMedReviewed: false,
    diagnosisConfirmed: false,
    prescriberSignature: false,
    patientSignature: false,
    receiptsAttached: false,
    correspondenceType: false,
    planTerminated: false,
    mockClaimSummary: false,
    ppn: false,
    rfuMc: false,
    assessmentStatus: false,
    effectiveExpiryDate: false,
    clinicalCriteria: false,
  });

  const assessmentItems = [
    {
      key: 'requestedMedReviewed',
      label: 'Requested Medication',
      value: 'Humira (adalimumab)',
      showValue: true,
    },
    {
      key: 'diagnosisConfirmed',
      label: 'Disease Diagnosis',
      value: null,
      showValue: true,
    },
    {
      key: 'prescriberSignature',
      label: 'Prescriber Signature',
      value: null,
      showValue: false,
    },
    {
      key: 'patientSignature',
      label: 'Patient Signature',
      value: null,
      showValue: false,
    },
    {
      key: 'receiptsAttached',
      label: 'Receipts Attached',
      value: null,
      showValue: false,
    },
  ] as {
    key: string;
    label: string;
    value: string | null;
    showValue: boolean;
  }[];

  const coverageItems = [
    { key: 'correspondenceType', label: 'Correspondence type', response: 'Approved' },
    { key: 'planTerminated', label: 'Plan terminated', response: 'No' },
    {
      key: 'mockClaimSummary',
      label: 'Mock claim summary',
      response: 'Failed on:\nBEL 0400: Not a benefit\nBEL 02800: Prior Authorization Required',
    },
    { key: 'ppn', label: 'PPN', response: 'Yes' },
  ] as { key: string; label: string; response: string }[];

  const decisionItems = [
    { key: 'rfuMc', label: 'RFU/MC' },
    { key: 'assessmentStatus', label: 'Assessment Status' },
    { key: 'effectiveExpiryDate', label: 'Effective and Expiry Date' },
    { key: 'clinicalCriteria', label: 'Clinical Criteria' },
  ] as { key: string; label: string }[];

  const assessmentAllChecked = assessmentItems.every((item) => checklist[item.key]);
  const coverageAllChecked = coverageItems.every((item) => checklist[item.key]);
  const decisionAllChecked = decisionItems.every((item) => checklist[item.key]);

  return (
    <div className="px-3 pb-3 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-700">
          Assessment Verification
        </h3>
      </div>
      <div className="overflow-hidden">
        <table className="w-full text-xs table-fixed">
          <colgroup>
            <col style={{ width: '240px' }} />
            <col style={{ width: '360px' }} />
            <col />
          </colgroup>
          <thead>
            <tr className="bg-slate-50/60">
              <th className="py-1.5 px-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Criteria
              </th>
              <th className="py-1.5 px-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Response
              </th>
              <th className="py-1.5 px-3 text-center text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-slate-100/70">
              <td colSpan={3} className="px-3 py-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-slate-800">
                      Plan Member Information
                    </span>
                    <span
                      className={`text-xs font-semibold uppercase tracking-wide px-1.5 py-0.5 rounded ${
                        assessmentAllChecked ? 'ui-badge-success' : 'ui-badge-info'
                      }`}
                    >
                      {assessmentAllChecked ? 'Verified' : 'Pending'}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setChecklist((prev) => {
                        const allChecked = assessmentItems.every((item) => prev[item.key]);
                        const next = { ...prev };
                        assessmentItems.forEach((item) => {
                          next[item.key] = !allChecked;
                        });
                        return next;
                      });
                    }}
                    className="px-2.5 py-1 text-xs font-medium rounded transition-colors hover:bg-slate-50"
                    style={{ color: '#00373a', backgroundColor: '#e6f2f2' }}
                  >
                    Verify
                  </button>
                </div>
              </td>
            </tr>
            {assessmentItems.map((item) => (
              <tr
                key={item.key}
                className="hover:bg-slate-50 transition-colors group cursor-pointer"
                onClick={() =>
                  setChecklist((prev) => ({
                    ...prev,
                    [item.key]: !prev[item.key],
                  }))
                }
              >
                <td className="py-2 px-3">
                  <span
                    className={`transition-colors ${checklist[item.key] ? 'text-slate-500' : 'text-slate-700'}`}
                  >
                    {item.label}
                  </span>
                </td>
                <td className="py-2 px-3 text-left">
                  {item.showValue && item.value ? (
                    <span className="text-xs text-slate-500 px-1.5 py-0.5 rounded truncate max-w-[250px] inline-block">
                      {item.value}
                    </span>
                  ) : item.showValue && !item.value ? (
                    <span className="text-xs ui-text-warning px-1.5 py-0.5 rounded italic">
                      Not provided
                    </span>
                  ) : (
                    <span className="text-xs text-slate-400">-</span>
                  )}
                </td>
                <td className="py-2 px-3">
                  <div className="flex items-center justify-center">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                      className="inline-flex items-center gap-1 text-xs font-medium text-slate-600 hover:text-slate-900 transition-colors"
                    >
                      Update
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            <tr className="bg-slate-100/70">
              <td colSpan={3} className="px-3 py-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-slate-800">Mock Claim Details</span>
                    <span
                      className={`text-xs font-semibold uppercase tracking-wide px-1.5 py-0.5 rounded ${
                        coverageAllChecked ? 'ui-badge-success' : 'ui-badge-info'
                      }`}
                    >
                      {coverageAllChecked ? 'Acknowledged' : 'Pending'}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setChecklist((prev) => {
                        const allChecked = coverageItems.every((item) => prev[item.key]);
                        const next = { ...prev };
                        coverageItems.forEach((item) => {
                          next[item.key] = !allChecked;
                        });
                        return next;
                      });
                    }}
                    className="px-2.5 py-1 text-xs font-medium rounded transition-colors hover:bg-slate-50"
                    style={{ color: '#00373a', backgroundColor: '#e6f2f2' }}
                  >
                    Acknowledge
                  </button>
                </div>
              </td>
            </tr>
            {coverageItems.map((item) => (
              <tr
                key={item.key}
                className="hover:bg-slate-50 transition-colors group cursor-pointer"
                onClick={() =>
                  setChecklist((prev) => ({
                    ...prev,
                    [item.key]: !prev[item.key],
                  }))
                }
              >
                <td className="py-2 px-3">
                  <span
                    className={`transition-colors ${checklist[item.key] ? 'text-slate-500' : 'text-slate-700'}`}
                  >
                    {item.label}
                  </span>
                </td>
                <td className="py-2 px-3 text-left">
                  {item.key === 'mockClaimSummary' ? (
                    <span className="inline-flex flex-col items-start text-xs px-2 py-1 text-slate-500">
                      <span className="font-medium">Failed on</span>
                      <span>BEL 0400: Not a benefit</span>
                      <span>BEL 02800: Prior Authorization Required</span>
                    </span>
                  ) : (
                    <span className="text-xs text-slate-700 px-1.5 py-0.5 rounded">
                      {item.response}
                    </span>
                  )}
                </td>
              </tr>
            ))}

            <tr className="bg-slate-100/70">
              <td colSpan={3} className="px-3 py-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-slate-800">Decision Summary</span>
                    <span
                      className={`text-xs font-semibold uppercase tracking-wide px-1.5 py-0.5 rounded ${
                        decisionAllChecked ? 'ui-badge-success' : 'ui-badge-info'
                      }`}
                    >
                      {decisionAllChecked ? 'Verified' : 'Pending'}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setChecklist((prev) => {
                        const allChecked = decisionItems.every((item) => prev[item.key]);
                        const next = { ...prev };
                        decisionItems.forEach((item) => {
                          next[item.key] = !allChecked;
                        });
                        return next;
                      });
                    }}
                    className="px-2.5 py-1 text-xs font-medium rounded transition-colors hover:bg-slate-50"
                    style={{ color: '#00373a', backgroundColor: '#e6f2f2' }}
                  >
                    Verify
                  </button>
                </div>
              </td>
            </tr>
            {decisionItems.map((item) => (
              <tr key={item.key} className="hover:bg-slate-50 transition-colors">
                <td className="py-2 px-3">
                  <span
                    className={`transition-colors ${checklist[item.key] ? 'text-slate-500' : 'text-slate-700'}`}
                  >
                    {item.label}
                  </span>
                </td>
                <td className="py-2 px-3 text-left">
                  <span className="text-xs text-slate-400">-</span>
                </td>
                <td className="py-2 px-3">
                  <div className="flex items-center justify-center">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                      className="inline-flex items-center gap-1 text-xs font-medium text-slate-600 hover:text-slate-900 transition-colors"
                    >
                      Update
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
