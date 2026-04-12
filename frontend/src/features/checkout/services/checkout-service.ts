import { httpClient } from '@infrastructure/api/http-client';
import type { OrderPayload, OrderResponse } from '../types/checkout.types';

export const checkoutService = {
  async placeOrder(order: OrderPayload): Promise<OrderResponse> {
    return httpClient.post<OrderResponse>('/carts', order);
  },
};
