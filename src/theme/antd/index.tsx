import type { ConfigProviderProps } from 'antd';
import { ConfigProvider, theme } from 'antd';
import { useEffect } from 'react';

import enUS from 'antd/locale/en_US';
import zhCN from 'antd/locale/zh_CN';

import { BUILT_IN_THEME_PRESETS } from '@/layouts/_common/blocks/theme/config';
import { useLocale } from '@/features/lang';
import { useThemeColor } from '@/store/setting';
import { useTheme } from '@/features/theme';

type Locale = ConfigProviderProps['locale'];

const LANGUAGE_MAP: Record<'zh-CN' | 'en-US', Locale> = {
  'zh-CN': zhCN,
  'en-US': enUS,
};

export default function AntdConfig({
  children,
}: {
  children: React.ReactNode;
}) {
  const { darkMode } = useTheme();
  const { locale } = useLocale();

  const algorithm = darkMode ? theme.darkAlgorithm : theme.defaultAlgorithm;

  const themePrimaryColor = useThemeColor();

  const colorPrimary = BUILT_IN_THEME_PRESETS.find(
    (theme) => theme.type === themePrimaryColor
  )?.color;

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.theme = themePrimaryColor;
  }, [themePrimaryColor]);

  return (
    <ConfigProvider
      locale={LANGUAGE_MAP[locale]}
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
