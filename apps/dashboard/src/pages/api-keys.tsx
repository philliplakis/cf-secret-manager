import { Ai21 } from '@/components/beste/piece/ai21';


export function ApiKeysPage() {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between gap-1">
      <Ai21 label="OPENAI_API_KEY" value="sk-proj-8fK2p3nR4vX7qW9sL1mT6bY0aZ" />
      <p className="text-muted-foreground text-xs">Expires at: 2026-06-07 12:00:00</p>
      </div>
    </div>
  );
}
