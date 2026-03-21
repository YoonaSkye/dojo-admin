import ReactDOM from 'react-dom/client';
import { ErrorBoundary } from 'react-error-boundary';

import { setupI18n } from '@/locales';
import { setupSvgIcons } from '@/utils';

import App from './App.tsx';
import FallbackRender from './components/fallback-render.tsx';

// setup
// 样式文件
import '@/theme';

async function bootstrap() {
  await setupI18n();
  await setupSvgIcons();

  ReactDOM.createRoot(document.getElementById('root')!).render(
    <ErrorBoundary fallbackRender={FallbackRender}>
      <App />
    </ErrorBoundary>,
  );
}

bootstrap();
