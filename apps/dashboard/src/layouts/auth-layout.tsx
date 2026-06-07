import { Outlet } from 'react-router-dom';

export function AuthLayout() {
  return (
    <div className="flex min-h-svh items-center justify-center bg-background p-4 text-foreground">
      <div className="w-full max-w-md">
        <Outlet />
      </div>
    </div>
  );
}
