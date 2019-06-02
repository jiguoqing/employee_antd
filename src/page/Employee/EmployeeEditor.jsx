import React, { Component } from 'react';
import { message, Form, Input, Button, DatePicker, Radio, Select } from 'antd';
import moment from 'moment';
import * as StringUtil from '../../utils/StringUtil';
import * as DataUtil from '../../utils/DataUtil';
import * as DateUtil from '../../utils/DateUtil';

import * as  DepartmentService from '../../services/DepartmentService';
const Option = Select.Option;
const { TextArea } = Input;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const splitCode = "##_";
/**
 * 员工编辑器
 */
class EmployeeEditor extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      departments: []
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
    formData.departmentId = formData.departmentId? formData.departmentId.toString().split(splitCode)[0]:null;
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
   * 查询
   *
   * @param value
   */
  handleChange=(value)=> {
    let temp = [];

const Option = Select.Option;

    const self = this;
    DepartmentService.findByName(value,{
      success(resp) {
	   if (resp.length > 0) {
          temp = resp.map((department,index) => {		  
            return <Option key={department.id}>
                {department.name}
            </Option>;
          });
		 self.setState({
          data: temp
        });
        }
      },
      error() {
        self.setState({
          data: temp
        });
      },
      complete() {
      }
    });
  }

  
 
  /**
  * 组件生命周期相关
  */
  componentDidMount() {
    // this.getDepartments();

  }

  componentWillReceiveProps(props, nextProps) {

  }

  componentWillUnmount() {

  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const data = this.props.data;
    const departments = this.props.departments;
    let onboardAt = data == null ? null : moment(DateUtil.formatDate(data.onboardAt), 'YYYY-MM-DD');
    let leavedAt = data == null ? null : moment(DateUtil.formatDate(data.leavedAt), 'YYYY-MM-DD');
    // let onboardAt = moment(DateUtil.formatDate(data.onboardAt), 'YYYY-MM-DD');

    // let time = moment();
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 17 }
    };
    return (
      <div >
        <Form onSubmit={this.handleSubmit}>
          {getFieldDecorator("id", { initialValue: DataUtil.fill(data, "id") })(
            <Input type="hidden" />
          )}
          {getFieldDecorator("assessPhase", { initialValue: data===undefined || data===null ?"0":data.assessPhase })(
            <Input type="hidden" />
          )}
          <FormItem label="姓名：" {...formItemLayout}>
            {getFieldDecorator("name", { initialValue: DataUtil.fill(data, "name") })(
              <Input placeholder="请输入姓名" />
            )}
          </FormItem>
          <FormItem label="英文名：" {...formItemLayout}>
            {getFieldDecorator("englishName", { initialValue: DataUtil.fill(data, "englishName") })(
              <Input placeholder="请输入英文名" />
            )}
          </FormItem>
          <FormItem label="性别：" {...formItemLayout}>
            {getFieldDecorator("gender", { initialValue: DataUtil.fill(data, "gender") })(
              <RadioGroup >
                <Radio value="男">男</Radio>
                <Radio value={"女"}>女</Radio>
              </RadioGroup>
            )}
          </FormItem>

          <FormItem label="员工号：" {...formItemLayout}>
            {getFieldDecorator("code", { initialValue: DataUtil.fill(data, "code") })(
              <Input placeholder="请输入员工号" />
            )}
          </FormItem>

          <FormItem label="状态" {...formItemLayout}>
            {getFieldDecorator("status", { initialValue: DataUtil.fill(data, "status") })(
              <Select placeholder="请输入状态">
                <Option value="TRIAL">试用期</Option>
                <Option value="ON_DUTY">在职</Option>
                <Option value="LEAVE">离职</Option>
              </Select>
            )}
          </FormItem>
          <FormItem label="入职日期：" {...formItemLayout}>
            {getFieldDecorator("onboardAt", { initialValue: onboardAt })(
              <DatePicker placeholder="请输入入职日期" format={"YYYY-MM-DD"} />
            )}
          </FormItem>
          <FormItem label="职位：" {...formItemLayout}>
            {getFieldDecorator("jobTitle", { initialValue: DataUtil.fill(data, "jobTitle") })(
              <Input placeholder="请输入职位" />
            )}
          </FormItem>
          <FormItem label="层级：" {...formItemLayout}>
            {getFieldDecorator("level", { initialValue: DataUtil.fill(data, "level") })(
              <Input placeholder="请输入层级" />
            )}
          </FormItem>
          <FormItem label="部门：" {...formItemLayout}>
   
          {getFieldDecorator("departmentId", { initialValue: DataUtil.fill(data, "departmentId") })(

              <Select showSearch 
               placeholder="请输入部门名称关键字进行搜索"
               >
              {
                departments.map((department, index) => {
                  return <Option key={index.toString()} value={department.id+splitCode+department.name}>

              {department.name}</Option>
                })
              }
              </Select>
          )}
          </FormItem>
          
          <FormItem label="Email：" {...formItemLayout}>
            {getFieldDecorator("email", { initialValue: DataUtil.fill(data, "email") })(
              <Input placeholder="请输入Email" />
            )}
          </FormItem>

          <FormItem label="手机：" {...formItemLayout}>
            {getFieldDecorator("phone", { initialValue: DataUtil.fill(data, "phone") })(
              <Input placeholder="请输入手机" />
            )}
          </FormItem>
          <FormItem label="办公地：" {...formItemLayout}>
            {getFieldDecorator("location", { initialValue: DataUtil.fill(data, "location") })(
              <Input placeholder="请输入办公地" />
            )}
          </FormItem>

          <FormItem label="离职日期：" {...formItemLayout}>
            {getFieldDecorator("leavedAt", { initialValue: leavedAt })(
              <DatePicker placeholder="请输入离职日期" format={"YYYY-MM-DD"} />
            )}
          </FormItem>
          <FormItem label="备注：" {...formItemLayout}>
            {getFieldDecorator("description", { initialValue: DataUtil.fill(data, "description") })(
              <TextArea type='textarea' placeholder="请输入备注" 
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
