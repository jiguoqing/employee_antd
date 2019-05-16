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
      message.warning("请填写风险场景名称");
      return false;
    }
    if (StringUtil.isBlank(data.description)) {
      message.warning("请填写风险场景描述");
      return false;
    }
    if (StringUtil.isBlank(data.triggerPoint)) {
      message.warning("请填写风险场景表达式");
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
          <FormItem label="名称：" {...formItemLayout}>
            {getFieldDecorator("name", { initialValue: DataUtil.fill(data, "name") })(
              <Input placeholder="名称" />
            )}
          </FormItem>
          <FormItem label="表达式：" {...formItemLayout}>
            {getFieldDecorator("triggerPoint", { initialValue: DataUtil.fill(data, "triggerPoint") })(
              <Input placeholder="表达式" />
            )}
          </FormItem>

          <FormItem label="描述：" {...formItemLayout}>
            {getFieldDecorator("description", { initialValue: DataUtil.fill(data, "description") })(
              <Input type='textarea' placeholder="描述" />
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
