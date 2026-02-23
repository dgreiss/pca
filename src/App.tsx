import { useState } from 'react';
import { HeaderBar } from './components/HeaderBar';
import { Navigation } from './components/Navigation';
import { ToastBanners } from './components/ToastBanners';
import { TabSidebar } from './components/TabSidebar';
import { ContentPanel } from './components/ContentPanel';
import { DocumentViewerPanel } from './components/DocumentViewerPanel';
import { DetailsPanel } from './components/DetailsPanel';
import { Dashboard } from './components/Dashboard';

function App() {
  const [activeNav, setActiveNav] = useState('dashboard');
  const [activeTab, setActiveTab] = useState('assessment');
  const isDashboard = activeNav === 'dashboard';

  return (
    <div className="flex h-screen flex-col bg-slate-50">
      <HeaderBar />
      <div className="flex flex-1 min-h-0 overflow-hidden">
        <Navigation activeItem={activeNav} onSelect={setActiveNav} />
        <main className="flex-1 min-h-0 min-w-0">
          {isDashboard ? (
            <Dashboard />
          ) : (
            <div className="flex h-full flex-col">
              <ToastBanners />
              <TabSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
              <div className="flex flex-1 min-h-0 overflow-hidden min-w-0">
                <ContentPanel activeTab={activeTab} setActiveTab={setActiveTab} />
                <DocumentViewerPanel />
                <DetailsPanel />
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
