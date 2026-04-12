import { useState, useEffect, useCallback } from 'react';
import { productService } from '../services/product-service';
import type { Product } from '../types/product.types';
import type { LoadingState } from '@shared/types/api.types';

export function useProducts(category?: string) {
  const [products, setProducts] = useState<Product[]>([]);
  const [state, setState] = useState<LoadingState>('idle');
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    setState('loading');
    setError(null);

    try {
      const data = category
        ? await productService.getByCategory(category)
        : await productService.getAll();

      setProducts(data);
      setState('success');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to load products';
      setError(message);
      setState('error');
    }
  }, [category]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return {
    products,
    isLoading: state === 'loading',
    error,
    refetch: fetchProducts,
  };
}
