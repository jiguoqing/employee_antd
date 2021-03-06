import React, { Component } from 'react';
import { message, Form, Input, Button } from 'antd';
import * as StringUtil from '../../utils/StringUtil';
import * as DataUtil from '../../utils/DataUtil';
const { TextArea } = Input;
const FormItem = Form.Item;
/**
 * 员工编辑器
 */
class AssessPersonEditor extends Component {

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
      message.warning("请填写考核人");
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
          <FormItem label="考核人：" {...formItemLayout}>
            {getFieldDecorator("name", { initialValue: DataUtil.fill(data, "name") })(
              <Input placeholder="请输入考核人" />
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

AssessPersonEditor.propTypes = {};

AssessPersonEditor = Form.create()(AssessPersonEditor);

export default AssessPersonEditor;
