import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/use-auth';
import { Button } from '@shared/components/button';
import { Input } from '@shared/components/input';
import { ErrorMessage } from '@shared/components/error-message';
import { validateRequired } from '@shared/utils/validation';

export const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const { login, isLoading, error } = useAuth();

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [fieldErrors, setFieldErrors] = useState<Record<string, string | null>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFieldErrors((prev) => ({ ...prev, [name]: null }));
  };

  const validate = (): boolean => {
    const errors: Record<string, string | null> = {
      username: validateRequired(formData.username, 'Username'),
      password: validateRequired(formData.password, 'Password'),
    };

    setFieldErrors(errors);
    return !Object.values(errors).some(Boolean);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const success = await login({
      username: formData.username,
      password: formData.password,
    });

    if (success) {
      navigate('/');
    }
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center" data-test="login-page">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-gray-900 text-center mb-6" data-test="login-title">
          Sign in to ShopFlow
        </h1>

        {error && <ErrorMessage message={error} data-test="login-error" />}

        <form onSubmit={handleSubmit} data-test="login-form" className="mt-4">
          <Input
            label="Username"
            name="username"
            type="text"
            value={formData.username}
            onChange={handleChange}
            error={fieldErrors.username}
            placeholder="Enter your username"
            data-test="login-username-input"
            autoComplete="username"
          />

          <Input
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            error={fieldErrors.password}
            placeholder="Enter your password"
            data-test="login-password-input"
            autoComplete="current-password"
          />

          <Button
            type="submit"
            isLoading={isLoading}
            className="w-full mt-4"
            data-test="login-submit-button"
          >
            Sign In
          </Button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-500" data-test="login-demo-hint">
          Demo: use <strong>mor_2314</strong> / <strong>83r5^_</strong>
        </p>
      </div>
    </div>
  );
};
