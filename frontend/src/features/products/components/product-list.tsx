import React, { useState } from 'react';
import { useProducts } from '../hooks/use-products';
import { ProductCard } from './product-card';
import { LoadingSpinner } from '@shared/components/loading-spinner';
import { ErrorMessage } from '@shared/components/error-message';
import { useCart } from '@features/cart/hooks/use-cart';
import type { Product } from '../types/product.types';

const CATEGORIES = [
  { value: '', label: 'All' },
  { value: 'electronics', label: 'Electronics' },
  { value: 'jewelery', label: 'Jewelery' },
  { value: "men's clothing", label: "Men's Clothing" },
  { value: "women's clothing", label: "Women's Clothing" },
];

export const ProductList: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const { products, isLoading, error, refetch } = useProducts(selectedCategory || undefined);
  const { addItem } = useCart();

  const handleAddToCart = (product: Product) => {
    addItem({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      quantity: 1,
    });
  };

  return (
    <div data-test="product-list-page">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900" data-test="product-list-title">
          Products
        </h1>

        <div className="flex items-center space-x-2" data-test="category-filter">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`px-3 py-1.5 text-sm font-medium rounded-full transition-colors ${
                selectedCategory === cat.value
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              data-test={`category-${cat.value || 'all'}`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {isLoading && <LoadingSpinner message="Loading products..." />}

      {error && <ErrorMessage message={error} onRetry={refetch} data-test="product-error" />}

      {!isLoading && !error && (
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          data-test="product-grid"
        >
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      )}

      {!isLoading && !error && products.length === 0 && (
        <p className="text-center text-gray-500 py-12" data-test="no-products-message">
          No products found.
        </p>
      )}
    </div>
  );
};
