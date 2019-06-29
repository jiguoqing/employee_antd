import {Form ,Input,Button } from 'antd';
import React, { Component } from 'react';
import * as  UserService from '../../services/UserService';
import * as StringUtil from '../../utils/StringUtil';
import * as CookieUtil from '../../utils/CookieUtil';
const FormItem = Form.Item;
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData:{}
    };
  }

    /**
   * 提交表单
   *
   * @param e
   */
  handleSubmit=(e)=> {
    const formData = this.props.form.getFieldsValue();
    const self = this;

    StringUtil.trimObject(formData);    // 去除所有空格

    UserService.validate(formData, {
      success: function (resp) {
        CookieUtil.setCookie("username",formData.name,7);
        CookieUtil.setCookie("password",formData.password,7);
        window.location.href = "/";
      },
      error: function (resp) {
        message.error("登录失败");
      },
      complete: function () {
        console.log("complete");
      }

    });
  }

  //生命周期
  componentDidMount() {
  }

  render() {
  
     const { getFieldDecorator } = this.props.form;
      const data = this.props.data;
    
      const formItemLayout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 17 }
      };
      return (
        <div >
          <Form onSubmit={this.handleSubmit}>
           
            <FormItem label="姓名：" {...formItemLayout}>
              {getFieldDecorator("name")(
                <Input placeholder="请输入用户名" />
              )}
            </FormItem>
            <FormItem label="密码：" {...formItemLayout}>
              {getFieldDecorator("password")(
                <Input placeholder="请输入密码" />
              )}
            </FormItem>
  
            <FormItem style={{ marginTop: 40, textAlign: "right" }} wrapperCol={{ span: 6, offset: 17 }}>
              <Button type="primary" size="small" htmlType="submit">确定</Button>
            </FormItem>
          </Form>
      </div>
    );
  }
}
Login.propTypes = {};

Login = Form.create()(Login);

export default Login;