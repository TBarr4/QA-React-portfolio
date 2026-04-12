export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

export interface ApiErrorResponse {
  message: string;
  status: number;
  errors?: Record<string, string[]>;
}

export type LoadingState = 'idle' | 'loading' | 'success' | 'error';
