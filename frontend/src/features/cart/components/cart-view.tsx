import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../hooks/use-cart';
import { CartItem } from './cart-item';
import { Button } from '@shared/components/button';
import { formatCurrency } from '@shared/utils/formatters';

export const CartView: React.FC = () => {
  const { items, totalItems, totalPrice, updateQuantity, removeItem, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="text-center py-16" data-test="cart-empty">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Your cart is empty</h2>
        <p className="text-gray-500 mb-6">Looks like you haven't added any products yet.</p>
        <Link to="/">
          <Button data-test="cart-continue-shopping">Continue Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div data-test="cart-page">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900" data-test="cart-title">
          Shopping Cart ({totalItems} {totalItems === 1 ? 'item' : 'items'})
        </h1>
        <Button
          variant="outline"
          size="sm"
          onClick={clearCart}
          data-test="cart-clear-button"
        >
          Clear Cart
        </Button>
      </div>

      <div className="space-y-3">
        {items.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            onUpdateQuantity={updateQuantity}
            onRemove={removeItem}
          />
        ))}
      </div>

      <div className="mt-8 bg-white rounded-lg shadow-sm p-6" data-test="cart-summary">
        <div className="flex items-center justify-between text-lg font-semibold text-gray-900">
          <span>Total</span>
          <span data-test="cart-total-price">{formatCurrency(totalPrice)}</span>
        </div>

        <div className="mt-4 flex gap-3">
          <Link to="/" className="flex-1">
            <Button variant="outline" className="w-full" data-test="cart-continue-shopping">
              Continue Shopping
            </Button>
          </Link>
          <Link to="/checkout" className="flex-1">
            <Button className="w-full" data-test="cart-checkout-button">
              Proceed to Checkout
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
