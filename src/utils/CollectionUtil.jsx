import * as TypeUtil from './TypeUtil';
import * as StringUtil from './StringUtil';

/**
 * 判断数组或者对象是否为空
 *
 * @param object
 * @returns {boolean}
 */
export function isEmpty(object) {
    if (object == null) {
        return true;
    }

    if (TypeUtil.isArray(object)) {   // 当前对象为array
        return object.length == 0;
    }

    if (TypeUtil.isObject(object)) {  // 当前对象为object
      for (let key in object)
        return !1;
      return !0;
    }

    return false;
}

/**
 * 当前数组或者对象不为空
 *
 * @param object
 * @returns {boolean}
 */
export function isNotEmpty(object) {
    return !isEmpty(object);
}

/**
 * 检测包含
 *
 * @param array
 * @param item
 * @returns {boolean}
 */
export function contains(array, item) {
  if (isEmpty(array)) return false;
  if (item == null) return false;
  for (let i = 0, len = array.length; i < len; i++) {
    if (StringUtil.trim(array[i]) == StringUtil.trim(item)) {
      return true;
    }
  }
  return false;
}