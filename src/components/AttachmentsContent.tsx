import { FileText, Download, Eye, Upload, FolderInput, Plus, Trash2, Mail } from 'lucide-react';
import { useState } from 'react';

export interface AttachmentFile {
  id: string;
  name: string;
  size: string;
  date: string;
  type: 'PDF' | 'Image';
  url: string;
  pages?: number;
}

interface AttachmentsContentProps {
  compact?: boolean;
  attachments?: AttachmentFile[];
  selectedAttachmentId?: string;
  onSelectAttachment?: (attachment: AttachmentFile) => void;
}

const DEFAULT_ATTACHMENTS: AttachmentFile[] = [
  {
    id: 'att-1',
    name: 'Semaglutide_Ozempic_Form.pdf',
    size: '245 KB',
    date: 'Feb 1, 2026',
    type: 'PDF',
    url: '/docs/semaglutide-ozempic.pdf',
    pages: 7,
  },
  {
    id: 'att-2',
    name: 'Lab_Results_20260125.pdf',
    size: '189 KB',
    date: 'Jan 25, 2026',
    type: 'PDF',
    url: '/docs/semaglutide-ozempic.pdf',
    pages: 3,
  },
  {
    id: 'att-3',
    name: 'Clinical_Notes.pdf',
    size: '324 KB',
    date: 'Jan 20, 2026',
    type: 'PDF',
    url: '/docs/semaglutide-ozempic.pdf',
    pages: 2,
  },
  {
    id: 'att-4',
    name: 'Insurance_Card.pdf',
    size: '1.2 MB',
    date: 'Jan 15, 2026',
    type: 'PDF',
    url: '/docs/semaglutide-ozempic.pdf',
    pages: 1,
  },
];

export function AttachmentsContent({
  compact = false,
  attachments = DEFAULT_ATTACHMENTS,
  selectedAttachmentId,
  onSelectAttachment,
}: AttachmentsContentProps) {
  const [selectedFiles, setSelectedFiles] = useState<Set<string>>(new Set());
  const [sharedFiles, setSharedFiles] = useState<Set<string>>(new Set(['att-1', 'att-3']));

  const toggleShared = (id: string) => {
    setSharedFiles((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const toggleFile = (id: string) => {
    setSelectedFiles((prev) => {
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
      setSelectedFiles(new Set(attachments.map((a) => a.id)));
    }
  };

  const hasSelection = selectedFiles.size > 0;
  const buttonPadding = compact ? 'px-1.5 py-1' : 'px-2 py-1.5';
  const buttonTextSize = 'text-xs lg:text-sm';

  return (
    <div
      className={compact ? 'p-2.5 space-y-2 rounded-lg border border-slate-200' : 'p-3 space-y-3'}
    >
      <div className="flex items-center justify-between">
        <div>
          <h2
            className={
              compact
                ? 'text-base font-semibold text-slate-900'
                : 'text-2xl font-semibold text-slate-900 mb-2'
            }
          >
            Attachments
          </h2>
        </div>
      </div>

      {/* Action bar */}
      <div className="flex flex-col items-start gap-1.5 sm:flex-row sm:items-center sm:justify-between">
        <div className={`flex flex-wrap items-center gap-2 ${buttonTextSize}`}>
          <button
            className={`flex items-center gap-2 ${buttonPadding} text-white rounded-lg font-medium transition-colors`}
            style={{ backgroundColor: '#00373a' }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.9')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
          >
            <Plus className="w-4 h-4" />
            Create New
          </button>
          <button
            disabled={!hasSelection}
            className={`flex items-center gap-2 ${buttonPadding} border rounded-lg font-medium transition-colors ${hasSelection ? 'border-red-300 text-red-600 hover:bg-red-50' : 'border-slate-200 text-slate-400 cursor-not-allowed'}`}
          >
            <Trash2 className="w-4 h-4" />
            Remove Files
          </button>
          <button
            disabled={!hasSelection}
            className={`flex items-center gap-2 ${buttonPadding} border rounded-lg font-medium transition-colors ${hasSelection ? 'border-slate-300 text-slate-700 hover:bg-slate-100' : 'border-slate-200 text-slate-400 cursor-not-allowed'}`}
          >
            <Mail className="w-4 h-4" />
            Email Files
          </button>
          <div className="hidden sm:block w-px h-6 bg-slate-300" />
          <button
            className={`flex items-center gap-2 ${buttonPadding} border border-slate-300 text-slate-700 rounded-lg font-medium transition-colors hover:bg-slate-100`}
          >
            <FolderInput className="w-4 h-4" />
            Import Files
          </button>
          <button
            className={`flex items-center gap-2 ${buttonPadding} text-white rounded-lg font-medium transition-colors`}
            style={{ backgroundColor: '#00373a' }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.9')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
          >
            <Upload className="w-4 h-4" />
            Upload File
          </button>
        </div>
        {hasSelection && (
          <span className={compact ? 'text-xs text-slate-500' : 'text-sm text-slate-500'}>
            {selectedFiles.size} file{selectedFiles.size !== 1 ? 's' : ''} selected
          </span>
        )}
      </div>

      {/* File list */}
      <div className="space-y-1.5">
        {/* Select all header */}
        <div className="flex items-center gap-2 px-2 py-1">
          <input
            type="checkbox"
            checked={attachments.length > 0 && selectedFiles.size === attachments.length}
            onChange={toggleAll}
            className="w-4 h-4 rounded border-slate-300 accent-[#00373a] cursor-pointer"
          />
          <span className="text-xs text-slate-500 lg:text-sm">Select all</span>
        </div>

        {attachments.map((file) => (
          <div
            key={file.id}
            className={`flex items-center justify-between p-1.5 border rounded-lg transition-colors cursor-pointer ${
              selectedAttachmentId === file.id
                ? 'ring-1 ring-[#00373a] border-[#00373a]/40 bg-[#00373a]/5'
                : selectedFiles.has(file.id)
                  ? 'border-[#00373a]/30 bg-[#00373a]/5'
                  : 'border-slate-200 hover:bg-slate-50'
            }`}
            onClick={() => onSelectAttachment?.(file)}
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <input
                type="checkbox"
                checked={selectedFiles.has(file.id)}
                onChange={() => toggleFile(file.id)}
                onClick={(e) => e.stopPropagation()}
                className="w-4 h-4 rounded border-slate-300 accent-[#00373a] cursor-pointer"
              />
              <div className="text-xs font-medium text-slate-900 truncate lg:text-sm">
                {file.name}
              </div>
            </div>
            <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => toggleShared(file.id)}
                className={`relative inline-flex h-4.5 w-8 shrink-0 items-center rounded-full transition-colors ${
                  sharedFiles.has(file.id) ? 'bg-[#00373a]' : 'bg-slate-300'
                }`}
                role="switch"
                aria-checked={sharedFiles.has(file.id)}
              >
                <span
                  className={`inline-block h-3 w-3 rounded-full bg-white shadow-sm transition-transform ${
                    sharedFiles.has(file.id) ? 'translate-x-4' : 'translate-x-0.5'
                  }`}
                />
              </button>
              <button className="p-1.5 hover:bg-slate-100 rounded transition-colors">
                <Download className="w-4 h-4 text-slate-600" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
