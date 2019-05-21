import * as OptionsHelper from './helpers/OptionsHelper.js';
import * as ResponseHelper from './helpers/ResponseHelper.js';
import $ from 'jquery';
import JSON from 'JSON';

/**
 * 保存
 *
 * @param department    
 * @param options 请求配置
 */
export function save(department, options) {
  options = OptionsHelper.generate(options);
  $.ajax({
    url: "/oa/department/save",
    contentType: "application/json",
    method: "POST",
    data: JSON.stringify(department),
    success: function (resp) {
      options.success(resp);// 成功
    },
    error: options.error,
    complete: options.complete
  });
}


/**
 * 分页查询
 * @param options 请求配置
 */

export function findAll(options) {
  options = OptionsHelper.generate(options);
  return $.ajax({
    url: "/oa/department/findAll",
    method: "GET",
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
    url: "/oa/department/deleteById",
    method: "DELETE",
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

