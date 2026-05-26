import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import type { LocaleSetupOptions } from './typing';

// 1. 动态导入所有语言 JSON 文件
const modules = import.meta.glob('./langs/**/*.json', { eager: false });
const loadedLanguages = new Set<string>();

export const reactI18nextInstance = i18n
  .use(LanguageDetector)
  .use(initReactI18next);

export async function setupI18n(options: LocaleSetupOptions = {}) {
  const {
    defaultLocale = 'zh-CN',
    missingWarn = true,
    extendLocales = {},
  } = options;

  await reactI18nextInstance.init({
    fallbackLng: defaultLocale,
    interpolation: { escapeValue: false },
    resources: {},
    // 【新增调整 1】：显式指定支持的语言，防止 Detector 检测出不受支持的 'zh' 或 'en' 导致白屏
    supportedLngs: ['zh-CN', 'en-US'],
    // 【新增调整 2】：检测到带有下划线的语言时，自动格式化为标准中划线
    detection: {
      convertDetectedLanguage: (lng) => lng.replace('_', '-'),
    },
    missingKeyHandler: (lng, ns, key) => {
      if (missingWarn && key.includes('.')) {
        console.warn(
          `[i18n] Not found '${key}' key in '${lng}' locale messages.`,
        );
      }
    },
  });

  // 获取最终生效的初始语言（优先取缓存/检测结果，其次取默认值）
  const initialLng = reactI18nextInstance.language || defaultLocale;

  // 串行阻塞式加载首屏所需的语言包
  await setI18nLanguage(initialLng);

  // 合并第三方库扩展
  if (Object.keys(extendLocales).length > 0) {
    for (const [locale, messages] of Object.entries(extendLocales)) {
      reactI18nextInstance.addResourceBundle(
        locale,
        'translation',
        messages,
        true,
        true,
      );
    }
  }
}

/**
 * 优化后的动态语言包加载：并发加载逻辑，并解决串行卡顿问题
 */
export async function loadLocaleMessages(lang: string) {
  if (loadedLanguages.has(lang)) return;

  const tasks: Promise<any>[] = [];
  const fileNames: string[] = [];

  // 收集该语言下的所有异步下载任务，转为并行
  for (const [path, loader] of Object.entries(modules)) {
    const match = path.match(/langs\/([^/]+)\/([^/]+)\.json$/);
    if (!match) continue;

    const [, locale, fileName] = match;
    if (locale !== lang) continue;

    fileNames.push(fileName);
    tasks.push(loader());
  }

  try {
    // 关键优化：Promise.all 并行发起 HTTP 请求，大大缩短网络等待时间
    const results = await Promise.all(tasks);

    // 合并到一个大对象中，一次性写入 i18next，避免高频 addResourceBundle
    const mergedMessages: Record<string, any> = {};
    results.forEach((module: any, index) => {
      mergedMessages[fileNames[index]] = module.default;
    });

    reactI18nextInstance.addResourceBundle(
      lang,
      'translation',
      mergedMessages,
      true,
      true,
    );
    loadedLanguages.add(lang);
  } catch (error) {
    console.error(`[i18n] Failed to load language pack for [${lang}]:`, error);
  }
}

/**
 * 统一的激活语言入口：确保网络请求完毕后再切换状态
 */
async function setI18nLanguage(locale: string) {
  await loadLocaleMessages(locale);
  await reactI18nextInstance.changeLanguage(locale); // 确保核心引擎知道语言变了
  document?.querySelector('html')?.setAttribute('lang', locale);
}

/**
 * 修正后的 $t 导出：动态代理，确保组件外及未来语言切换后的翻译时效性
 */
export const $t = (key: string, options?: any): string => {
  return reactI18nextInstance.t(key, options) as string;
};

/**
 * 修正后的切换语言函数：改为 async 函数供组件和外部调用
 */
export async function setLocale(locale: string) {
  await setI18nLanguage(locale);
}
