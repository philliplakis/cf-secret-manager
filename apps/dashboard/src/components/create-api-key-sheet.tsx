import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { authClient } from '@/lib/auth-client';
import {
  API_KEY_EXPIRY_OPTIONS,
  API_KEY_PREFIX,
  DEFAULT_API_KEY_EXPIRY,
  generateApiKeyName,
} from '@/lib/api-keys';
import { cn } from '@/lib/utils';

const createApiKeySchema = z.object({
  name: z.string().min(1, 'Name is required.'),
  expiresIn: z.enum([
    API_KEY_EXPIRY_OPTIONS[0].value,
    API_KEY_EXPIRY_OPTIONS[1].value,
    API_KEY_EXPIRY_OPTIONS[2].value,
    API_KEY_EXPIRY_OPTIONS[3].value,
    API_KEY_EXPIRY_OPTIONS[4].value,
  ]),
  useCase: z.string().optional(),
  env: z.string().optional(),
});

type CreateApiKeyValues = z.infer<typeof createApiKeySchema>;

type CreateApiKeySheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreated: (key: string) => void;
};

const selectClassName = cn(
  'h-8 w-full min-w-0 rounded-none border border-input bg-transparent px-2.5 py-1 text-xs transition-colors outline-none focus-visible:border-ring focus-visible:ring-1 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-1 aria-invalid:ring-destructive/20 dark:bg-input/30',
);

export function CreateApiKeySheet({ open, onOpenChange, onCreated }: CreateApiKeySheetProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<CreateApiKeyValues>({
    resolver: zodResolver(createApiKeySchema),
    defaultValues: {
      name: generateApiKeyName(),
      expiresIn: DEFAULT_API_KEY_EXPIRY,
      useCase: '',
      env: '',
    },
  });

  useEffect(() => {
    if (open) {
      form.reset({
        name: generateApiKeyName(),
        expiresIn: DEFAULT_API_KEY_EXPIRY,
        useCase: '',
        env: '',
      });
      form.clearErrors();
    }
  }, [open, form]);

  async function onSubmit(data: CreateApiKeyValues) {
    setIsSubmitting(true);
    form.clearErrors('root');

    const metadata: Record<string, string> = {};
    const useCase = data.useCase?.trim();
    const env = data.env?.trim();

    if (useCase) {
      metadata.useCase = useCase;
    }
    if (env) {
      metadata.env = env;
    }

    const { data: result, error } = await authClient.apiKey.create({
      name: data.name,
      expiresIn: data.expiresIn === 'never' ? undefined : Number(data.expiresIn),
      prefix: API_KEY_PREFIX,
      ...(Object.keys(metadata).length > 0 ? { metadata } : {}),
    });

    setIsSubmitting(false);

    if (error) {
      form.setError('root', { message: error.message ?? 'Failed to create API key.' });
      return;
    }

    if (!result?.key) {
      form.setError('root', { message: 'API key was created but no key value was returned.' });
      return;
    }

    onCreated(result.key);
    onOpenChange(false);
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Create API key</SheetTitle>
          <SheetDescription>
            Generate a new API key for programmatic access. The full key is only shown once.
          </SheetDescription>
        </SheetHeader>
        <form className="flex flex-1 flex-col" onSubmit={form.handleSubmit(onSubmit)} noValidate>
          <div className="flex-1 overflow-y-auto px-4 py-2">
            <FieldGroup>
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="api-key-name">Name</FieldLabel>
                    <Input
                      {...field}
                      id="api-key-name"
                      placeholder="cfsm-2026-06-07-a1b2c3d4"
                      autoComplete="off"
                      aria-invalid={fieldState.invalid}
                    />
                    <FieldDescription>
                      Auto-generated on open. You can rename it before creating.
                    </FieldDescription>
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
              <Controller
                name="expiresIn"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="api-key-expires-in">Expiration</FieldLabel>
                    <select
                      {...field}
                      id="api-key-expires-in"
                      className={selectClassName}
                      aria-invalid={fieldState.invalid}
                    >
                      {API_KEY_EXPIRY_OPTIONS.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
              <Controller
                name="useCase"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="api-key-use-case">Use case</FieldLabel>
                    <Input
                      {...field}
                      id="api-key-use-case"
                      placeholder="ci-deploy"
                      autoComplete="off"
                      aria-invalid={fieldState.invalid}
                    />
                    <FieldDescription>Optional metadata field.</FieldDescription>
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
              <Controller
                name="env"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="api-key-env">Environment</FieldLabel>
                    <Input
                      {...field}
                      id="api-key-env"
                      placeholder="production"
                      autoComplete="off"
                      aria-invalid={fieldState.invalid}
                    />
                    <FieldDescription>Optional metadata field.</FieldDescription>
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
              {form.formState.errors.root && <FieldError errors={[form.formState.errors.root]} />}
            </FieldGroup>
          </div>
          <SheetFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Creating...' : 'Create API key'}
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}
