import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import 'virtual:svg-icons-register';
import App from './App.tsx';
import { worker } from './mock';
// i18n
import './locales/i18n.ts';
// 样式文件
import '@/theme';

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <Suspense fallback={<div>Loading</div>}>
    <App />
  </Suspense>
  // </React.StrictMode>
);

// 🥵 start service worker mock in development mode
worker.start({ onUnhandledRequest: 'bypass' });
