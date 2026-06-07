import { Ai21 } from '@/components/beste/piece/ai21';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';

type ApiKeyRevealSheetProps = {
  apiKey: string | null;
  onOpenChange: (open: boolean) => void;
};

export function ApiKeyRevealSheet({ apiKey, onOpenChange }: ApiKeyRevealSheetProps) {
  return (
    <Sheet open={Boolean(apiKey)} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Save your API key</SheetTitle>
          <SheetDescription>
            Copy this key now. For security, it will not be shown again.
          </SheetDescription>
        </SheetHeader>
        <div className="px-4 py-2">{apiKey ? <Ai21 label="API_KEY" value={apiKey} /> : null}</div>
        <SheetFooter>
          <Button onClick={() => onOpenChange(false)}>Done</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
