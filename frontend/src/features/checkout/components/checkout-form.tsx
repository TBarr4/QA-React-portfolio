import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@features/cart/hooks/use-cart';
import { useCheckout } from '../hooks/use-checkout';
import { Button } from '@shared/components/button';
import { Input } from '@shared/components/input';
import { ErrorMessage } from '@shared/components/error-message';
import { formatCurrency } from '@shared/utils/formatters';
import {
  validateRequired,
  validateEmail,
  validatePhone,
  validateZipCode,
} from '@shared/utils/validation';
import type { ShippingAddress } from '../types/checkout.types';

const INITIAL_ADDRESS: ShippingAddress = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  state: '',
  zipCode: '',
};

export const CheckoutForm: React.FC = () => {
  const navigate = useNavigate();
  const { items, totalPrice, clearCart } = useCart();
  const { isSubmitting, error, submitOrder } = useCheckout();

  const [address, setAddress] = useState<ShippingAddress>(INITIAL_ADDRESS);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string | null>>({});
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (items.length === 0 && !isComplete) {
      navigate('/');
    }
  }, [items.length, isComplete, navigate]);

  if (items.length === 0 && !isComplete) {
    return null;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
    setFieldErrors((prev) => ({ ...prev, [name]: null }));
  };

  const validate = (): boolean => {
    const errors: Record<string, string | null> = {
      firstName: validateRequired(address.firstName, 'First name'),
      lastName: validateRequired(address.lastName, 'Last name'),
      email: validateEmail(address.email),
      phone: validatePhone(address.phone),
      address: validateRequired(address.address, 'Address'),
      city: validateRequired(address.city, 'City'),
      state: validateRequired(address.state, 'State'),
      zipCode: validateZipCode(address.zipCode),
    };

    setFieldErrors(errors);
    return !Object.values(errors).some(Boolean);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const result = await submitOrder(address, items);
    if (result) {
      clearCart();
      setIsComplete(true);
    }
  };

  if (isComplete) {
    return (
      <div className="max-w-lg mx-auto text-center py-16" data-test="checkout-success">
        <div className="text-5xl mb-4">✓</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Order Placed Successfully!</h1>
        <p className="text-gray-500 mb-6">
          Thank you for your purchase. You will receive a confirmation email shortly.
        </p>
        <Button onClick={() => navigate('/')} data-test="checkout-continue-shopping">
          Continue Shopping
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto" data-test="checkout-page">
      <h1 className="text-2xl font-bold text-gray-900 mb-6" data-test="checkout-title">
        Checkout
      </h1>

      {error && <ErrorMessage message={error} data-test="checkout-error" />}

      <form onSubmit={handleSubmit} noValidate data-test="checkout-form">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Shipping Information</h2>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="First Name"
              name="firstName"
              value={address.firstName}
              onChange={handleChange}
              error={fieldErrors.firstName}
              data-test="checkout-first-name"
            />
            <Input
              label="Last Name"
              name="lastName"
              value={address.lastName}
              onChange={handleChange}
              error={fieldErrors.lastName}
              data-test="checkout-last-name"
            />
          </div>

          <Input
            label="Email"
            name="email"
            type="email"
            value={address.email}
            onChange={handleChange}
            error={fieldErrors.email}
            data-test="checkout-email"
          />

          <Input
            label="Phone"
            name="phone"
            type="tel"
            value={address.phone}
            onChange={handleChange}
            error={fieldErrors.phone}
            data-test="checkout-phone"
          />

          <Input
            label="Address"
            name="address"
            value={address.address}
            onChange={handleChange}
            error={fieldErrors.address}
            data-test="checkout-address"
          />

          <div className="grid grid-cols-3 gap-4">
            <Input
              label="City"
              name="city"
              value={address.city}
              onChange={handleChange}
              error={fieldErrors.city}
              data-test="checkout-city"
            />
            <Input
              label="State"
              name="state"
              value={address.state}
              onChange={handleChange}
              error={fieldErrors.state}
              data-test="checkout-state"
            />
            <Input
              label="ZIP Code"
              name="zipCode"
              value={address.zipCode}
              onChange={handleChange}
              error={fieldErrors.zipCode}
              data-test="checkout-zip-code"
            />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-6" data-test="checkout-order-summary">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Order Summary</h2>
          <div className="space-y-2">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between text-sm" data-test={`checkout-item-${item.id}`}>
                <span className="text-gray-600">
                  {item.title} × {item.quantity}
                </span>
                <span className="font-medium">{formatCurrency(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-200 mt-4 pt-4 flex justify-between text-lg font-semibold">
            <span>Total</span>
            <span data-test="checkout-total">{formatCurrency(totalPrice)}</span>
          </div>
        </div>

        <Button
          type="submit"
          isLoading={isSubmitting}
          className="w-full"
          size="lg"
          data-test="checkout-submit-button"
        >
          Place Order
        </Button>
      </form>
    </div>
  );
};
