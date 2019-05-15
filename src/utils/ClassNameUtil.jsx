import * as StringUtil from './StringUtil';

/**
 * 将类样式转换成列表
 *
 * @param className
 * @returns {*}
 */
export function toArray(className) {
  if (StringUtil.isBlank(className)) {
    return [];
  }
  return StringUtil.trim(className).split(/\s+/);
}

/**
 * 是否包含某个类样式
 *
 * @param className
 * @param hitClassName
 */
export function contains(className, hitClassName) {
  if (StringUtil.isBlank(className) || StringUtil.isBlank(hitClassName)) {
    return false;
  }
  for (let i = 0, classNames = toArray(className), len = classNames.length; i < len; i++) {
    if (StringUtil.trim(classNames[i]) == StringUtil.trim(hitClassName)) {
      return true;
    }
  }
  return false;
}

/**
 * 是否包含某个类样式
 *
 * @param className        当前类样式
 * @param containClassName 待验证样式
 */
export function hasClass(className, containClassName) {
  return contains(className, containClassName);
}