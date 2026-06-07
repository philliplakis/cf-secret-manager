import { Browser25 } from '@/components/beste/piece/browser25';
import { Browser8 } from '@/components/beste/piece/browser8';

export function DashboardHomePage() {
  return (
    <div className="flex flex-row gap-2 items-start">
      <div className="flex flex-col gap-1">
        <Browser8 method="GET" path="/api/users" status={200} time="142ms" size="3.4 KB" />
        <Browser8 method="POST" path="/api/users" status={201} time="142ms" size="3.4 KB" />
        <Browser8 method="PUT" path="/api/users" status={200} time="142ms" size="3.4 KB" />
        <Browser8 method="DELETE" path="/api/users" status={200} time="142ms" size="3.4 KB" />
      </div>
      <div className="flex flex-col gap-1">
        <Browser25
          level="info"
          time="12:04:18"
          source="app.js:247"
          message="Uncaught TypeError: Cannot read properties of undefined"
        />
        <Browser25
          level="warn"
          time="12:04:18"
          source="app.js:247"
          message="Uncaught TypeError: Cannot read properties of undefined"
        />
        <Browser25
          level="error"
          time="12:04:18"
          source="app.js:247"
          message="Uncaught TypeError: Cannot read properties of undefined"
        />
      </div>
    </div>
  );
}
