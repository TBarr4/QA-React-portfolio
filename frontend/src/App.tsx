import React from 'react';
import { AppProvider } from './app/providers/app-provider';
import { AppRoutes } from './app/routes/app-routes';

const App: React.FC = () => {
  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  );
};

export default App;
