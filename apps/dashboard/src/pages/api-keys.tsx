import { ChevronLeft, ChevronRight, Plus, Trash2 } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';

import { ApiKeyRevealSheet } from '@/components/api-key-reveal-sheet';
import { CreateApiKeySheet } from '@/components/create-api-key-sheet';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { authClient } from '@/lib/auth-client';
import {
  type ApiKeyRecord,
  API_KEY_DEFAULT_CONFIG_ID,
  API_KEY_LIST_LIMIT,
  API_KEY_LIST_SORT_BY,
  API_KEY_LIST_SORT_DIRECTION,
  formatApiKeyExpiry,
  formatApiKeyPreview,
  parseApiKeyMetadata,
} from '@/lib/api-keys';

export function ApiKeysPage() {
  const [apiKeys, setApiKeys] = useState<ApiKeyRecord[]>([]);
  const [total, setTotal] = useState(0);
  const [offset, setOffset] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [createOpen, setCreateOpen] = useState(false);
  const [revealedKey, setRevealedKey] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const loadApiKeys = useCallback(async () => {
    setIsLoading(true);
    setLoadError(null);

    const { data, error } = await authClient.apiKey.list({
      query: {
        limit: API_KEY_LIST_LIMIT,
        offset,
        sortBy: API_KEY_LIST_SORT_BY,
        sortDirection: API_KEY_LIST_SORT_DIRECTION,
      },
    });

    setIsLoading(false);

    if (error) {
      setLoadError(error.message ?? 'Failed to load API keys.');
      return;
    }

    setApiKeys((data?.apiKeys as ApiKeyRecord[] | undefined) ?? []);
    setTotal(data?.total ?? 0);
  }, [offset]);

  useEffect(() => {
    void loadApiKeys();
  }, [loadApiKeys]);

  function handleCreated(key: string) {
    setRevealedKey(key);

    if (offset === 0) {
      void loadApiKeys();
      return;
    }

    setOffset(0);
  }

  async function handleDelete(apiKey: ApiKeyRecord) {
    const label = apiKey.name ?? 'this API key';
    if (!window.confirm(`Delete "${label}"? This cannot be undone.`)) {
      return;
    }

    setDeletingId(apiKey.id);
    setLoadError(null);

    const { error } = await authClient.apiKey.delete({
      configId: apiKey.configId ?? API_KEY_DEFAULT_CONFIG_ID,
      keyId: apiKey.id,
    });

    setDeletingId(null);

    if (error) {
      setLoadError(error.message ?? 'Failed to delete API key.');
      return;
    }

    if (apiKeys.length === 1 && offset > 0) {
      setOffset((current) => Math.max(0, current - API_KEY_LIST_LIMIT));
      return;
    }

    void loadApiKeys();
  }

  const pageStart = total === 0 ? 0 : offset + 1;
  const pageEnd = Math.min(offset + API_KEY_LIST_LIMIT, total);
  const hasPreviousPage = offset > 0;
  const hasNextPage = offset + API_KEY_LIST_LIMIT < total;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-sm font-medium">API Keys</h2>
          <p className="text-xs text-muted-foreground">
            Create keys for programmatic access to the Secret Manager API.
          </p>
        </div>
        <Button onClick={() => setCreateOpen(true)}>
          <Plus />
          Create API key
        </Button>
      </div>

      {isLoading ? (
        <p className="text-sm text-muted-foreground">Loading API keys...</p>
      ) : loadError ? (
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-destructive">{loadError}</p>
          </CardContent>
        </Card>
      ) : apiKeys.length === 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>No API keys yet</CardTitle>
            <CardDescription>
              Create your first key to authenticate API requests from scripts and services.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => setCreateOpen(true)}>
              <Plus />
              Create API key
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="flex flex-col gap-3">
          {apiKeys.map((apiKey) => {
            const metadata = parseApiKeyMetadata(apiKey.metadata);

            return (
              <Card key={apiKey.id}>
                <CardHeader className="gap-2">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <CardTitle>{apiKey.name ?? 'Unnamed key'}</CardTitle>
                      <CardDescription className="font-mono">
                        {formatApiKeyPreview(apiKey)}
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-3">
                      <p className="text-xs text-muted-foreground">
                        Expires: {formatApiKeyExpiry(apiKey.expiresAt)}
                      </p>
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        disabled={deletingId === apiKey.id}
                        onClick={() => void handleDelete(apiKey)}
                      >
                        <Trash2 />
                        {deletingId === apiKey.id ? 'Deleting...' : 'Delete'}
                      </Button>
                    </div>
                  </div>
                  {(metadata.useCase || metadata.env) && (
                    <div className="flex flex-wrap gap-2">
                      {metadata.useCase ? (
                        <Badge variant="outline" color="sky">
                          useCase: {metadata.useCase}
                        </Badge>
                      ) : null}
                      {metadata.env ? (
                        <Badge variant="outline" color="indigo">
                          env: {metadata.env}
                        </Badge>
                      ) : null}
                    </div>
                  )}
                </CardHeader>
              </Card>
            );
          })}

          {total > API_KEY_LIST_LIMIT ? (
            <div className="flex items-center justify-between gap-4 pt-2">
              <p className="text-xs text-muted-foreground">
                Showing {pageStart}-{pageEnd} of {total}
              </p>
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={!hasPreviousPage}
                  onClick={() => setOffset((current) => Math.max(0, current - API_KEY_LIST_LIMIT))}
                >
                  <ChevronLeft />
                  Previous
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={!hasNextPage}
                  onClick={() => setOffset((current) => current + API_KEY_LIST_LIMIT)}
                >
                  Next
                  <ChevronRight />
                </Button>
              </div>
            </div>
          ) : null}
        </div>
      )}

      <CreateApiKeySheet open={createOpen} onOpenChange={setCreateOpen} onCreated={handleCreated} />
      <ApiKeyRevealSheet
        apiKey={revealedKey}
        onOpenChange={(open) => {
          if (!open) {
            setRevealedKey(null);
          }
        }}
      />
    </div>
  );
}
