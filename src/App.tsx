import { useEffect } from 'react';
import Router from './router';
import AntdConfig from '@/theme/antd';
import { loadSvgIcons } from '@/icons/svg/load';
import AppProvider from './components/antd/AppProvider';

function App() {
  useEffect(() => {
    loadSvgIcons();
  }, []);

  return (
    <AntdConfig>
      <AppProvider>
        <Router />
      </AppProvider>
    </AntdConfig>
  );
}

export default App;
