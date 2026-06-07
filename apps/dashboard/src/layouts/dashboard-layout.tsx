import { Navigate, Outlet, useMatches } from 'react-router-dom';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';
import { AppSidebar } from '@/components/app-sidebar';
import { useMainStore } from '@/state/main';
type RouteHandle = {
  title?: string;
};

export function DashboardLayout() {
  const { isAuthenticated } = useMainStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  const matches = useMatches();
  const match = [...matches]
    .reverse()
    .find((m) => Boolean((m.handle as RouteHandle | undefined)?.title));
  const title = (match?.handle as RouteHandle | undefined)?.title ?? 'Dashboard';

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-12 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <h1 className="text-sm font-medium">{title}</h1>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
