import { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { DocumentViewerPanel } from '../components/DocumentViewerPanel';
import { AssessmentContent } from '../components/AssessmentContent';
import { AssessmentVerificationContent } from '../components/AssessmentVerificationContent';
import { AssessmentDatesOverview } from '../components/AssessmentDatesOverview';
import { type AttachmentFile } from '../components/AttachmentsContent';

const ATTACHMENTS: AttachmentFile[] = [
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

export function IntakePage() {
  const [showIntakeId, setShowIntakeId] = useState(false);
  const [selectedAttachment, setSelectedAttachment] = useState<AttachmentFile | null>(
    ATTACHMENTS[0],
  );
  const intakeId = '4e55f6ff-c50b-495b-afd8-be4f7a7c323f';
  const assessmentId = '850234';
  const submissionId = '1008741';

  return (
    <div className="flex h-full flex-col">
      <div className="flex flex-1 min-h-0 min-w-0 flex-col overflow-hidden lg:flex-row">
        <div className="flex min-h-0 min-w-0 flex-col lg:basis-[65%] lg:shrink-0">
          <div className="shrink-0 border-r border-b border-slate-200 bg-white px-4 py-3">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs">
                <span className="text-slate-500">Submission ID</span>
                <span className="font-semibold text-slate-900">{submissionId}</span>
                <span className="text-slate-300">/</span>
                <span className="text-slate-500">Assessment ID</span>
                <span className="font-semibold text-slate-900">{assessmentId}</span>
                <div className="ml-1 inline-flex h-5 items-center rounded-md bg-green-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-green-700">
                  Open
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowIntakeId((prev) => !prev)}
                className="inline-flex items-center rounded px-1.5 py-1 text-xs text-slate-600 hover:bg-slate-100"
                title={showIntakeId ? 'Hide Intake ID' : 'Show Intake ID'}
              >
                {showIntakeId ? (
                  <ChevronDown className="h-3.5 w-3.5 text-slate-500" />
                ) : (
                  <ChevronRight className="h-3.5 w-3.5 text-slate-500" />
                )}
              </button>
            </div>
            {showIntakeId && (
              <div className="mt-1.5 space-y-2">
                <div className="text-xs">
                  <span className="text-slate-500">Intake ID</span>
                  <span className="ml-2 font-semibold text-slate-900">{intakeId}</span>
                </div>
                <AssessmentDatesOverview />
              </div>
            )}
          </div>
          <DocumentViewerPanel
            attachments={ATTACHMENTS}
            selectedAttachment={selectedAttachment}
            onSelectAttachment={setSelectedAttachment}
          />
        </div>
        <div className="flex min-h-0 min-w-0 flex-1 lg:basis-[35%]">
          <div className="flex-1 min-h-0 overflow-y-auto bg-white min-w-0">
            <AssessmentContent />
          </div>
        </div>
      </div>
    </div>
  );
}
