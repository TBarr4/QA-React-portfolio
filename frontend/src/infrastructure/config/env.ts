const ENV = {
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'https://fakestoreapi.com',
  APP_NAME: import.meta.env.VITE_APP_NAME || 'ShopFlow',
  IS_DEV: import.meta.env.DEV,
} as const;

export default ENV;
