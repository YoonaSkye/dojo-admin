import ReactDOM from 'react-dom/client';
import App from './App.tsx';

// setup
import { setupI18n } from '@/locales/i18n.ts';
import { setupSvgIcons } from '@/utils';
// 样式文件
import '@/theme';

async function bootstrap() {
  await setupI18n();
  await setupSvgIcons();

  ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
}

bootstrap();
