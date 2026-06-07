import { createBrowserRouter, Navigate } from 'react-router-dom';
import { DashboardLayout } from '@/layouts/dashboard-layout';
import { AuthLayout } from '@/layouts/auth-layout';
import { DashboardHomePage } from '@/pages/dashboard-home';
import { LoginPage } from '@/pages/login';
import { SecretsPage } from '@/pages/secrets';
import { SettingsPage } from '@/pages/settings';
import { SignupPage } from '@/pages/signup';
import { ApiKeysPage } from '@/pages/api-keys';

export const router = createBrowserRouter([
  {
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <DashboardHomePage />,
        handle: { title: 'Dashboard' },
      },
      {
        path: 'secrets',
        element: <SecretsPage />,
        handle: { title: 'Secrets' },
      },
      {
        path: 'api-keys',
        element: <ApiKeysPage />,
        handle: { title: 'API Keys' },
      },
      {
        path: 'settings',
        element: <SettingsPage />,
        handle: { title: 'Settings' },
      },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      { path: 'login', element: <LoginPage /> },
      { path: 'signup', element: <SignupPage /> },
    ],
  },
  { path: '*', element: <Navigate to="/" replace /> },
]);
