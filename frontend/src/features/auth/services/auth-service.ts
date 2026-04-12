import { httpClient } from '@infrastructure/api/http-client';
import type { LoginCredentials, LoginResponse, AuthUser } from '../types/auth.types';

export const authService = {
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    const response = await httpClient.post<LoginResponse>('/auth/login', credentials);
    return response;
  },

  async getUser(userId: number): Promise<AuthUser> {
    return httpClient.get<AuthUser>(`/users/${userId}`);
  },

  saveToken(token: string): void {
    localStorage.setItem('auth_token', token);
  },

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  },

  removeToken(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
  },

  isAuthenticated(): boolean {
    return !!localStorage.getItem('auth_token');
  },
};
