import * as Assess from '../data/Assess';
import * as CollectionUtil from '../utils/CollectionUtil';


/**
 * 保存
 *
 * @param assess    
 * @param options 请求配置
 */
export function save(assess, options) {
  if (CollectionUtil.isEmpty(assess)) {
    return;
  }
  return Assess.save(assess, options);
}
