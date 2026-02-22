import { useState } from 'react';
import { Navigation } from './components/Navigation';
import { HeaderBar } from './components/HeaderBar';
import { ToastBanners } from './components/ToastBanners';
import { TabSidebar } from './components/TabSidebar';
import { DocumentViewerPanel } from './components/DocumentViewerPanel';
import { ContentPanel } from './components/ContentPanel';
import { DetailsPanel } from './components/DetailsPanel';

function App() {
  const [activeTab, setActiveTab] = useState('assessment');

  return (
    <div className="flex flex-col h-screen bg-slate-50">
      {/* Full-width Header Bar */}
      <HeaderBar />

      {/* Below header: sidebar + tab sidebar + content */}
        <div className="flex flex-1 min-h-0 overflow-hidden">
        {/* Navigation Sidebar */}
        <Navigation />

        {/* Tab Sidebar - extends from header to bottom */}
        <TabSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-h-0 min-w-0">
          {/* Toast Banners */}
          <ToastBanners />

          <div className="flex flex-1 min-h-0 overflow-hidden min-w-0">
            {/* Content */}
            <ContentPanel activeTab={activeTab} setActiveTab={setActiveTab} />

            {/* Member Panel */}
            <DocumentViewerPanel />

            {/* Details Panel */}
            <DetailsPanel />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
