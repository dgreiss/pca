import { Hash, FileText, User, CheckCircle2, AlertCircle, Search, X, Pill, ChevronDown, Download, RefreshCw, Calendar } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface Medication {
  id: string;
  name: string;
  generic: string;
  din: string;
  strength: string;
  benefitCategory: string;
}

const MEDICATIONS: Medication[] = [
  { id: '1', name: 'Humira', generic: 'adalimumab', din: '02258595', strength: '40mg/0.8mL subcutaneous', benefitCategory: 'Biologic Response Modifiers' },
  { id: '2', name: 'Humira', generic: 'adalimumab', din: '02258609', strength: '20mg/0.4mL subcutaneous', benefitCategory: 'Biologic Response Modifiers' },
  { id: '3', name: 'Enbrel', generic: 'etanercept', din: '02242903', strength: '50mg/mL subcutaneous', benefitCategory: 'Biologic Response Modifiers' },
  { id: '4', name: 'Enbrel', generic: 'etanercept', din: '02242904', strength: '25mg/0.5mL subcutaneous', benefitCategory: 'Biologic Response Modifiers' },
  { id: '5', name: 'Remicade', generic: 'infliximab', din: '02244016', strength: '100mg IV infusion', benefitCategory: 'Biologic Response Modifiers' },
  { id: '6', name: 'Methotrexate', generic: 'methotrexate', din: '02182963', strength: '2.5mg oral tablet', benefitCategory: 'Antineoplastic Agents' },
  { id: '7', name: 'Rinvoq', generic: 'upadacitinib', din: '02497514', strength: '15mg oral tablet', benefitCategory: 'JAK Inhibitors' },
  { id: '8', name: 'Xeljanz', generic: 'tofacitinib', din: '02413728', strength: '5mg oral tablet', benefitCategory: 'JAK Inhibitors' },
  { id: '9', name: 'Orencia', generic: 'abatacept', din: '02280132', strength: '125mg/mL subcutaneous', benefitCategory: 'Biologic Response Modifiers' },
  { id: '10', name: 'Actemra', generic: 'tocilizumab', din: '02350092', strength: '162mg/0.9mL subcutaneous', benefitCategory: 'Biologic Response Modifiers' },
  { id: '11', name: 'Cosentyx', generic: 'secukinumab', din: '02444550', strength: '150mg/mL subcutaneous', benefitCategory: 'Interleukin Inhibitors' },
  { id: '12', name: 'Stelara', generic: 'ustekinumab', din: '02324776', strength: '45mg/0.5mL subcutaneous', benefitCategory: 'Interleukin Inhibitors' },
  { id: '13', name: 'Otezla', generic: 'apremilast', din: '02438917', strength: '30mg oral tablet', benefitCategory: 'PDE4 Inhibitors' },
  { id: '14', name: 'Hydroxychloroquine', generic: 'hydroxychloroquine', din: '00585840', strength: '200mg oral tablet', benefitCategory: 'Antimalarials' },
  { id: '15', name: 'Sulfasalazine', generic: 'sulfasalazine', din: '00235822', strength: '500mg oral tablet', benefitCategory: 'Aminosalicylates' },
];

