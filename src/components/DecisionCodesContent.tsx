import { useState } from 'react';
import { Search, Plus, Filter, ChevronDown, Tag, Check, X, AlertTriangle, Calendar, RotateCcw } from 'lucide-react';

interface DecisionCode {
  id: string;
  rowStatus: 'C' | 'H';
  conditionCode: string;
  code: string;
  codeType: 'RFU' | 'MC' | 'Provincial' | 'Other';
  diagnosisEffectiveDate: string;
  diagnosisExpiry: string;
  statusCode: string;
  description: string;
  expiryDate: string;
  decisionEffectiveDate: string;
  decisionExpiryDate: string;
  status: 'applied' | 'pending' | 'rejected';
  category: string;
}

const initialDecisionCodes: DecisionCode[] = [
  { id: '1', rowStatus: 'C', conditionCode: 'E11.65', code: 'DC-001', codeType: 'RFU', diagnosisEffectiveDate: '01/15/2025', diagnosisExpiry: '01/15/2027', statusCode: 'A', description: 'Prior Authorization Required', expiryDate: '02/10/2027', decisionEffectiveDate: '01/15/2025', decisionExpiryDate: '01/15/2027', status: 'applied', category: 'Authorization' },
  { id: '2', rowStatus: 'C', conditionCode: 'E11.65', code: 'DC-002', codeType: 'MC', diagnosisEffectiveDate: '01/15/2025', diagnosisExpiry: '01/15/2027', statusCode: 'A', description: 'Step Therapy Protocol Met', expiryDate: '02/08/2027', decisionEffectiveDate: '01/20/2025', decisionExpiryDate: '01/20/2027', status: 'applied', category: 'Authorization' },
  { id: '3', rowStatus: 'C', conditionCode: 'Z79.01', code: 'DC-010', codeType: 'Provincial', diagnosisEffectiveDate: '03/01/2025', diagnosisExpiry: '03/01/2027', statusCode: 'P', description: 'Drug-Drug Interaction Override', expiryDate: '—', decisionEffectiveDate: '03/01/2025', decisionExpiryDate: '—', status: 'pending', category: 'Clinical Review' },
  { id: '4', rowStatus: 'H', conditionCode: 'Z79.01', code: 'DC-015', codeType: 'RFU', diagnosisEffectiveDate: '03/01/2025', diagnosisExpiry: '03/01/2027', statusCode: 'R', description: 'Therapeutic Duplication Identified', expiryDate: '02/05/2026', decisionEffectiveDate: '03/05/2025', decisionExpiryDate: '03/05/2026', status: 'rejected', category: 'Clinical Review' },
  { id: '5', rowStatus: 'C', conditionCode: 'J45.30', code: 'DC-020', codeType: 'MC', diagnosisEffectiveDate: '06/12/2025', diagnosisExpiry: '06/12/2027', statusCode: 'A', description: 'Quantity Limit Exception Approved', expiryDate: '02/09/2027', decisionEffectiveDate: '06/15/2025', decisionExpiryDate: '06/15/2027', status: 'applied', category: 'Quantity/Supply' },
  { id: '6', rowStatus: 'C', conditionCode: 'J45.30', code: 'DC-021', codeType: 'Provincial', diagnosisEffectiveDate: '06/12/2025', diagnosisExpiry: '06/12/2027', statusCode: 'P', description: 'Days Supply Override', expiryDate: '—', decisionEffectiveDate: '06/20/2025', decisionExpiryDate: '—', status: 'pending', category: 'Quantity/Supply' },
  { id: '7', rowStatus: 'H', conditionCode: 'M79.3', code: 'DC-030', codeType: 'RFU', diagnosisEffectiveDate: '09/20/2025', diagnosisExpiry: '09/20/2027', statusCode: 'R', description: 'Non-Formulary Exception', expiryDate: '02/03/2026', decisionEffectiveDate: '09/22/2025', decisionExpiryDate: '09/22/2026', status: 'rejected', category: 'Formulary' },
  { id: '8', rowStatus: 'C', conditionCode: 'M79.3', code: 'DC-031', codeType: 'MC', diagnosisEffectiveDate: '09/20/2025', diagnosisExpiry: '09/20/2027', statusCode: 'A', description: 'Brand Medically Necessary', expiryDate: '02/11/2027', decisionEffectiveDate: '09/25/2025', decisionExpiryDate: '09/25/2027', status: 'applied', category: 'Formulary' },
  { id: '9', rowStatus: 'H', conditionCode: 'I10', code: 'DC-040', codeType: 'Provincial', diagnosisEffectiveDate: '11/05/2025', diagnosisExpiry: '11/05/2027', statusCode: 'A', description: 'Age Restriction Override', expiryDate: '02/07/2027', decisionEffectiveDate: '11/08/2025', decisionExpiryDate: '11/08/2027', status: 'applied', category: 'Demographics' },
  { id: '10', rowStatus: 'C', conditionCode: 'F32.1', code: 'DC-050', codeType: 'RFU', diagnosisEffectiveDate: '12/01/2025', diagnosisExpiry: '12/01/2027', statusCode: 'P', description: 'Cost Share Tier Exception', expiryDate: '—', decisionEffectiveDate: '12/05/2025', decisionExpiryDate: '—', status: 'pending', category: 'Financial' },
];

