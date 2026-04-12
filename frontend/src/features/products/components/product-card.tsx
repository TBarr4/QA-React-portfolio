import React from 'react';
import type { Product } from '../types/product.types';
import { Button } from '@shared/components/button';
import { formatCurrency } from '@shared/utils/formatters';
import { truncateText } from '@shared/utils/formatters';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <div
      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col"
      data-test={`product-card-${product.id}`}
    >
      <div
        className="relative bg-gray-50 overflow-hidden"
        style={{ height: '220px', minHeight: '220px' }}
      >
        <img
          src={product.image}
          alt={product.title}
          className="absolute inset-0 w-full h-full object-contain"
          style={{ display: 'block', padding: '1rem' }}
          data-test="product-image"
          loading="lazy"
        />
      </div>

      <div className="p-4 flex flex-col flex-1">
        <span
          className="text-xs font-semibold text-indigo-600 uppercase tracking-wide"
          data-test="product-category"
        >
          {product.category}
        </span>

        <h3
          className="mt-1 text-lg font-semibold text-gray-900 leading-tight"
          data-test="product-title"
        >
          {truncateText(product.title, 50)}
        </h3>

        <p className="mt-1 text-sm text-gray-500" data-test="product-description">
          {truncateText(product.description, 80)}
        </p>

        <div className="mt-auto pt-4 flex items-center justify-between">
          <div>
            <span className="text-xl font-bold text-gray-900" data-test="product-price">
              {formatCurrency(product.price)}
            </span>
            <div className="flex items-center mt-1" data-test="product-rating">
              <span className="text-yellow-500 text-sm">★</span>
              <span className="ml-1 text-sm text-gray-600">
                {product.rating.rate} ({product.rating.count})
              </span>
            </div>
          </div>

          <Button
            size="sm"
            onClick={() => onAddToCart(product)}
            data-test="product-add-to-cart-button"
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};
