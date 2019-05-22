import React, { Component } from 'react';
import { message, Form, Input, Button } from 'antd';
import * as StringUtil from '../../utils/StringUtil';
import * as DataUtil from '../../utils/DataUtil';
const { TextArea } = Input;
const FormItem = Form.Item;
/**
 * 员工编辑器
 */
class EmployeeEditor extends Component {

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
      message.warning("请填写部门名称");
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
          <FormItem label="部门名称：" {...formItemLayout}>
            {getFieldDecorator("name", { initialValue: DataUtil.fill(data, "name") })(
              <Input placeholder="请输入部门名称" />
            )}
          </FormItem>
          <FormItem label="部门负责人：" {...formItemLayout}>
            {getFieldDecorator("owner", { initialValue: DataUtil.fill(data, "owner") })(
              <Input placeholder="请输入部门负责人" />
            )}
          </FormItem>
          <FormItem label="描述：" {...formItemLayout}>
            {getFieldDecorator("description", { initialValue: DataUtil.fill(data, "description") })(
              <TextArea type='textarea' 
              placeholder="请输入描述"
              autosize={{ minRows: 2, maxRows: 6 }}
              />
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

EmployeeEditor.propTypes = {};

EmployeeEditor = Form.create()(EmployeeEditor);

export default EmployeeEditor;
