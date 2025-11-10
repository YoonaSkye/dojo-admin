import NProgress from 'nprogress';

import ReactDOM from 'react-dom/client';
import 'virtual:svg-icons-register';
import App from './App.tsx';

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

async function bootstrap() {
  await setupI18n();

  ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
}

bootstrap();
