import { useState, useCallback } from 'react';
import { authService } from '../services/auth-service';
import type { LoginCredentials, AuthState } from '../types/auth.types';

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    token: authService.getToken(),
    isAuthenticated: authService.isAuthenticated(),
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = useCallback(async (credentials: LoginCredentials) => {
    setIsLoading(true);
    setError(null);

    try {
      const { token } = await authService.login(credentials);
      authService.saveToken(token);

      setAuthState({
        user: null,
        token,
        isAuthenticated: true,
      });

      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Login failed. Please try again.';
      setError(message);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    authService.removeToken();
    setAuthState({
      user: null,
      token: null,
      isAuthenticated: false,
    });
  }, []);

  return {
    ...authState,
    isLoading,
    error,
    login,
    logout,
  };
}
