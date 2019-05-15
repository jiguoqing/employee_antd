import * as StringUtil from './StringUtil';

/**
 * 检测当前字符串是否为url
 *
 * @param url
 * @returns {boolean}
 */
export function isUrl(url) {
  if (StringUtil.isBlank(url)) return false;
  var reg = /(^(http|ftp|https|file):\/\/([\w\-]+\.)+[\w\-]+(\/[\w\u4e00-\u9fa5\-\.\/?\@\%\!\&=\+\~\:\#\;\,]*)?)/ig;
  return reg.test(url);
}

/**
 * 判断当前路径名当中是否包含某个指定路径
 */
export function hasPathName(location, checkedPathName) {
  if (location == null) return false;
  let { pathname } = location;
  if (StringUtil.isBlank(pathname) || StringUtil.isBlank(checkedPathName)) return false;
  return pathname.indexOf(checkedPathName) != -1;
}

/**
 * 是否为核对手段首页
 * @param loction
 * @returns {boolean}
 */
export function isCheckIndex(location) {
  return hasPathName(location, "/check/index");
}
/**
 * 获取查询参数字符串列表, 形式为: a=1&b=2
 * @param location
 * @param doubt 是不带有查询前缀 ?
 * @param exclude 排除某一参数
 * @returns {*}
 */
export function getQueryString(location, doubt, exclude) {
  if (StringUtil.isBlank(location)) return "";
  let { query } = location;
  let queries = [];
  for (let key in query) {
    if (exclude == key) {
      continue;
    }
    queries.push(key + "=" + query[key]);
  }
  if (queries.length == 0) {
    return "";
  }
  return (doubt ? '?' : '') + queries.join("&");
}

/**
 * 获到RESTFUL参数列表 check/index(/:name)(/:id) 结果为 /xxx/123
 * @param params
 * @returns {*}
 */
export function getParamString(param) {
  if (StringUtil.isBlank(param)) return "";
  let { params } = param;
  let paramValues = [];
  for (let key in params) {
    paramValues.push("/" + params[key]);
  }
  return paramValues.join("");
}

/**
 * 获取指定参数值
 *
 * @param location  当前地址
 * @param key       参数名称
 * @returns {*}
 */
export function getParameterValue(location, key) {
  if (location == null || StringUtil.isBlank(key)) {
    return null;
  }
  let { query } = location;
  for (let param in query) {
    if (key == param) {
      return query[param];
    }
  }
  return null;
}
