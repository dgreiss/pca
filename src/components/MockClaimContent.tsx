import { useState } from 'react';
import {
  Play,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Info,
  ChevronDown,
  Clock,
  Trash2,
  MessageSquare,
  ShieldCheck,
} from 'lucide-react';

interface MockClaimForm {
  serviceDate: string;
  din: string;
  provider: string;
  interventionCode: string;
  otherPayorType: string;
  otherPayerAmount: string;
}

interface InteractiveMessage {
  response: string;
  ruleDescription: string;
  message: string;
}

interface TriggeredRule {
  definitionId: string;
  code: string;
  ruleDescription: string;
  status: string;
  reduction: string;
  accumAmount: string;
  accumUnits: string;
  nextEligible: string;
}

interface AdjudicationResult {
  id: string;
  timestamp: string;
  status: 'Paid' | 'Denied' | 'Pending Review';
  reason: string;
  correspondenceType: string;
  claimPricedVia: string;
  priceDin: string;
  pricedDinDescription: string;
  interactiveMessages: InteractiveMessage[];
  triggeredRules: TriggeredRule[];
}

const defaultForm: MockClaimForm = {
  serviceDate: '2026-02-10',
  din: '',
  provider: '00000DRON',
  interventionCode: '',
  otherPayorType: '',
  otherPayerAmount: '',
};

const dinLookup: Record<string, string> = {
  '02182963': 'Methotrexate 2.5mg oral tablet',
  '00585840': 'Hydroxychloroquine 200mg oral tablet',
  '02258595': 'Humira 40mg/0.8mL subcutaneous',
  '02497514': 'Rinvoq 15mg oral tablet',
  '02444550': 'Cosentyx 150mg/mL subcutaneous',
  '02413728': 'Xeljanz 5mg oral tablet',
  '02242903': 'Enbrel 50mg/mL subcutaneous',
  '02401274': 'Eliquis 5mg oral tablet',
  '02471736': 'Ozempic 1mg/dose subcutaneous',
  '02479044': 'Dupixent 300mg/2mL subcutaneous',
  '02350092': 'Actemra 162mg/0.9mL subcutaneous',
  '02438917': 'Otezla 30mg oral tablet',
  '00235822': 'Sulfasalazine 500mg oral tablet',
  '02324776': 'Stelara 45mg/0.5mL subcutaneous',
  '02280132': 'Orencia 125mg/mL subcutaneous',
};

// Price DIN mapping — some medications price via a generic equivalent
const priceDinMap: Record<
  string,
  { priceDin: string; pricedDinDescription: string; pricedVia: string }
> = {
  '02182963': {
    priceDin: '02182963',
    pricedDinDescription: 'Methotrexate 2.5mg oral tablet',
    pricedVia: 'Formulary',
  },
  '00585840': {
    priceDin: '00585840',
    pricedDinDescription: 'Hydroxychloroquine 200mg oral tablet',
    pricedVia: 'Formulary',
  },
  '02258595': {
    priceDin: '02258595',
    pricedDinDescription: 'Humira 40mg/0.8mL subcutaneous',
    pricedVia: 'MAC Pricing',
  },
  '02497514': {
    priceDin: '02497514',
    pricedDinDescription: 'Rinvoq 15mg oral tablet',
    pricedVia: 'Formulary',
  },
  '02444550': {
    priceDin: '02444550',
    pricedDinDescription: 'Cosentyx 150mg/mL subcutaneous',
    pricedVia: 'N/A — Excluded',
  },
  '02413728': {
    priceDin: '02413728',
    pricedDinDescription: 'Xeljanz 5mg oral tablet',
    pricedVia: 'Formulary',
  },
  '02242903': {
    priceDin: '02242903',
    pricedDinDescription: 'Enbrel 50mg/mL subcutaneous',
    pricedVia: 'MAC Pricing',
  },
  '02401274': {
    priceDin: '02401274',
    pricedDinDescription: 'Eliquis 5mg oral tablet',
    pricedVia: 'Formulary',
  },
  '02471736': {
    priceDin: '02471736',
    pricedDinDescription: 'Ozempic 1mg/dose subcutaneous',
    pricedVia: 'Exception Review',
  },
  '02479044': {
    priceDin: '02479044',
    pricedDinDescription: 'Dupixent 300mg/2mL subcutaneous',
    pricedVia: 'Formulary',
  },
  '02350092': {
    priceDin: '02350092',
    pricedDinDescription: 'Actemra 162mg/0.9mL subcutaneous',
    pricedVia: 'MAC Pricing',
  },
  '02438917': {
    priceDin: '02438917',
    pricedDinDescription: 'Otezla 30mg oral tablet',
    pricedVia: 'Formulary',
  },
  '00235822': {
    priceDin: '00235822',
    pricedDinDescription: 'Sulfasalazine 500mg oral tablet',
    pricedVia: 'Formulary',
  },
  '02324776': {
    priceDin: '02324776',
    pricedDinDescription: 'Stelara 45mg/0.5mL subcutaneous',
    pricedVia: 'MAC Pricing',
  },
  '02280132': {
    priceDin: '02280132',
    pricedDinDescription: 'Orencia 125mg/mL subcutaneous',
    pricedVia: 'Formulary',
  },
};

