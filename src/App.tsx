// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes, RouterProvider } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Movies from './pages/Movies';
import { MantineProvider } from '@mantine/core';
import router from './routes';

const App: React.FC = () => {
  return (
    <MantineProvider>
      <RouterProvider router={router} />
    </MantineProvider>
  );
};

export default App;
