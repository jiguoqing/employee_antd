/**
 * 是否为服务器异常
 *
 * @param resp
 * @returns {boolean}
 */
export function isException(resp) {
  if (resp && resp.messageCode != null) {
    return true;
  }
  return false;
}

/**
 * 未出现服务器异常
 *
 * @param resp
 * @returns {boolean}
 */
export function isNotException(resp) {
  return !isException(resp);
}

/**
 * 请求是否处理成功
 *
 * @param resp
 * @returns {boolean}
 */
export function isSuccess(resp) {
  if (resp && resp.code == '200') {
    return true;
  }
  return false;
}

/**
 * 处理失败
 *
 * @param resp
 * @returns {boolean}
 */
export function isFailure(resp) {
  return !isSuccess(resp);
}

export function isAuthorized(resp) {
  if (resp.status == '403') {
    return false;
  }
  return true;
}