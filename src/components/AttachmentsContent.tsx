import { FileText, Download, Eye, Upload, FolderInput, Plus, Trash2, Mail } from 'lucide-react';
import { useState } from 'react';

export function AttachmentsContent() {
  const attachments = [
    { id: 1, name: 'Prescription_20260201.pdf', size: '245 KB', date: 'Feb 1, 2026', type: 'PDF' },
    { id: 2, name: 'Lab_Results_20260125.pdf', size: '189 KB', date: 'Jan 25, 2026', type: 'PDF' },
    { id: 3, name: 'Clinical_Notes.pdf', size: '324 KB', date: 'Jan 20, 2026', type: 'PDF' },
    { id: 4, name: 'Insurance_Card.jpg', size: '1.2 MB', date: 'Jan 15, 2026', type: 'Image' },
  ];

  const [selectedFiles, setSelectedFiles] = useState<Set<number>>(new Set());
  const [sharedFiles, setSharedFiles] = useState<Set<number>>(new Set([1, 3]));

  const toggleShared = (id: number) => {
    setSharedFiles(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const toggleFile = (id: number) => {
    setSelectedFiles(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const toggleAll = () => {
    if (selectedFiles.size === attachments.length) {
      setSelectedFiles(new Set());
    } else {
      setSelectedFiles(new Set(attachments.map(a => a.id)));
    }
  };

  const hasSelection = selectedFiles.size > 0;

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900 mb-2">Attachments</h2>
          <p className="text-sm text-slate-500">Documents and files related to this assessment</p>
        </div>
      </div>

      {/* Action bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 text-sm">
          <button className="flex items-center gap-2 p-2 text-white rounded-lg font-medium transition-colors" style={{ backgroundColor: '#00373a' }} onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'} onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}>
            <Plus className="w-4 h-4" />
            Create New
          </button>
          <button
            disabled={!hasSelection}
            className={`flex items-center gap-2 p-2 border rounded-lg font-medium transition-colors ${hasSelection ? 'border-red-300 text-red-600 hover:bg-red-50' : 'border-slate-200 text-slate-400 cursor-not-allowed'}`}
          >
            <Trash2 className="w-4 h-4" />
            Remove Files
          </button>
          <button
            disabled={!hasSelection}
            className={`flex items-center gap-2 p-2 border rounded-lg font-medium transition-colors ${hasSelection ? 'border-slate-300 text-slate-700 hover:bg-slate-100' : 'border-slate-200 text-slate-400 cursor-not-allowed'}`}
          >
            <Mail className="w-4 h-4" />
            Email Files
          </button>
          <div className="w-px h-6 bg-slate-300" />
          <button className="flex items-center gap-2 p-2 border border-slate-300 text-slate-700 rounded-lg font-medium transition-colors hover:bg-slate-100">
            <FolderInput className="w-4 h-4" />
            Import Files
          </button>
          <button className="flex items-center gap-2 p-2 text-white rounded-lg font-medium transition-colors" style={{ backgroundColor: '#00373a' }} onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'} onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}>
            <Upload className="w-4 h-4" />
            Upload File
          </button>
        </div>
        {hasSelection && (
          <span className="text-sm text-slate-500">{selectedFiles.size} file{selectedFiles.size !== 1 ? 's' : ''} selected</span>
        )}
      </div>

      {/* File list */}
      <div className="space-y-2">
        {/* Select all header */}
        <div className="flex items-center gap-3 px-4 py-2">
          <input
            type="checkbox"
            checked={selectedFiles.size === attachments.length}
            onChange={toggleAll}
            className="w-4 h-4 rounded border-slate-300 accent-[#00373a] cursor-pointer"
          />
          <span className="text-sm text-slate-500">Select all</span>
        </div>

        {attachments.map((file) => (
          <div
            key={file.id}
            className={`flex items-center justify-between p-2 border rounded-lg transition-colors cursor-pointer ${
              selectedFiles.has(file.id)
                ? 'border-[#00373a]/30 bg-[#00373a]/5'
                : 'border-slate-200 hover:bg-slate-50'
            }`}
            onClick={() => toggleFile(file.id)}
          >
            <div className="flex items-center gap-4">
              <input
                type="checkbox"
                checked={selectedFiles.has(file.id)}
                onChange={() => toggleFile(file.id)}
                onClick={(e) => e.stopPropagation()}
                className="w-4 h-4 rounded border-slate-300 accent-[#00373a] cursor-pointer"
              />
              <div>
                <div className="text-sm font-medium text-slate-900">{file.name}</div>
                <div className="text-sm text-slate-500">{file.size}</div>
              </div>
            </div>
            <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center gap-2 mr-3 border-r border-slate-200 pr-3">
                <span className="text-xs text-slate-500">{sharedFiles.has(file.id) ? 'Shared' : 'Not shared'}</span>
                <button
                  onClick={() => toggleShared(file.id)}
                  className={`relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors ${
                    sharedFiles.has(file.id) ? 'bg-[#00373a]' : 'bg-slate-300'
                  }`}
                  role="switch"
                  aria-checked={sharedFiles.has(file.id)}
                >
                  <span
                    className={`inline-block h-3.5 w-3.5 rounded-full bg-white shadow-sm transition-transform ${
                      sharedFiles.has(file.id) ? 'translate-x-[18px]' : 'translate-x-[3px]'
                    }`}
                  />
                </button>
              </div>
              <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                <Download className="w-4 h-4 text-slate-600" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}