export function AssessmentContent() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFilterType, setSearchFilterType] = useState<'all' | 'name' | 'din' | 'category'>('all');
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
  const [selectedMedication, setSelectedMedication] = useState<Medication>(MEDICATIONS[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [approvedSearchQuery, setApprovedSearchQuery] = useState('');
  const [approvedMedication, setApprovedMedication] = useState<Medication | null>(null);
  const [isApprovedDropdownOpen, setIsApprovedDropdownOpen] = useState(false);
  const [approvedSearchFilterType, setApprovedSearchFilterType] = useState<'all' | 'name' | 'din' | 'category'>('all');
  const [isApprovedFilterDropdownOpen, setIsApprovedFilterDropdownOpen] = useState(false);
  const [diseaseDiagnosis, setDiseaseDiagnosis] = useState('');
  const [checklist, setChecklist] = useState<Record<string, boolean>>({
    requestedMedReviewed: false,
    approvedMedReviewed: false,
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
  const [assessmentSummaryOpen, setAssessmentSummaryOpen] = useState(true);
  const [coverageSummaryOpen, setCoverageSummaryOpen] = useState(true);
  const [decisionSummaryOpen, setDecisionSummaryOpen] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const filterDropdownRef = useRef<HTMLDivElement>(null);
  const approvedInputRef = useRef<HTMLInputElement>(null);
  const approvedDropdownRef = useRef<HTMLDivElement>(null);
  const approvedFilterDropdownRef = useRef<HTMLDivElement>(null);
  const [submissionType, setSubmissionType] = useState('Initial');

  const displayValue = selectedMedication
    ? `${selectedMedication.name} (${selectedMedication.generic}) ${selectedMedication.strength.split(' ')[0]}`
    : '';

  const filteredMedications = MEDICATIONS.filter((med) => {
    const query = searchQuery.toLowerCase();
    if (searchFilterType === 'name') {
      return med.name.toLowerCase().includes(query) || med.generic.toLowerCase().includes(query);
    }
    if (searchFilterType === 'din') {
      return med.din.includes(query);
    }
    if (searchFilterType === 'category') {
      return med.benefitCategory.toLowerCase().includes(query);
    }
    return (
      med.name.toLowerCase().includes(query) ||
      med.generic.toLowerCase().includes(query) ||
      med.din.includes(query) ||
      med.benefitCategory.toLowerCase().includes(query)
    );
  });

  const approvedFilteredMedications = MEDICATIONS.filter((med) => {
    const query = approvedSearchQuery.toLowerCase();
    if (approvedSearchFilterType === 'name') {
      return med.name.toLowerCase().includes(query) || med.generic.toLowerCase().includes(query);
    }
    if (approvedSearchFilterType === 'din') {
      return med.din.includes(query);
    }
    if (approvedSearchFilterType === 'category') {
      return med.benefitCategory.toLowerCase().includes(query);
    }
    return (
      med.name.toLowerCase().includes(query) ||
      med.generic.toLowerCase().includes(query) ||
      med.din.includes(query) ||
      med.benefitCategory.toLowerCase().includes(query)
    );
  });

  const approvedDisplayValue = approvedMedication
    ? `${approvedMedication.name} (${approvedMedication.generic}) ${approvedMedication.strength.split(' ')[0]}`
    : '';

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
        setSearchQuery('');
      }
      if (
        approvedDropdownRef.current &&
        !approvedDropdownRef.current.contains(event.target as Node) &&
        approvedInputRef.current &&
        !approvedInputRef.current.contains(event.target as Node)
      ) {
        setIsApprovedDropdownOpen(false);
        setApprovedSearchQuery('');
      }
      if (
        filterDropdownRef.current &&
        !filterDropdownRef.current.contains(event.target as Node)
      ) {
        setIsFilterDropdownOpen(false);
      }
      if (
        approvedFilterDropdownRef.current &&
        !approvedFilterDropdownRef.current.contains(event.target as Node)
      ) {
        setIsApprovedFilterDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function handleSelectMedication(med: Medication) {
    setSelectedMedication(med);
    setIsDropdownOpen(false);
    setSearchQuery('');
  }

  function handleClear() {
    setSelectedMedication(null as unknown as Medication);
    setSearchQuery('');
    setIsDropdownOpen(true);
    inputRef.current?.focus();
  }

  function highlightMatch(text: string, query: string) {
    if (!query) return text;
    const idx = text.toLowerCase().indexOf(query.toLowerCase());
    if (idx === -1) return text;
    return (
      <>
        {text.slice(0, idx)}
        <span className="bg-yellow-100 text-yellow-900 rounded-sm">{text.slice(idx, idx + query.length)}</span>
        {text.slice(idx + query.length)}
      </>
    );
  }

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <h2 className="text-2xl font-semibold text-slate-900">Submission Assessment</h2>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">Pending Review</span>
        </div>
      </div>

      {/* Assessment Overview */}
      <div className="bg-slate-50 border-r border-slate-200 rounded-xl p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-sm text-slate-600">Assessment ID: 850234</p>
          </div>
        </div>
        
        <div className="grid grid-cols-4 gap-4 mt-6">
          <div className="flex items-center gap-3">
            <Hash className="w-4 h-4" style={{ color: '#00373a' }} />
            <div>
              <div className="text-xs text-slate-500">Submission ID</div>
              <div className="text-sm font-medium text-slate-900 font-mono">1008741</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <FileText className="w-4 h-4" style={{ color: '#00373a' }} />
            <div>
              <div className="text-xs text-slate-500">Submission Type</div>
              <select
                value={submissionType}
                onChange={(e) => setSubmissionType(e.target.value)}
                className="text-sm font-medium text-slate-900 bg-white border border-slate-200 rounded-md px-2.5 py-1 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500 appearance-none cursor-pointer pr-7 shadow-sm hover:border-slate-300 transition-colors"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 6px center' }}
              >
                <option value="Initial">Initial</option>
                <option value="Renewal">Renewal</option>
                <option value="Resubmission">Resubmission</option>
              </select>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <User className="w-4 h-4" style={{ color: '#00373a' }} />
            <div>
              <div className="text-xs text-slate-500">Assigned To</div>
              <div className="text-sm font-medium text-slate-900">Sarah Smith</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Calendar className="w-4 h-4" style={{ color: '#00373a' }} />
            <div>
              <div className="text-xs text-slate-500">Created</div>
              <div className="text-sm font-medium text-slate-900">Feb 1, 2026</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Download className="w-4 h-4" style={{ color: '#00373a' }} />
            <div>
              <div className="text-xs text-slate-500">Received Date</div>
              <div className="text-sm font-medium text-slate-900">Jan 28, 2026</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Calendar className="w-4 h-4" style={{ color: '#00373a' }} />
            <div>
              <div className="text-xs text-slate-500">Imported Date</div>
              <div className="text-sm font-medium text-slate-900">Jan 29, 2026</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <RefreshCw className="w-4 h-4" style={{ color: '#00373a' }} />
            <div>
              <div className="text-xs text-slate-500">Updated Date</div>
              <div className="text-sm font-medium text-slate-900">Feb 5, 2026</div>
            </div>
          </div>
        </div>
      </div>

      {/* Medication Information */}
      <div className="space-y-4">
        <h3 className="font-semibold text-slate-900">Medication Information</h3>
        
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Requested Medication</label>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">Search by</span>
              <div className="relative" ref={filterDropdownRef}>
                <button
                  type="button"
                  onClick={() => setIsFilterDropdownOpen(!isFilterDropdownOpen)}
                  className="inline-flex items-center gap-1 px-2 py-0.5 text-xs rounded border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  {searchFilterType === 'all' && 'All Fields'}
                  {searchFilterType === 'name' && 'Drug Name'}
                  {searchFilterType === 'din' && 'DIN'}
                  {searchFilterType === 'category' && 'Benefit Category'}
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </button>
                {isFilterDropdownOpen && (
                  <div className="absolute left-0 top-full mt-1 z-60 bg-white border border-slate-200 rounded-lg shadow-lg min-w-[150px]">
                    {([
                      { value: 'all', label: 'All Fields' },
                      { value: 'name', label: 'Drug Name' },
                      { value: 'din', label: 'DIN' },
                      { value: 'category', label: 'Benefit Category' },
                    ] as const).map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        className={`w-full text-left px-3 py-2 text-xs hover:bg-teal-50 transition-colors first:rounded-t-lg last:rounded-b-lg ${
                          searchFilterType === option.value ? 'bg-teal-50 font-medium' : ''
                        }`}
                        style={searchFilterType === option.value ? { color: '#00373a' } : {}}
                        onClick={() => {
                          setSearchFilterType(option.value);
                          setIsFilterDropdownOpen(false);
                        }}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="relative" ref={dropdownRef}>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={isDropdownOpen ? searchQuery : displayValue}
                  placeholder={
                    searchFilterType === 'all' ? 'Search medications...' :
                    searchFilterType === 'name' ? 'Search by drug name...' :
                    searchFilterType === 'din' ? 'Search by DIN...' :
                    'Search by benefit category...'
                  }
                  className="w-full pl-9 pr-9 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:border-transparent"
                  style={{ '--tw-ring-color': '#00373a' } as React.CSSProperties}
                  ref={inputRef}
                  onFocus={() => {
                    setIsDropdownOpen(true);
                    setSearchQuery('');
                  }}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {selectedMedication && !isDropdownOpen && (
                  <button
                    onClick={handleClear}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Dropdown */}
              {isDropdownOpen && (
                <div className="absolute left-0 right-0 top-full mt-1 z-50 bg-white border border-slate-200 rounded-lg shadow-xl max-h-72 overflow-y-auto">
                  {searchQuery && (
                    <div className="px-3 py-2 border-b border-slate-100 bg-slate-50">
                      <span className="text-xs text-slate-500">
                        {filteredMedications.length} result{filteredMedications.length !== 1 ? 's' : ''} for "{searchQuery}"
                      </span>
                    </div>
                  )}
                  {filteredMedications.length === 0 ? (
                    <div className="px-4 py-6 text-center text-sm text-slate-400">
                      No medications found matching your search.
                    </div>
                  ) : (
                    filteredMedications.map((med) => (
                      <button
                        key={med.id}
                        type="button"
                        className={`w-full text-left px-4 py-3 hover:bg-teal-50 transition-colors border-b border-slate-50 last:border-b-0 ${
                          selectedMedication?.id === med.id ? 'bg-teal-50' : ''
                        }`}
                        onClick={() => handleSelectMedication(med)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Pill className="w-4 h-4 shrink-0" style={{ color: '#00373a' }} />
                            <span className="text-sm text-slate-900">
                              {highlightMatch(med.name, searchQuery)}{' '}
                              <span className="text-slate-500">({highlightMatch(med.generic, searchQuery)})</span>
                            </span>
                          </div>
                          {selectedMedication?.id === med.id && (
                            <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: '#00373a' }} />
                          )}
                        </div>
                        <div className="flex items-center gap-3 mt-1 ml-6">
                          <span className="text-xs text-slate-500">
                            DIN: {highlightMatch(med.din, searchQuery)}
                          </span>
                          <span className="text-xs text-slate-400">|</span>
                          <span className="text-xs text-slate-500">
                            {highlightMatch(med.strength, searchQuery)}
                          </span>
                          <span className="text-xs text-slate-400">|</span>
                          <span className="text-xs text-slate-500">
                            {highlightMatch(med.benefitCategory, searchQuery)}
                          </span>
                        </div>
                      </button>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Approved Medication</label>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">Search by</span>
              <div className="relative" ref={approvedFilterDropdownRef}>
                <button
                  type="button"
                  onClick={() => setIsApprovedFilterDropdownOpen(!isApprovedFilterDropdownOpen)}
                  className="inline-flex items-center gap-1 px-2 py-0.5 text-xs rounded border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  {approvedSearchFilterType === 'all' && 'All Fields'}
                  {approvedSearchFilterType === 'name' && 'Drug Name'}
                  {approvedSearchFilterType === 'din' && 'DIN'}
                  {approvedSearchFilterType === 'category' && 'Benefit Category'}
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </button>
                {isApprovedFilterDropdownOpen && (
                  <div className="absolute left-0 top-full mt-1 z-60 bg-white border border-slate-200 rounded-lg shadow-lg min-w-[150px]">
                    {([
                      { value: 'all', label: 'All Fields' },
                      { value: 'name', label: 'Drug Name' },
                      { value: 'din', label: 'DIN' },
                      { value: 'category', label: 'Benefit Category' },
                    ] as const).map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        className={`w-full text-left px-3 py-2 text-xs hover:bg-teal-50 transition-colors first:rounded-t-lg last:rounded-b-lg ${
                          approvedSearchFilterType === option.value ? 'bg-teal-50 font-medium' : ''
                        }`}
                        style={approvedSearchFilterType === option.value ? { color: '#00373a' } : {}}
                        onClick={() => {
                          setApprovedSearchFilterType(option.value);
                          setIsApprovedFilterDropdownOpen(false);
                        }}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="relative" ref={approvedDropdownRef}>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={isApprovedDropdownOpen ? approvedSearchQuery : approvedDisplayValue}
                  placeholder={
                    approvedSearchFilterType === 'all' ? 'Search medications...' :
                    approvedSearchFilterType === 'name' ? 'Search by drug name...' :
                    approvedSearchFilterType === 'din' ? 'Search by DIN...' :
                    'Search by benefit category...'
                  }
                  className={`w-full pl-9 pr-9 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:border-transparent ${
                    !approvedMedication && !isApprovedDropdownOpen
                      ? 'border-amber-300 bg-amber-50'
                      : 'border-slate-300'
                  }`}
                  style={{ '--tw-ring-color': '#00373a' } as React.CSSProperties}
                  ref={approvedInputRef}
                  onFocus={() => {
                    setIsApprovedDropdownOpen(true);
                    setApprovedSearchQuery('');
                  }}
                  onChange={(e) => setApprovedSearchQuery(e.target.value)}
                />
                {approvedMedication && !isApprovedDropdownOpen && (
                  <button
                    onClick={() => {
                      setApprovedMedication(null);
                      setApprovedSearchQuery('');
                      setIsApprovedDropdownOpen(true);
                      approvedInputRef.current?.focus();
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Dropdown */}
              {isApprovedDropdownOpen && (
                <div className="absolute left-0 right-0 top-full mt-1 z-50 bg-white border border-slate-200 rounded-lg shadow-xl max-h-72 overflow-y-auto">
                  {approvedSearchQuery && (
                    <div className="px-3 py-2 border-b border-slate-100 bg-slate-50">
                      <span className="text-xs text-slate-500">
                        {approvedFilteredMedications.length} result{approvedFilteredMedications.length !== 1 ? 's' : ''} for "{approvedSearchQuery}"
                      </span>
                    </div>
                  )}
                  {approvedFilteredMedications.length === 0 ? (
                    <div className="px-4 py-6 text-center text-sm text-slate-400">
                      No medications found matching your search.
                    </div>
                  ) : (
                    approvedFilteredMedications.map((med) => (
                      <button
                        key={med.id}
                        type="button"
                        className={`w-full text-left px-4 py-3 hover:bg-green-50 transition-colors border-b border-slate-50 last:border-b-0 ${
                          approvedMedication?.id === med.id ? 'bg-green-50' : ''
                        }`}
                        onClick={() => {
                          setApprovedMedication(med);
                          setIsApprovedDropdownOpen(false);
                          setApprovedSearchQuery('');
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Pill className="w-4 h-4 shrink-0" style={{ color: '#00373a' }} />
                            <span className="text-sm text-slate-900">
                              {highlightMatch(med.name, approvedSearchQuery)}{' '}
                              <span className="text-slate-500">({highlightMatch(med.generic, approvedSearchQuery)})</span>
                            </span>
                          </div>
                          {approvedMedication?.id === med.id && (
                            <CheckCircle2 className="w-4 h-4 shrink-0 text-green-600" />
                          )}
                        </div>
                        <div className="flex items-center gap-3 mt-1 ml-6">
                          <span className="text-xs text-slate-500">
                            DIN: {highlightMatch(med.din, approvedSearchQuery)}
                          </span>
                          <span className="text-xs text-slate-400">|</span>
                          <span className="text-xs text-slate-500">
                            {highlightMatch(med.strength, approvedSearchQuery)}
                          </span>
                          <span className="text-xs text-slate-400">|</span>
                          <span className="text-xs text-slate-500">
                            {highlightMatch(med.benefitCategory, approvedSearchQuery)}
                          </span>
                        </div>
                      </button>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Disease Diagnosis</label>
          <input
            type="text"
            value={diseaseDiagnosis}
            onChange={(e) => setDiseaseDiagnosis(e.target.value)}
            placeholder="Enter diagnosis or ICD-10 code..."
            className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:border-transparent"
            style={{ '--tw-ring-color': '#00373a' } as React.CSSProperties}
          />
        </div>
      </div>

      {/* Assessment Summary Checklist */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-slate-900">Assessment Checklist</h3>
          <span className="text-xs text-slate-500">
            {Object.values(checklist).filter(Boolean).length} of {Object.keys(checklist).length} completed
          </span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-1.5">
          <div
            className="h-1.5 rounded-full transition-all duration-300"
            style={{
              width: `${(Object.values(checklist).filter(Boolean).length / Object.keys(checklist).length) * 100}%`,
              backgroundColor: Object.values(checklist).every(Boolean) ? '#16a34a' : '#00373a',
            }}
          />
        </div>

        {/* Assessment Summary */}
        <div className="border border-slate-200 rounded-lg overflow-hidden">
          <button
            type="button"
            onClick={() => setAssessmentSummaryOpen((prev) => !prev)}
            className="w-full px-4 py-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between cursor-pointer hover:bg-slate-100 transition-colors"
          >
            <div className="flex items-center gap-2">
              <ChevronDown
                className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${assessmentSummaryOpen ? '' : '-rotate-90'}`}
              />
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#00373a' }} />
              <span className="text-sm font-medium text-slate-800">Assessment Summary</span>
            </div>
            <span className="text-xs text-slate-500">
              {['requestedMedReviewed', 'approvedMedReviewed', 'diagnosisConfirmed', 'prescriberSignature', 'patientSignature', 'receiptsAttached'].filter((k) => checklist[k]).length}/6
            </span>
          </button>
          {assessmentSummaryOpen && (
          <table className="w-full text-sm table-fixed">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/50">
                <th className="w-[35%] py-2 px-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Criteria</th>
                <th className="w-[40%] py-2 px-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Response</th>
                <th className="w-[15%] py-2 px-3"></th>
                <th className="w-[10%] py-2 px-3 text-right"></th>
              </tr>
            </thead>
            <tbody>
              {([
                { key: 'requestedMedReviewed', label: 'Requested Medication', value: selectedMedication ? `${selectedMedication.name} (${selectedMedication.generic})` : null, showValue: true },
                { key: 'approvedMedReviewed', label: 'Approved Medication', value: approvedMedication ? `${approvedMedication.name} (${approvedMedication.generic})` : null, showValue: true },
                { key: 'diagnosisConfirmed', label: 'Disease Diagnosis', value: diseaseDiagnosis || null, showValue: true },
                { key: 'prescriberSignature', label: 'Prescriber Signature', value: null, showValue: false },
                { key: 'patientSignature', label: 'Patient Signature', value: null, showValue: false },
                { key: 'receiptsAttached', label: 'Receipts Attached', value: null, showValue: false },
              ] as { key: string; label: string; value: string | null; showValue: boolean }[]).map((item) => (
                <tr
                  key={item.key}
                  className="border-b border-slate-100 last:border-b-0 hover:bg-slate-50 transition-colors group cursor-pointer"
                  onClick={() => setChecklist((prev) => ({ ...prev, [item.key]: !prev[item.key] }))}
                >
                  <td className="py-2.5 px-3">
                    <span className={`transition-colors ${checklist[item.key] ? 'text-slate-500 line-through' : 'text-slate-700'}`}>
                      {item.label}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-left">
                    {item.showValue && item.value ? (
                      <span className="text-xs text-slate-500 px-2 py-0.5 rounded truncate max-w-[250px] inline-block">{item.value}</span>
                    ) : item.showValue && !item.value ? (
                      <span className="text-xs text-amber-500 px-2 py-0.5 rounded italic">Not provided</span>
                    ) : (
                      <span className="text-xs text-slate-400">—</span>
                    )}
                  </td>
                  <td className="py-2.5 px-3">
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); }}
                      className="px-3 py-1 text-xs font-medium rounded border transition-colors hover:bg-slate-50"
                      style={{ color: '#00373a', borderColor: '#00373a' }}
                    >
                      Update
                    </button>
                  </td>
                  <td className="py-2.5 px-3">
                    <div className="relative flex items-center justify-center shrink-0">
                      <input
                        type="checkbox"
                        checked={checklist[item.key]}
                        onChange={() => {}}
                        className="sr-only"
                      />
                      <div
                        className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200 ${
                          checklist[item.key]
                            ? 'border-transparent'
                            : 'border-slate-300 group-hover:border-slate-400'
                        }`}
                        style={checklist[item.key] ? { backgroundColor: '#00373a' } : {}}
                      >
                        {checklist[item.key] && (
                          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          )}
        </div>

        {/* Coverage Summary */}
        <div className="border border-slate-200 rounded-lg overflow-hidden">
          <button
            type="button"
            onClick={() => setCoverageSummaryOpen((prev) => !prev)}
            className="w-full px-4 py-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between cursor-pointer hover:bg-slate-100 transition-colors"
          >
            <div className="flex items-center gap-2">
              <ChevronDown
                className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${coverageSummaryOpen ? '' : '-rotate-90'}`}
              />
              <div className="w-2 h-2 rounded-full bg-cyan-500" />
              <span className="text-sm font-medium text-slate-800">Coverage Summary</span>
            </div>
            <span className="text-xs text-slate-500">
              {['correspondenceType', 'planTerminated', 'mockClaimSummary', 'ppn'].filter((k) => checklist[k]).length}/4
            </span>
          </button>
          {coverageSummaryOpen && (
          <table className="w-full text-sm table-fixed">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/50">
                <th className="w-[35%] py-2 px-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Criteria</th>
                <th className="w-[40%] py-2 px-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Response</th>
                <th className="w-[15%] py-2 px-3"></th>
                <th className="w-[10%] py-2 px-3 text-right"></th>
              </tr>
            </thead>
            <tbody>
              {([
                { key: 'correspondenceType', label: 'Correspondence type', response: 'Approved' },
                { key: 'planTerminated', label: 'Plan terminated', response: 'No' },
                { key: 'mockClaimSummary', label: 'Mock claim summary', response: 'Failed on:\nBEL 0400: Not a benefit\nBEL 02800: Prior Authorization Required' },
                { key: 'ppn', label: 'PPN', response: 'Yes' },
              ] as { key: string; label: string; response: string }[]).map((item) => (
                <tr
                  key={item.key}
                  className="border-b border-slate-100 last:border-b-0 hover:bg-slate-50 transition-colors group cursor-pointer"
                  onClick={() => setChecklist((prev) => ({ ...prev, [item.key]: !prev[item.key] }))}
                >
                  <td className="py-2.5 px-3">
                    <span className={`transition-colors ${checklist[item.key] ? 'text-slate-500 line-through' : 'text-slate-700'}`}>
                      {item.label}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-left">
                    {item.key === 'mockClaimSummary' ? (
                      <span className="inline-flex flex-col items-start text-xs text-red-600 px-2.5 py-1.5 rounded">
                        <span className="font-medium">Failed on:</span>
                        <span>BEL 0400: Not a benefit</span>
                        <span>BEL 02800: Prior Authorization Required</span>
                      </span>
                    ) : (
                      <span className="text-xs text-slate-700 px-2 py-0.5 rounded">{item.response}</span>
                    )}
                  </td>
                  <td className="py-2.5 px-3">
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); }}
                      className="px-3 py-1 text-xs font-medium rounded border transition-colors hover:bg-slate-50"
                      style={{ color: '#00373a', borderColor: '#00373a' }}
                    >
                      Update
                    </button>
                  </td>
                  <td className="py-2.5 px-3">
                    <div className="relative flex items-center justify-center shrink-0">
                      <input
                        type="checkbox"
                        checked={checklist[item.key]}
                        onChange={() => {}}
                        className="sr-only"
                      />
                      <div
                        className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200 ${
                          checklist[item.key]
                            ? 'border-transparent'
                            : 'border-slate-300 group-hover:border-slate-400'
                        }`}
                        style={checklist[item.key] ? { backgroundColor: '#00373a' } : {}}
                      >
                        {checklist[item.key] && (
                          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          )}
        </div>

        {/* Decision Summary */}
        <div className="border border-slate-200 rounded-lg overflow-hidden">
          <button
            type="button"
            onClick={() => setDecisionSummaryOpen((prev) => !prev)}
            className="w-full px-4 py-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between cursor-pointer hover:bg-slate-100 transition-colors"
          >
            <div className="flex items-center gap-2">
              <ChevronDown
                className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${decisionSummaryOpen ? '' : '-rotate-90'}`}
              />
              <div className="w-2 h-2 rounded-full bg-amber-500" />
              <span className="text-sm font-medium text-slate-800">Decision Summary</span>
            </div>
            <span className="text-xs text-slate-500">
              {['rfuMc', 'assessmentStatus', 'effectiveExpiryDate', 'clinicalCriteria'].filter((k) => checklist[k]).length}/4
            </span>
          </button>
          {decisionSummaryOpen && (
          <table className="w-full text-sm table-fixed">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/50">
                <th className="w-[35%] py-2 px-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Criteria</th>
                <th className="w-[40%] py-2 px-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Response</th>
                <th className="w-[15%] py-2 px-3"></th>
                <th className="w-[10%] py-2 px-3 text-right"></th>
              </tr>
            </thead>
            <tbody>
              {([
                { key: 'rfuMc', label: 'RFU/MC' },
                { key: 'assessmentStatus', label: 'Assessment Status' },
                { key: 'effectiveExpiryDate', label: 'Effective and Expiry Date' },
                { key: 'clinicalCriteria', label: 'Clinical Criteria' },
              ] as const).map((item) => (
                <tr
                  key={item.key}
                  className="border-b border-slate-100 last:border-b-0 hover:bg-slate-50 transition-colors group cursor-pointer"
                  onClick={() => setChecklist((prev) => ({ ...prev, [item.key]: !prev[item.key] }))}
                >
                  <td className="py-2.5 px-3">
                    <span className={`transition-colors ${checklist[item.key] ? 'text-slate-500 line-through' : 'text-slate-700'}`}>
                      {item.label}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-left">
                    {checklist[item.key] ? (
                      <span className="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full" style={{ color: '#00373a' }}>
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        Complete
                      </span>
                    ) : (
                      <span className="inline-flex items-center text-xs font-medium px-2 py-0.5 rounded-full text-slate-500">
                        Pending
                      </span>
                    )}
                  </td>
                  <td className="py-2.5 px-3">
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); }}
                      className="px-3 py-1 text-xs font-medium rounded border transition-colors hover:bg-slate-50"
                      style={{ color: '#00373a', borderColor: '#00373a' }}
                    >
                      Update
                    </button>
                  </td>
                  <td className="py-2.5 px-3">
                    <div className="relative flex items-center justify-center shrink-0">
                      <input
                        type="checkbox"
                        checked={checklist[item.key]}
                        onChange={() => {}}
                        className="sr-only"
                      />
                      <div
                        className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200 ${
                          checklist[item.key]
                            ? 'border-transparent'
                            : 'border-slate-300 group-hover:border-slate-400'
                        }`}
                        style={checklist[item.key] ? { backgroundColor: '#00373a' } : {}}
                      >
                        {checklist[item.key] && (
                          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-3 pt-4 border-t border-slate-200">
        <button className="px-6 py-2.5 text-white rounded-lg font-medium transition-colors" style={{ backgroundColor: '#00373a' }} onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'} onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}>
          Save
        </button>
        <button className="px-6 py-2.5 bg-white text-slate-700 border border-slate-300 rounded-lg font-medium hover:bg-slate-50 transition-colors">
          Save and Close
        </button>
        <button className="px-6 py-2.5 bg-white text-slate-700 border border-slate-300 rounded-lg font-medium hover:bg-slate-50 transition-colors">
          Cancel
        </button>
      </div>
    </div>
  );
}