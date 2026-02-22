import { useEffect, useRef, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import workerSrc from 'pdfjs-dist/build/pdf.worker.min.mjs?url';
import {
  FileText,
  ZoomIn,
  ZoomOut,
  RotateCw,
  RotateCcw,
  Download,
  Maximize2,
  ChevronDown,
} from 'lucide-react';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

const DOCUMENTS = [
  {
    id: 'doc-1001',
    title: 'Semaglutide (Ozempic) Form',
    type: 'PDF',
    url: '/docs/semaglutide-ozempic.pdf',
    pages: 7,
    updated: 'Feb 22, 2026',
    status: 'Submitted',
  },
];

export function DocumentViewerPanel() {
  const [selectedDoc, setSelectedDoc] = useState(DOCUMENTS[0]);
  const [zoom, setZoom] = useState(100);
  const [rotation, setRotation] = useState(0);
  const [numPages, setNumPages] = useState<number | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPreviewExpanded, setIsPreviewExpanded] = useState(false);
  const [containerWidth, setContainerWidth] = useState(0);
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  const isPdf = selectedDoc.type === 'PDF';
  const isImage = selectedDoc.type === 'PNG';

  useEffect(() => {
    setNumPages(null);
  }, [selectedDoc]);

  useEffect(() => {
    const node = previewRef.current;
    if (!node) return;

    const observer = new ResizeObserver((entries) => {
      if (entries[0]) {
        setContainerWidth(entries[0].contentRect.width);
      }
    });

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="flex-1 min-w-0 min-h-0 border-r border-slate-200 bg-white flex flex-col">
      <div className="p-6 shrink-0">
        <label className="text-xs font-medium text-slate-500">
          Select document
        </label>
        <div className="mt-2 relative w-full" ref={menuRef}>
          <button
            ref={triggerRef}
            type="button"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="w-full text-left text-sm text-slate-900 bg-white border border-slate-300 rounded-lg px-3 py-2 pr-9 focus:outline-none focus:ring-2 focus:border-transparent transition-colors hover:border-slate-400"
            style={{ '--tw-ring-color': '#00373a' } as React.CSSProperties}
          >
            <span className="block truncate">
              {selectedDoc.title} • {selectedDoc.type} • {selectedDoc.pages} pages
            </span>
            <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
          </button>
          {isMenuOpen && (
            <div className="absolute inset-x-0 top-full mt-1 z-30 w-full min-w-full bg-white border border-slate-200 rounded-lg shadow-lg overflow-auto">
              <div className="max-h-64 overflow-y-auto">
                {DOCUMENTS.map((doc) => (
                  <button
                    key={doc.id}
                    type="button"
                    onClick={() => {
                      setSelectedDoc(doc);
                      setIsMenuOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-sm transition-colors ${
                      selectedDoc.id === doc.id
                        ? 'bg-slate-50 text-slate-900'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div className="font-medium">{doc.title}</div>
                    <div className="text-[11px] text-slate-500">
                      {doc.type} • {doc.pages} pages
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 min-h-0 p-6 flex"
            style={{'overflow': 'auto'} as React.CSSProperties }>
        <div
          className={`bg-slate-50 flex flex-col flex-1 min-h-0 border border-slate-200 rounded-lg transition-shadow ${
            isPreviewExpanded ? 'ring-2 ring-slate-300' : ''
          }`}
        >
          <div className="px-3 py-2 border-b border-slate-200 bg-white flex items-center justify-between shrink-0">
            <div>
              <div className="text-sm font-semibold text-slate-900">
                {selectedDoc.title}
              </div>
              <div className="text-[11px] text-slate-500">
                {selectedDoc.type} • {selectedDoc.pages} pages
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setZoom((prev) => Math.max(50, prev - 10))}
                className="p-1.5 rounded hover:bg-slate-100 text-slate-500"
                title="Zoom out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="text-[11px] text-slate-500 w-10 text-center">
                {zoom}%
              </span>
              <button
                type="button"
                onClick={() => setZoom((prev) => Math.min(100, prev + 10))}
                className="p-1.5 rounded hover:bg-slate-100 text-slate-500"
                title="Zoom in"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setRotation((prev) => (prev - 90 + 360) % 360)}
                className="p-1.5 rounded hover:bg-slate-100 text-slate-500"
                title="Rotate counterclockwise"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setRotation((prev) => (prev + 90) % 360)}
                className="p-1.5 rounded hover:bg-slate-100 text-slate-500"
                title="Rotate"
              >
                <RotateCw className="w-4 h-4" />
              </button>
              <button
                type="button"
                className="p-1.5 rounded hover:bg-slate-100 text-slate-500"
                title={isPreviewExpanded ? 'Exit focus view' : 'Focus preview'}
                onClick={() => setIsPreviewExpanded((prev) => !prev)}
              >
                <Maximize2 className="w-4 h-4" />
              </button>
              <button
                type="button"
                className="p-1.5 rounded hover:bg-slate-100 text-slate-500"
                title="Download"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div
            ref={previewRef}
            className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden bg-gradient-to-br from-slate-100 via-white to-slate-100"
          >
            {isPdf ? (
              <div className="w-full p-4">
                <Document
                  file={selectedDoc.url}
                  onLoadSuccess={({ numPages }) => setNumPages(numPages)}
                >
                  {Array.from(new Array(numPages || 0), (_, index) => {
                    const pageWidth = Math.max(0, containerWidth - 32) * (zoom / 100);
                    return (
                      <Page
                        key={`page_${index + 1}`}
                        pageNumber={index + 1}
                        width={pageWidth > 0 ? pageWidth : undefined}
                        rotate={rotation}
                        renderTextLayer={false}
                        renderAnnotationLayer={false}
                        className="mb-6"
                      />
                    );
                  })}
                </Document>
              </div>
            ) : isImage ? (
              <div className="min-h-full w-full flex items-center justify-center p-6">
                <img
                  src={selectedDoc.url}
                  alt={selectedDoc.title}
                  className="max-h-full max-w-full"
                  style={{ transform: `scale(${zoom / 100}) rotate(${rotation}deg)` }}
                />
              </div>
            ) : (
              <div className="min-h-full w-full flex items-center justify-center p-6">
                <div
                  className="w-48 h-56 bg-white border border-slate-200 shadow-sm rounded-md flex items-center justify-center text-xs text-slate-400"
                  style={{ transform: `scale(${zoom / 100}) rotate(${rotation}deg)` }}
                >
                  Document Preview
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
