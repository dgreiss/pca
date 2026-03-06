import {
  User,
  CheckCircle2,
  Search,
  X,
  Pill,
  ChevronDown,
  Calendar,
  Mail,
  MapPin,
  Shield,
  Pencil,
  Check,
} from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface Medication {
  id: string;
  name: string;
}

const MEDICATIONS: Medication[] = [
  { id: '1', name: 'Humira' },
  { id: '2', name: 'Enbrel' },
  { id: '3', name: 'Remicade' },
  { id: '4', name: 'Methotrexate' },
  { id: '5', name: 'Rinvoq' },
  { id: '6', name: 'Xeljanz' },
  { id: '7', name: 'Orencia' },
  { id: '8', name: 'Actemra' },
  { id: '9', name: 'Cosentyx' },
  { id: '10', name: 'Stelara' },
  { id: '11', name: 'Otezla' },
  { id: '12', name: 'Hydroxychloroquine' },
  { id: '13', name: 'Sulfasalazine' },
];

export function AssessmentContent() {
  const submissionTypeOptions = ['Initial', 'Renewal', 'Resubmission'] as const;
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFilterType, setSearchFilterType] = useState<'name' | 'id'>('name');
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
  const [selectedMedication, setSelectedMedication] = useState<Medication | null>(MEDICATIONS[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [diseaseDiagnosis, setDiseaseDiagnosis] = useState('');
  const [additionalComments, setAdditionalComments] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const filterDropdownRef = useRef<HTMLDivElement>(null);
  const submissionTypeDropdownRef = useRef<HTMLDivElement>(null);
  const [submissionType, setSubmissionType] =
    useState<(typeof submissionTypeOptions)[number]>('Initial');
  const [isSubmissionTypeDropdownOpen, setIsSubmissionTypeDropdownOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState(false);
  const [address, setAddress] = useState({
    line1: '123 Main St',
    line2: '',
    city: 'Springfield',
    province: 'IL',
    postalCode: '62701',
  });
  const [editAddress, setEditAddress] = useState({
    line1: '123 Main St',
    line2: '',
    city: 'Springfield',
    province: 'IL',
    postalCode: '62701',
  });
  const [useAsClaimAddress, setUseAsClaimAddress] = useState(true);

  const displayValue = selectedMedication ? selectedMedication.name : '';

  const filteredMedications = MEDICATIONS.filter((med) => {
    const query = searchQuery.toLowerCase();
    if (searchFilterType === 'name') {
      return med.name.toLowerCase().includes(query);
    }
    return med.id.includes(query);
  });

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
      if (filterDropdownRef.current && !filterDropdownRef.current.contains(event.target as Node)) {
        setIsFilterDropdownOpen(false);
      }
      if (
        submissionTypeDropdownRef.current &&
        !submissionTypeDropdownRef.current.contains(event.target as Node)
      ) {
        setIsSubmissionTypeDropdownOpen(false);
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
    setSelectedMedication(null);
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
        <span className="ui-highlight-warning rounded-sm">
          {text.slice(idx, idx + query.length)}
        </span>
        {text.slice(idx + query.length)}
      </>
    );
  }

  return (
    <div className="p-3 space-y-4 text-xs lg:[&_.text-xs]:text-sm">
      <div className="flex items-center gap-2">
        <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Submission Type
        </span>
        <div className="relative" ref={submissionTypeDropdownRef}>
          <button
            type="button"
            onClick={() => setIsSubmissionTypeDropdownOpen((prev) => !prev)}
            className="inline-flex items-center gap-1 h-6 px-2 text-xs rounded border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 transition-colors"
          >
            {submissionType}
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>
          {isSubmissionTypeDropdownOpen && (
            <div className="absolute left-0 top-full mt-1 z-60 bg-white rounded-lg shadow-lg min-w-[120px]">
              {submissionTypeOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  className={`w-full text-left px-3 py-1.5 text-xs hover:bg-teal-50 transition-colors first:rounded-t-lg last:rounded-b-lg ${
                    submissionType === option ? 'bg-teal-50 font-medium' : ''
                  }`}
                  style={submissionType === option ? { color: '#00373a' } : {}}
                  onClick={() => {
                    setSubmissionType(option);
                    setIsSubmissionTypeDropdownOpen(false);
                  }}
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Member Information */}
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-700">
            Member Information
          </h3>
          <div className="relative w-full max-w-xs">
            <input
              type="search"
              placeholder="Search plan members"
              className="w-full rounded-md border border-slate-300 bg-white px-3 py-1.5 text-xs text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00373a]/20"
            />
          </div>
        </div>
        <div className="rounded-lg bg-slate-100 p-3">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-semibold text-slate-900">John Doe</h4>
                <span className="inline-flex items-center px-2 py-0.5 text-xs font-semibold rounded-sm bg-green-100 text-green-700">
                  Active
                </span>
              </div>
              <p className="text-xs text-slate-500">Member ID: 12345678</p>
              <p className="text-xs text-slate-500">Alternate ID: ALT-87654321</p>
            </div>
            <div className="flex items-center gap-6">
              <div>
                <div className="text-xs text-slate-500 mb-0.5">Effective Date</div>
                <div className="text-xs text-slate-700">03/01/2024</div>
              </div>
              <div>
                <div className="text-xs text-slate-500 mb-0.5">Update Date</div>
                <div className="text-xs text-slate-700">01/15/2026</div>
              </div>
            </div>
          </div>
          <div className="mt-3 grid grid-cols-1 gap-3 lg:grid-cols-2">
            <div className="space-y-3">
              <h5 className="text-xs font-semibold uppercase tracking-wide text-slate-700">
                Personal Details
              </h5>
              <div className="space-y-2">
                <div className="flex items-center gap-3 text-xs">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  <div className="flex-1">
                    <div className="text-xs text-slate-500">Date of Birth</div>
                    <div className="text-slate-700">01/15/1965 (61 years)</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs">
                  <User className="w-4 h-4 text-slate-400" />
                  <div className="flex-1">
                    <div className="text-xs text-slate-500">Gender</div>
                    <div className="text-slate-700">Male</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <h5 className="text-xs font-semibold uppercase tracking-wide text-slate-700">
                Contact Information
              </h5>
              <div className="space-y-2">
                <div className="flex items-center gap-3 text-xs">
                  <Mail className="w-4 h-4 text-slate-400" />
                  <span className="text-slate-700">john.doe@email.com</span>
                </div>

                <div className="flex items-start gap-3 text-xs">
                  <MapPin className="w-4 h-4 text-slate-400 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    {editingAddress ? (
                      <div className="space-y-2">
                        <div>
                          <label className="text-xs text-slate-500 mb-0.5 block">
                            Address Line 1
                          </label>
                          <input
                            type="text"
                            value={editAddress.line1}
                            onChange={(e) =>
                              setEditAddress({
                                ...editAddress,
                                line1: e.target.value,
                              })
                            }
                            className="w-full px-2 py-1 rounded border border-slate-300 bg-white text-xs text-slate-700 focus:outline-none focus:ring-2"
                            style={{ '--tw-ring-color': '#00373a' } as React.CSSProperties}
                            placeholder="Street address"
                          />
                        </div>
                        <div>
                          <label className="text-xs text-slate-500 mb-0.5 block">
                            Address Line 2
                          </label>
                          <input
                            type="text"
                            value={editAddress.line2}
                            onChange={(e) =>
                              setEditAddress({
                                ...editAddress,
                                line2: e.target.value,
                              })
                            }
                            className="w-full px-2 py-1 rounded border border-slate-300 bg-white text-xs text-slate-700 focus:outline-none focus:ring-2"
                            style={{ '--tw-ring-color': '#00373a' } as React.CSSProperties}
                            placeholder="Apt, suite, unit (optional)"
                          />
                        </div>
                        <div>
                          <label className="text-xs text-slate-500 mb-0.5 block">City</label>
                          <input
                            type="text"
                            value={editAddress.city}
                            onChange={(e) =>
                              setEditAddress({
                                ...editAddress,
                                city: e.target.value,
                              })
                            }
                            className="w-full px-2 py-1 rounded border border-slate-300 bg-white text-xs text-slate-700 focus:outline-none focus:ring-2"
                            style={{ '--tw-ring-color': '#00373a' } as React.CSSProperties}
                            placeholder="City"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="text-xs text-slate-500 mb-0.5 block">Province</label>
                            <input
                              type="text"
                              value={editAddress.province}
                              onChange={(e) =>
                                setEditAddress({
                                  ...editAddress,
                                  province: e.target.value,
                                })
                              }
                              className="w-full px-2 py-1 rounded border border-slate-300 bg-white text-xs text-slate-700 focus:outline-none focus:ring-2"
                              style={{ '--tw-ring-color': '#00373a' } as React.CSSProperties}
                              placeholder="Province"
                            />
                          </div>
                          <div>
                            <label className="text-xs text-slate-500 mb-0.5 block">
                              Postal Code
                            </label>
                            <input
                              type="text"
                              value={editAddress.postalCode}
                              onChange={(e) =>
                                setEditAddress({
                                  ...editAddress,
                                  postalCode: e.target.value,
                                })
                              }
                              className="w-full px-2 py-1 rounded border border-slate-300 bg-white text-xs text-slate-700 focus:outline-none focus:ring-2"
                              style={{ '--tw-ring-color': '#00373a' } as React.CSSProperties}
                              placeholder="Postal code"
                            />
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => {
                              setAddress(editAddress);
                              setEditingAddress(false);
                            }}
                            className="p-1 rounded hover:bg-slate-200 text-slate-600 transition-colors"
                            title="Save"
                          >
                            <Check className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              setEditAddress(address);
                              setEditingAddress(false);
                            }}
                            className="p-1 rounded hover:bg-slate-200 text-slate-500 transition-colors"
                            title="Cancel"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-start gap-1.5 group/addr">
                        <div className="text-slate-700">
                          <div>{address.line1}</div>
                          {address.line2 && <div>{address.line2}</div>}
                          <div>
                            {address.city}, {address.province} {address.postalCode}
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            setEditAddress({ ...address });
                            setEditingAddress(true);
                          }}
                          className="p-0.5 rounded hover:bg-slate-100 text-slate-400 hover:text-slate-600 opacity-0 group-hover/addr:opacity-100 transition-all shrink-0 mt-0.5"
                          title="Edit address"
                        >
                          <Pencil className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className="text-xs text-slate-500">Use as claim address?</span>
                      <button
                        onClick={() => setUseAsClaimAddress(!useAsClaimAddress)}
                        className={`relative inline-flex h-4 w-8 items-center rounded-full transition-colors ${
                          useAsClaimAddress ? 'bg-[#00373a]' : 'bg-slate-300'
                        }`}
                      >
                        <span
                          className={`inline-block h-3 w-3 rounded-full bg-white transition-transform ${
                            useAsClaimAddress ? 'translate-x-4' : 'translate-x-0.5'
                          }`}
                        />
                      </button>
                      <span
                        className={`text-xs ${
                          useAsClaimAddress ? 'text-[#00373a]' : 'text-slate-400'
                        }`}
                      >
                        {useAsClaimAddress ? 'Yes' : 'No'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-3">
            <h5 className="text-xs font-semibold uppercase tracking-wide text-slate-700">
              Insurance Information
            </h5>
            <div className="mt-2">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" style={{ color: '#00373a' }} />
                <div className="flex-1">
                  <div className="text-xs text-slate-500">Org Code</div>
                  <div className="text-xs text-slate-700">ORG-001</div>
                </div>
              </div>
              <div className="pt-2 mt-2 flex flex-wrap items-center gap-x-5 gap-y-2">
                <div>
                  <div className="text-xs text-slate-500">Client Code</div>
                  <div className="text-xs text-slate-700">CLT-2048</div>
                </div>
                <div>
                  <div className="text-xs text-slate-500">Client Name</div>
                  <div className="text-xs text-slate-700">Blue Cross Blue Shield</div>
                </div>
                <div>
                  <div className="text-xs text-slate-500">Package ID</div>
                  <div className="text-xs text-slate-700">PKG-987654</div>
                </div>
                <div>
                  <div className="text-xs text-slate-500">Offering Code</div>
                  <div className="text-xs text-slate-700">OFR-3210</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Medication Information */}
      <div className="space-y-3 rounded-lg p-3">
        <div className="grid grid-cols-1 gap-3">
          <div className="space-y-2">
            <div className="flex items-center gap-2 h-6">
              <label className="text-xs font-medium text-slate-600">Requested Medication</label>
              <span className="text-xs text-slate-400">Search by</span>
              <div className="relative" ref={filterDropdownRef}>
                <button
                  type="button"
                  onClick={() => setIsFilterDropdownOpen(!isFilterDropdownOpen)}
                  className="inline-flex items-center gap-1 h-6 px-2 text-xs rounded border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  {searchFilterType === 'name' && 'Drug Name'}
                  {searchFilterType === 'id' && 'Medication ID'}
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </button>
                {isFilterDropdownOpen && (
                  <div className="absolute left-0 top-full mt-1 z-60 bg-white rounded-lg shadow-lg min-w-[150px]">
                    {(
                      [
                        { value: 'name', label: 'Drug Name' },
                        { value: 'id', label: 'Product Name' },
                        { value: 'benefit', label: 'Benefit Category' },
                      ] as const
                    ).map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        className={`w-full text-left px-3 py-1.5 text-xs hover:bg-teal-50 transition-colors first:rounded-t-lg last:rounded-b-lg ${
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
                    searchFilterType === 'name'
                      ? 'Search by drug name...'
                      : 'Search by medication ID...'
                  }
                  className="w-full pl-9 pr-9 py-1.5 rounded-lg border border-slate-300 bg-white text-xs focus:outline-none focus:ring-2"
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
                <div className="absolute left-0 right-0 top-full mt-1 z-50 bg-white rounded-lg shadow-xl max-h-72 overflow-y-auto">
                  {searchQuery && (
                    <div className="px-3 py-2 bg-slate-50">
                      <span className="text-xs text-slate-500">
                        {filteredMedications.length} result
                        {filteredMedications.length !== 1 ? 's' : ''} for "{searchQuery}"
                      </span>
                    </div>
                  )}
                  {filteredMedications.length === 0 ? (
                    <div className="px-4 py-6 text-center text-xs text-slate-400">
                      No medications found matching your search.
                    </div>
                  ) : (
                    filteredMedications.map((med) => (
                      <button
                        key={med.id}
                        type="button"
                        className={`w-full text-left px-3 py-2 hover:bg-teal-50 transition-colors ${
                          selectedMedication?.id === med.id ? 'bg-teal-50' : ''
                        }`}
                        onClick={() => handleSelectMedication(med)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-slate-900">
                              {highlightMatch(med.name, searchQuery)}
                            </span>
                          </div>
                          {selectedMedication?.id === med.id && (
                            <CheckCircle2
                              className="w-4 h-4 shrink-0"
                              style={{ color: '#00373a' }}
                            />
                          )}
                        </div>
                      </button>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 h-6">
              <label className="text-xs font-medium text-slate-600">Disease Diagnosis</label>
            </div>
            <input
              type="text"
              value={diseaseDiagnosis}
              onChange={(e) => setDiseaseDiagnosis(e.target.value)}
              placeholder="Enter diagnosis code"
              className="w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-xs focus:outline-none focus:ring-2"
              style={{ '--tw-ring-color': '#00373a' } as React.CSSProperties}
            />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-1 px-3">
        <label className="text-xs block font-medium text-slate-600 mb-2">Additional Comments</label>
        <textarea
          value={additionalComments}
          onChange={(e) => setAdditionalComments(e.target.value)}
          placeholder="Add notes or context for this assessment"
          rows={3}
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-700 focus:outline-none focus:ring-2"
          style={{ '--tw-ring-color': '#00373a' } as React.CSSProperties}
        />
      </div>

      <div className="flex items-center gap-2 pt-3">
        <button
          className="px-4 py-2 text-xs text-white rounded-lg font-medium transition-colors"
          style={{ backgroundColor: '#00373a' }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.9')}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
        >
          Save
        </button>
        <button className="px-4 py-2 text-xs bg-slate-100 text-slate-700 rounded-lg font-medium hover:bg-slate-200 transition-colors">
          Save and Close
        </button>
        <button className="px-4 py-2 text-xs bg-slate-100 text-slate-700 rounded-lg font-medium hover:bg-slate-200 transition-colors">
          Cancel
        </button>
        <button className="ml-auto px-4 py-2 text-xs bg-red-50 text-red-700 rounded-lg font-medium hover:bg-red-100 transition-colors">
          Delete
        </button>
      </div>
    </div>
  );
}
