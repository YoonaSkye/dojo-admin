import { useSettingActions, useBuiltinType } from '@/store/preferences';
import clsx from 'clsx';
import {
  BUILT_IN_THEME_PRESETS,
  BuiltinThemePreset,
  BuiltinThemeType,
} from '../../constants';

export function Builtin() {
  const builtinType = useBuiltinType();
  const { setTheme } = useSettingActions();

  function typeView(name: BuiltinThemeType) {
    switch (name) {
      case 'default': {
        // return $t('preferences.theme.builtin.default');
        return '默认';
      }
      case 'violet': {
        // return $t('preferences.theme.builtin.violet');
        return '紫罗兰';
      }
      case 'pink': {
        // return $t('preferences.theme.builtin.pink');
        return '樱花粉';
      }
      case 'rose': {
        // return $t('preferences.theme.builtin.rose');
        return '玫瑰红';
      }
      case 'sky-blue': {
        // return $t('preferences.theme.builtin.skyBlue');
        return '天蓝色';
      }
      case 'deep-blue': {
        // return $t('preferences.theme.builtin.deepBlue');
        return '深蓝色';
      }

      case 'green': {
        // return $t('preferences.theme.builtin.green');
        return '浅绿色';
      }
      case 'deep-green': {
        // return $t('preferences.theme.builtin.deepGreen');
        return '深绿色';
      }
      case 'orange': {
        // return $t('preferences.theme.builtin.orange');
        return '橙黄色';
      }
      case 'yellow': {
        // return $t('preferences.theme.builtin.yellow');
        return '柠檬黄';
      }
      case 'zinc': {
        // return $t('preferences.theme.builtin.zinc');
        return '锌色灰';
      }
      case 'neutral': {
        // return $t('preferences.theme.builtin.neutral');
        return '中性色';
      }
      case 'slate': {
        // return $t('preferences.theme.builtin.slate');
        return '石板灰';
      }
      case 'gray': {
        // return $t('preferences.theme.builtin.gray');
        return '中灰色';
      }
      case 'custom': {
        // return $t('preferences.theme.builtin.custom');
        return '自定义';
      }
    }
  }

  const handleSelect = (theme: BuiltinThemePreset) => {
    setTheme({ builtinType: theme.type });
  };

  return (
    <div className="flex w-full flex-wrap justify-between">
      {BUILT_IN_THEME_PRESETS.map((theme) => (
        <div
          className="flex cursor-pointer flex-col"
          key={theme.type}
          onClick={() => handleSelect(theme)}
        >
          <div
            className={clsx(
              theme.type === builtinType && 'outline-box-active',
              'outline-box flex-center group cursor-pointer'
            )}
          >
            <div
              style={{ backgroundColor: theme.color }}
              className="mx-10 my-2 size-5 rounded-md"
            ></div>
          </div>
          <div className="text-muted-foreground my-2 text-center text-xs">
            {typeView(theme.type)}
          </div>
        </div>
      ))}
    </div>
  );
}
