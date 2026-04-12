import React, { createContext, useReducer, useCallback, useMemo } from 'react';
import type { CartItem, CartState } from '@features/cart/types/cart.types';

type CartAction =
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: number }
  | { type: 'UPDATE_QUANTITY'; payload: { id: number; quantity: number } }
  | { type: 'CLEAR_CART' };

interface CartContextType extends CartState {
  addItem: (item: CartItem) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
}

const initialState: CartState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
};

function computeTotals(items: CartItem[]): Pick<CartState, 'totalItems' | 'totalPrice'> {
  return {
    totalItems: items.reduce((sum, item) => sum + item.quantity, 0),
    totalPrice: items.reduce((sum, item) => sum + item.price * item.quantity, 0),
  };
}

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.items.find((i) => i.id === action.payload.id);
      const items = existing
        ? state.items.map((i) =>
            i.id === action.payload.id ? { ...i, quantity: i.quantity + 1 } : i
          )
        : [...state.items, action.payload];
      return { items, ...computeTotals(items) };
    }
    case 'REMOVE_ITEM': {
      const items = state.items.filter((i) => i.id !== action.payload);
      return { items, ...computeTotals(items) };
    }
    case 'UPDATE_QUANTITY': {
      const items = state.items.map((i) =>
        i.id === action.payload.id ? { ...i, quantity: Math.max(1, action.payload.quantity) } : i
      );
      return { items, ...computeTotals(items) };
    }
    case 'CLEAR_CART':
      return initialState;
    default:
      return state;
  }
}

export const CartContext = createContext<CartContextType | null>(null);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addItem = useCallback((item: CartItem) => {
    dispatch({ type: 'ADD_ITEM', payload: item });
  }, []);

  const removeItem = useCallback((id: number) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  }, []);

  const updateQuantity = useCallback((id: number, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: 'CLEAR_CART' });
  }, []);

  const value = useMemo(
    () => ({
      ...state,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
    }),
    [state, addItem, removeItem, updateQuantity, clearCart]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
