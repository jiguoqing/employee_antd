import { Table,Pagination, message, Button, Modal, Row ,Col ,Form ,Input ,Select } from 'antd';
import React, { Component } from 'react';
const FormItem = Form.Item;
const Option = Select.Option;
import * as  EmployeeService from '../../services/EmployeeService.js';
import * as  DepartmentService from '../../services/DepartmentService';

import * as DateUtil from '../../utils/DateUtil';
import * as StringUtil from '../../utils/StringUtil';
import Actions from '../actions/Actions'
import AssessEditor from './AssessEditor';
import AssessDetail from './AssessDetail';
const splitCode = "##_";

class AssessList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,   // 对话框显示状态
      employees: [],
      currentPage: 1,
      pageSize: 10,
      departments:[],
      count:0,
      formData:{}
    };
  }

  getDepartments=()=>{
    DepartmentService.findAll( {

      success: function (resp) {
        self.setState({
          departments: resp
        });
      },
      error: function () {
        message.error("获取部门信息失败！");
      },
      complete: function () {

      }
  })
  }

  handleReset = (e) => {
    e.preventDefault();
    this.props.form.resetFields();
  }
  handleQuerySubmit=(e)=> {
    e.preventDefault();
    const self = this;	
    const formData = this.props.form.getFieldsValue();
    StringUtil.trimObject(formData);
    formData.currentPage=1;
    if(formData.departmentId!==undefined && formData.departmentId!==null){
      formData.departmentId=formData.departmentId.split(splitCode)[0];
    }
    
    this.setState({
      loading: true,	  
      formData: formData,
    });
    EmployeeService.findByCondition( formData, {

      success: function (resp) {
        self.setState({
          loading: false,
          employees: resp
        });
      },
      error: function () {
        message.error("加载员工列表失败！");
      },
      complete: function () {

      }
    });
    this.countByCondition(formData);
  }
  getEmployees = (page) => {
    var currentPage = null;
    if (page == null) {
      currentPage = this.state.currentPage;
    } else {
      currentPage = page;
    }
    const self = this;

    const formData = this.state.formData;

    formData.statuses= "TRIAL";
    formData.currentPage=currentPage;
    EmployeeService.findByCondition( formData, {

      success: function (resp) {
        self.setState({
          loading: false,
          employees: resp
        });
      },
      error: function () {
        message.error("加载待考核员工列表失败！");
      },
      complete: function () {

      }
    });

  }

  countByCondition=(formData)=>{
    formData.statuses= "TRIAL";
    EmployeeService.countByCondition( formData, {

      success: function (resp) {
        self.setState({
          count: resp
        });
      },
      error: function () {
        message.error("加载待考核员工数量失败！");
      },
      complete: function () {

      }
    });
  }
  clickAssessEmployeeButton = () => {
    this.setAction(Actions.ASSESS);
    this.showModal();
  }

  handleDetail = () => {
    this.setAction(Actions.ASSESSDETAIL);
    this.showModal();
  }

  
  clickCancelButton = () => {
    this.hideModal();
  };


  setAction = (action) => {
    this.action = action;
  }

  handleRowClick = (data, index, evt) => {

    this.setState({
      employee: data
    });
  }

 
  /**
   * 显示对话框
   */
  showModal = () => {
    this.setState({
      visible: true
    });
  }

  /**
   * 隐藏对话框
   */
  hideModal = () => {
    this.setState({
      visible: false
    });
  }

  getWidthByAction = () => {
    switch (this.action) {
      case Actions.ASSESS:
        return 800;
        case Actions.ASSESSDETAIL:
          return 800;
        
    }
  }
  /**
   * 根据具体的操作是否显示内容
   * @returns {boolean}
   */
  getFooterByAction = () => {
    switch (this.action) {
      case Actions.ASSESS:
         this.action = Actions.ASSESS;
         return false;
         case Actions.ASSESSDETAIL:
            this.action = Actions.ASSESSDETAIL;
            return false;

    }
  }

  /**
   * 对话框标题
   *
   * @returns {*}
   */
  getTitleByAction = () => {
    switch (this.action) {
      case Actions.ASSESS:
        return "考核员工";
        case Actions.ASSESSDETAIL:
          return "考核详情";

    }
  }

  /**
   * 对话框内容 
   *
   * @returns {*}
   */
  getContentByAction = () => {
    switch (this.action) {
      case Actions.ASSESS:
        return this.state.visible ? <AssessEditor hideModal = {this.hideModal} 
        getEmployees={this.getEmployees} employee={this.state.employee}  onCancel={this.clickCancelButton} /> : null;
        case Actions.ASSESSDETAIL:
          return this.state.visible ? <AssessDetail 
           employee={this.state.employee} onCancel={this.clickCancelButton} /> : null;
    }
  }
  //生命周期
  componentDidMount() {

    const formData = {};
    this.getEmployees(this.state.currentPage);
    this.countByCondition(formData);
    this.getDepartments();
  }

  render() {
    self = this;
    const formItemLayout = {
    labelCol: {span: 0},
    wrapperCol: {span: 22}
  };
  const {getFieldDecorator, getFieldValue} = this.props.form;
    const columns = [
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '英文名',
        dataIndex: 'englishName',
        key: 'englishName',
      },
      {
        title: '性别',
        dataIndex: 'gender',
        key: 'gender',
      },
      {
        title: '员工号',
        dataIndex: 'code',
        key: 'code',
      },
      {
        title: '职位',
        dataIndex: 'jobTitle',
        key: 'jobTitle',
      },
      {
        title: '入职日期',
        dataIndex: 'onboardAt',
        key: 'onboardAt',
        render: (value) => {
          if (StringUtil.isBlank(value)) {
            return "--";
          }
          return DateUtil.formatDate(value);
        }
      },
      {
        title: '考核阶段',
        dataIndex: 'assessPhase',
        key: 'assessPhase',
      },
      {
        title: '办公地',
        dataIndex: 'location',
        key: 'location',
      },
      {
        title: '部门',
        dataIndex: 'department',
        key: 'department',
        render(value, data) {
          return <span>
          {data.department?data.department.name:"--"}
          </span>
        }
      },
      {
        title: "操作",
        width: '140px',
        render(value, data) {
          return <span>
            <Button type="primary" size="small" onClick={self.clickAssessEmployeeButton}>考核</Button>&nbsp;&nbsp;
            <Button type="primary" size="small" onClick={self.handleDetail}>查看</Button>
          </span>;
        }
      }
    ];
    return (
      <div >
        <Modal footer={this.getFooterByAction()} maskClosable={false} onCancel={this.clickCancelButton} title={<span>{this.getTitleByAction()}</span>} width={this.getWidthByAction()} visible={this.state.visible}>
          {this.getContentByAction()}
        </Modal>
        <Form onSubmit={this.handleQuerySubmit} >	 
        <div className="query-form">
			  <Row type="flex">  
					<Col span={3}  >
						<FormItem {...formItemLayout}>
						  {getFieldDecorator("name")(
							<Input placeholder="请输入姓名"/>
						  )}
						</FormItem>
					  </Col>	
					<Col span={3} >
						<FormItem {...formItemLayout}>
						  {getFieldDecorator("englishName")(
							<Input placeholder="请输入英文名"/>
						  )}
						</FormItem>
					  </Col>	
					<Col span={3} >
						<FormItem {...formItemLayout}>
						  {getFieldDecorator("code")(
							<Input placeholder="请输入员工号"/>
						  )}
						</FormItem>
					  </Col>	
					<Col span={3} >
						<FormItem {...formItemLayout}>
            {getFieldDecorator("phase",)(
              <Select placeholder="请选择阶段" width='14'>
                <Option value="0">阶段一</Option>
                <Option value="1">阶段二</Option>
                <Option value="2">阶段三</Option>
              </Select>
            )}
						</FormItem>
					  </Col>	
					<Col span={4} >
						<FormItem {...formItemLayout}>
            {getFieldDecorator("month",)(
              <Select placeholder="请选择考核月份" width='14'>
                <Option value="1">一月</Option>
                <Option value="2">二月</Option>
                <Option value="3">三月</Option>
                <Option value="4">四月</Option>
                <Option value="5">五月</Option>
                <Option value="6">六月</Option>
                <Option value="7">七月</Option>
                <Option value="8">八月</Option>
                <Option value="9">九月</Option>
                <Option value="10">十月</Option>
                <Option value="11">十一月</Option>
                <Option value="12">十二月</Option>
              </Select>
            )}
						</FormItem>
					  </Col>	
            <Col span={3} >
						<FormItem {...formItemLayout}>
            {getFieldDecorator("departmentId",)(

              <Select showSearch 
              placeholder="请选择部门"
              >
              {
                this.state.departments.map((department, index) => {
                  return <Option key={index.toString()} value={department.id+splitCode+department.name}>

              {department.name}</Option>
                })
              }
              </Select>
              )}
						</FormItem>
					  </Col>	
					  <Col span={4} style={{marginRight:16}} >
						<FormItem >
						  <Button size="default" htmlType="submit">查询</Button>&nbsp;&nbsp;
						  <Button type="ghost" size="default" onClick={this.handleReset}>清空</Button>
						</FormItem>
					  </Col>
                </Row>
			</div>
      </Form>
        <Table
          onRowClick={self.handleRowClick}
          style={{ marginTop: '8px' }}
          pagination={false}
          dataSource={this.state.employees}
          columns={columns}
          expandedRowRender={record => <div>
            <p style={{ margin: 0 }}> 【部门】  {record.department?record.department.name:"--"}</p>
            <p style={{ margin: 0 }}> 【手机】  {record.phone}</p>
            <p style={{ margin: 0 }}> 【邮箱】  {record.email}</p>
            <p style={{ margin: 0 }}> 【备注】  {record.description}</p>
          </div>
          }
        >
        </Table>
        <Pagination defaultCurrent={this.state.currentPage} 
        onChange={this.getEmployees}
        total={this.state.count} />
      </div>
    );
  }
}
AssessList = Form.create()(AssessList);
export default AssessList;