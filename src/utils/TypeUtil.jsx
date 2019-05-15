/**
 * 对象类型检测
 *
 * @param value 待检测对象
 * @param type 类型 "[object Null]", "[object String]", ...
 * @returns {boolean}
 */
export function is(object, type) {
    return Object.prototype.toString.call(object) == type;
};

/**
 * 检测对象类型为null
 *
 * @param value
 * @returns {boolean}
 */
export function isNull(value) {
    return is(value, "[object Null]");
};

/**
 * 检测对象类型为string
 *
 * @param value
 * @returns {boolean}
 */
export function isString(value) {
    return is(value, "[object String]");
};

/**
 * 检测对象类型为number
 *
 * @param value
 * @returns {boolean}
 */
export function isNumber(value) {
    return is(value, "[object Number]");
};

/**
 * 检测对象类型为boolean
 *
 * @param value
 * @returns {boolean}
 */
export function isBoolean(value) {
    return is(value, "[object Boolean]");
};

/**
 * 检测对象类型为undefined
 *
 * @param value
 * @returns {boolean}
 */
export function isUndefined(value) {
    return is(value, "[object Undefined]");
};

/**
 * 检测对象类型为object
 *
 * @param value
 * @returns {boolean}
 */
export function isObject(value) {
    return is(value, "[object Object]");
};

/**
 * 检测对象类型为function
 *
 * @param value
 * @returns {boolean}
 */
export function isFunction(value) {
    return is(value, "[object Function]");
};

/**
 * 检测对象类型为array
 * @param value
 * @returns {boolean}
 */
export function isArray(value) {
    return is(value, "[object Array]");
};