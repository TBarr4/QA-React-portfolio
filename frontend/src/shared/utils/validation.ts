export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export function validateEmail(email: string): string | null {
  if (!email.trim()) return 'Email is required';
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return 'Invalid email format';
  return null;
}

export function validatePassword(password: string): string | null {
  if (!password) return 'Password is required';
  if (password.length < 6) return 'Password must be at least 6 characters';
  return null;
}

export function validateRequired(value: string, fieldName: string): string | null {
  if (!value.trim()) return `${fieldName} is required`;
  return null;
}

export function validatePhone(phone: string): string | null {
  if (!phone.trim()) return 'Phone number is required';
  const phoneRegex = /^\+?[\d\s-]{7,15}$/;
  if (!phoneRegex.test(phone)) return 'Invalid phone number format';
  return null;
}

export function validateZipCode(zip: string): string | null {
  if (!zip.trim()) return 'ZIP code is required';
  const zipRegex = /^\d{5}(-\d{4})?$/;
  if (!zipRegex.test(zip)) return 'Invalid ZIP code format';
  return null;
}
