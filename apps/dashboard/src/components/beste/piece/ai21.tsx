import { useState } from 'react';
import { Copy, Eye, EyeOff, KeyRound } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Ai21Props {
  label: string;
  value: string;
  className?: string;
}

export function Ai21({ label = 'API_KEY', value, className }: Ai21Props) {
  const [shown, setShown] = useState(false);
  const [copied, setCopied] = useState(false);
  const masked = value.slice(0, 3) + '•'.repeat(Math.max(8, value.length - 3));

  async function handleCopy() {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className={cn('relative flex size-full items-center justify-center', className)}>
      <div className="flex w-full flex-col gap-1.5">
        <div className="flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
          <KeyRound className="size-3" aria-hidden="true" />
          <span>{label}</span>
        </div>
        <div className="flex items-center gap-1 rounded-md border border-border bg-card px-3 py-2">
          <span className="flex-1 truncate font-mono text-xs text-card-foreground">
            {shown ? value : masked}
          </span>
          <button
            type="button"
            onClick={() => setShown((s) => !s)}
            className="flex size-6 items-center justify-center rounded text-muted-foreground hover:bg-muted hover:text-foreground"
            aria-label={shown ? 'Hide' : 'Show'}
          >
            {shown ? <EyeOff className="size-3.5" /> : <Eye className="size-3.5" />}
          </button>
          <button
            type="button"
            onClick={handleCopy}
            className="flex size-6 items-center justify-center rounded text-muted-foreground hover:bg-muted hover:text-foreground"
            aria-label={copied ? 'Copied' : 'Copy'}
          >
            <Copy className="size-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
