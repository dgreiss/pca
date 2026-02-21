import { AssessmentContent } from './AssessmentContent';
import { AttachmentsContent } from './AttachmentsContent';
import { ActivityContent } from './ActivityContent';
import { NotesContent } from './NotesContent';
import { RelatedSubmissionsContent } from './RelatedSubmissionsContent';
import { ClaimHistoryContent } from './ClaimHistoryContent';
import { ExceptionsContent } from './ExceptionsContent';
import { MockClaimContent } from './MockClaimContent';
import { DecisionCodesContent } from './DecisionCodesContent';

interface ContentPanelProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function ContentPanel({ activeTab }: ContentPanelProps) {
  return (
    <div className="flex-1 overflow-y-auto bg-white min-w-0">
      {activeTab === 'assessment' && <AssessmentContent />}
      {activeTab === 'attachments' && <AttachmentsContent />}
      {activeTab === 'activity' && <ActivityContent />}
      {activeTab === 'notes' && <NotesContent />}
      {activeTab === 'claim-history' && <ClaimHistoryContent />}
      {activeTab === 'exceptions' && <ExceptionsContent />}
      {activeTab === 'mock-claim' && <MockClaimContent />}
      {activeTab === 'related-submissions' && <RelatedSubmissionsContent />}
      {activeTab === 'decision-codes' && <DecisionCodesContent />}
    </div>
  );
}