const providerOptions = [
  { id: 'PRV-10042', name: 'Dr. Sarah Smith — Rheumatology' },
  { id: 'PRV-10088', name: 'Dr. James Lee — Internal Medicine' },
  { id: 'PRV-10155', name: 'Dr. Linda Tran — Endocrinology' },
  { id: 'PRV-10201', name: 'Dr. Mark Patel — Dermatology' },
  { id: 'PRV-10310', name: 'Maple Pharmacy — 420 King St W' },
  { id: 'PRV-10325', name: 'CareRx — 1200 Bay St' },
];

const interventionCodeOptions = [
  { value: 'MA', label: 'MA — Medication Assessment' },
  { value: 'MR', label: 'MR — Medication Review' },
  { value: 'RX', label: 'RX — Prescription Adaptation' },
  { value: 'TM', label: 'TM — Therapeutic Monitoring' },
  { value: 'PE', label: 'PE — Patient Education' },
  { value: 'DP', label: 'DP — Drug Problem Identification' },
  { value: 'RF', label: 'RF — Refusal to Fill' },
  { value: 'SC', label: 'SC — Special Compounding' },
];

const otherPayorTypeOptions = [
  { value: '', label: 'None' },
  { value: 'PRIV', label: 'Private Insurance' },
  { value: 'PROV', label: 'Provincial Plan' },
  { value: 'FED', label: 'Federal Plan' },
  { value: 'WCB', label: 'Workers Compensation' },
  { value: 'MVA', label: 'Motor Vehicle Accident' },
  { value: 'IND', label: 'Indigenous Services' },
  { value: 'VA', label: 'Veterans Affairs' },
];

