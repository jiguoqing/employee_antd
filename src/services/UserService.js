import * as User from '../data/User';

/**
 * 验证登录
 *
 * @param formData    
 * @param options 请求配置
 */
export function validate(formData, options) {
  return User.validate(formData, options);
}
