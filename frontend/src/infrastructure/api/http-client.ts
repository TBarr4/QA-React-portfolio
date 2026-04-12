import ENV from '../config/env';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface RequestConfig {
  headers?: Record<string, string>;
  params?: Record<string, string>;
  signal?: AbortSignal;
}

class HttpClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private getAuthHeaders(): Record<string, string> {
    const token = localStorage.getItem('auth_token');
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  private buildUrl(endpoint: string, params?: Record<string, string>): string {
    const url = new URL(`${this.baseUrl}${endpoint}`);
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, value);
      });
    }
    return url.toString();
  }

  private async request<T>(
    method: HttpMethod,
    endpoint: string,
    body?: unknown,
    config?: RequestConfig
  ): Promise<T> {
    const url = this.buildUrl(endpoint, config?.params);

    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...this.getAuthHeaders(),
        ...config?.headers,
      },
      body: body ? JSON.stringify(body) : undefined,
      signal: config?.signal,
    });

    if (!response.ok) {
      const errorBody = await response.json().catch(() => null);
      throw new ApiError(response.status, response.statusText, errorBody);
    }

    return response.json();
  }

  get<T>(endpoint: string, config?: RequestConfig): Promise<T> {
    return this.request<T>('GET', endpoint, undefined, config);
  }

  post<T>(endpoint: string, body?: unknown, config?: RequestConfig): Promise<T> {
    return this.request<T>('POST', endpoint, body, config);
  }

  put<T>(endpoint: string, body?: unknown, config?: RequestConfig): Promise<T> {
    return this.request<T>('PUT', endpoint, body, config);
  }

  delete<T>(endpoint: string, config?: RequestConfig): Promise<T> {
    return this.request<T>('DELETE', endpoint, undefined, config);
  }
}

export class ApiError extends Error {
  constructor(
    public status: number,
    public statusText: string,
    public body: unknown
  ) {
    super(`API Error: ${status} ${statusText}`);
    this.name = 'ApiError';
  }
}

export const httpClient = new HttpClient(ENV.API_BASE_URL);

export default HttpClient;
