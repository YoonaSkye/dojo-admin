import { useEffect } from 'react';
import Router from './router';
import AntdConfig from '@/theme/antd';
import { loadSvgIcons } from '@/icons/svg/load';

function App() {
  useEffect(() => {
    loadSvgIcons();
  }, []);

  return (
    <AntdConfig>
      <Router />
    </AntdConfig>
  );
}

export default App;
