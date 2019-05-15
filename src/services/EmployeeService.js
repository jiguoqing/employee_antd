import * as Employee from '../data/Employee.js';
import * as StringUtil from '../utils/StringUtil';
import * as CollectionUtil from '../utils/CollectionUtil';


/**
 * 通过查询条件获取列表
 *
 * @param conditions 查询条件
 * @param options    请求配置
 * @returns {*}
 */
export function findByConditions(conditions, options) {
  if (CollectionUtil.isEmpty(conditions)) {
    return;
  }
  if (StringUtil.isBlank(conditions.sceneId)) {
    return;
  }
  return Employee.findByConditions(conditions, options);
}

/**
 * 保存
 *
 * @param riskScene    
 * @param options 请求配置
 */
export function save(riskScene, options) {
  if (CollectionUtil.isEmpty(riskScene)) {
    return;
  }
  return Employee.save(riskScene, options);
}

/**
 * 分页查询
 *
 * @param pageSize    每页显示条数
 * @param currentPage    单前页
 * @param options 请求配置
 */find
export function findByPageModel(pageSize, currentPage, formData, options) {
  return Employee.findByPage(pageSize, currentPage, formData, options);
}

/**
 * 查询详情
 *
 * @param id  编号
 * @param options 请求配置
 * @returns {*}
 */
export function findById(id, options) {
  if (StringUtil.isBlank(id)) {
    return;
  }
  return Employee.findById(id, options);
}

/**
 * 删除
 *
 * @param id  编号
 * @param options 请求配置
 * @returns {*}
 */
export function deleteById(id, options) {
  if (StringUtil.isBlank(id)) {
    return;
  }
  return Employee.deleteById(id, options);
}


/**
 * 查询列表
 *
 * @param appId  应用ID
 * @param pageSize    每页显示条数
 * @param currentPage    单前页
 * @param formData 
 * @param options 请求配置
 * @returns {*}
 */
export function findRelateByPageModel(targetId, pageSize, currentPage, formData, exclude, targetType, options) {
  var scenes = Employee.findRelateByPageModel(targetId, pageSize, currentPage, formData, exclude, targetType, options);
  return scenes;
}

/**
 * 保存应用对应的
 *
 * @param appId    应用ID
 * @param EmployeeIds    选中的ids 
 * @param options 请求配置
 */
export function addEmployees(appId, EmployeeIds, targetType, options) {
  if (StringUtil.isBlank(appId)) {
    return;
  }
  if (CollectionUtil.isEmpty(EmployeeIds)) {
    return;
  }
  return Employee.addEmployees(appId, EmployeeIds, targetType, options);
}

/**
 * 删除应用关联的
 *
 * @param appId  应用Id
 * @param riskSceneId  ID
 * @param options 请求配置
 * @returns {*}
 */
export function deleteEmployee(appId, riskSceneId, options) {
  return Employee.deleteEmployee(appId, riskSceneId, options);
}