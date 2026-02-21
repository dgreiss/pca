import { useState } from 'react';
import { Search, User, Phone, Mail, Calendar, MapPin, Shield, ChevronDown, Pencil, Check, X } from 'lucide-react';

export function MemberPanel() {
  const [searchFilter, setSearchFilter] = useState('all');
  const [filterOpen, setFilterOpen] = useState(false);
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

  const filterOptions = [
    { value: 'all', label: 'All Fields' },
    { value: 'name', label: 'Member Name' },
    { value: 'memberId', label: 'Member ID' },
    { value: 'altId', label: 'Alternate ID' },
    { value: 'dob', label: 'Date of Birth' },
  ];

  const placeholders: Record<string, string> = {
    all: 'Search members...',
    name: 'Search by name...',
    memberId: 'Search by Member ID...',
    altId: 'Search by Alternate ID...',
    dob: 'Search by DOB (MM/DD/YYYY)...',
  };

  const selectedLabel = filterOptions.find(o => o.value === searchFilter)?.label ?? 'All Fields';

  return (
    <div className="w-80 bg-white border-r border-slate-200 flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-slate-200">
        <h1 className="text-lg font-semibold text-slate-900 mb-4">Member Details</h1>
        
        {/* Search */}
        <div className="space-y-2">
          <div className="relative">
            <button
              onClick={() => setFilterOpen(!filterOpen)}
              className="flex items-center gap-1 text-xs text-slate-600 bg-slate-100 hover:bg-slate-200 px-2 py-1 rounded transition-colors"
            >
              <span className="text-slate-400">Search by:</span> {selectedLabel}
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>
            {filterOpen && (
              <div className="absolute top-full left-0 mt-1 bg-white border border-slate-200 rounded-lg shadow-lg z-20 py-1 min-w-[160px]">
                {filterOptions.map(option => (
                  <button
                    key={option.value}
                    onClick={() => { setSearchFilter(option.value); setFilterOpen(false); }}
                    className={`w-full text-left px-3 py-1.5 text-sm hover:bg-slate-50 transition-colors ${
                      searchFilter === option.value ? 'text-slate-900 bg-slate-50' : 'text-slate-600'
                    }`}
                    style={searchFilter === option.value ? { color: '#00373a', fontWeight: 500 } : undefined}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder={placeholders[searchFilter]}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:border-transparent"
              style={{ '--tw-ring-color': '#00373a' } as React.CSSProperties}
            />
          </div>
        </div>
      </div>

      {/* Member Info */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Profile Section */}
        <div className="flex items-start gap-4">
          <div className="flex-1 min-w-0">
            <h2 className="font-semibold text-slate-900">John Doe</h2>
            <p className="text-sm text-slate-500">Member ID: 12345678</p>
            <p className="text-sm text-slate-500">Alternate ID: ALT-87654321</p>
          </div>
        </div>

        {/* Quick Stats */}
        <div>
          <div className="bg-slate-50 rounded-lg p-3 space-y-2">
            <div>
              <div className="text-xs text-slate-500 mb-1">Status</div>
              <div className="text-sm font-semibold text-green-600">Active</div>
            </div>
            <div className="border-t border-slate-200 pt-2 grid grid-cols-2 gap-3">
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
        </div>

        {/* Personal Details */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-slate-900">Personal Details</h3>
          
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

        {/* Contact Information */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-slate-900">Contact Information</h3>
          
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
                      <label className="text-xs text-slate-500 mb-0.5 block">Address Line 1</label>
                      <input
                        type="text"
                        value={editAddress.line1}
                        onChange={(e) => setEditAddress({ ...editAddress, line1: e.target.value })}
                        className="w-full px-2 py-1 border border-slate-300 rounded text-sm text-slate-700 focus:outline-none focus:ring-2 focus:border-transparent"
                        style={{ '--tw-ring-color': '#00373a' } as React.CSSProperties}
                        placeholder="Street address"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-slate-500 mb-0.5 block">Address Line 2</label>
                      <input
                        type="text"
                        value={editAddress.line2}
                        onChange={(e) => setEditAddress({ ...editAddress, line2: e.target.value })}
                        className="w-full px-2 py-1 border border-slate-300 rounded text-sm text-slate-700 focus:outline-none focus:ring-2 focus:border-transparent"
                        style={{ '--tw-ring-color': '#00373a' } as React.CSSProperties}
                        placeholder="Apt, suite, unit (optional)"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-slate-500 mb-0.5 block">City</label>
                      <input
                        type="text"
                        value={editAddress.city}
                        onChange={(e) => setEditAddress({ ...editAddress, city: e.target.value })}
                        className="w-full px-2 py-1 border border-slate-300 rounded text-sm text-slate-700 focus:outline-none focus:ring-2 focus:border-transparent"
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
                          onChange={(e) => setEditAddress({ ...editAddress, province: e.target.value })}
                          className="w-full px-2 py-1 border border-slate-300 rounded text-sm text-slate-700 focus:outline-none focus:ring-2 focus:border-transparent"
                          style={{ '--tw-ring-color': '#00373a' } as React.CSSProperties}
                          placeholder="Province"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-slate-500 mb-0.5 block">Postal Code</label>
                        <input
                          type="text"
                          value={editAddress.postalCode}
                          onChange={(e) => setEditAddress({ ...editAddress, postalCode: e.target.value })}
                          className="w-full px-2 py-1 border border-slate-300 rounded text-sm text-slate-700 focus:outline-none focus:ring-2 focus:border-transparent"
                          style={{ '--tw-ring-color': '#00373a' } as React.CSSProperties}
                          placeholder="Postal code"
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => { setAddress(editAddress); setEditingAddress(false); }}
                        className="p-1 rounded hover:bg-green-50 text-green-600 transition-colors"
                        title="Save"
                      >
                        <Check className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => { setEditAddress(address); setEditingAddress(false); }}
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
                      <div>{address.city}, {address.province} {address.postalCode}</div>
                    </div>
                    <button
                      onClick={() => { setEditAddress({ ...address }); setEditingAddress(true); }}
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
                  <span className={`text-xs ${useAsClaimAddress ? 'text-[#00373a]' : 'text-slate-400'}`}>
                    {useAsClaimAddress ? 'Yes' : 'No'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Insurance Information */}
        <div className="space-y-3">
          
          <div className="bg-slate-50 rounded-lg p-3 space-y-2">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4" style={{ color: '#00373a' }} />
              <div className="flex-1">
                <div className="text-xs text-slate-500">Org Code</div>
                <div className="text-sm text-slate-700">ORG-001</div>
              </div>
            </div>
            <div className="border-t border-slate-200 pt-2 space-y-2">
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

        {/* Preferred Pharmacy - removed */}
      </div>
    </div>
  );
}