import {Form ,Input,Button,Col ,Card} from 'antd';
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

    CookieUtil.setCookie("username",formData.name,7);
    CookieUtil.setCookie("password",formData.password,7);
    UserService.validate(formData, {
      success: function (resp) {
        window.location.reload;
      },
      error: function (resp) {
        message.error("登录失败");
        
        CookieUtil.clearCookie("username");
        CookieUtil.clearCookie("password");
      },
      complete: function () {
        console.log("complete");
      }

    });
  }


  //生命周期
  componentDidMount() {
    console.log("ddd");
    let name= CookieUtil.getCookie("username");
    let password= CookieUtil.getCookie("password");
    if(StringUtil.isBlank(name)||(StringUtil.isBlank(password))){
      return;
    }
    let formData={};
    formData.name=name;
    formData.password=password;
    UserService.validate(formData, {
      success: function (resp) {
        if(resp){
          window.location.href = "/assess/assesslist";
        } else {
        CookieUtil.clearCookie("username");
        CookieUtil.clearCookie("password");
        }
      },
      error: function (resp) {
        CookieUtil.clearCookie("username");
        CookieUtil.clearCookie("password");
      },
      complete: function () {
        console.log("complete");
      }

    });
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
            <Card>
          <Col span={4} offset={8}>
          <Form onSubmit={this.handleSubmit}>
           
            <FormItem label="姓名：" {...formItemLayout}>
              {getFieldDecorator("name")(
                <Input placeholder="请输入用户名" />
              )}
            </FormItem>
            <FormItem label="密码：" {...formItemLayout}>
              {getFieldDecorator("password")(
                <Input.Password placeholder="请输入密码" />
              )}
            </FormItem>
  
            <FormItem style={{ marginTop: 40, textAlign: "right" }} wrapperCol={{ span: 6, offset: 17 }}>
              <Button type="primary" size="small" htmlType="submit">确定</Button>
            </FormItem>
          </Form>
          </Col>
            </Card>
      </div>
    );
  }
}
Login.propTypes = {};

Login = Form.create()(Login);

export default Login;