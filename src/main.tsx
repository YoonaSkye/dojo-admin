import NProgress from 'nprogress';
import { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import 'virtual:svg-icons-register';
import App from './App.tsx';

// i18n
import './locales/i18n.ts';
// 样式文件
import '@/theme';
import Loading from './components/loading/index.tsx';

NProgress.configure({
  minimum: 0.3,
  easing: 'ease',
  speed: 800,
  showSpinner: false,
  parent: '#root',
});

async function enableMocking() {
  // if (process.env.NODE_ENV !== 'development') {
  //   return;
  // }

  const { worker } = await import('./mocks/browser');

  // `worker.start()` returns a Promise that resolves
  // once the Service Worker is up and ready to intercept requests.
  return worker.start({ onUnhandledRequest: 'bypass' });
}
enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    // <React.StrictMode>
    <Suspense fallback={<Loading />}>
      <App />
    </Suspense>
    // </React.StrictMode>
  );
});
