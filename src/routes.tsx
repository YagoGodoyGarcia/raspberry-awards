import { createBrowserRouter } from 'react-router-dom';
import SidebarLayout from './components/SidebarLayout';
import Dashboard from './pages/Dashboard';
import Movies from './pages/Movies';

const router = createBrowserRouter([
  {
    path: '/',
    element: <SidebarLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'list', element: <Movies /> },
    ],
  },
]);

export default router;
