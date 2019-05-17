import React, { Component, PropTypes } from 'react';
import { message, Form, Input, Button } from 'antd';
const FormItem = Form.Item;
import * as StringUtil from '../../utils/StringUtil';
import * as DataUtil from '../../utils/DataUtil';

/**
 * 风险场景编辑器
 */
class RiskDefinitionEditor extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  /**
    * 验证
    *
    * @param data
    */
  validate(data) {
    if (StringUtil.isBlank(data.name)) {
      message.warning("请填写姓名");
      return false;
    }
    return true;
  }
  /**
   * 提交表单
   *
   * @param e
   */
  handleSubmit(e) {
    e.preventDefault();
    const formData = this.props.form.getFieldsValue();
    if (!this.validate(formData)) return;
    const onSubmit = this.props.onSubmit;
    if (onSubmit) {
      onSubmit(formData);
    }
  }

  /**
   * 取消
   */
  handleCancel() {
    const onCancel = this.props.onCancel;
    if (onCancel) {
      onCancel();
    }
  }


  /**
  * 组件生命周期相关
  */
  componentDidMount() {

  }

  componentWillReceiveProps(props, nextProps) {

  }

  componentWillUnmount() {

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
        <Form horizontal onSubmit={this.handleSubmit}>
          {getFieldDecorator("id", { initialValue: DataUtil.fill(data, "id") })(
            <Input type="hidden" />
          )}
          <FormItem label="姓名：" {...formItemLayout}>
            {getFieldDecorator("name", { initialValue: DataUtil.fill(data, "name") })(
              <Input placeholder="姓名" />
            )}
          </FormItem>
          <FormItem label="英文名：" {...formItemLayout}>
            {getFieldDecorator("englishName", { initialValue: DataUtil.fill(data, "englishName") })(
              <Input placeholder="姓名" />
            )}
          </FormItem>
          <FormItem label="性别：" {...formItemLayout}>
            {getFieldDecorator("gender", { initialValue: DataUtil.fill(data, "gender") })(
              <Input placeholder="性别" />
            )}
          </FormItem>
          <FormItem label="员工号：" {...formItemLayout}>
            {getFieldDecorator("code", { initialValue: DataUtil.fill(data, "code") })(
              <Input placeholder="员工号" />
            )}
          </FormItem>

          <FormItem label="职位：" {...formItemLayout}>
            {getFieldDecorator("jobTitle", { initialValue: DataUtil.fill(data, "jobTitle") })(
              <Input placeholder="职位" />
            )}
          </FormItem>
          <FormItem label="Email：" {...formItemLayout}>
            {getFieldDecorator("email", { initialValue: DataUtil.fill(data, "email") })(
              <Input placeholder="Email" />
            )}
          </FormItem>

          <FormItem label="手机：" {...formItemLayout}>
            {getFieldDecorator("phone", { initialValue: DataUtil.fill(data, "phone") })(
              <Input placeholder="手机" />
            )}
          </FormItem>
          <FormItem label="办公地：" {...formItemLayout}>
            {getFieldDecorator("location", { initialValue: DataUtil.fill(data, "location") })(
              <Input placeholder="办公地" />
            )}
          </FormItem>

          <FormItem label="备注：" {...formItemLayout}>
            {getFieldDecorator("description", { initialValue: DataUtil.fill(data, "description") })(
              <Input type='textarea' placeholder="备注" />
            )}
          </FormItem>

          <FormItem style={{ marginTop: 40, textAlign: "right" }} wrapperCol={{ span: 6, offset: 17 }}>
            <Button type="ghost" size="small" onClick={this.handleCancel}>取消</Button>&nbsp;&nbsp;
            <Button type="primary" size="small" htmlType="submit">确定</Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

RiskDefinitionEditor.propTypes = {};

RiskDefinitionEditor = Form.create()(RiskDefinitionEditor);

export default RiskDefinitionEditor;
