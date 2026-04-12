import React from 'react';
import type { CartItem as CartItemType } from '../types/cart.types';
import { Button } from '@shared/components/button';
import { formatCurrency } from '@shared/utils/formatters';

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemove: (id: number) => void;
}

export const CartItem: React.FC<CartItemProps> = ({ item, onUpdateQuantity, onRemove }) => {
  return (
    <div
      className="flex items-center gap-4 bg-white rounded-lg p-4 shadow-sm"
      data-test={`cart-item-${item.id}`}
    >
      <img
        src={item.image}
        alt={item.title}
        className="w-20 h-20 object-contain rounded"
        data-test="cart-item-image"
      />

      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-medium text-gray-900 truncate" data-test="cart-item-title">
          {item.title}
        </h3>
        <p className="text-sm text-gray-500 mt-1" data-test="cart-item-price">
          {formatCurrency(item.price)}
        </p>
      </div>

      <div className="flex items-center gap-2" data-test="cart-item-quantity-controls">
        <button
          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
          disabled={item.quantity <= 1}
          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100 disabled:opacity-50"
          data-test="cart-item-decrease"
          aria-label="Decrease quantity"
        >
          −
        </button>
        <span className="w-8 text-center font-medium" data-test="cart-item-quantity">
          {item.quantity}
        </span>
        <button
          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100"
          data-test="cart-item-increase"
          aria-label="Increase quantity"
        >
          +
        </button>
      </div>

      <span className="font-semibold text-gray-900 w-24 text-right" data-test="cart-item-subtotal">
        {formatCurrency(item.price * item.quantity)}
      </span>

      <Button
        variant="danger"
        size="sm"
        onClick={() => onRemove(item.id)}
        data-test="cart-item-remove"
      >
        Remove
      </Button>
    </div>
  );
};
