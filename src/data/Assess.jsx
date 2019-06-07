import * as OptionsHelper from './helpers/OptionsHelper.js';
import * as ResponseHelper from './helpers/ResponseHelper.js';
import $ from 'jquery';
import JSON from 'JSON';

/**
 * 保存
 *
 * @param assess    
 * @param options 请求配置
 */
export function save(assess, options) {
  options = OptionsHelper.generate(options);
  $.ajax({
    url: "/employee/assess/save",
    contentType: "application/json",
    method: "POST",
    data: JSON.stringify(assess),
    success: function (resp) {
      options.success(resp);// 成功
    },
    error: options.error,
    complete: options.complete
  });
}

export function findByEmployeeIdAndPhase(employeeId,phase,options) {
  options = OptionsHelper.generate(options);
  return $.ajax({
    url: "/employee/assess/findByEmployeeIdAndPhase",
    method: "GET",
    data:{
      employeeId:employeeId,
      phase:phase
    },
    success: function (resp) {
      options.success(resp);
    },
    error: options.error,
    complete: options.complete
  });
}

