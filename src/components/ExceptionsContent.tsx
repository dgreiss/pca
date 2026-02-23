import { useState } from 'react';
import { ShieldCheck, Scale, Plus, Minus, Eye } from 'lucide-react';

type ExceptionCategory = 'benefit' | 'rule';

interface RuleException {
  id: string;
  addedRemoved: 'Added' | 'Removed';
  benefitCategory: string;
  ruleType: string;
  ruleDescription: string;
  effectiveDate: string;
  expiry: string;
  reason: string;
  description: string;
  appliesTo: string;
}

interface BenefitException {
  id: string;
  addedRemoved: 'Added' | 'Removed';
  benefitCategory: string;
  din: string;
  effectiveDate: string;
  expiry: string;
  reason: string;
  description: string;
  appliesTo: string;
}

const benefitExceptions: BenefitException[] = [
  {
    id: 'BEN-001',
    addedRemoved: 'Added',
    benefitCategory: 'Specialty Biologics',
    din: '02497514',
    effectiveDate: 'Jan 20, 2026',
    expiry: 'Jul 20, 2026',
    reason: 'Formulary expansion',
    description: 'JAK inhibitor added to specialty tier following clinical review',
    appliesTo: 'Group A — RA Benefit Plan',
  },
  {
    id: 'BEN-002',
    addedRemoved: 'Removed',
    benefitCategory: 'Weight Management',
    din: '02471736',
    effectiveDate: 'Feb 1, 2026',
    expiry: '—',
    reason: 'Benefit exclusion',
    description: 'GLP-1 agonist excluded from weight management benefit category',
    appliesTo: 'All Plans',
  },
  {
    id: 'BEN-003',
    addedRemoved: 'Added',
    benefitCategory: 'Dermatology — Biologics',
    din: '02479044',
    effectiveDate: 'Oct 15, 2025',
    expiry: 'Oct 15, 2026',
    reason: 'Tier exception',
    description: 'Specialty tier drug approved at preferred tier copay due to financial hardship',
    appliesTo: 'Member-specific',
  },
  {
    id: 'BEN-004',
    addedRemoved: 'Removed',
    benefitCategory: 'Rheumatology — IL-17',
    din: '02444550',
    effectiveDate: 'Dec 18, 2025',
    expiry: '—',
    reason: 'Off-label indication',
    description: 'IL-17 inhibitor removed from RA coverage — not approved for this indication',
    appliesTo: 'Group B — Specialty Plan',
  },
  {
    id: 'BEN-005',
    addedRemoved: 'Added',
    benefitCategory: 'Anticoagulants',
    din: '02401274',
    effectiveDate: 'Nov 1, 2025',
    expiry: 'May 1, 2026',
    reason: 'Formulary addition',
    description: 'DOAC added to preferred formulary following patent expiry cost reduction',
    appliesTo: 'All Plans',
  },
];

const ruleExceptions: RuleException[] = [
  {
    id: 'RULE-001',
    addedRemoved: 'Added',
    benefitCategory: 'Specialty Biologics',
    ruleType: 'Step Therapy',
    ruleDescription: 'Requires trial of 2 conventional DMARDs before biologic initiation',
    effectiveDate: 'Feb 1, 2026',
    expiry: 'Feb 1, 2027',
    reason: 'Inadequate response',
    description:
      'Step therapy override granted — documented failure of Methotrexate and Sulfasalazine',
    appliesTo: 'Group A — RA Benefit Plan',
  },
  {
    id: 'RULE-002',
    addedRemoved: 'Added',
    benefitCategory: 'Rheumatology — JAK',
    ruleType: 'Quantity Limit',
    ruleDescription: 'Max 60 tablets per 30-day supply for 5mg oral tablets',
    effectiveDate: 'Nov 28, 2025',
    expiry: 'Feb 28, 2026',
    reason: 'Clinical necessity',
    description:
      'Quantity limit override — prescriber supports higher daily dose for disease control',
    appliesTo: 'Member-specific',
  },
  {
    id: 'RULE-003',
    addedRemoved: 'Removed',
    benefitCategory: 'Anticoagulants',
    ruleType: 'Prior Authorization',
    ruleDescription: 'PA required for all DOAC prescriptions exceeding 90-day supply',
    effectiveDate: 'Nov 5, 2025',
    expiry: 'Feb 5, 2026',
    reason: 'Urgent post-surgical need',
    description: 'PA waiver granted — immediate anticoagulation required post hip replacement',
    appliesTo: 'All Plans',
  },
  {
    id: 'RULE-004',
    addedRemoved: 'Added',
    benefitCategory: 'Diabetes — GLP-1',
    ruleType: 'Step Therapy',
    ruleDescription: 'Requires trial of metformin + sulfonylurea before GLP-1 agonist',
    effectiveDate: 'Jan 15, 2026',
    expiry: 'Jan 15, 2027',
    reason: 'Formulary compliance',
    description: 'Step therapy enforced for new GLP-1 starts per updated clinical pathway',
    appliesTo: 'Group B — Specialty Plan',
  },
  {
    id: 'RULE-005',
    addedRemoved: 'Removed',
    benefitCategory: 'Dermatology — Biologics',
    ruleType: 'Prior Authorization',
    ruleDescription:
      'PA required for IL-4/IL-13 inhibitors in moderate-to-severe atopic dermatitis',
    effectiveDate: 'Oct 1, 2025',
    expiry: '—',
    reason: 'Streamlined access',
    description: 'PA requirement removed following formulary review — drug moved to preferred tier',
    appliesTo: 'All Plans',
  },
];

