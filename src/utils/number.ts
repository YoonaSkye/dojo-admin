/**
 * 检查传入的值是否为数字
 * @param value
 */
function isNumber(value: any): value is number {
  return typeof value === 'number' && Number.isFinite(value);
}

function formatNumber(
  num: number | string,
  decimal = '.',
  decimals = 0,
  prefix = '',
  separator = ',',
  suffix = ''
) {
  if (!num && num !== 0) {
    return '';
  }
  // const { decimal, decimals, prefix, separator, suffix } = props;
  num = Number(num).toFixed(decimals);
  num += '';

  const x = num.split('.');
  let x1 = x[0];
  const x2 = x.length > 1 ? decimal + x[1] : '';

  const rgx = /(\d+)(\d{3})/;
  if (separator && !isNumber(separator) && x1) {
    while (rgx.test(x1)) {
      x1 = x1.replace(rgx, `$1${separator}$2`);
    }
  }
  return prefix + x1 + x2 + suffix;
}

export { formatNumber };
