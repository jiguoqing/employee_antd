import * as Assess from '../data/Assess';
import * as CollectionUtil from '../utils/CollectionUtil';
import * as StringUtil from '../utils/StringUtil';



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

export function saveAssessPerson(assessPerson, options) {
  if (CollectionUtil.isEmpty(assessPerson)) {
    return;
  }
  return Assess.saveAssessPerson(assessPerson, options);
}

export function findAssessPerson(assessPerson, options) {
  if (CollectionUtil.isEmpty(assessPerson)) {
    return;
  }
  return Assess.findAssessPerson(assessPerson, options);
}



export function findByEmployeeIdAndPhase(employeeId,phase, options) {
  if (StringUtil.isBlank(phase)) {
    return;
  }
  if (null === employeeId) {
    return;
  }
  return Assess.findByEmployeeIdAndPhase(employeeId,phase, options);
}