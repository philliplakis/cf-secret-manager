import type { ApiResponse, Secret } from '@cfsm/types';

export type CfsmClientOptions = {
  baseUrl: string;
  apiKey?: string;
};

export class CfsmClient {
  constructor(private readonly options: CfsmClientOptions) {}

  async listSecrets(): Promise<Secret[]> {
    const response = await fetch(`${this.options.baseUrl}/secrets`, {
      headers: this.headers(),
    });
    const body = (await response.json()) as ApiResponse<Secret[]>;
    return body.data;
  }

  private headers(): HeadersInit {
    const headers: Record<string, string> = {
      Accept: 'application/json',
    };
    if (this.options.apiKey) {
      headers.Authorization = `Bearer ${this.options.apiKey}`;
    }
    return headers;
  }
}
