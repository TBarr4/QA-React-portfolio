import { useState, useCallback } from 'react';
import type { LoadingState } from '../types/api.types';

interface UseApiState<T> {
  data: T | null;
  error: string | null;
  state: LoadingState;
}

interface UseApiReturn<T> extends UseApiState<T> {
  execute: (...args: unknown[]) => Promise<T | undefined>;
  reset: () => void;
  isLoading: boolean;
}

export function useApi<T>(
  apiFunction: (...args: unknown[]) => Promise<T>
): UseApiReturn<T> {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    error: null,
    state: 'idle',
  });

  const execute = useCallback(
    async (...args: unknown[]): Promise<T | undefined> => {
      setState({ data: null, error: null, state: 'loading' });
      try {
        const data = await apiFunction(...args);
        setState({ data, error: null, state: 'success' });
        return data;
      } catch (err) {
        const message = err instanceof Error ? err.message : 'An unexpected error occurred';
        setState({ data: null, error: message, state: 'error' });
        return undefined;
      }
    },
    [apiFunction]
  );

  const reset = useCallback(() => {
    setState({ data: null, error: null, state: 'idle' });
  }, []);

  return {
    ...state,
    execute,
    reset,
    isLoading: state.state === 'loading',
  };
}
