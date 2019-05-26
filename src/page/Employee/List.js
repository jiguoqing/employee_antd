import { Table,Pagination, message, Button, Modal, Alert } from 'antd';
import React, { Component } from 'react';
import * as  EmployeeService from '../../services/EmployeeService.js';
import * as  DepartmentService from '../../services/DepartmentService';

import * as DateUtil from '../../utils/DateUtil';
import * as StringUtil from '../../utils/StringUtil';
import Actions from '../actions/Actions'
import EmployeeEditor from './EmployeeEditor';
import AssessEditor from '../assess/AssessEditor';

class EmployeeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,   // 对话框显示状态
      employees: [],
      currentPage: 1,
      pageSize: 10,
      departments:[],
      count:0
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
  onChangePage=(page)=>{ 
    this.setState({
    loading: false,
    currentPage: page
  });
    this.getEmployees(page);
  }
  getEmployees = (page) => {
    var currentPage = null;
    if (page == null) {
      currentPage = this.state.currentPage;
    } else {
      currentPage = page;
    }
    const self = this;

    const formData = {};
    formData.currentPage=currentPage;
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

  }

  countByCondition=()=>{
    const formData = {};
    EmployeeService.countByCondition( formData, {

      success: function (resp) {
        self.setState({
          count: resp
        });
      },
      error: function () {
        message.error("加载员工数量失败！");
      },
      complete: function () {

      }
    });
  }
  clickEditEmployeeButton = () => {
    this.setAction(Actions.EDIT);
    this.showModal();
  };
  clickDeleteEmployeeButton = () => {
    this.setAction(Actions.DELETE);
    this.showModal();
  };
  clickAssessEmployeeButton = () => {
    this.setAction(Actions.ASSESS);
    this.showModal();
  }
  clickCancelButton = () => {
    this.hideModal();
  };


  clickAddEmployeeButton = () => {
    this.setAction(Actions.ADD);
    this.setState({
      employee: null
    });
    this.showModal();
  }
  setAction = (action) => {
    this.action = action;
  }

  handleRowClick = (data, index, evt) => {

    this.setState({
      employee: data
    });
  }

  /**
  * 表单元素重置
  * @param e
  */
  handleReset = (e) => {
    e.preventDefault();
    this.props.form.resetFields();
  }
  handleEditorSubmit = (formData) => {
    const self = this;

    StringUtil.trimObject(formData);    // 去除所有空格

    EmployeeService.save(formData, {
      success() {
        message.success("保存成功");
        self.hideModal();
        self.getEmployees(self.state.currentPage);
      },
      error() {
        message.error("保存失败");
      },
      complete() {
      }
    });
  }
  handleDelete = () => {

    const self = this;
    EmployeeService.deleteById(this.state.employee.id, {
      success() {
        message.success("删除成功");
        self.hideModal();
        self.getEmployees(self.state.currentPage);
      },
      error() {
        message.error("删除失败");
      },
      complete() {
      }
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
      case Actions.ADD:
        return 600;
      case Actions.EDIT:
        return 600;
      case Actions.DELETE:
        return 400;
      case Actions.ASSESS:
        return 800;
    }
  }
  /**
   * 根据具体的操作是否显示内容
   * @returns {boolean}
   */
  getFooterByAction = () => {
    switch (this.action) {
      case Actions.ADD:
        this.action = Actions.ADD;
        return false;
      case Actions.EDIT:
        this.action = Actions.EDIT;
        return false;
      case Actions.DELETE:
        this.action = Actions.DELETE;
        return <span><Button onClick={this.clickCancelButton} type="ghost">取消</Button>&nbsp;&nbsp;<Button onClick={this.handleDelete} type="primary">确定</Button></span>;
      case Actions.ASSESS:
        this.action = Actions.ASSESS;
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
      case Actions.ADD:
        return "添加员工";
      case Actions.EDIT:
        return "编辑员工";
      case Actions.DELETE:
        return "删除员工";
    }
  }

  /**
   * 对话框内容
   *
   * @returns {*}
   */
  getContentByAction = () => {
    switch (this.action) {
      case Actions.ADD:
        return this.state.visible ? <EmployeeEditor data={null} departments = {this.state.departments} onSubmit={this.handleEditorSubmit} onCancel={this.clickCancelButton} /> : null;
      case Actions.EDIT:
        return this.state.visible ? <EmployeeEditor data={this.state.employee} departments = {this.state.departments}  onSubmit={this.handleEditorSubmit} onCancel={this.clickCancelButton} /> : null;
      case Actions.DELETE:
        return <Alert
          message="确定要删除当前员工吗？"
          type="warning"
          showIcon
        />;
      case Actions.ASSESS:
        return this.state.visible ? <AssessEditor data={this.state.employee} onSubmit={this.handleAssessSubmit} onCancel={this.clickCancelButton} /> : null;
    }
  }
  //生命周期
  componentDidMount() {

    this.getEmployees(this.state.currentPage);
    this.countByCondition();
    this.getDepartments();
  }

  render() {
    self = this;
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
      // {
      //   title: '邮箱',
      //   dataIndex: 'email',
      //   key: 'email',
      // },
      // {
      //   title: '手机号',
      //   dataIndex: 'phone',
      //   key: 'phone',
      // },
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
            <Button type="primary" size="small" onClick={self.clickEditEmployeeButton}> 编辑</Button> &nbsp;&nbsp;
            <Button type="primary" size="small" onClick={self.clickDeleteEmployeeButton}>删除</Button>
          </span>;
        }
      }
    ];
    return (
      <div >
        <Modal footer={this.getFooterByAction()} maskClosable={false} onCancel={this.clickCancelButton} title={<span>{this.getTitleByAction()}</span>} width={this.getWidthByAction()} visible={this.state.visible}>
          {this.getContentByAction()}
        </Modal>
        <Button onClick={this.clickAddEmployeeButton} type="primary">添加</Button>
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
        onChange={this.onChangePage}
        total={this.state.count} />
      </div>
    );
  }
}
export default EmployeeList;