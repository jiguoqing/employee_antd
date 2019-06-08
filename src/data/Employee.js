import * as OptionsHelper from './helpers/OptionsHelper.js';
import * as ResponseHelper from './helpers/ResponseHelper.js';
import $ from 'jquery';
import JSON from 'JSON';

/**
 * 保存
 *
 * @param employee    
 * @param options 请求配置
 */
export function save(employee, options) {
  options = OptionsHelper.generate(options);
  $.ajax({
    url: "/api/employee/save",
    contentType: "application/json",
    method: "POST",
    data: JSON.stringify(employee),
    success: function (resp) {
      options.success(resp);// 成功
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

export function findByCondition(formData, options) {
  options = OptionsHelper.generate(options);
  return $.ajax({
    url: "/api/employee/findByCondition",
    contentType: "application/json",
    method: "GET",
    data: formData,
    // data: {
    //   page: currentPage,                        	 // 当前页
    //   name: formData.name,
    // },
    success: function (resp) {
      // if (ResponseHelper.isSuccess(resp)) {           // 成功
      options.success(resp);
      // } else {
      //   options.error(resp);           // 失败
      // }
    },
    error: options.error,
    complete: options.complete
  });
}

export function countByCondition(formData, options) {
  options = OptionsHelper.generate(options);
  return $.ajax({
    url: "/api/employee/countByCondition",
    traditional: true,
    contentType: "application/json",
    method: "GET",
    data: formData,
    success: function (resp) {
      options.success(resp);
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
    url: "/api/employee/findById",
    method: "GET",
    data: {
      id: id
    },
    success: function (resp) {
        options.success(resp);
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
    url: "/api/employee/deleteById",
    method: "POST",
    data: {
      id: id
    },
    success: function (resp) {
      options.success(resp);
    },
    error: options.error,
    complete: options.complete
  });
}

