import NProgress from 'nprogress';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

// setup
import { setupI18n } from '@/locales/i18n.ts';
import { setupSvgIcons } from './plugins/iconify.ts';
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
  await setupSvgIcons();

  ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
}

bootstrap();
