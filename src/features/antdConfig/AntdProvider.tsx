import { ConfigProvider } from 'antd';
import enUS from 'antd/locale/en_US';
import zhCN from 'antd/locale/zh_CN';


import { useLocale } from '@/features/lang';

import { useAntdTheme } from './useAntdTheme';

import type { ConfigProviderProps } from 'antd';



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
    <ConfigProvider
      locale={LANGUAGE_MAP[locale]}
      card={{
        styles: {
          body: { flex: 1, overflow: 'hidden', padding: '12px 16px ' },
        },
      }}
      theme={themeConfig}
    >
      {/* https://ant.design/docs/react/compatible-style-cn#styleprovider */}
      {/* 不提升antd css选择器权重 */}
      {/* <StyleProvider hashPriority="high">{children}</StyleProvider> */}
      {children}
    </ConfigProvider>
  );
}
