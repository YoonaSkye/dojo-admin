import { useTranslation } from 'react-i18next';

export type Locale = 'en-US' | 'zh-CN';
type Language = {
  locale: Locale;
  label: string;
};

export const LANGUAGE_MAP: Record<Locale, Language> = {
  'zh-CN': {
    locale: 'zh-CN',
    label: '简体中文',
  },
  'en-US': {
    locale: 'en-US',
    label: 'English',
  },
};

export function useLocale() {
  const { i18n } = useTranslation();

  const setLocale = (locale: Locale) => {
    i18n.changeLanguage(locale);
  };

  return {
    locale: i18n.language as Locale,
    setLocale,
  };
}
