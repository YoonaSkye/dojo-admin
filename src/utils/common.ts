import { $t } from '@/locales';

export const isFunction = (
  value: unknown,
): value is (...args: any[]) => any => {
  return typeof value === 'function';
};

export const isString = (value: unknown): value is string => {
  return typeof value === 'string';
};

/**
 * 检查传入的值是否为undefined。
 *
 * @param {unknown} value 要检查的值。
 * @returns {boolean} 如果值是undefined，返回true，否则返回false。
 */
export function isUndefined(value?: unknown): value is undefined {
  return value === undefined;
}

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

export function bindMethods<T extends object>(instance: T): void {
  const prototype = Object.getPrototypeOf(instance);
  const propertyNames = Object.getOwnPropertyNames(prototype);

  propertyNames.forEach((propertyName) => {
    const descriptor = Object.getOwnPropertyDescriptor(prototype, propertyName);
    const propertyValue = instance[propertyName as keyof T];

    if (
      typeof propertyValue === 'function' &&
      propertyName !== 'constructor' &&
      descriptor &&
      !descriptor.get &&
      !descriptor.set
    ) {
      instance[propertyName as keyof T] = propertyValue.bind(instance);
    }
  });
}
