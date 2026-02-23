import {
  Hash,
  FileText,
  User,
  CheckCircle2,
  AlertCircle,
  Search,
  X,
  Pill,
  ChevronDown,
  ArrowRight,
  Download,
  RefreshCw,
  Calendar,
  Mail,
  MapPin,
  Shield,
  Pencil,
  Check,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface Medication {
  id: string;
  name: string;
  generic: string;
  din: string;
  strength: string;
  benefitCategory: string;
}

const MEDICATIONS: Medication[] = [
  {
    id: "1",
    name: "Humira",
    generic: "adalimumab",
    din: "02258595",
    strength: "40mg/0.8mL subcutaneous",
    benefitCategory: "Biologic Response Modifiers",
  },
  {
    id: "2",
    name: "Humira",
    generic: "adalimumab",
    din: "02258609",
    strength: "20mg/0.4mL subcutaneous",
    benefitCategory: "Biologic Response Modifiers",
  },
  {
    id: "3",
    name: "Enbrel",
    generic: "etanercept",
    din: "02242903",
    strength: "50mg/mL subcutaneous",
    benefitCategory: "Biologic Response Modifiers",
  },
  {
    id: "4",
    name: "Enbrel",
    generic: "etanercept",
    din: "02242904",
    strength: "25mg/0.5mL subcutaneous",
    benefitCategory: "Biologic Response Modifiers",
  },
  {
    id: "5",
    name: "Remicade",
    generic: "infliximab",
    din: "02244016",
    strength: "100mg IV infusion",
    benefitCategory: "Biologic Response Modifiers",
  },
  {
    id: "6",
    name: "Methotrexate",
    generic: "methotrexate",
    din: "02182963",
    strength: "2.5mg oral tablet",
    benefitCategory: "Antineoplastic Agents",
  },
  {
    id: "7",
    name: "Rinvoq",
    generic: "upadacitinib",
    din: "02497514",
    strength: "15mg oral tablet",
    benefitCategory: "JAK Inhibitors",
  },
  {
    id: "8",
    name: "Xeljanz",
    generic: "tofacitinib",
    din: "02413728",
    strength: "5mg oral tablet",
    benefitCategory: "JAK Inhibitors",
  },
  {
    id: "9",
    name: "Orencia",
    generic: "abatacept",
    din: "02280132",
    strength: "125mg/mL subcutaneous",
    benefitCategory: "Biologic Response Modifiers",
  },
  {
    id: "10",
    name: "Actemra",
    generic: "tocilizumab",
    din: "02350092",
    strength: "162mg/0.9mL subcutaneous",
    benefitCategory: "Biologic Response Modifiers",
  },
  {
    id: "11",
    name: "Cosentyx",
    generic: "secukinumab",
    din: "02444550",
    strength: "150mg/mL subcutaneous",
    benefitCategory: "Interleukin Inhibitors",
  },
  {
    id: "12",
    name: "Stelara",
    generic: "ustekinumab",
    din: "02324776",
    strength: "45mg/0.5mL subcutaneous",
    benefitCategory: "Interleukin Inhibitors",
  },
  {
    id: "13",
    name: "Otezla",
    generic: "apremilast",
    din: "02438917",
    strength: "30mg oral tablet",
    benefitCategory: "PDE4 Inhibitors",
  },
  {
    id: "14",
    name: "Hydroxychloroquine",
    generic: "hydroxychloroquine",
    din: "00585840",
    strength: "200mg oral tablet",
    benefitCategory: "Antimalarials",
  },
  {
    id: "15",
    name: "Sulfasalazine",
    generic: "sulfasalazine",
    din: "00235822",
    strength: "500mg oral tablet",
    benefitCategory: "Aminosalicylates",
  },
];

export function AssessmentContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFilterType, setSearchFilterType] = useState<
    "name" | "din" | "category"
  >("name");
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
  const [selectedMedication, setSelectedMedication] = useState<Medication>(
    MEDICATIONS[0],
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [approvedSearchQuery, setApprovedSearchQuery] = useState("");
  const [approvedMedication, setApprovedMedication] =
    useState<Medication | null>(null);
  const [isApprovedDropdownOpen, setIsApprovedDropdownOpen] = useState(false);
  const [approvedSearchFilterType, setApprovedSearchFilterType] = useState<
    "name" | "din" | "category"
  >("name");
  const [isApprovedFilterDropdownOpen, setIsApprovedFilterDropdownOpen] =
    useState(false);
  const [diseaseDiagnosis, setDiseaseDiagnosis] = useState("");
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
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const filterDropdownRef = useRef<HTMLDivElement>(null);
  const approvedInputRef = useRef<HTMLInputElement>(null);
  const approvedDropdownRef = useRef<HTMLDivElement>(null);
  const approvedFilterDropdownRef = useRef<HTMLDivElement>(null);
  const [submissionType, setSubmissionType] = useState("Initial");
  const [editingAddress, setEditingAddress] = useState(false);
  const [address, setAddress] = useState({
    line1: "123 Main St",
    line2: "",
    city: "Springfield",
    province: "IL",
    postalCode: "62701",
  });
  const [editAddress, setEditAddress] = useState({
    line1: "123 Main St",
    line2: "",
    city: "Springfield",
    province: "IL",
    postalCode: "62701",
  });
  const [useAsClaimAddress, setUseAsClaimAddress] = useState(true);

  const displayValue = selectedMedication
    ? `${selectedMedication.name} (${selectedMedication.generic}) ${selectedMedication.strength.split(" ")[0]}`
    : "";

  const filteredMedications = MEDICATIONS.filter((med) => {
    const query = searchQuery.toLowerCase();
    if (searchFilterType === "name") {
      return (
        med.name.toLowerCase().includes(query) ||
        med.generic.toLowerCase().includes(query)
      );
    }
    if (searchFilterType === "din") {
      return med.din.includes(query);
    }
    if (searchFilterType === "category") {
      return med.benefitCategory.toLowerCase().includes(query);
    }
    return (
      med.name.toLowerCase().includes(query) ||
      med.generic.toLowerCase().includes(query)
    );
  });

  const approvedFilteredMedications = MEDICATIONS.filter((med) => {
    const query = approvedSearchQuery.toLowerCase();
    if (approvedSearchFilterType === "name") {
      return (
        med.name.toLowerCase().includes(query) ||
        med.generic.toLowerCase().includes(query)
      );
    }
    if (approvedSearchFilterType === "din") {
      return med.din.includes(query);
    }
    if (approvedSearchFilterType === "category") {
      return med.benefitCategory.toLowerCase().includes(query);
    }
    return (
      med.name.toLowerCase().includes(query) ||
      med.generic.toLowerCase().includes(query)
    );
  });

  const approvedDisplayValue = approvedMedication
    ? `${approvedMedication.name} (${approvedMedication.generic}) ${approvedMedication.strength.split(" ")[0]}`
    : "";

  const assessmentItems = [
    {
      key: "requestedMedReviewed",
      label: "Requested Medication",
      value: selectedMedication
        ? `${selectedMedication.name} (${selectedMedication.generic})`
        : null,
      showValue: true,
    },
    {
      key: "approvedMedReviewed",
      label: "Approved Medication",
      value: approvedMedication
        ? `${approvedMedication.name} (${approvedMedication.generic})`
        : null,
      showValue: true,
    },
    {
      key: "diagnosisConfirmed",
      label: "Disease Diagnosis",
      value: diseaseDiagnosis || null,
      showValue: true,
    },
    {
      key: "prescriberSignature",
      label: "Prescriber Signature",
      value: null,
      showValue: false,
    },
    {
      key: "patientSignature",
      label: "Patient Signature",
      value: null,
      showValue: false,
    },
    {
      key: "receiptsAttached",
      label: "Receipts Attached",
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
    { key: "correspondenceType", label: "Correspondence type", response: "Approved" },
    { key: "planTerminated", label: "Plan terminated", response: "No" },
    {
      key: "mockClaimSummary",
      label: "Mock claim summary",
      response:
        "Failed on:\nBEL 0400: Not a benefit\nBEL 02800: Prior Authorization Required",
    },
    { key: "ppn", label: "PPN", response: "Yes" },
  ] as { key: string; label: string; response: string }[];

  const decisionItems = [
    { key: "rfuMc", label: "RFU/MC" },
    { key: "assessmentStatus", label: "Assessment Status" },
    { key: "effectiveExpiryDate", label: "Effective and Expiry Date" },
    { key: "clinicalCriteria", label: "Clinical Criteria" },
  ] as { key: string; label: string }[];

  const assessmentAllChecked = assessmentItems.every(
    (item) => checklist[item.key],
  );
  const coverageAllChecked = coverageItems.every((item) => checklist[item.key]);
  const decisionAllChecked = decisionItems.every((item) => checklist[item.key]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
        setSearchQuery("");
      }
      if (
        approvedDropdownRef.current &&
        !approvedDropdownRef.current.contains(event.target as Node) &&
        approvedInputRef.current &&
        !approvedInputRef.current.contains(event.target as Node)
      ) {
        setIsApprovedDropdownOpen(false);
        setApprovedSearchQuery("");
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
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleSelectMedication(med: Medication) {
    setSelectedMedication(med);
    setIsDropdownOpen(false);
    setSearchQuery("");
  }

  function handleClear() {
    setSelectedMedication(null as unknown as Medication);
    setSearchQuery("");
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
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-1.5">
          <h2 className="text-xl font-semibold text-slate-900">
            Assessment ID: 850234
          </h2>
          <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium border ui-badge-warning">
            Pending Review
          </span>
          <span className="text-[11px] text-slate-400">7 days ago</span>
        </div>
      </div>

      {/* Member Information */}
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-[15px] font-semibold text-slate-900">
            Member Information
          </h3>
          <div className="relative w-full max-w-xs">
            <input
              type="search"
              placeholder="Search plan members"
              className="w-full rounded-md border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00373a]/20 focus:border-[#00373a]"
            />
          </div>
        </div>
        <div className="border border-slate-200 rounded-lg p-4 bg-white">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-lg font-semibold text-slate-900">John Doe</h4>
                <span className="inline-flex items-center px-2 py-0.5 text-[11px] font-semibold rounded-sm border border-green-200 bg-green-50 text-green-700">
                  Active
                </span>
              </div>
              <p className="text-sm text-slate-500">Member ID: 12345678</p>
              <p className="text-sm text-slate-500">Alternate ID: ALT-87654321</p>
            </div>
            <div className="flex items-center gap-6">
              <div>
                <div className="text-xs text-slate-500 mb-0.5">Effective Date</div>
                <div className="text-sm text-slate-700">03/01/2024</div>
              </div>
              <div>
                <div className="text-xs text-slate-500 mb-0.5">Update Date</div>
                <div className="text-sm text-slate-700">01/15/2026</div>
              </div>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="space-y-3">
              <h5 className="text-sm font-semibold text-slate-900">Personal Details</h5>
              <div className="space-y-2">
                <div className="flex items-center gap-3 text-sm">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  <div className="flex-1">
                    <div className="text-xs text-slate-500">Date of Birth</div>
                    <div className="text-slate-700">01/15/1965 (61 years)</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-sm">
                  <User className="w-4 h-4 text-slate-400" />
                  <div className="flex-1">
                    <div className="text-xs text-slate-500">Gender</div>
                    <div className="text-slate-700">Male</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <h5 className="text-sm font-semibold text-slate-900">Contact Information</h5>
              <div className="space-y-2">
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="w-4 h-4 text-slate-400" />
                  <span className="text-slate-700">john.doe@email.com</span>
                </div>

                <div className="flex items-start gap-3 text-sm">
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
                            className="w-full px-2 py-1 border border-slate-300 rounded text-sm text-slate-700 focus:outline-none focus:ring-2 focus:border-transparent"
                            style={
                              { "--tw-ring-color": "#00373a" } as React.CSSProperties
                            }
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
                            className="w-full px-2 py-1 border border-slate-300 rounded text-sm text-slate-700 focus:outline-none focus:ring-2 focus:border-transparent"
                            style={
                              { "--tw-ring-color": "#00373a" } as React.CSSProperties
                            }
                            placeholder="Apt, suite, unit (optional)"
                          />
                        </div>
                        <div>
                          <label className="text-xs text-slate-500 mb-0.5 block">
                            City
                          </label>
                          <input
                            type="text"
                            value={editAddress.city}
                            onChange={(e) =>
                              setEditAddress({
                                ...editAddress,
                                city: e.target.value,
                              })
                            }
                            className="w-full px-2 py-1 border border-slate-300 rounded text-sm text-slate-700 focus:outline-none focus:ring-2 focus:border-transparent"
                            style={
                              { "--tw-ring-color": "#00373a" } as React.CSSProperties
                            }
                            placeholder="City"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="text-xs text-slate-500 mb-0.5 block">
                              Province
                            </label>
                            <input
                              type="text"
                              value={editAddress.province}
                              onChange={(e) =>
                                setEditAddress({
                                  ...editAddress,
                                  province: e.target.value,
                                })
                              }
                              className="w-full px-2 py-1 border border-slate-300 rounded text-sm text-slate-700 focus:outline-none focus:ring-2 focus:border-transparent"
                              style={
                                { "--tw-ring-color": "#00373a" } as React.CSSProperties
                              }
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
                              className="w-full px-2 py-1 border border-slate-300 rounded text-sm text-slate-700 focus:outline-none focus:ring-2 focus:border-transparent"
                              style={
                                { "--tw-ring-color": "#00373a" } as React.CSSProperties
                              }
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
                            className="p-1 rounded hover:bg-green-50 text-green-600 transition-colors"
                            title="Save"
                          >
                            <Check className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              setEditAddress(address);
                              setEditingAddress(false);
                            }}
                            className="p-1 rounded hover:bg-red-50 text-red-500 transition-colors"
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
                      <span className="text-xs text-slate-500">
                        Use as claim address?
                      </span>
                      <button
                        onClick={() => setUseAsClaimAddress(!useAsClaimAddress)}
                        className={`relative inline-flex h-4 w-8 items-center rounded-full transition-colors ${
                          useAsClaimAddress ? "bg-[#00373a]" : "bg-slate-300"
                        }`}
                      >
                        <span
                          className={`inline-block h-3 w-3 rounded-full bg-white transition-transform ${
                            useAsClaimAddress
                              ? "translate-x-4"
                              : "translate-x-0.5"
                          }`}
                        />
                      </button>
                      <span
                        className={`text-xs ${
                          useAsClaimAddress ? "text-[#00373a]" : "text-slate-400"
                        }`}
                      >
                        {useAsClaimAddress ? "Yes" : "No"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <h5 className="text-sm font-semibold text-slate-900">Insurance Information</h5>
            <div className="bg-slate-50 rounded-lg p-3 mt-2">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" style={{ color: "#00373a" }} />
                <div className="flex-1">
                  <div className="text-xs text-slate-500">Org Code</div>
                  <div className="text-sm text-slate-700">ORG-001</div>
                </div>
              </div>
              <div className="border-t border-slate-200 pt-2 mt-2 flex flex-wrap items-center gap-x-6 gap-y-2">
                <div>
                  <div className="text-xs text-slate-500">Client Code</div>
                  <div className="text-sm text-slate-700">CLT-2048</div>
                </div>
                <div>
                  <div className="text-xs text-slate-500">Client Name</div>
                  <div className="text-sm text-slate-700">Blue Cross Blue Shield</div>
                </div>
                <div>
                  <div className="text-xs text-slate-500">Package ID</div>
                  <div className="text-sm text-slate-700">PKG-987654</div>
                </div>
                <div>
                  <div className="text-xs text-slate-500">Offering Code</div>
                  <div className="text-sm text-slate-700">OFR-3210</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Assessment Overview */}
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">

        <div className="grid grid-cols-4 gap-3">
          <div className="flex items-center gap-3">
            <Hash className="w-4 h-4" style={{ color: "#00373a" }} />
            <div>
              <div className="text-[11px] text-slate-500">Submission ID</div>
              <div className="text-sm font-medium text-slate-900 font-mono">
                1008741
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <FileText className="w-4 h-4" style={{ color: "#00373a" }} />
            <div>
              <div className="text-[11px] text-slate-500">Submission Type</div>
              <select
                value={submissionType}
                onChange={(e) => setSubmissionType(e.target.value)}
                className="text-[13px] font-medium text-slate-900 bg-white border border-slate-200 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500 appearance-none cursor-pointer pr-7 shadow-sm hover:border-slate-300 transition-colors"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 6px center",
                }}
              >
                <option value="Initial">Initial</option>
                <option value="Renewal">Renewal</option>
                <option value="Resubmission">Resubmission</option>
              </select>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <User className="w-4 h-4" style={{ color: "#00373a" }} />
            <div>
              <div className="text-[11px] text-slate-500">Assigned To</div>
              <div className="text-sm font-medium text-slate-900">
                Sarah Smith
              </div>
            </div>
          </div>
          <div aria-hidden="true" />
          <div className="flex items-center gap-3">
            <Download className="w-4 h-4" style={{ color: "#00373a" }} />
            <div>
              <div className="text-[11px] text-slate-500">Received Date</div>
              <div className="text-sm font-medium text-slate-900">
                Jan 28, 2026 9:12 AM
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Calendar className="w-4 h-4" style={{ color: "#00373a" }} />
            <div>
              <div className="text-[11px] text-slate-500">Imported Date</div>
              <div className="text-sm font-medium text-slate-900">
                Jan 29, 2026 8:03 AM
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Calendar className="w-4 h-4" style={{ color: "#00373a" }} />
            <div>
              <div className="text-[11px] text-slate-500">Created</div>
              <div className="text-sm font-medium text-slate-900">
                Feb 1, 2026 10:27 AM
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <RefreshCw className="w-4 h-4" style={{ color: "#00373a" }} />
            <div>
              <div className="text-[11px] text-slate-500">Updated Date</div>
              <div className="text-sm font-medium text-slate-900">
                Feb 5, 2026 4:41 PM
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Medication Information */}
      <div className="space-y-3">

        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 h-6">
              <label className="text-xs font-medium text-slate-600">
                Requested Medication
              </label>
              <span className="text-xs text-slate-400">Search by</span>
              <div className="relative" ref={filterDropdownRef}>
                <button
                  type="button"
                  onClick={() => setIsFilterDropdownOpen(!isFilterDropdownOpen)}
                  className="inline-flex items-center gap-1 h-6 px-2 text-[11px] rounded border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  {searchFilterType === "name" && "Drug Name"}
                  {searchFilterType === "din" && "DIN"}
                  {searchFilterType === "category" && "Benefit Category"}
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </button>
                {isFilterDropdownOpen && (
                  <div className="absolute left-0 top-full mt-1 z-60 bg-white border border-slate-200 rounded-lg shadow-lg min-w-[150px]">
                    {(
                      [
                        { value: "name", label: "Drug Name" },
                        { value: "din", label: "DIN" },
                        { value: "category", label: "Benefit Category" },
                      ] as const
                    ).map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        className={`w-full text-left px-3 py-1.5 text-[11px] hover:bg-teal-50 transition-colors first:rounded-t-lg last:rounded-b-lg ${
                          searchFilterType === option.value
                            ? "bg-teal-50 font-medium"
                            : ""
                        }`}
                        style={
                          searchFilterType === option.value
                            ? { color: "#00373a" }
                            : {}
                        }
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
                    searchFilterType === "name"
                      ? "Search by drug name..."
                      : searchFilterType === "din"
                        ? "Search by DIN..."
                        : "Search by benefit category..."
                  }
                  className="w-full pl-9 pr-9 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:border-transparent"
                  style={
                    { "--tw-ring-color": "#00373a" } as React.CSSProperties
                  }
                  ref={inputRef}
                  onFocus={() => {
                    setIsDropdownOpen(true);
                    setSearchQuery("");
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
                      <span className="text-[11px] text-slate-500">
                        {filteredMedications.length} result
                        {filteredMedications.length !== 1 ? "s" : ""} for "
                        {searchQuery}"
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
                        className={`w-full text-left px-3 py-2 hover:bg-teal-50 transition-colors border-b border-slate-50 last:border-b-0 ${
                          selectedMedication?.id === med.id ? "bg-teal-50" : ""
                        }`}
                        onClick={() => handleSelectMedication(med)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Pill
                              className="w-4 h-4 shrink-0"
                              style={{ color: "#00373a" }}
                            />
                            <span className="text-sm text-slate-900">
                              {highlightMatch(med.name, searchQuery)}{" "}
                              <span className="text-slate-500">
                                ({highlightMatch(med.generic, searchQuery)})
                              </span>
                            </span>
                          </div>
                          {selectedMedication?.id === med.id && (
                            <CheckCircle2
                              className="w-4 h-4 shrink-0"
                              style={{ color: "#00373a" }}
                            />
                          )}
                        </div>
                        <div className="flex items-center gap-2.5 mt-1 ml-6">
                          <span className="text-[11px] text-slate-500">
                            DIN: {highlightMatch(med.din, searchQuery)}
                          </span>
                          <span className="text-[11px] text-slate-400">|</span>
                          <span className="text-[11px] text-slate-500">
                            {highlightMatch(med.strength, searchQuery)}
                          </span>
                          <span className="text-[11px] text-slate-400">|</span>
                          <span className="text-[11px] text-slate-500">
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
              <div className="flex items-center gap-2 h-6">
                <label className="text-[10px] font-medium text-slate-600">
                  Approved Medication
                </label>
                <span className="text-[10px] text-slate-400">Search by</span>
                <div className="relative" ref={approvedFilterDropdownRef}>
                  <button
                    type="button"
                  onClick={() =>
                    setIsApprovedFilterDropdownOpen(
                      !isApprovedFilterDropdownOpen,
                    )
                  }
                    className="inline-flex items-center gap-1 h-6 px-2 text-[10px] rounded border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  {approvedSearchFilterType === "name" && "Drug Name"}
                  {approvedSearchFilterType === "din" && "DIN"}
                  {approvedSearchFilterType === "category" &&
                    "Benefit Category"}
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </button>
                {isApprovedFilterDropdownOpen && (
                    <div className="absolute left-0 top-full mt-1 z-60 bg-white border border-slate-200 rounded-lg shadow-lg min-w-[150px]">
                    {(
                      [
                        { value: "name", label: "Drug Name" },
                        { value: "din", label: "DIN" },
                        { value: "category", label: "Benefit Category" },
                      ] as const
                    ).map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        className={`w-full text-left px-3 py-1.5 text-[10px] hover:bg-teal-50 transition-colors first:rounded-t-lg last:rounded-b-lg ${
                          approvedSearchFilterType === option.value
                            ? "bg-teal-50 font-medium"
                            : ""
                        }`}
                        style={
                          approvedSearchFilterType === option.value
                            ? { color: "#00373a" }
                            : {}
                        }
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
                  value={
                    isApprovedDropdownOpen
                      ? approvedSearchQuery
                      : approvedDisplayValue
                  }
                  placeholder={
                    approvedSearchFilterType === "name"
                      ? "Search by drug name..."
                      : approvedSearchFilterType === "din"
                        ? "Search by DIN..."
                        : "Search by benefit category..."
                  }
                  className={`w-full pl-9 pr-9 py-1.5 border rounded-lg text-[12px] whitespace-nowrap focus:outline-none focus:ring-2 focus:border-transparent ${
                    !approvedMedication && !isApprovedDropdownOpen
                      ? ""
                      : "border-slate-300"
                  }`}
                  style={
                    { "--tw-ring-color": "#00373a" } as React.CSSProperties
                  }
                  ref={approvedInputRef}
                  onFocus={() => {
                    setIsApprovedDropdownOpen(true);
                    setApprovedSearchQuery("");
                  }}
                  onChange={(e) => setApprovedSearchQuery(e.target.value)}
                />
                {approvedMedication && !isApprovedDropdownOpen && (
                  <button
                    onClick={() => {
                      setApprovedMedication(null);
                      setApprovedSearchQuery("");
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
                      <span className="text-[10px] text-slate-500">
                        {approvedFilteredMedications.length} result
                        {approvedFilteredMedications.length !== 1 ? "s" : ""}{" "}
                        for "{approvedSearchQuery}"
                      </span>
                    </div>
                  )}
                  {approvedFilteredMedications.length === 0 ? (
                    <div className="px-4 py-6 text-center text-[10px] text-slate-400">
                      No medications found matching your search.
                    </div>
                  ) : (
                    approvedFilteredMedications.map((med) => (
                      <button
                        key={med.id}
                        type="button"
                        className={`w-full text-left px-3 py-2 hover:bg-green-50 transition-colors border-b border-slate-50 last:border-b-0 ${
                          approvedMedication?.id === med.id ? "bg-green-50" : ""
                        }`}
                        onClick={() => {
                          setApprovedMedication(med);
                          setIsApprovedDropdownOpen(false);
                          setApprovedSearchQuery("");
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Pill
                              className="w-4 h-4 shrink-0"
                              style={{ color: "#00373a" }}
                            />
                            <span className="text-[12px] text-slate-900">
                              {highlightMatch(med.name, approvedSearchQuery)}{" "}
                              <span className="text-slate-500">
                                (
                                {highlightMatch(
                                  med.generic,
                                  approvedSearchQuery,
                                )}
                                )
                              </span>
                            </span>
                          </div>
                          {approvedMedication?.id === med.id && (
                            <CheckCircle2 className="w-4 h-4 shrink-0 text-green-600" />
                          )}
                        </div>
                        <div className="flex items-center gap-2.5 mt-1 ml-6">
                          <span className="text-[9px] text-slate-500">
                            DIN: {highlightMatch(med.din, approvedSearchQuery)}
                          </span>
                          <span className="text-[9px] text-slate-400">|</span>
                          <span className="text-[9px] text-slate-500">
                            {highlightMatch(med.strength, approvedSearchQuery)}
                          </span>
                          <span className="text-[9px] text-slate-400">|</span>
                          <span className="text-[9px] text-slate-500">
                            {highlightMatch(
                              med.benefitCategory,
                              approvedSearchQuery,
                            )}
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
            <div className="flex items-center gap-2 h-6">
              <label className="text-xs font-medium text-slate-600">
                Disease Diagnosis
              </label>
            </div>
            <input
              type="text"
              value={diseaseDiagnosis}
              onChange={(e) => setDiseaseDiagnosis(e.target.value)}
              placeholder="Enter diagnosis code"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:border-transparent"
              style={{ "--tw-ring-color": "#00373a" } as React.CSSProperties}
            />
          </div>
        </div>

      </div>

      {/* Assessment Summary Checklist */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-[15px] font-semibold text-slate-900">
            Assessment Verification
          </h3>
        </div>
        <div className="border border-slate-200 rounded-sm overflow-hidden">
          <table className="w-full text-sm table-fixed">
            <colgroup>
              <col style={{ width: "240px" }} />
              <col style={{ width: "360px" }} />
              <col />
            </colgroup>
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/50">
                <th className="py-1.5 px-3 text-left text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                  Criteria
                </th>
                <th className="py-1.5 px-3 text-left text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                  Response
                </th>
                <th className="py-1.5 px-3 text-center text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-slate-50 border-b border-slate-200">
                <td colSpan={3} className="px-3 py-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-[13px] font-semibold text-slate-800">
                        Plan Member Information
                      </span>
                      <span
                        className={`text-[10px] font-semibold uppercase tracking-wide px-1.5 py-0.5 rounded border ${
                          assessmentAllChecked
                            ? "ui-badge-success"
                            : "ui-badge-info"
                        }`}
                      >
                        {assessmentAllChecked ? "Verified" : "Pending"}
                      </span>
                    </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setChecklist((prev) => {
                          const allChecked = assessmentItems.every(
                            (item) => prev[item.key],
                          );
                          const next = { ...prev };
                          assessmentItems.forEach((item) => {
                            next[item.key] = !allChecked;
                          });
                          return next;
                        });
                      }}
                      className="px-2.5 py-1 text-[11px] font-medium rounded border transition-colors hover:bg-slate-50"
                      style={{ color: "#00373a", borderColor: "#00373a" }}
                    >
                      Verify
                    </button>
                  </div>
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
                      className={`transition-colors ${checklist[item.key] ? "text-slate-500" : "text-slate-700"}`}
                    >
                      {item.label}
                    </span>
                  </td>
                  <td className="py-2 px-3 text-left">
                    {item.showValue && item.value ? (
                      <span className="text-[11px] text-slate-500 px-1.5 py-0.5 rounded truncate max-w-[250px] inline-block">
                        {item.value}
                      </span>
                    ) : item.showValue && !item.value ? (
                      <span className="text-[11px] ui-text-warning px-1.5 py-0.5 rounded italic">
                        Not provided
                      </span>
                    ) : (
                      <span className="text-[11px] text-slate-400">—</span>
                    )}
                  </td>
                  <td className="py-2 px-3">
                    <div className="flex items-center justify-center">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                        className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-600 hover:text-slate-900 transition-colors"
                      >
                        Update
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              <tr className="bg-slate-50 border-b border-t border-slate-200">
                <td colSpan={3} className="px-3 py-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-[13px] font-semibold text-slate-800">
                        Mock Claim Details
                      </span>
                      <span
                        className={`text-[10px] font-semibold uppercase tracking-wide px-1.5 py-0.5 rounded border ${
                          coverageAllChecked
                            ? "ui-badge-success"
                            : "ui-badge-info"
                        }`}
                      >
                        {coverageAllChecked ? "Acknowledged" : "Pending"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setChecklist((prev) => {
                            const allChecked = coverageItems.every(
                              (item) => prev[item.key],
                            );
                            const next = { ...prev };
                            coverageItems.forEach((item) => {
                              next[item.key] = !allChecked;
                            });
                            return next;
                          });
                        }}
                        className="px-2.5 py-1 text-[11px] font-medium rounded border transition-colors hover:bg-slate-50"
                        style={{ color: "#00373a", borderColor: "#00373a" }}
                      >
                        Acknowledge
                      </button>
                    </div>
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
                      className={`transition-colors ${checklist[item.key] ? "text-slate-500" : "text-slate-700"}`}
                    >
                      {item.label}
                    </span>
                  </td>
                  <td className="py-2 px-3 text-left">
                    {item.key === "mockClaimSummary" ? (
                      <span className="inline-flex flex-col items-start text-[11px] px-2 py-1 text-slate-500">
                        <span className="font-medium">Failed on</span>
                        <span>BEL 0400: Not a benefit</span>
                        <span>BEL 02800: Prior Authorization Required</span>
                      </span>
                    ) : (
                      <span className="text-[11px] text-slate-700 px-1.5 py-0.5 rounded">
                        {item.response}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
              <tr className="bg-slate-50 border-b border-t border-slate-200">
                <td colSpan={3} className="px-3 py-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-[13px] font-semibold text-slate-800">
                        Decision Summary
                      </span>
                      <span
                        className={`text-[10px] font-semibold uppercase tracking-wide px-1.5 py-0.5 rounded border ${
                          decisionAllChecked
                            ? "ui-badge-success"
                            : "ui-badge-info"
                        }`}
                      >
                        {decisionAllChecked ? "Verified" : "Pending"}
                      </span>
                    </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setChecklist((prev) => {
                          const allChecked = decisionItems.every(
                            (item) => prev[item.key],
                          );
                          const next = { ...prev };
                          decisionItems.forEach((item) => {
                            next[item.key] = !allChecked;
                          });
                          return next;
                        });
                      }}
                      className="px-2.5 py-1 text-[11px] font-medium rounded border transition-colors hover:bg-slate-50"
                      style={{ color: "#00373a", borderColor: "#00373a" }}
                    >
                      Verify
                    </button>
                  </div>
                </div>
                </td>
              </tr>
              {decisionItems.map((item) => (
                <tr
                  key={item.key}
                  className="hover:bg-slate-50 transition-colors"
                >
                  <td className="py-2 px-3">
                    <span
                      className={`transition-colors ${checklist[item.key] ? "text-slate-500" : "text-slate-700"}`}
                    >
                      {item.label}
                    </span>
                  </td>
                  <td className="py-2 px-3 text-left">
                    <span className="text-[11px] text-slate-400">—</span>
                  </td>
                  <td className="py-2 px-3">
                    <div className="flex items-center justify-center">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                        className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-600 hover:text-slate-900 transition-colors"
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

      {/* Action Buttons */}
      <div className="flex items-center gap-2 pt-3">
        <button
          className="px-4 py-2 text-sm text-white rounded-lg font-medium transition-colors"
          style={{ backgroundColor: "#00373a" }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.9")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
          Save
        </button>
        <button className="px-4 py-2 text-sm bg-white text-slate-700 border border-slate-300 rounded-lg font-medium hover:bg-slate-50 transition-colors">
          Save and Close
        </button>
        <button className="px-4 py-2 text-sm bg-white text-slate-700 border border-slate-300 rounded-lg font-medium hover:bg-slate-50 transition-colors">
          Cancel
        </button>
      </div>
    </div>
  );
}
