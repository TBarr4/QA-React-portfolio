import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from './cart-provider';

interface AppProviderProps {
  children: React.ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  return (
    <BrowserRouter>
      <CartProvider>{children}</CartProvider>
    </BrowserRouter>
  );
};