// Mock adjudication logic
function adjudicateClaim(form: MockClaimForm): AdjudicationResult {
  const now = new Date();
  const id = `MC-${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}-${String(Math.floor(Math.random() * 9999)).padStart(4, '0')}`;
  const timestamp = now.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const priceInfo = priceDinMap[form.din] || {
    priceDin: form.din,
    pricedDinDescription: dinLookup[form.din] || `Unknown DIN (${form.din})`,
    pricedVia: 'Manual Review',
  };

  // Denied — Prior Auth required
  if (form.din === '02258595') {
    return {
      id,
      timestamp,
      status: 'Denied',
      reason: 'Prior Authorization Required — Step therapy criteria not met',
      correspondenceType: 'PA Request Letter',
      claimPricedVia: priceInfo.pricedVia,
      priceDin: priceInfo.priceDin,
      pricedDinDescription: priceInfo.pricedDinDescription,
      interactiveMessages: [
        {
          response: 'Deny',
          ruleDescription: 'PA Required — Biologic DMARD',
          message:
            'Prior authorization required for Humira. Submit PA request through plan administrator.',
        },
        {
          response: 'Deny',
          ruleDescription: 'Step Therapy — Conventional DMARDs first',
          message:
            'Patient must trial two conventional DMARDs (e.g. Methotrexate, Sulfasalazine) before biologic initiation.',
        },
        {
          response: 'Info',
          ruleDescription: 'Formulary Tier — Specialty Non-Preferred',
          message:
            'Humira is classified as Non-Preferred Specialty. Preferred alternatives: Enbrel, Rinvoq.',
        },
      ],
      triggeredRules: [
        {
          definitionId: 'DEF-001',
          code: 'PA-REQ',
          ruleDescription: 'Prior Authorization — Biologic DMARD',
          status: 'Denied',
          reduction: '$1,962.50',
          accumAmount: '$0.00',
          accumUnits: '0',
          nextEligible: 'Upon PA Approval',
        },
        {
          definitionId: 'DEF-002',
          code: 'STEP-TX',
          ruleDescription: 'Step Therapy — Conventional DMARDs Required',
          status: 'Denied',
          reduction: '$1,962.50',
          accumAmount: '$0.00',
          accumUnits: '0',
          nextEligible: 'Upon Step Completion',
        },
        {
          definitionId: 'DEF-003',
          code: 'TIER-NP',
          ruleDescription: 'Formulary Tier — Non-Preferred Specialty',
          status: 'Applied',
          reduction: '$0.00',
          accumAmount: '$1,962.50',
          accumUnits: '1',
          nextEligible: '2026-03-10',
        },
      ],
    };
  }

  // Denied — Not covered
  if (form.din === '02444550') {
    return {
      id,
      timestamp,
      status: 'Denied',
      reason: 'Product/Service Not Covered — Off-label indication',
      correspondenceType: 'Denial Notice',
      claimPricedVia: priceInfo.pricedVia,
      priceDin: priceInfo.priceDin,
      pricedDinDescription: priceInfo.pricedDinDescription,
      interactiveMessages: [
        {
          response: 'Deny',
          ruleDescription: 'Indication Exclusion — IL-17 Inhibitor',
          message:
            'Cosentyx is not covered for rheumatoid arthritis. IL-17 inhibitors are not approved for RA.',
        },
        {
          response: 'Info',
          ruleDescription: 'Formulary Alternative Available',
          message: 'Consider formulary-covered TNF inhibitors or JAK inhibitors for RA indication.',
        },
      ],
      triggeredRules: [
        {
          definitionId: 'DEF-004',
          code: 'IND-EXCL',
          ruleDescription: 'Indication Exclusion — IL-17 Inhibitor for RA',
          status: 'Denied',
          reduction: '$2,262.50',
          accumAmount: '$0.00',
          accumUnits: '0',
          nextEligible: 'N/A',
        },
        {
          definitionId: 'DEF-005',
          code: 'ALT-AVAIL',
          ruleDescription: 'Formulary Alternative — TNF/JAK Inhibitors',
          status: 'Advisory',
          reduction: '$0.00',
          accumAmount: '$0.00',
          accumUnits: '0',
          nextEligible: 'N/A',
        },
      ],
    };
  }

  // Pending Review
  if (form.din === '02471736') {
    return {
      id,
      timestamp,
      status: 'Pending Review',
      reason: 'Clinical Review Required — Benefit category exception needed',
      correspondenceType: 'Clinical Review Request',
      claimPricedVia: priceInfo.pricedVia,
      priceDin: priceInfo.priceDin,
      pricedDinDescription: priceInfo.pricedDinDescription,
      interactiveMessages: [
        {
          response: 'Pend',
          ruleDescription: 'Benefit Category Exception — GLP-1 Agonist',
          message:
            'GLP-1 agonist requires benefit category exception. Weight management indication excluded.',
        },
        {
          response: 'Info',
          ruleDescription: 'Documentation Required',
          message:
            'If prescribed for Type 2 Diabetes, submit clinical documentation including A1C values and prior therapy history.',
        },
        {
          response: 'Info',
          ruleDescription: 'Review Timeline',
          message:
            'Clinical review typically completed within 3–5 business days. Expedited review available upon request.',
        },
      ],
      triggeredRules: [
        {
          definitionId: 'DEF-006',
          code: 'BEN-CAT',
          ruleDescription: 'Benefit Category Exception — GLP-1 Agonist',
          status: 'Pending',
          reduction: '$337.50',
          accumAmount: '$325.00',
          accumUnits: '1',
          nextEligible: 'Pending Review',
        },
        {
          definitionId: 'DEF-007',
          code: 'DOC-REQ',
          ruleDescription: 'Clinical Documentation — A1C + Therapy History',
          status: 'Pending',
          reduction: '$0.00',
          accumAmount: '$0.00',
          accumUnits: '0',
          nextEligible: 'Upon Submission',
        },
        {
          definitionId: 'DEF-008',
          code: 'QTY-LIM',
          ruleDescription: 'Quantity Limit — 1 pen per 30 days',
          status: 'Passed',
          reduction: '$0.00',
          accumAmount: '$325.00',
          accumUnits: '1',
          nextEligible: '2026-03-12',
        },
      ],
    };
  }

  // Paid — Specialty tier with messages
  if (
    [
      '02497514',
      '02242903',
      '02479044',
      '02350092',
      '02324776',
      '02280132',
      '02413728',
      '02438917',
    ].includes(form.din)
  ) {
    return {
      id,
      timestamp,
      status: 'Paid',
      reason: 'Claim adjudicated — Formulary match confirmed',
      correspondenceType: 'EOB — Specialty',
      claimPricedVia: priceInfo.pricedVia,
      priceDin: priceInfo.priceDin,
      pricedDinDescription: priceInfo.pricedDinDescription,
      interactiveMessages: [
        {
          response: 'Approve',
          ruleDescription: 'Formulary Coverage — Specialty Tier',
          message: `${priceInfo.pricedDinDescription} is covered under specialty tier. Standard cost-sharing applies.`,
        },
        {
          response: 'Info',
          ruleDescription: 'Specialty Pharmacy Coordination',
          message:
            'Specialty medications require dispensing through a designated specialty pharmacy network.',
        },
      ],
      triggeredRules: [
        {
          definitionId: 'DEF-009',
          code: 'FORM-COV',
          ruleDescription: 'Formulary Coverage — Specialty Tier',
          status: 'Passed',
          reduction: '$0.00',
          accumAmount: `$${priceInfo.pricedVia === 'MAC Pricing' ? '1,540.00' : '1,680.00'}`,
          accumUnits: '1',
          nextEligible: '2026-03-10',
        },
        {
          definitionId: 'DEF-010',
          code: 'SP-NET',
          ruleDescription: 'Specialty Network — Designated Pharmacy Required',
          status: 'Passed',
          reduction: '$0.00',
          accumAmount: '$0.00',
          accumUnits: '0',
          nextEligible: 'N/A',
        },
        {
          definitionId: 'DEF-012',
          code: 'ACCUM-DED',
          ruleDescription: 'Annual Deductible Accumulator',
          status: 'Applied',
          reduction: '$50.00',
          accumAmount: '$250.00',
          accumUnits: '5',
          nextEligible: '2027-01-01',
        },
      ],
    };
  }

  // Paid — Standard tier
  return {
    id,
    timestamp,
    status: 'Paid',
    reason: 'Claim adjudicated — Formulary match confirmed',
    correspondenceType: 'EOB — Standard',
    claimPricedVia: priceInfo.pricedVia,
    priceDin: priceInfo.priceDin,
    pricedDinDescription: priceInfo.pricedDinDescription,
    interactiveMessages: [
      {
        response: 'Approve',
        ruleDescription: 'Formulary Coverage — Standard Tier',
        message: `${priceInfo.pricedDinDescription} is covered under standard formulary. No restrictions apply.`,
      },
    ],
    triggeredRules: [
      {
        definitionId: 'DEF-011',
        code: 'FORM-COV',
        ruleDescription: 'Formulary Coverage — Standard Tier',
        status: 'Passed',
        reduction: '$0.00',
        accumAmount: `$${priceInfo.pricedVia === 'Formulary' ? '45.00' : '120.00'}`,
        accumUnits: '1',
        nextEligible: '2026-03-10',
      },
      {
        definitionId: 'DEF-013',
        code: 'ACCUM-OOP',
        ruleDescription: 'Out-of-Pocket Maximum Accumulator',
        status: 'Applied',
        reduction: '$0.00',
        accumAmount: '$10.00',
        accumUnits: '1',
        nextEligible: '2027-01-01',
      },
    ],
  };
}