const categoryConfig = {
  benefit: {
    label: 'Benefit / Category Exceptions',
    description: 'Formulary coverage, tier placement, and benefit category override requests.',
    icon: ShieldCheck,
    accentColor: 'text-violet-700',
    accentBg: 'bg-violet-50',
    accentBorder: 'border-violet-200',
  },
  rule: {
    label: 'Rule Exceptions',
    description:
      'Step therapy, quantity limit, prior authorization, and other utilization management rule overrides.',
    icon: Scale,
    accentColor: 'text-teal-700',
    accentBg: 'bg-teal-50',
    accentBorder: 'border-teal-200',
  },
};

export function ExceptionsContent() {
  const [activeCategory, setActiveCategory] = useState<'all' | ExceptionCategory>('all');

  const filterTabs: { id: 'all' | ExceptionCategory; label: string; count: number }[] = [
    { id: 'all', label: 'All Exceptions', count: benefitExceptions.length + ruleExceptions.length },
    { id: 'benefit', label: 'Benefit / Category', count: benefitExceptions.length },
    { id: 'rule', label: 'Rule', count: ruleExceptions.length },
  ];

  const renderRuleTable = () => (
    <div className="border border-slate-200 rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full table-fixed text-xs">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="w-[8%] px-4 py-3 text-left text-slate-500 font-medium">
                Added /<br />
                Removed
              </th>
              <th className="w-[12%] px-4 py-3 text-left text-slate-500 font-medium">
                Benefit Category
              </th>
              <th className="w-[9%] px-4 py-3 text-left text-slate-500 font-medium">Rule Type</th>
              <th className="w-[16%] px-4 py-3 text-left text-slate-500 font-medium">
                Rule Description
              </th>
              <th className="w-[9%] px-4 py-3 text-left text-slate-500 font-medium">Effective</th>
              <th className="w-[9%] px-4 py-3 text-left text-slate-500 font-medium">Expiry</th>
              <th className="w-[10%] px-4 py-3 text-left text-slate-500 font-medium">Reason</th>
              <th className="w-[15%] px-4 py-3 text-left text-slate-500 font-medium">
                Description
              </th>
              <th className="w-[7%] px-4 py-3 text-left text-slate-500 font-medium">Applies To</th>
              <th className="w-[5%] px-4 py-3 text-center text-slate-500 font-medium">View</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {ruleExceptions.map((item) => (
              <tr key={item.id} className="bg-white hover:bg-slate-50 transition-colors">
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium ${
                      item.addedRemoved === 'Added'
                        ? 'bg-green-50 text-green-700 border border-green-200'
                        : 'bg-red-50 text-red-700 border border-red-200'
                    }`}
                  >
                    {item.addedRemoved === 'Added' ? (
                      <Plus className="w-3 h-3" />
                    ) : (
                      <Minus className="w-3 h-3" />
                    )}
                    {item.addedRemoved}
                  </span>
                </td>
                <td className="px-4 py-3 text-slate-700">{item.benefitCategory}</td>
                <td className="px-4 py-3">
                  <span className="inline-flex px-2 py-0.5 rounded bg-teal-50 text-teal-700 border border-teal-200 text-[11px] font-medium">
                    {item.ruleType}
                  </span>
                </td>
                <td className="px-4 py-3 text-slate-500">{item.ruleDescription}</td>
                <td className="px-4 py-3 text-slate-700">{item.effectiveDate}</td>
                <td className="px-4 py-3 text-slate-500">{item.expiry}</td>
                <td className="px-4 py-3 text-slate-700">{item.reason}</td>
                <td className="px-4 py-3 text-slate-500">{item.description}</td>
                <td className="px-4 py-3 text-slate-700">{item.appliesTo}</td>
                <td className="px-4 py-3 text-center">
                  <button
                    type="button"
                    className="inline-flex items-center justify-center w-7 h-7 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderBenefitTable = () => (
    <div className="border border-slate-200 rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full table-fixed text-xs">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="w-[8%] px-4 py-3 text-left text-slate-500 font-medium">
                Added /<br />
                Removed
              </th>
              <th className="w-[14%] px-4 py-3 text-left text-slate-500 font-medium">
                Benefit Category
              </th>
              <th className="w-[9%] px-4 py-3 text-left text-slate-500 font-medium">DIN</th>
              <th className="w-[10%] px-4 py-3 text-left text-slate-500 font-medium">
                Effective Date
              </th>
              <th className="w-[10%] px-4 py-3 text-left text-slate-500 font-medium">Expiry</th>
              <th className="w-[12%] px-4 py-3 text-left text-slate-500 font-medium">Reason</th>
              <th className="w-[18%] px-4 py-3 text-left text-slate-500 font-medium">
                Description
              </th>
              <th className="w-[13%] px-4 py-3 text-left text-slate-500 font-medium">Applies To</th>
              <th className="w-[6%] px-4 py-3 text-center text-slate-500 font-medium">View</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {benefitExceptions.map((item) => (
              <tr key={item.id} className="bg-white hover:bg-slate-50 transition-colors">
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium ${
                      item.addedRemoved === 'Added'
                        ? 'bg-green-50 text-green-700 border border-green-200'
                        : 'bg-red-50 text-red-700 border border-red-200'
                    }`}
                  >
                    {item.addedRemoved === 'Added' ? (
                      <Plus className="w-3 h-3" />
                    ) : (
                      <Minus className="w-3 h-3" />
                    )}
                    {item.addedRemoved}
                  </span>
                </td>
                <td className="px-4 py-3 text-slate-700">{item.benefitCategory}</td>
                <td className="px-4 py-3 text-slate-700 font-mono">{item.din}</td>
                <td className="px-4 py-3 text-slate-700">{item.effectiveDate}</td>
                <td className="px-4 py-3 text-slate-500">{item.expiry}</td>
                <td className="px-4 py-3 text-slate-700">{item.reason}</td>
                <td className="px-4 py-3 text-slate-500">{item.description}</td>
                <td className="px-4 py-3 text-slate-700">{item.appliesTo}</td>
                <td className="px-4 py-3 text-center">
                  <button
                    type="button"
                    className="inline-flex items-center justify-center w-7 h-7 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderCategorySection = (category: ExceptionCategory) => {
    const catConfig = categoryConfig[category];
    const CatIcon = catConfig.icon;
    const count = category === 'benefit' ? benefitExceptions.length : ruleExceptions.length;

    return (
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <div
            className={`flex items-center justify-center w-7 h-7 rounded-lg ${catConfig.accentBg}`}
          >
            <CatIcon className={`w-4 h-4 ${catConfig.accentColor}`} />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-900">{catConfig.label}</h3>
            <p className="text-xs text-slate-400">{catConfig.description}</p>
          </div>
          <span className="ml-auto text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
            {count}
          </span>
        </div>
        {category === 'benefit' ? renderBenefitTable() : renderRuleTable()}
      </div>
    );
  };

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold text-slate-900 mb-2">Exceptions</h2>
        <p className="text-sm text-slate-500">
          Formulary exception and override requests for this member's medications.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1 bg-slate-100 rounded-lg p-1 w-fit">
        {filterTabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveCategory(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-xs font-medium transition-colors ${
              activeCategory === tab.id
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            {tab.label}
            <span
              className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                activeCategory === tab.id
                  ? 'bg-slate-100 text-slate-600'
                  : 'bg-slate-200/60 text-slate-400'
              }`}
            >
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Exception Sections */}
      <div className="space-y-8">
        {(activeCategory === 'all' || activeCategory === 'benefit') &&
          renderCategorySection('benefit')}
        {(activeCategory === 'all' || activeCategory === 'rule') && renderCategorySection('rule')}
      </div>
    </div>
  );
}
