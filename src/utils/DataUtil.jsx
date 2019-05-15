import * as TypeUtil from './TypeUtil';

/**
 * 填充默认值
 *
 * @param object        当前对象
 * @param attr          当前属性
 * @param defaultValue  默认值 ""
 * @returns {*}
 */
export function fill(object, attr, defaultValue = "") {
  if (TypeUtil.isUndefined(object) || TypeUtil.isNull(object)) {
    return defaultValue;
  }
  if (TypeUtil.isUndefined(object[attr]) || TypeUtil.isNull(object[attr])) {
    return defaultValue;
  }
  return object[attr];
}