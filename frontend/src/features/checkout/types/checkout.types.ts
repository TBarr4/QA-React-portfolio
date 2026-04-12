export interface ShippingAddress {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface OrderPayload {
  userId: number;
  date: string;
  products: Array<{
    productId: number;
    quantity: number;
  }>;
}

export interface OrderResponse {
  id: number;
  userId: number;
  date: string;
  products: Array<{
    productId: number;
    quantity: number;
  }>;
}

export type CheckoutStep = 'shipping' | 'review' | 'confirmation';
