import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { worker } from './mock';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// 🥵 start service worker mock in development mode
worker.start({ onUnhandledRequest: 'bypass' });
