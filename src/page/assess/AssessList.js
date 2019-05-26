import { Table,Pagination, message, Button, Modal, Alert } from 'antd';
import React, { Component } from 'react';
import * as  EmployeeService from '../../services/EmployeeService.js';
import * as  DepartmentService from '../../services/DepartmentService';

import * as DateUtil from '../../utils/DateUtil';
import * as StringUtil from '../../utils/StringUtil';
import Actions from '../actions/Actions'
// import EmployeeEditor from './EmployeeEditor';
import AssessEditor from './AssessEditor';

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
  getEmployees = (page) => {
    var currentPage = null;
    if (page == null) {
      currentPage = this.state.currentPage;
    } else {
      currentPage = page;
    }
    const self = this;

    const formData = {};

    formData.statuses= "INTER,TRIAL";
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

  countByCondition=()=>{
    const formData = {};
    formData.statuses= "INTER,TRIAL";
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
            <Button type="primary" size="small" onClick={self.clickAssessEmployeeButton}>考核</Button>
          </span>;
        }
      }
    ];
    return (
      <div >
        <Modal footer={this.getFooterByAction()} maskClosable={false} onCancel={this.clickCancelButton} title={<span>{this.getTitleByAction()}</span>} width={this.getWidthByAction()} visible={this.state.visible}>
          {this.getContentByAction()}
        </Modal>
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
export default EmployeeList;