const statusConfig = {
  Paid: {
    icon: CheckCircle2,
    color: 'text-green-700',
    bg: 'bg-green-50',
    border: 'border-green-200',
  },
  Denied: { icon: XCircle, color: 'text-red-700', bg: 'bg-red-50', border: 'border-red-200' },
  'Pending Review': {
    icon: Clock,
    color: 'text-amber-700',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
  },
};

const responseColors: Record<string, string> = {
  Approve: 'bg-green-50 text-green-700 border-green-200',
  Deny: 'bg-red-50 text-red-700 border-red-200',
  Pend: 'bg-amber-50 text-amber-700 border-amber-200',
  Info: 'bg-blue-50 text-blue-700 border-blue-200',
};

const ruleStatusColors: Record<string, string> = {
  Passed: 'bg-green-50 text-green-700 border-green-200',
  Applied: 'bg-cyan-50 text-cyan-700 border-cyan-200',
  Denied: 'bg-red-50 text-red-700 border-red-200',
  Pending: 'bg-amber-50 text-amber-700 border-amber-200',
  Advisory: 'bg-blue-50 text-blue-700 border-blue-200',
};

export function MockClaimContent() {
  const [form, setForm] = useState<MockClaimForm>({ ...defaultForm });
  const [results, setResults] = useState<AdjudicationResult[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [expandedResult, setExpandedResult] = useState<string | null>(null);

  const updateField = (field: keyof MockClaimForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (!form.din || !form.provider || !form.interventionCode) return;
    setIsProcessing(true);
    setTimeout(() => {
      const result = adjudicateClaim(form);
      setResults((prev) => [result, ...prev]);
      setExpandedResult(result.id);
      setIsProcessing(false);
    }, 800);
  };

  const handleReset = () => {
    setForm({ ...defaultForm });
  };

  const handleClearHistory = () => {
    setResults([]);
    setExpandedResult(null);
  };

  const isFormValid = form.din && form.provider && form.interventionCode;

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold text-slate-900 mb-2">Mock Claim</h2>
        <p className="text-sm text-slate-500">
          Simulate claim adjudication to test formulary coverage, copay calculations, and rejection
          scenarios.
        </p>
      </div>

      {/* Claim Form */}
      <div className="border border-slate-200 rounded-xl overflow-hidden">
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold text-slate-900">Claim Submission</h3>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Row 1: Service Date, DIN, Provider */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-xs text-slate-500 mb-1.5">Service Date</label>
              <input
                type="date"
                value={form.serviceDate}
                onChange={(e) => updateField('serviceDate', e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-500 mb-1.5">DIN</label>
              <input
                type="text"
                value={form.din}
                onChange={(e) => updateField('din', e.target.value)}
                placeholder="e.g. 02182963"
                maxLength={8}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-sm text-slate-900 font-mono placeholder:text-slate-400 placeholder:font-sans focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500"
              />
              {form.din && dinLookup[form.din] && (
                <p className="text-[11px] text-slate-400 mt-1 truncate">{dinLookup[form.din]}</p>
              )}
            </div>
            <div>
              <label className="block text-xs text-slate-500 mb-1.5">Provider</label>
              <div className="relative">
                <select
                  value={form.provider}
                  onChange={(e) => updateField('provider', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-sm text-slate-900 appearance-none focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500"
                >
                  <option value="00000DRON">00000DRON</option>
                  <option value="00000DRQC">00000DRQC</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Row 2: Intervention Code, Other Payor Type, Other Payer Amount */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-xs text-slate-500 mb-1.5">Intervention Code</label>
              <div className="relative">
                <select
                  value={form.interventionCode}
                  onChange={(e) => updateField('interventionCode', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-sm text-slate-900 appearance-none focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500"
                >
                  <option value="">Select code...</option>
                  {interventionCodeOptions.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>
            </div>
            <div>
              <label className="block text-xs text-slate-500 mb-1.5">Other Payor Type</label>
              <div className="relative">
                <select
                  value={form.otherPayorType}
                  onChange={(e) => updateField('otherPayorType', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-sm text-slate-900 appearance-none focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500"
                >
                  {otherPayorTypeOptions.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>
            </div>
            <div>
              <label className="block text-xs text-slate-500 mb-1.5">Other Payer Amount</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                  $
                </span>
                <input
                  type="number"
                  value={form.otherPayerAmount}
                  onChange={(e) => updateField('otherPayerAmount', e.target.value)}
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  className="w-full pl-7 pr-3 py-2 rounded-lg border border-slate-200 bg-white text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500"
                />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!isFormValid || isProcessing}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90"
              style={{ backgroundColor: '#00373a' }}
            >
              {isProcessing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  Submit Mock Claim
                </>
              )}
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-slate-600 border border-slate-200 hover:bg-slate-50 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* Results */}
      {results.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-900">Adjudication Results</h3>
          </div>

          <div className="space-y-3">
            {results.map((result) => {
              const config = statusConfig[result.status];
              const StatusIcon = config.icon;
              const isExpanded = expandedResult === result.id;

              return (
                <div
                  key={result.id}
                  className={`border rounded-xl overflow-hidden transition-shadow ${
                    result.status === 'Paid'
                      ? 'border-green-200'
                      : result.status === 'Denied'
                        ? 'border-red-200'
                        : 'border-amber-200'
                  }`}
                >
                  {/* Result Header */}
                  <button
                    type="button"
                    onClick={() => setExpandedResult(isExpanded ? null : result.id)}
                    className="w-full flex items-center justify-between px-5 py-3.5 bg-white hover:bg-slate-50 transition-colors text-left"
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full border ${config.color} ${config.bg} ${config.border}`}
                      >
                        <StatusIcon className="w-3.5 h-3.5" />
                        {result.status}
                      </span>
                      <span className="text-sm text-slate-700 truncate">
                        {result.pricedDinDescription}
                      </span>
                      <span className="text-xs text-slate-400 font-mono shrink-0">{result.id}</span>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="text-xs text-slate-400">{result.timestamp}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-slate-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                      />
                    </div>
                  </button>

                  {/* Expanded Details */}
                  {isExpanded && (
                    <div className="border-t border-slate-100 bg-[rgba(248,250,252,0)] px-5 py-5 space-y-5">
                      {/* Result Details Grid */}
                      <div>
                        <h4 className="text-xs text-slate-500 font-medium mb-3">Claim Details</h4>
                        <div className="grid grid-cols-3 gap-3">
                          <div className="px-3 py-2.5 rounded-lg border bg-slate-50 border-slate-100 col-span-2">
                            <span className="text-[11px] text-slate-400">Reason</span>
                            <p className="text-sm text-slate-700 mt-0.5">{result.reason}</p>
                          </div>
                          <div className="px-3 py-2.5 rounded-lg border bg-slate-50 border-slate-100">
                            <span className="text-[11px] text-slate-400">Correspondence Type</span>
                            <p className="text-sm text-slate-700 mt-0.5">
                              {result.correspondenceType}
                            </p>
                          </div>
                          <div className="px-3 py-2.5 rounded-lg border bg-slate-50 border-slate-100">
                            <span className="text-[11px] text-slate-400">Claim Priced Via</span>
                            <p className="text-sm text-slate-700 mt-0.5">{result.claimPricedVia}</p>
                          </div>
                          <div className="px-3 py-2.5 rounded-lg border bg-slate-50 border-slate-100">
                            <span className="text-[11px] text-slate-400">Price DIN</span>
                            <p className="text-sm text-slate-700 font-mono mt-0.5">
                              {result.priceDin}
                            </p>
                          </div>
                        </div>
                        <div className="mt-3 px-3 py-2.5 rounded-lg border bg-slate-50 border-slate-100">
                          <span className="text-[11px] text-slate-400">Priced DIN Description</span>
                          <p className="text-sm text-slate-700 mt-0.5">
                            {result.pricedDinDescription}
                          </p>
                        </div>
                      </div>

                      {/* Interactive Messages */}
                      {result.interactiveMessages.length > 0 && (
                        <div>
                          <div className="flex items-center gap-2 mb-3">
                            <MessageSquare className="w-3.5 h-3.5 text-slate-400" />
                            <h4 className="text-xs text-slate-500 font-medium">
                              Interactive Messages
                            </h4>
                          </div>
                          <div className="border border-slate-200 rounded-lg overflow-hidden">
                            <table className="w-full text-left">
                              <thead>
                                <tr className="bg-slate-100 border-b border-slate-200">
                                  <th className="px-3 py-2 text-[11px] text-slate-500 font-medium w-[100px]">
                                    Response
                                  </th>
                                  <th className="px-3 py-2 text-[11px] text-slate-500 font-medium w-[35%]">
                                    Rule Description
                                  </th>
                                  <th className="px-3 py-2 text-[11px] text-slate-500 font-medium">
                                    Message
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {result.interactiveMessages.map((im, idx) => (
                                  <tr
                                    key={idx}
                                    className={`${idx < result.interactiveMessages.length - 1 ? 'border-b border-slate-100' : ''} bg-white`}
                                  >
                                    <td className="px-3 py-2.5 align-top">
                                      <span
                                        className={`inline-flex px-2 py-0.5 rounded text-[11px] font-medium border ${responseColors[im.response] || 'bg-slate-50 text-slate-700 border-slate-200'}`}
                                      >
                                        {im.response}
                                      </span>
                                    </td>
                                    <td className="px-3 py-2.5 text-xs text-slate-700 align-top">
                                      {im.ruleDescription}
                                    </td>
                                    <td className="px-3 py-2.5 text-xs text-slate-600 align-top">
                                      {im.message}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}

                      {/* Triggered Rules */}
                      {result.triggeredRules.length > 0 && (
                        <div>
                          <div className="flex items-center gap-2 mb-3">
                            <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
                            <h4 className="text-xs text-slate-500 font-medium">Triggered Rules</h4>
                          </div>
                          <div className="border border-slate-200 rounded-lg overflow-x-auto">
                            <table className="w-full text-left min-w-[800px]">
                              <thead>
                                <tr className="bg-slate-100 border-b border-slate-200">
                                  <th className="px-3 py-2 text-[11px] text-slate-500 font-medium whitespace-nowrap">
                                    Definition ID
                                  </th>
                                  <th className="px-3 py-2 text-[11px] text-slate-500 font-medium whitespace-nowrap">
                                    Code
                                  </th>
                                  <th className="px-3 py-2 text-[11px] text-slate-500 font-medium">
                                    Rule Description
                                  </th>
                                  <th className="px-3 py-2 text-[11px] text-slate-500 font-medium whitespace-nowrap">
                                    Status
                                  </th>
                                  <th className="px-3 py-2 text-[11px] text-slate-500 font-medium whitespace-nowrap text-right">
                                    Reduction
                                  </th>
                                  <th className="px-3 py-2 text-[11px] text-slate-500 font-medium whitespace-nowrap text-right">
                                    Accum Amount
                                  </th>
                                  <th className="px-3 py-2 text-[11px] text-slate-500 font-medium whitespace-nowrap text-right">
                                    Accum Units
                                  </th>
                                  <th className="px-3 py-2 text-[11px] text-slate-500 font-medium whitespace-nowrap">
                                    Next Eligible
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {result.triggeredRules.map((tr, idx) => (
                                  <tr
                                    key={idx}
                                    className={`${idx < result.triggeredRules.length - 1 ? 'border-b border-slate-100' : ''} bg-white`}
                                  >
                                    <td className="px-3 py-2.5 text-xs text-slate-500 font-mono align-top whitespace-nowrap">
                                      {tr.definitionId}
                                    </td>
                                    <td className="px-3 py-2.5 text-xs text-slate-700 font-mono align-top whitespace-nowrap">
                                      {tr.code}
                                    </td>
                                    <td className="px-3 py-2.5 text-xs text-slate-700 align-top">
                                      {tr.ruleDescription}
                                    </td>
                                    <td className="px-3 py-2.5 align-top whitespace-nowrap">
                                      <span
                                        className={`inline-flex px-2 py-0.5 rounded text-[11px] font-medium border ${ruleStatusColors[tr.status] || 'bg-slate-50 text-slate-700 border-slate-200'}`}
                                      >
                                        {tr.status}
                                      </span>
                                    </td>
                                    <td className="px-3 py-2.5 text-xs text-slate-600 font-mono align-top text-right whitespace-nowrap">
                                      {tr.reduction}
                                    </td>
                                    <td className="px-3 py-2.5 text-xs text-slate-600 font-mono align-top text-right whitespace-nowrap">
                                      {tr.accumAmount}
                                    </td>
                                    <td className="px-3 py-2.5 text-xs text-slate-600 font-mono align-top text-right whitespace-nowrap">
                                      {tr.accumUnits}
                                    </td>
                                    <td className="px-3 py-2.5 text-xs text-slate-600 align-top whitespace-nowrap">
                                      {tr.nextEligible}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Empty State */}
      {results.length === 0 && (
        <div className="text-center py-12 border border-dashed border-slate-200 rounded-xl">
          <Play className="w-8 h-8 text-slate-300 mx-auto mb-3" />
          <p className="text-sm text-slate-400">No mock claims submitted yet.</p>
          <p className="text-xs text-slate-300 mt-1">
            Fill in the form above and submit to simulate claim adjudication.
          </p>
        </div>
      )}
    </div>
  );
}
