import React, { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import Router from './Routes/Router';
import { useAuthStore } from './Stores/AuthStore';

const App = () => {
  const initializeAuth = useAuthStore((state) => state.initializeAuth);

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  return (
    <RouterProvider router={Router} />
  )
}

export default App