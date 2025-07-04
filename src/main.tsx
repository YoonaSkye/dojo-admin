import NProgress from 'nprogress';
import { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import 'virtual:svg-icons-register';
import App from './App.tsx';
import Loading from '@/components/loading/index.tsx';

// i18n
import { setupI18n } from '@/locales/i18n.ts';
// 样式文件
import '@/theme';

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

async function bootstrap() {
  await enableMocking();
  await setupI18n();
  // TODO：day.js 国际化配置

  ReactDOM.createRoot(document.getElementById('root')!).render(
    // <React.StrictMode>
    <Suspense fallback={<Loading />}>
      <App />
    </Suspense>
    // </React.StrictMode>
  );
}

bootstrap();
