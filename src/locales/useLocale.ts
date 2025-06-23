import type { Locale as AntdLocal } from 'antd/es/locale';
import { useTranslation } from 'react-i18next';

import en_US from 'antd/locale/en_US';
import zh_CN from 'antd/locale/zh_CN';
import { useEffect, useState } from 'react';

type Locale = 'en_US' | 'zh_CN';
type Language = {
  locale: Locale;
  icon: string;
  label: string;
  antdLocal: AntdLocal;
};

export const LANGUAGE_MAP: Record<Locale, Language> = {
  zh_CN: {
    locale: 'zh_CN',
    label: '简体中文',
    icon: 'ic-locale_zh_CN',
    antdLocal: zh_CN,
  },
  en_US: {
    locale: 'en_US',
    label: 'English',
    icon: 'ic-locale_en_US',
    antdLocal: en_US,
  },
};

export default function useLocale() {
  const { i18n } = useTranslation();
  const [locale, setLocale] = useState(i18n.language);

  useEffect(() => {
    i18n.changeLanguage(locale);
  }, [locale, i18n]);

  const language = LANGUAGE_MAP[locale as Locale];

  return {
    locale,
    language,
    setLocale,
  };
}
