import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from '@shared/components/layout';
import { LoginForm } from '@features/auth/components/login-form';
import { ProductList } from '@features/products/components/product-list';
import { CartView } from '@features/cart/components/cart-view';
import { CheckoutForm } from '@features/checkout/components/checkout-form';

export const AppRoutes: React.FC = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/cart" element={<CartView />} />
        <Route path="/checkout" element={<CheckoutForm />} />
      </Routes>
    </Layout>
  );
};
