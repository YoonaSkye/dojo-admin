import { ConfigProvider, theme } from 'antd';
import {
  customThemeTokenConfig,
  themeModeToken,
  colorPrimarys,
  customComponentConfig,
} from './theme';

import { ThemeMode } from '#/enum';
import { useSettings } from '@/store/setting';
import { useEffect } from 'react';
import { useTheme } from '@/store/theme';

export default function AntdConfig({
  children,
}: {
  children: React.ReactNode;
}) {
  const { themeMode, themeColorPresets } = useSettings();
  const Itheme = useTheme();
  const algorithm =
    themeMode === ThemeMode.Light
      ? theme.defaultAlgorithm
      : theme.darkAlgorithm;
  const colorPrimary = colorPrimarys[themeColorPresets];

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove('light', 'dark');

    if (Itheme === 'system') {
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
        // algorithm,
      }}
    >
      {/* https://ant.design/docs/react/compatible-style-cn#styleprovider */}
      {/* 不提升antd css选择器权重 */}
      {/* <StyleProvider hashPriority="high">{children}</StyleProvider> */}
      {children}
    </ConfigProvider>
  );
}
