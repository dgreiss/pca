import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { AppLayout } from './layouts/AppLayout';
import { IntakePage } from './pages/IntakePage';
import { ReportsPage } from './pages/ReportsPage';
import { PlaceholderPage } from './pages/PlaceholderPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <Navigate to="/intake" replace /> },
      { path: 'intake', element: <IntakePage /> },
      { path: 'reports', element: <ReportsPage /> },
      { path: 'search', element: <PlaceholderPage title="Search" /> },
      { path: 'assessments/home', element: <PlaceholderPage title="Assessments Home" /> },
      { path: 'assessments/queue', element: <PlaceholderPage title="Queue" /> },
      { path: 'assessments/ppn', element: <PlaceholderPage title="PPN" /> },
      {
        path: 'assessments/pharm-consult',
        element: <PlaceholderPage title="Pharm Consult" />,
      },
      { path: '*', element: <Navigate to="/intake" replace /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
