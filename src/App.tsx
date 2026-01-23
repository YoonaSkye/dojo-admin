import { useEffect } from 'react';
import { AntdProvider, AppProvider } from './features/antdConfig';
import { ThemeProvider } from './features/theme';
import { RouterProvider } from './router';

function App() {
  // 针对首屏渲染的白屏，添加全局loading给用户视觉效果
  useEffect(() => {
    const loadingElement = document.querySelector('#__app-loading__');

    if (loadingElement) {
      // 添加隐藏类，触发过渡动画
      loadingElement.classList.add('hidden');

      // 查找所有需要移除的注入 loading 元素
      const injectLoadingElements = document.querySelectorAll(
        '[data-app-loading^="inject"]',
      );

      // 当过渡动画结束时，移除 loading 元素和所有注入的 loading 元素
      loadingElement.addEventListener(
        'transitionend',
        () => {
          loadingElement.remove(); // 移除 loading 元素
          injectLoadingElements.forEach((el) => el.remove()); // 移除所有注入的 loading 元素
        },
        { once: true },
      ); // 确保事件只触发一次
    }
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
