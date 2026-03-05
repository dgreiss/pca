import { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { HeaderBar } from './components/HeaderBar';
import { Navigation } from './components/Navigation';
import { DocumentViewerPanel } from './components/DocumentViewerPanel';
import { Dashboard } from './components/Dashboard';
import { AssessmentContent } from './components/AssessmentContent';
import { AssessmentVerificationContent } from './components/AssessmentVerificationContent';

function App() {
  const [activeNav, setActiveNav] = useState('home');
  const [showIntakeId, setShowIntakeId] = useState(true);
  const isDashboard = activeNav === 'dashboard';
  const isIntake = activeNav === 'intake';
  const intakeId = '4e55f6ff-c50b-495b-afd8-be4f7a7c323f';
  const assessmentId = '850234';
  const submissionId = '1008741';

  return (
    <div className="flex h-screen flex-col bg-slate-50">
      <HeaderBar />
      <div className="flex flex-1 min-h-0 overflow-hidden">
        <Navigation activeItem={activeNav} onSelect={setActiveNav} />
        <main className="flex-1 min-h-0 min-w-0">
          {isDashboard ? (
            <Dashboard />
          ) : isIntake ? (
            <div className="flex h-full flex-col">
              <div className="flex flex-1 min-h-0 min-w-0 flex-col overflow-hidden lg:flex-row">
                <div className="flex min-h-0 min-w-0 flex-col lg:basis-[70%] lg:shrink-0">
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
                      <div className="mt-1.5 text-xs">
                        <span className="text-slate-500">Intake ID</span>
                        <span className="ml-2 font-semibold text-slate-900">{intakeId}</span>
                      </div>
                    )}
                  </div>
                  <DocumentViewerPanel />
                </div>
                <div className="flex min-h-0 min-w-0 flex-1 lg:basis-[30%]">
                  <div className="flex-1 min-h-0 overflow-y-auto bg-white min-w-0">
                    <AssessmentContent />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex h-full items-center justify-center bg-slate-50 px-6"></div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
