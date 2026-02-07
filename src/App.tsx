import { useEffect } from 'react';
import { AntdProvider, AppProvider } from './features/antdConfig';
import { ThemeProvider } from './features/theme';
import { RouterProvider } from './router';
import { unmountGlobalLoading } from './utils';

function App() {
  // 针对首屏渲染的白屏，添加全局loading给用户视觉效果
  useEffect(() => {
    // 移除并销毁loading
    unmountGlobalLoading();
  }, []);

  return (
    <ThemeProvider>
      <AntdProvider>
        <AppProvider>
          <RouterProvider />
        </AppProvider>
      </AntdProvider>
    </ThemeProvider>
  );
}

export default App;
