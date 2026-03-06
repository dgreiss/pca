import { Component, useEffect, useRef, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import workerSrc from 'pdfjs-dist/build/pdf.worker.min.mjs?url';
import { AttachmentsContent, type AttachmentFile } from './AttachmentsContent';
import { FileText, ZoomIn, ZoomOut, RotateCw, RotateCcw, Download, Maximize2 } from 'lucide-react';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

if (typeof URL !== 'undefined' && !('parse' in URL)) {
  (URL as unknown as { parse?: (url: string, base?: string) => URL }).parse = (url, base) =>
    new URL(url, base);
}

class PdfErrorBoundary extends Component<
  { children: React.ReactNode },
  { hasError: boolean; message?: string }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, message: error.message };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="text-sm text-red-500">{this.state.message ?? 'Unable to load PDF'}</div>
      );
    }

    return this.props.children;
  }
}

interface DocumentViewerPanelProps {
  attachments: AttachmentFile[];
  selectedAttachment?: AttachmentFile | null;
  onSelectAttachment: (attachment: AttachmentFile) => void;
}

export function DocumentViewerPanel({
  attachments,
  selectedAttachment,
  onSelectAttachment,
}: DocumentViewerPanelProps) {
  const [zoom, setZoom] = useState(100);
  const [rotation, setRotation] = useState(0);
  const [numPages, setNumPages] = useState<number | null>(null);
  const [isPreviewExpanded, setIsPreviewExpanded] = useState(false);
  const [containerWidth, setContainerWidth] = useState(0);
  const [loadError, setLoadError] = useState<string | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  const selectedDoc = selectedAttachment;
  const isPdf = selectedDoc?.type === 'PDF';
  const isImage = selectedDoc?.type === 'Image';

  useEffect(() => {
    setNumPages(null);
    setLoadError(null);
  }, [selectedDoc?.id]);

  useEffect(() => {
    const node = previewRef.current;
    if (!node) return;

    const updateWidth = () => {
      setContainerWidth(node.clientWidth);
    };

    updateWidth();

    const observer = new ResizeObserver(() => {
      updateWidth();
    });

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex-1 min-w-0 min-h-0 border-r border-slate-200 bg-white flex flex-col">
      <div className="p-3 pb-0 shrink-0">
        <AttachmentsContent
          compact
          attachments={attachments}
          selectedAttachmentId={selectedAttachment?.id}
          onSelectAttachment={onSelectAttachment}
        />
      </div>
      <div className="flex-1 min-h-0 p-3 flex overflow-hidden">
        <div
          className={`bg-slate-50 flex flex-col flex-1 min-h-0 border border-slate-200 rounded-lg transition-shadow ${
            isPreviewExpanded ? 'ring-2 ring-slate-300' : ''
          }`}
        >
          <div className="px-2 py-1.5 border-b border-slate-200 bg-white flex items-center justify-between shrink-0">
            <div>
              {selectedDoc ? (
                <>
                  <div className="text-sm font-semibold text-slate-900">{selectedDoc.name}</div>
                  <div className="text-[11px] text-slate-500">
                    {selectedDoc.type}
                    {selectedDoc.pages ? ` • ${selectedDoc.pages} pages` : ''}
                  </div>
                </>
              ) : (
                <>
                  <div className="text-sm font-semibold text-slate-900">No attachment selected</div>
                  <div className="text-[11px] text-slate-500">
                    Select an attachment from the list to preview it here
                  </div>
                </>
              )}
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
              <span className="text-[11px] text-slate-500 w-10 text-center">{zoom}%</span>
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
            className="flex-1 min-h-[1100px] h-full overflow-y-auto overflow-x-hidden bg-gradient-to-br from-slate-100 via-white to-slate-100"
          >
            {!selectedDoc ? (
              <div className="min-h-full w-full flex items-center justify-center p-6">
                <div className="w-64 rounded-lg border border-dashed border-slate-300 bg-white/70 p-5 text-center">
                  <FileText className="mx-auto mb-2 h-5 w-5 text-slate-400" />
                  <p className="text-sm font-medium text-slate-700">No attachment selected</p>
                  <p className="mt-1 text-xs text-slate-500">
                    Click an attachment in the right panel to load it in the viewer.
                  </p>
                </div>
              </div>
            ) : isPdf ? (
              <div className="min-h-full w-full p-2">
                {containerWidth > 0 ? (
                  <PdfErrorBoundary>
                    <Document
                      file={selectedDoc.url}
                      onLoadSuccess={({ numPages }) => {
                        setNumPages(numPages);
                        setLoadError(null);
                      }}
                      onLoadError={(error) => {
                        setLoadError(error?.message ?? 'Unable to load PDF');
                      }}
                    >
                      {loadError ? (
                        <div className="text-sm text-red-500">{loadError}</div>
                      ) : (
                        Array.from(new Array(numPages || 0), (_, index) => {
                          const pageWidth = Math.max(0, containerWidth - 32) * (zoom / 100);
                          return (
                            <Page
                              key={`page_${index + 1}`}
                              pageNumber={index + 1}
                              width={pageWidth > 0 ? pageWidth : undefined}
                              rotate={rotation}
                              renderTextLayer={false}
                              renderAnnotationLayer={false}
                              className="mb-3"
                            />
                          );
                        })
                      )}
                    </Document>
                  </PdfErrorBoundary>
                ) : (
                  <div className="text-sm text-slate-400">Loading preview…</div>
                )}
              </div>
            ) : isImage ? (
              <div className="min-h-full w-full flex items-center justify-center p-6">
                <img
                  src={selectedDoc.url}
                  alt={selectedDoc.name}
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
