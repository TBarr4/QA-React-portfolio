import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '@features/cart/hooks/use-cart';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { pathname } = useLocation();
  const { totalItems } = useCart();
  const [isLoggedIn, setIsLoggedIn] = useState(() => !!localStorage.getItem('auth_token'));

  useEffect(() => {
    const onStorage = () => setIsLoggedIn(!!localStorage.getItem('auth_token'));
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const navLinks = [
    { to: '/', label: 'Products', test: 'nav-products' },
    { to: '/cart', label: 'Cart', test: 'nav-cart' },
  ];

  return (
    <div className="min-h-screen bg-gray-50" data-test="app-layout">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="text-xl font-bold text-indigo-600" data-test="app-logo">
              ShopFlow
            </Link>
            <nav className="flex items-center space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`text-sm font-medium transition-colors ${
                    pathname === link.to
                      ? 'text-indigo-600'
                      : 'text-gray-600 hover:text-indigo-600'
                  }`}
                  data-test={link.test}
                >
                  {link.label}
                  {link.to === '/cart' && totalItems > 0 && (
                    <span
                      className="ml-1 inline-flex items-center justify-center px-2 py-0.5 text-xs font-bold text-white bg-indigo-600 rounded-full"
                      data-test="cart-badge"
                    >
                      {totalItems}
                    </span>
                  )}
                </Link>
              ))}
              {isLoggedIn ? (
                <button
                  onClick={() => {
                    localStorage.removeItem('auth_token');
                    localStorage.removeItem('auth_user');
                    setIsLoggedIn(false);
                    window.location.href = '/login';
                  }}
                  className="text-sm font-medium text-gray-600 hover:text-red-600 transition-colors"
                  data-test="nav-logout"
                >
                  Logout
                </button>
              ) : (
                <Link
                  to="/login"
                  className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors"
                  data-test="nav-login"
                >
                  Login
                </Link>
              )}
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-center text-sm text-gray-500" data-test="app-footer">
            &copy; {new Date().getFullYear()} ShopFlow. Built for demonstration purposes.
          </p>
        </div>
      </footer>
    </div>
  );
};
