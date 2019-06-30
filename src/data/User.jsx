import * as OptionsHelper from './helpers/OptionsHelper.js';
import * as ResponseHelper from './helpers/ResponseHelper.js';
import * as CookieUtil from '../utils/CookieUtil';
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
    url: "/oa/user/validate",
    contentType: "application/json",
    method: "POST",
    data: JSON.stringify(user),
    success: function (resp) {
      options.success(resp);// 成功
      if(!resp){
        CookieUtil.clearCookie("username");
        CookieUtil.clearCookie("password");
      }
      debugger;
      console.log(resp);
    },
    error:function (resp) {
       options.error;
       debugger;
       console.log(resp);
    },
    complete: function (resp) {
      options.complete;
      debugger;
      console.log(resp);
   },
  });
}


