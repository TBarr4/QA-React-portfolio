export const testUsers = {
  valid: {
    username: 'mor_2314',
    password: '83r5^_',
  },
  invalid: {
    username: 'invalid_user',
    password: 'wrong_password',
  },
};

export const testShippingAddress = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  phone: '+1-555-123-4567',
  address: '123 Main Street',
  city: 'New York',
  state: 'NY',
  zipCode: '10001',
};

export const apiEndpoints = {
  login: '/auth/login',
  products: '/products',
  productById: (id: number) => `/products/${id}`,
  productsByCategory: (category: string) => `/products/category/${category}`,
  categories: '/products/categories',
  carts: '/carts',
  cartById: (id: number) => `/carts/${id}`,
};
