import * as OptionsHelper from './helpers/OptionsHelper.js';
import * as ResponseHelper from './helpers/ResponseHelper.js';

import $ from 'jquery';

/**
 * 保存
 *
 * @param Employee    
 * @param options 请求配置
 */
export function save(Employee, options) {
  options = OptionsHelper.generate(options);
  $.ajax({
    url: "/employee/save.json",
    method: "POST",
    data: {
      id: Employee.id,                            // 编号(编辑状态有值)
      triggerPoint: Employee.triggerPoint,                        // 表达式
      description: Employee.description,          // 措施描述

      name: Employee.name,                        // 名称

    },
    success: function (resp) {
      if (ResponseHelper.isSuccess(resp)) {           // 成功
        options.success(resp);
      } else {
        options.error(resp);           // 失败
      }
    },
    error: options.error,
    complete: options.complete
  });
}


/**
 * 分页查询
 *
 * @param pageSize    每页显示条数
 * @param currentPage    单前页
 * @param options 请求配置
 */

export function findByPage(pageSize, currentPage, formData, options) {
  options = OptionsHelper.generate(options);
  return $.ajax({
    url: "/oa/employee/findByCondition",
    method: "GET",
    data: {
      pageSize: pageSize,                            // 每页大小
      page: currentPage,                        	 // 当前页
      name: formData.name,
    },
    success: function (resp) {
      if (ResponseHelper.isSuccess(resp)) {           // 成功
        options.success(resp);
      } else {
        options.error(resp);           // 失败
      }
    },
    error: options.error,
    complete: options.complete
  });
}
/**
 * 查询详情
 *
 * @param id  编号
 * @param options 请求配置
 */
export function findById(id, options) {
  options = OptionsHelper.generate(options);
  return $.ajax({
    url: "/employee/findById.json",
    method: "POST",
    data: {
      id: id
    },
    success: function (resp) {
      if (ResponseHelper.isSuccess(resp)) {           // 成功
        options.success(resp);
      } else {
        options.error(resp);           // 失败
      }
    },
    error: options.error,
    complete: options.complete
  });
}

/**
 * 删除
 *
 * @param id  编号
 * @param options 请求配置
 */
export function deleteById(id, options) {
  options = OptionsHelper.generate(options);
  return $.ajax({
    url: "/employee/deleteById.json",
    method: "POST",
    data: {
      id: id
    },
    success: function (resp) {
      if (ResponseHelper.isSuccess(resp)) {           // 处理成功
        options.success(resp);
      } else {
        options.error(resp);           // 处理失败
      }
    },
    error: options.error,
    complete: options.complete
  });
}

