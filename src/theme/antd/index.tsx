import { ConfigProvider, theme } from 'antd';
import { useEffect, useMemo } from 'react';

import { ThemeMode } from '#/enum';
import { useTheme } from '@/store/theme';
import { useThemeColor } from '@/store/setting';
import { BUILT_IN_THEME_PRESETS } from '@/layouts/_common/blocks/theme/config';

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

  const themePrimaryColor = useThemeColor();

  const colorPrimary = BUILT_IN_THEME_PRESETS.find(
    (theme) => theme.type === themePrimaryColor
  )?.color;

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

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.theme = themePrimaryColor;
  }, [themePrimaryColor]);

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: colorPrimary,
        },
        components: {},
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
