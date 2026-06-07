import { Navigate, Outlet } from 'react-router-dom';
import { authClient } from '@/lib/auth-client';

export function AuthLayout() {
  const { data: session, isPending } = authClient.useSession();
  if (isPending) {
    return <div>Loading...</div>;
  }
  if (session) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex min-h-svh items-center justify-center bg-background p-4 text-foreground">
      <div className="w-full max-w-md">
        <Outlet />
      </div>
    </div>
  );
}
