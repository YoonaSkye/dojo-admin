import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import en_US from './lang/en_US';
import zh_CN from './lang/zh_CN';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: 'en-US',
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
    resources: {
      'en-US': { translation: en_US },
      'zh-CN': { translation: zh_CN },
    },
  });

export default i18n;
