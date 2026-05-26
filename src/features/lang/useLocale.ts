import { setLocale as globalSetLocale } from '@packages/locales';
import { useTranslation } from 'react-i18next';

// 导入我们在核心文件里封装好的、带有安全异步等待的全局 setLocale

export type Locale = 'en-US' | 'zh-CN';
type Language = {
  locale: Locale;
  label: string;
};

export const LANGUAGE_MAP: Record<Locale, Language> = {
  'zh-CN': { locale: 'zh-CN', label: '简体中文' },
  'en-US': { locale: 'en-US', label: 'English' },
};

export function useLocale() {
  const { i18n, t } = useTranslation();

  const setLocale = async (locale: Locale) => {
    // 直接复用底层核心的标准切换逻辑，避免未来逻辑变更时需要改两处代码
    await globalSetLocale(locale);
  };

  return {
    // 加上兜底和类型断言，确保业务层拿到的类型绝对安全
    locale: (i18n.language?.replace('_', '-') || 'zh-CN') as Locale,
    setLocale,
    // 暴露 $t 函数，避免组件直接 import { useTranslation } from 'react-i18next'
    $t: t,
  };
}
