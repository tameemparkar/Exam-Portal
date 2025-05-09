import type { RouteObject } from 'react-router';

import { Outlet } from 'react-router';
import { lazy, Suspense } from 'react';

import { CONFIG } from 'src/global-config';
import { DashboardLayout } from 'src/layouts/dashboard';

import { LoadingScreen } from 'src/components/loading-screen';

import { AuthGuard } from 'src/auth/guard';

import { usePathname } from '../hooks';

// ----------------------------------------------------------------------

const Dashboard = lazy(() => import('src/pages/dashboard/dashboard'));
const TestBuilder = lazy(() => import('src/pages/dashboard/testbuilder'));
const Exams = lazy(() => import('src/pages/dashboard/exams'));
const MyTests = lazy(() => import('src/pages/dashboard/mytests'));
const Reports = lazy(() => import('src/pages/dashboard/reports'));
const Students = lazy(() => import('src/pages/dashboard/students'));

// ----------------------------------------------------------------------

function SuspenseOutlet() {
  const pathname = usePathname();
  return (
    <Suspense key={pathname} fallback={<LoadingScreen />}>
      <Outlet />
    </Suspense>
  );
}

const dashboardLayout = () => (
  <DashboardLayout>
    <SuspenseOutlet />
  </DashboardLayout>
);

export const dashboardRoutes: RouteObject[] = [
  {
    path: 'dashboard',
    element: CONFIG.auth.skip ? dashboardLayout() : <AuthGuard>{dashboardLayout()}</AuthGuard>,
    children: [
      { element: <Dashboard />, index: true },
      { path: 'testbuilder', element: <TestBuilder /> },
      { path: 'exams', element: <Exams /> },
      { path: 'mytests', element: <MyTests /> },
      { path: 'reports', element: <Reports /> },
      { path: 'students', element: <Students /> },

      {
        path: 'group',
        children: [
          { element: <MyTests />, index: true },
          { path: 'five', element: <Reports /> },
          { path: 'six', element: <Students /> },
        ],
      },
    ],
  },
];
