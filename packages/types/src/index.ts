export type SecretId = string;

export type Secret = {
  id: SecretId;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export type ApiResponse<T> = {
  data: T;
  error?: string;
};
