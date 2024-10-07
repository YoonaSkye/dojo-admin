import { ConfigProvider, theme } from 'antd';
import {
  customThemeTokenConfig,
  themeModeToken,
  colorPrimarys,
  customComponentConfig,
} from './theme';

import { ThemeMode } from '#/enum';
import { useSettings } from '@/store/setting';

export default function AntdConfig({
  children,
}: {
  children: React.ReactNode;
}) {
  const { themeMode, themeColorPresets } = useSettings();
  const algorithm =
    themeMode === ThemeMode.Light
      ? theme.defaultAlgorithm
      : theme.darkAlgorithm;
  const colorPrimary = colorPrimarys[themeColorPresets];

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary,
          ...customThemeTokenConfig,
          ...themeModeToken[themeMode].token,
        },
        components: {
          ...customComponentConfig,
          ...themeModeToken[themeMode].components,
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
