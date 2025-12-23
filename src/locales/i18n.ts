import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import en_US from './langs/en_US';
import zh_CN from './langs/zh_CN';

export const reactI18nextInstance = i18n
  .use(LanguageDetector)
  .use(initReactI18next);

/** Setup plugin i18n */
export async function setupI18n() {
  await reactI18nextInstance.init({
    fallbackLng: 'zh-CN',
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
    resources: {
      'zh-CN': { translation: zh_CN },
      'en-US': { translation: en_US },
    },
  });
}

export const $t = reactI18nextInstance.t;

export function setLocale(locale: string) {
  i18n.changeLanguage(locale);
}
