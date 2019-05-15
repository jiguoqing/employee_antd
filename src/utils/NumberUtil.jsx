/**
 * 转成十进制，并保留小数位, 转不成功 返回原始数据
 *
 * @param num  当前数值
 * @param bits 小数位
 * @returns {*}
 */
export function toDecimal(num, bits) {
    let f = parseFloat(num);
    if (bits == null) { bits = 2; }
    if (bits < 0) { bits = 0 };
    if (isNaN(f)) {
        return num;
    }
    let bitsValue = 1;
    for (let i = 0; i < bits; i++) {
        bitsValue *= 10;
    }
    return Math.round(f * bitsValue) / bitsValue;
}

/**
 * 转换数据成整型, 转不成功返回原始数据
 *
 * @param num 当前数值
 * @returns {*}
 */
export function toInt(num) {
    if (num == null) {
        return num;
    }
    var value = parseInt(num, 10);
    if (isNaN(value)) {
        return num;
    }
    return value;
}