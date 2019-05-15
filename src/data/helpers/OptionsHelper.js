
function noop() {}

/**
 * 构造默认的请求配置
 *
 * @param options
 */
export function generate(options) {
  options = options || {};
  options.success = options.success || noop;
  options.error = options.error || noop;
  options.complete = options.complete || noop;
  return options;
}