export type SupportedLanguagesType = 'zh-CN' | 'en-US';

export interface LocaleSetupOptions {
  /** 默认语言，缺省为 'zh-CN' */
  defaultLocale?: SupportedLanguagesType;
  /** 是否开启找不到 Key 时的控制台警告，缺省为 true */
  missingWarn?: boolean;
  /** 外部或第三方组件库（如 Antd/Shadcn）需要合并的国际化语言包映射表 */
  extendLocales?: Record<string, Record<string, any>>;
}
