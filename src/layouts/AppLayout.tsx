import { Outlet } from 'react-router-dom';
import { HeaderBar } from '../components/HeaderBar';
import { Navigation } from '../components/Navigation';

export function AppLayout() {
  return (
    <div className="flex h-screen flex-col bg-slate-50">
      <HeaderBar />
      <div className="flex flex-1 min-h-0 overflow-hidden">
        <Navigation />
        <main className="flex-1 min-h-0 min-w-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
