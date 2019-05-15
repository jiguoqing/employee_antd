import * as TypeUtil from './TypeUtil';

/**
 * 灰度时间策略时间格式
 *
 * @type {string}
 */
export const GRAY_TIME_POLICTY_DATE_FORMAT = "YYYYMMDDHHmm";

/**
 * 格式化日期
 *
 * @param date 日期
 * @param fmt 格式: yyyy-MM-dd hh:mm:ss
 * @returns {*}
 */
export function format(date, fmt) {
    var d = new Date(date);
    var o = {
        "M+": d.getMonth() + 1, //月份
        "d+": d.getDate(),      //日
        "h+": d.getHours(),     //小时
        "m+": d.getMinutes(),   //分
        "s+": d.getSeconds(),   //秒
        "q+": Math.floor((d.getMonth() + 3) / 3), //季度
        "S": d.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (d.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

/**
 * 格式化成 2016-10-21
 *
 * @param date
 * @returns {*}
 */
export function formatDate(date) {
  return format(date, "yyyy-MM-dd");
}

/**
 * 格式化成 12:22:22
 * @param date
 * @returns {*}
 */
export function formatTime(date) {
  return format(date, "hh:mm:ss");
}

/**
 * 格式化成 2016-10-21 12:22:22
 * @param date
 */
export function formatDateTime(date) {
  return format(date, "yyyy-MM-dd hh:mm:ss");
}

/**
 * 当前时间转换成天/时/分
 * @param seconds
 */
export function duration(value) {
  if (value == null) {
    return "";
  }
  if (!TypeUtil.isNumber(value)) {
    return "";
  }
  let format = [];
  let seconds = value * 60;
  let day = parseInt (seconds / 24 / 3600, 10);
  let hours = parseInt ((seconds % (3600 * 24)) / 3600, 10);
  let minutes = parseInt ((seconds % 3600) / 60, 10);
  if (day > 0) {
    format.push(day + "天");
  }
  if (hours > 0) {
    format.push(hours + "小时");
  }
  if (minutes > 0) {
    format.push(minutes + "分");
  }
  return format.join("");
}