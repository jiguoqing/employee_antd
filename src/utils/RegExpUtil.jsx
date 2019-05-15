import * as StringUtil from './StringUtil';

/**
 * 当前字符串是否仅含有小写字母或者下划线
 *
 * @param str         当前字符串
 * @returns {boolean}
 */
export function isLowerCaseAndUnderline(str) {
  if (StringUtil.isBlank(str)) {
    return false;
  }
  return /^[A-Za-z_]+$/.test(str);
}

/**
 * 检测过滤条件参数名格式
 *
 * @param str
 * @returns {boolean}
 */
export function isFilterInfoKey(str) {
  if (StringUtil.isBlank(str)) {
    return false;
  }
  return /^[_a-zA-Z][_a-zA-Z0-9]*$/im.test(str);
}

/**
 * 检测过滤条件参数值格式
 *
 * @param str
 * @returns {boolean}
 */
export function isFilterInfoValue(str) {
  if (StringUtil.isBlank(str)) {
    return false;
  }
  return /^[_a-zA-Z0-9,.\-#\s]+$/im.test(str);
}

/**
 * 业务资源地址格式
 *
 * @param url
 * @returns {boolean}
 */
export function isResourceURL(url) {
  if (StringUtil.isBlank(url)) {
    return false;
  }
  return /^[a-zA-Z0-9_\-.\{\}/]+$/im.test(url);
}