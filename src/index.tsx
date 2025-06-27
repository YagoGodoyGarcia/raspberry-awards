import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import '@mantine/core/styles.css';  // Importa o CSS de normalização
import './styles/global.css'; // se estiver usando

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);