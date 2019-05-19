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
    url: "/oa/assess/save",
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
