import { ConfigProvider, theme } from 'antd';
import {
  customThemeTokenConfig,
  themeModeToken,
  colorPrimarys,
  customComponentConfig,
} from './theme';

import { ThemeMode } from '#/enum';
import { useEffect, useMemo } from 'react';
import { useTheme } from '@/store/theme';

export default function AntdConfig({
  children,
}: {
  children: React.ReactNode;
}) {
  const Itheme = useTheme();
  const algorithm = useMemo(() => {
    let algorithm = theme.defaultAlgorithm;
    if (Itheme === 'auto') {
      algorithm = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? theme.darkAlgorithm
        : theme.defaultAlgorithm;
      return algorithm;
    }

    algorithm =
      Itheme === ThemeMode.Dark ? theme.darkAlgorithm : theme.defaultAlgorithm;
    return algorithm;
  }, [Itheme]);

  // const colorPrimary = colorPrimarys[themeColorPresets];

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove('light', 'dark');

    if (Itheme === 'auto') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
        .matches
        ? 'dark'
        : 'light';

      root.classList.add(systemTheme);

      return;
    }

    root.classList.add(Itheme);
  }, [Itheme]);

  return (
    <ConfigProvider
      theme={{
        token: {
          // colorPrimary,
          // ...customThemeTokenConfig,
          // ...themeModeToken[themeMode].token,
        },
        components: {
          // ...customComponentConfig,
          // ...themeModeToken[themeMode].components,
        },
        algorithm,
      }}
    >
      {/* https://ant.design/docs/react/compatible-style-cn#styleprovider */}
      {/* 不提升antd css选择器权重 */}
      {/* <StyleProvider hashPriority="high">{children}</StyleProvider> */}
      {children}
    </ConfigProvider>
  );
}
