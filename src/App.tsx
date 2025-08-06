import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ConfigProvider } from 'antd';
import { antdTheme } from './config';
import { Layout } from '@shared-components/layout/Layout';
import { ProtectedRoute } from '@shared-components/guards/ProtectedRoute';
import { LoadingSpinner } from '@shared-components/common/LoadingSpinner';
import { LookupProvider } from './shared/contexts/LookupContext';
import './config/i18n';
import { useUser } from '@features/auth/hooks/useUser';
import { PAGES } from '@shared-constants/pages';
import { useRTL } from './shared/hooks/useRTL';

// Helper function for lazy loading components
const lazyLoad = (importFunc: () => Promise<any>, componentName: string) =>
  lazy(() => importFunc().then(module => ({ default: module[componentName] })));

// Lazy load all pages
const Dashboard = lazyLoad(() => import('@/features/dashboard/Dashboard'), 'Dashboard');
const Cases = lazyLoad(() => import('@/features/cases/Cases'), 'Cases');
const Calendar = lazyLoad(() => import('@/features/calendar/Calendar'), 'Calendar');
const Admin = lazyLoad(() => import('@/features/admin/Admin'), 'Admin');
const NotFound = lazyLoad(() => import('@shared-components/common/NotFound'), 'NotFound');

// Route configuration
const routes = [
  {
    path: PAGES.DASHBOARD,
    element: Dashboard,
    protected: true,
  },
  {
    path: PAGES.CASES,
    element: Cases,
    protected: true,
  },
  {
    path: PAGES.CALENDAR,
    element: Calendar,
    protected: true,
  },
  {
    path: PAGES.ADMIN,
    element: Admin,
    protected: true,
    requiredRoles: ['ADMIN'],
  },
];

// Loading component for Suspense fallback
const PageLoading: React.FC = () => (
  <div className="flex items-center justify-center min-h-screen">
    <LoadingSpinner />
  </div>
);

// Authentication loading component
const AuthLoading: React.FC = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="text-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
      <p className="text-gray-600">Loading user information...</p>
    </div>
  </div>
);

// Unauthorized component
const Unauthorized: React.FC = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="text-center">
      <h1 className="text-2xl font-bold text-primary mb-4">
        Access Denied
      </h1>
      <p className="text-gray-600">
        You don't have permission to access this application.
      </p>
    </div>
  </div>
);

// Separate component to handle authentication check inside QueryClientProvider
const AppContent: React.FC = () => {
  const { isAuthenticated, isLoading, error } = useUser();

  if (isLoading) return <AuthLoading />;
  if (error || !isAuthenticated) return <Unauthorized />;

  return (
    <Router future={{ v7_relativeSplatPath: true, v7_startTransition: true }}>
      <Suspense fallback={<PageLoading />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to={`/${PAGES.CASES}`} replace />} />
            {routes.map(({ path, element: Element, protected: isProtected, requiredRoles }) => (
              <Route
                key={path}
                path={path}
                element={
                  isProtected ? (
                    <ProtectedRoute 
                      requiredRoles={requiredRoles}
                      isLoading={isLoading}
                      isAuthenticated={isAuthenticated}
                    >
                      <Element />
                    </ProtectedRoute>
                  ) : (
                    <Element />
                  )
                }
              />
            ))}
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

const App: React.FC = () => {
  const direction = useRTL();

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000, // 5 minutes
        gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
        retry: 1,
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider direction={direction} theme={antdTheme}>
        <LookupProvider>
          <AppContent />
        </LookupProvider>
      </ConfigProvider>
    </QueryClientProvider>
  );
};

export default App;
