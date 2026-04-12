import { useState, useCallback } from 'react';
import { checkoutService } from '../services/checkout-service';
import type { ShippingAddress, OrderResponse } from '../types/checkout.types';
import type { CartItem } from '@features/cart/types/cart.types';

export function useCheckout() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [order, setOrder] = useState<OrderResponse | null>(null);

  const submitOrder = useCallback(
    async (_shippingAddress: ShippingAddress, items: CartItem[]) => {
      setIsSubmitting(true);
      setError(null);

      try {
        const response = await checkoutService.placeOrder({
          userId: 1,
          date: new Date().toISOString(),
          products: items.map((item) => ({
            productId: item.id,
            quantity: item.quantity,
          })),
        });

        setOrder(response);
        return response;
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to place order';
        setError(message);
        return null;
      } finally {
        setIsSubmitting(false);
      }
    },
    []
  );

  return {
    isSubmitting,
    error,
    order,
    submitOrder,
  };
}
