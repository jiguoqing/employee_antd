import * as OptionsHelper from './helpers/OptionsHelper.js';
import * as ResponseHelper from './helpers/ResponseHelper.js';
import $ from 'jquery';
import JSON from 'JSON';

/**
 * 验证登录
 *
 * @param user    
 * @param options 请求配置
 */
export function validate(user, options) {
  options = OptionsHelper.generate(options);
  $.ajax({
    url: "/oa/user/validate?user="+user.name+"&password="+user.password,
    contentType: "application/json",
    method: "GET",
    success: function (resp) {
      options.success(resp);// 成功
      debugger;
      console.log(resp);
    },
    error:function (resp) {
       options.error;
       debugger;
       console.log(resp);
    },
    complete: options.complete
  });
}

