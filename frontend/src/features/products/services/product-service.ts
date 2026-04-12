import { httpClient } from '@infrastructure/api/http-client';
import type { Product } from '../types/product.types';

export const productService = {
  async getAll(): Promise<Product[]> {
    return httpClient.get<Product[]>('/products');
  },

  async getById(id: number): Promise<Product> {
    return httpClient.get<Product>(`/products/${id}`);
  },

  async getByCategory(category: string): Promise<Product[]> {
    return httpClient.get<Product[]>(`/products/category/${category}`);
  },

  async getCategories(): Promise<string[]> {
    return httpClient.get<string[]>('/products/categories');
  },
};