const categories = ['All', 'Authorization', 'Clinical Review', 'Quantity/Supply', 'Formulary', 'Demographics', 'Financial'];

interface InlineForm {
  rfuCode: string;
  mcCode: string;
  provincialCode: string;
  decisionEffectiveDate: string;
  decisionExpiryDate: string;
}

const emptyForm: InlineForm = {
  rfuCode: '',
  mcCode: '',
  provincialCode: '',
  decisionEffectiveDate: '',
  decisionExpiryDate: '',
};

export function DecisionCodesContent() {
  const [decisionCodes, setDecisionCodes] = useState<DecisionCode[]>(initialDecisionCodes);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [form, setForm] = useState<InlineForm>({ ...emptyForm });
  const [formErrors, setFormErrors] = useState<Partial<Record<string, string>>>({});
  const [successMessage, setSuccessMessage] = useState('');

  const filteredCodes = decisionCodes.filter(code => {
    const matchesSearch = searchQuery === '' ||
      code.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      code.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || code.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const statusConfig = {
    applied: { label: 'Applied', color: 'bg-emerald-100 text-emerald-700', icon: Check, dotColor: 'text-emerald-500' },
    pending: { label: 'Pending', color: 'bg-amber-100 text-amber-700', icon: AlertTriangle, dotColor: 'text-amber-500' },
    rejected: { label: 'Rejected', color: 'bg-red-100 text-red-700', icon: X, dotColor: 'text-red-500' },
  };

  const codeTypeBadge: Record<string, string> = {
    RFU: 'bg-blue-100 text-blue-700',
    MC: 'bg-purple-100 text-purple-700',
    Provincial: 'bg-teal-100 text-teal-700',
    Other: 'bg-slate-100 text-slate-600',
  };

  const formatDateForDisplay = (dateStr: string) => {
    if (!dateStr) return '—';
    const d = new Date(dateStr);
    return `${String(d.getMonth() + 1).padStart(2, '0')}/${String(d.getDate()).padStart(2, '0')}/${d.getFullYear()}`;
  };

  const hasAnyInput = form.rfuCode || form.mcCode || form.provincialCode || form.decisionEffectiveDate || form.decisionExpiryDate;

  const handleReset = () => {
    setForm({ ...emptyForm });
    setFormErrors({});
    setSuccessMessage('');
  };

  const handleAddCode = (codeType: 'RFU' | 'MC' | 'Provincial') => {
    const errors: Partial<Record<string, string>> = {};
    const fieldKey = codeType === 'RFU' ? 'rfuCode' : codeType === 'MC' ? 'mcCode' : 'provincialCode';
    const codeValue = form[fieldKey];

    if (!codeValue.trim()) {
      errors[fieldKey] = 'Code is required';
    }
    if (!form.decisionEffectiveDate) {
      errors.decisionEffectiveDate = 'Required';
    }
    if (!form.decisionExpiryDate) {
      errors.decisionExpiryDate = 'Required';
    }
    if (form.decisionEffectiveDate && form.decisionExpiryDate && form.decisionEffectiveDate > form.decisionExpiryDate) {
      errors.decisionExpiryDate = 'Must be after effective date';
    }

    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;

    const nextId = String(Date.now());
    const prefix = codeType === 'RFU' ? 'RFU' : codeType === 'MC' ? 'MC' : 'PROV';
    const codeLabel = `${prefix}-${codeValue.trim()}`;

    const newCode: DecisionCode = {
      id: nextId,
      rowStatus: 'C',
      conditionCode: '—',
      code: codeLabel,
      codeType: codeType,
      diagnosisEffectiveDate: formatDateForDisplay(form.decisionEffectiveDate),
      diagnosisExpiry: formatDateForDisplay(form.decisionExpiryDate),
      statusCode: 'P',
      description: `${codeType} Code — ${codeValue.trim()}`,
      expiryDate: formatDateForDisplay(form.decisionExpiryDate),
      decisionEffectiveDate: formatDateForDisplay(form.decisionEffectiveDate),
      decisionExpiryDate: formatDateForDisplay(form.decisionExpiryDate),
      status: 'pending',
      category: 'Authorization',
    };

    setDecisionCodes(prev => [newCode, ...prev]);
    // Clear only the submitted code field
    setForm(prev => ({ ...prev, [fieldKey]: '' }));
    setFormErrors({});
    setSuccessMessage(`${codeType} Code "${codeValue.trim()}" added successfully`);
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleAddAll = () => {
    const errors: Partial<Record<string, string>> = {};

    // Check that at least one code field is filled
    const hasRfu = form.rfuCode.trim() !== '';
    const hasMc = form.mcCode.trim() !== '';
    const hasProv = form.provincialCode.trim() !== '';

    if (!hasRfu && !hasMc && !hasProv) {
      errors.rfuCode = 'At least one code is required';
    }
    if (!form.decisionEffectiveDate) {
      errors.decisionEffectiveDate = 'Required';
    }
    if (!form.decisionExpiryDate) {
      errors.decisionExpiryDate = 'Required';
    }
    if (form.decisionEffectiveDate && form.decisionExpiryDate && form.decisionEffectiveDate > form.decisionExpiryDate) {
      errors.decisionExpiryDate = 'Must be after effective date';
    }

    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;

    const newCodes: DecisionCode[] = [];
    const addedLabels: string[] = [];

    const codesToAdd: { type: 'RFU' | 'MC' | 'Provincial'; prefix: string; value: string }[] = [];
    if (hasRfu) codesToAdd.push({ type: 'RFU', prefix: 'RFU', value: form.rfuCode.trim() });
    if (hasMc) codesToAdd.push({ type: 'MC', prefix: 'MC', value: form.mcCode.trim() });
    if (hasProv) codesToAdd.push({ type: 'Provincial', prefix: 'PROV', value: form.provincialCode.trim() });

    codesToAdd.forEach((entry, idx) => {
      const codeLabel = `${entry.prefix}-${entry.value}`;
      addedLabels.push(`${entry.type}: ${entry.value}`);
      newCodes.push({
        id: String(Date.now() + idx),
        rowStatus: 'C',
        conditionCode: '—',
        code: codeLabel,
        codeType: entry.type,
        diagnosisEffectiveDate: formatDateForDisplay(form.decisionEffectiveDate),
        diagnosisExpiry: formatDateForDisplay(form.decisionExpiryDate),
        statusCode: 'P',
        description: `${entry.type} Code — ${entry.value}`,
        expiryDate: formatDateForDisplay(form.decisionExpiryDate),
        decisionEffectiveDate: formatDateForDisplay(form.decisionEffectiveDate),
        decisionExpiryDate: formatDateForDisplay(form.decisionExpiryDate),
        status: 'pending',
        category: 'Authorization',
      });
    });

    setDecisionCodes(prev => [...newCodes, ...prev]);
    setForm({ ...emptyForm });
    setFormErrors({});
    setSuccessMessage(`Added ${addedLabels.join(', ')} successfully`);
    setTimeout(() => setSuccessMessage(''), 4000);
  };

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold text-slate-900 mb-2">Decision Codes</h2>
        <p className="text-sm text-slate-500">Review and manage clinical decision codes for this assessment</p>
      </div>

      {/* Inline Add Code Form */}
      <div className="border border-slate-200 rounded-lg bg-slate-50/50">
        <div className="flex items-center justify-between px-5 py-3 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-slate-800">Add Decision Code</span>
          </div>
          {hasAnyInput && (
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-700 transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              Reset
            </button>
          )}
        </div>

        <div className="p-5 space-y-4">
          {/* Success message */}
          {successMessage && (
            <div className="flex items-center gap-2 px-3 py-2 bg-emerald-50 border border-emerald-200 rounded-lg text-sm text-emerald-700">
              <Check className="w-4 h-4 flex-shrink-0" />
              {successMessage}
            </div>
          )}

          {/* Code input row: three code fields side by side with individual Add buttons */}
          <div className="grid grid-cols-3 gap-4">
            {/* RFU Code */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide">RFU Code</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={form.rfuCode}
                  onChange={(e) => {
                    setForm(prev => ({ ...prev, rfuCode: e.target.value }));
                    if (formErrors.rfuCode) setFormErrors(prev => { const n = { ...prev }; delete n.rfuCode; return n; });
                  }}
                  placeholder="e.g. 001"
                  className={`flex-1 min-w-0 px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#00373a]/20 focus:border-[#00373a] bg-white ${
                    formErrors.rfuCode ? 'border-red-400 bg-red-50' : 'border-slate-300'
                  }`}
                />
              </div>
              {formErrors.rfuCode && <p className="text-xs text-red-500">{formErrors.rfuCode}</p>}
            </div>

            {/* MC Code */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide">MC Code</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={form.mcCode}
                  onChange={(e) => {
                    setForm(prev => ({ ...prev, mcCode: e.target.value }));
                    if (formErrors.mcCode) setFormErrors(prev => { const n = { ...prev }; delete n.mcCode; return n; });
                  }}
                  placeholder="e.g. 100"
                  className={`flex-1 min-w-0 px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#00373a]/20 focus:border-[#00373a] bg-white ${
                    formErrors.mcCode ? 'border-red-400 bg-red-50' : 'border-slate-300'
                  }`}
                />
              </div>
              {formErrors.mcCode && <p className="text-xs text-red-500">{formErrors.mcCode}</p>}
            </div>

            {/* Provincial Code */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide">Provincial Code</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={form.provincialCode}
                  onChange={(e) => {
                    setForm(prev => ({ ...prev, provincialCode: e.target.value }));
                    if (formErrors.provincialCode) setFormErrors(prev => { const n = { ...prev }; delete n.provincialCode; return n; });
                  }}
                  placeholder="e.g. AB-200"
                  className={`flex-1 min-w-0 px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#00373a]/20 focus:border-[#00373a] bg-white ${
                    formErrors.provincialCode ? 'border-red-400 bg-red-50' : 'border-slate-300'
                  }`}
                />
              </div>
              {formErrors.provincialCode && <p className="text-xs text-red-500">{formErrors.provincialCode}</p>}
            </div>
          </div>

          {/* Date fields row */}
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide">
                Decision Effective Date
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
                <input
                  type="date"
                  value={form.decisionEffectiveDate}
                  onChange={(e) => {
                    setForm(prev => ({ ...prev, decisionEffectiveDate: e.target.value }));
                    if (formErrors.decisionEffectiveDate) setFormErrors(prev => { const n = { ...prev }; delete n.decisionEffectiveDate; return n; });
                  }}
                  className={`w-full pl-9 pr-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#00373a]/20 focus:border-[#00373a] bg-white ${
                    formErrors.decisionEffectiveDate ? 'border-red-400 bg-red-50' : 'border-slate-300'
                  }`}
                />
              </div>
              {formErrors.decisionEffectiveDate && <p className="text-xs text-red-500">{formErrors.decisionEffectiveDate}</p>}
            </div>
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide">
                Decision Expiry Date
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
                <input
                  type="date"
                  value={form.decisionExpiryDate}
                  onChange={(e) => {
                    setForm(prev => ({ ...prev, decisionExpiryDate: e.target.value }));
                    if (formErrors.decisionExpiryDate) setFormErrors(prev => { const n = { ...prev }; delete n.decisionExpiryDate; return n; });
                  }}
                  className={`w-full pl-9 pr-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#00373a]/20 focus:border-[#00373a] bg-white ${
                    formErrors.decisionExpiryDate ? 'border-red-400 bg-red-50' : 'border-slate-300'
                  }`}
                />
              </div>
              {formErrors.decisionExpiryDate && <p className="text-xs text-red-500">{formErrors.decisionExpiryDate}</p>}
            </div>
          </div>

          {/* Add button */}
          <div className="flex items-center justify-end pt-1">
            <button
              onClick={handleAddAll}
              className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white rounded-lg transition-all hover:opacity-90 active:scale-[0.98]"
              style={{ backgroundColor: '#00373a' }}
            >
              <Plus className="w-4 h-4" />
              Add
            </button>
          </div>
        </div>
      </div>

      {/* Decision Codes Table */}
      <div className="border border-slate-200 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider w-[70px]">Status</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Condition Code</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Code</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Dx Effective Date</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Dx Expiry</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider w-[80px]">Status Code</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Condition Description</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Expiry Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredCodes.map((code) => {
                const statusInfo = statusConfig[code.status];
                return (
                  <tr key={code.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center justify-center w-6 h-6 rounded text-xs font-semibold ${
                        code.rowStatus === 'C' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-600'
                      }`}>
                        {code.rowStatus}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-mono text-slate-700">{code.conditionCode}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-semibold text-slate-900">{code.code}</span>
                        <span className={`inline-flex px-1.5 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wide ${codeTypeBadge[code.codeType]}`}>
                          {code.codeType}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-slate-600">{code.diagnosisEffectiveDate}</td>
                    <td className="px-4 py-3 text-slate-600">{code.diagnosisExpiry}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center justify-center w-6 h-6 rounded text-xs font-semibold ${statusInfo.color}`}>
                        {code.statusCode}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-700">{code.description}</td>
                    <td className="px-4 py-3 text-slate-600">{code.expiryDate}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {filteredCodes.length === 0 && (
        <div className="text-center py-12 text-slate-400">
          <Tag className="w-10 h-10 mx-auto mb-3 opacity-50" />
          <p className="text-sm">No decision codes match your search criteria.</p>
        </div>
      )}
    </div>
  );
}