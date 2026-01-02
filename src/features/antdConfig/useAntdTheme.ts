import { useTheme } from '@/features/theme';
import { useSettingStore } from '@/store/preferences';
import { theme as antdTheme, ConfigProviderProps } from 'antd';
import { useMemo } from 'react';

/**
 * 用于适配Ant Design框架的设计系统
 */
export function useAntdTheme() {
  const { builtinType, colorPrimary } = useSettingStore((state) => state.theme);
  const { isDark } = useTheme();
  const root = document.documentElement;

  // 封装获取 CSS 变量值的函数
  const getCssVariableValue = (variable: string, isColor: boolean = true) => {
    // 获取根元素计算样式
    const rootStyles = getComputedStyle(root);
    const value = rootStyles.getPropertyValue(variable).trim(); // 去除首尾空格
    return isColor ? `hsl(${value})` : value;
  };

  const tokens = useMemo(() => {
    return {
      colorPrimary: getCssVariableValue('--primary'),
      colorInfo: getCssVariableValue('--primary'),
      colorError: getCssVariableValue('--destructive'),
      colorWarning: getCssVariableValue('--warning'),
      colorSuccess: getCssVariableValue('--success'),
      colorTextBase: getCssVariableValue('--foreground'),
      colorBorder: getCssVariableValue('--border'),
      colorBorderSecondary: getCssVariableValue('--border'),
      colorBgElevated: getCssVariableValue('--popover'),
      colorBgContainer: getCssVariableValue('--card'),
      colorBgBase: getCssVariableValue('--background'),
      colorBgLayout: getCssVariableValue('--background-deep'),
      colorBgMask: getCssVariableValue('--overlay'),
      // 处理 borderRadius 数值转换
      borderRadius:
        Number.parseFloat(getCssVariableValue('--radius', false)) * 16,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [builtinType, isDark, colorPrimary]);

  const themeConfig: ConfigProviderProps['theme'] = useMemo(() => {
    return {
      algorithm: [
        isDark ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
      ],
      components: {},
      cssVar: true,
      token: tokens,
    };
  }, [isDark, tokens]);

  return {
    themeConfig,
  };
}
