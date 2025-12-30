import type { ConfigProviderProps } from 'antd';
import { ConfigProvider } from 'antd';

import { useLocale } from '@/features/lang';
import { useAntdTheme } from './useAntdTheme';

import enUS from 'antd/locale/en_US';
import zhCN from 'antd/locale/zh_CN';

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
  const { locale } = useLocale();
  const { themeConfig } = useAntdTheme();

  return (
    <ConfigProvider locale={LANGUAGE_MAP[locale]} theme={themeConfig}>
      {/* https://ant.design/docs/react/compatible-style-cn#styleprovider */}
      {/* 不提升antd css选择器权重 */}
      {/* <StyleProvider hashPriority="high">{children}</StyleProvider> */}
      {children}
    </ConfigProvider>
  );
}
