import * as Employee from '../data/Employee.js';
import * as StringUtil from '../utils/StringUtil';
import * as CollectionUtil from '../utils/CollectionUtil';


/**
 * 保存
 *
 * @param employee    
 * @param options 请求配置
 */
export function save(employee, options) {
  if (CollectionUtil.isEmpty(employee)) {
    return;
  }
  return Employee.save(employee, options);
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
