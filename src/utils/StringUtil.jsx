import * as TypeUtil from './TypeUtil';

/**
 * 空字符串
 *
 * @type {string}
 */
export const EMPTY = "";

/**
 * 将html实体转成html
 *
 * @param value
 * @returns {*}
 */
export function unescape(value) {
    if (value == null) {
        return null;
    }
    value = EMPTY + value;
    value = value.replace(/&quot;/img, '"');
    value = value.replace(/&gt;/img, '>');
    value = value.replace(/&lt;/img, '<');
    value = value.replace(/&amp;/img, '&');
    return value;
}

/**
 * 将html转成html实体
 *
 * @param value
 * @returns {*}
 */
export function escape(value) {
    if (value == null) {
        return null;
    }
    value = EMPTY + value;
    value = value.replace(/&/img, '&amp;');
    value = value.replace(/"/img, '&quot;');
    value = value.replace(/>/img, '&gt;');
    value = value.replace(/</img, '&lt;');
    return value;
}

/**
 * 去除字符串左侧空白字符
 *
 * @param str
 * @returns {*}
 */
export function trimLeft(str) {
    if (str == null) {
        return null;
    }
    return (EMPTY + str).replace(/(^\s+)/img, EMPTY);
}

/**
 * 去除字符串右侧空白字符
 *
 * @param str
 * @returns {*}
 */
export function trimRight(str) {
    if (str == null) {
        return null;
    }
    return (EMPTY + str).replace(/(\s+$)/img, EMPTY);
}

/**
 * 去除字符串左右空格
 *
 * @param str 当前字符串
 * @returns {*}
 */
export function trim(str) {
  return trimLeft(trimRight(str));
}

/**
 * 去除字符串所有空白字符, 不管出现位置
 *
 * @param str
 * @returns {*}
 */
export function trimAll(str) {
    if (str == null) {
        return null;
    }
    return (EMPTY + str).replace(/(\s+)/img, EMPTY);
}

/**
 * 去除对象里面所有属性空白 (最多处理两层)
 *
 * @param object
 */
export function trimObject(object) {
  if (object == null) {
    return null;
  }
  for (let key in object) {
    if (TypeUtil.isString(object[key])) {
      object[key] = trim(object[key]);
    } else if (TypeUtil.isArray(object[key])) {
      object[key] = object[key].map((value) => {
        if (TypeUtil.isString(value)) {
          return trim(value);
        }
        return value;
      });
    } else if (TypeUtil.isObject(object[key])) {
      trimObject(object[key]);
    }
  }
}

/**
 * 校验字符串是否为空
 *
 * @param value
 * @returns {boolean}
 */
export function isBlank(value) {
    if (value == null) {
        return true;
    }
    return trimAll(value) == EMPTY;
}

/**
 * 校验字符串为非空
 *
 * @param value
 * @returns {boolean}
 */
export function isNotBlank(value) {
    return !isBlank(value);
}

/**
 * 判断是否以字符串打头
 *
 * @param str
 * @param prefix
 * @returns {boolean}
 */
function startsWith(str, prefix) {
  if (str == null || prefix == null) return false;
  return str.slice(0, prefix.length) === prefix;
}

/**
 * 判断是否以字符串结尾
 *
 * @param str
 * @param suffix
 * @returns {boolean}
 */
function endsWith(str, suffix) {
  if (str == null || suffix == null) return false;
  return str.slice(-suffix.length) === suffix;
}

/**
 * 计算字符串的hash值
 *
 * @param str
 * @returns {number}
 */
export function hashCode(str){
    let hash = 0;
    if (isBlank(str)) return hash;
    for (let i = 0, len = str.length; i < len; i++) {
        let ch = str.charCodeAt(i);
        hash = (( hash << 5 ) - hash) + ch;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
}

/**
 * 高亮当前字符串中的关键字
 *
 * @param str
 * @param keyword
 * @returns {*}
 */
export function highlight(str, keyword, classNames) {
    if (str == null) {
        return null;
    }
    if (keyword == null) {
        return str;
    }
    if (isBlank(classNames)) {
      classNames = "ft-link";
    }
    return (EMPTY + str).replace(new RegExp("(" + keyword + ")", "img"), '<span class="' + classNames + '">$1</span>');
}

/**
 * 字符串超长处理
 *
 * @param str 当前字符串
 * @param maxLength 字符串最大长度
 * @param padding 填充字符
 * @returns {*}
 */
export function ellipsis(str, len = 10, padding = "...") {
  if (isBlank(str)) return str;
  str = trimAll(str);
  if (str.length <= len) return str;
  return str.substring(0, len) + padding;
}

/**
 * 中文URI编码
 *
 * @param str   需要编码的字符串
 * @returns {*}
 */
export function encode(str) {
  if (isBlank(str)) return str;
  return encodeURIComponent(str);
}

/**
 * 中文URI解码
 *
 * @param str   需要解码的字符串
 * @returns {*}
 */
export function decode(str) {
  if (isBlank(str)) return str;
  return decodeURIComponent(str);
}