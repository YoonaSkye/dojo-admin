import { $t } from '@/locales/i18n';

type Option<K = string> = { label: string; value: K };

/**
 * Translate options
 *
 * @param options
 */
export function translateOptions(options: Option<string>[]) {
  return options.map((option) => ({
    ...option,
    label: $t(option.label),
  }));
}
