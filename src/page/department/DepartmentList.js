import { Table, message, Button, Modal, Alert } from 'antd';
import React, { Component } from 'react';
import * as  DepartmentService from '../../services/DepartmentService';
import * as DateUtil from '../../utils/DateUtil';
import * as StringUtil from '../../utils/StringUtil';
import Actions from '../actions/Actions'
import DepartmentEditor from './DepartmentEditor';

class DepartmentList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,   // 对话框显示状态
      departments: null,
    };
  }

  getDepartments = () => {
    const self = this;

    const formData = {};
    DepartmentService.findAll({

      success: function (resp) {
        self.setState({
          loading: false,
          departments: resp
        });
      },
      error: function () {
        message.error("加载部门列表失败！");
      },
      complete: function () {

      }
    });

  }
  clickEditDepartmentButton = () => {
    this.setAction(Actions.EDIT);
    this.showModal();
  };
  clickDeleteDepartmentButton = () => {
    this.setAction(Actions.DELETE);
    this.showModal();
  };
  clickCancelButton = () => {
    this.hideModal();
  };

  clickAddDepartmentButton = () => {
    this.setAction(Actions.ADD);
    this.setState({
      department: null
    });
    this.showModal();
  }
  setAction = (action) => {
    this.action = action;
  }

  handleRowClick = (data, index, evt) => {

    this.setState({
      department: data
    });
  }

  handleEditorSubmit = (formData) => {
    const self = this;

    StringUtil.trimObject(formData);    // 去除所有空格

    DepartmentService.save(formData, {
      success(resp) {
        message.success("保存成功");
        
        self.hideModal();
        self.getDepartments(self.state.currentPage);
      },
      error(resp) {
        message.error(resp.responseText);
      },
      complete() {
      }
    });
  }
  handleDelete = () => {

    const self = this;
    DepartmentService.deleteById(this.state.department.id, {
      success() {
        message.success("删除成功");
        self.hideModal();
        self.getDepartments(self.state.currentPage);
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
        return "添加部门";
      case Actions.EDIT:
        return "编辑部门";
      case Actions.DELETE:
        return "删除部门";
      case Actions.DELETE:
        return "考核部门";
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
        return this.state.visible ? <DepartmentEditor data={null} onSubmit={this.handleEditorSubmit} onCancel={this.clickCancelButton} /> : null;
      case Actions.EDIT:
        return this.state.visible ? <DepartmentEditor data={this.state.department} onSubmit={this.handleEditorSubmit} onCancel={this.clickCancelButton} /> : null;
      case Actions.DELETE:
        return <Alert
          message="确定要删除当前部门吗？"
          type="warning"
          showIcon
        />;
    }
  }
  //生命周期
  componentDidMount() {

    this.getDepartments();

  }

  render() {
    self = this;
    const columns = [
      {
        title: '部门名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '负责人',
        dataIndex: 'owner',
        key: 'owner',
      },
      {
        title: "操作",
        width: '140px',
        render(value, data) {
          return <span>
            <Button type="primary" size="small" onClick={self.clickEditDepartmentButton}> 编辑</Button> &nbsp;&nbsp;
            <Button type="primary" size="small" onClick={self.clickDeleteDepartmentButton}>删除</Button>
          </span>;
        }
      }
    ];
    return (
      <div >
        <Modal footer={this.getFooterByAction()} maskClosable={false} onCancel={this.clickCancelButton} title={<span>{this.getTitleByAction()}</span>} width={this.getWidthByAction()} visible={this.state.visible}>
          {this.getContentByAction()}
        </Modal>
        <Button onClick={this.clickAddDepartmentButton} type="primary">添加</Button>
        <Table
          onRowClick={self.handleRowClick}
          style={{ marginTop: '8px' }}
          dataSource={this.state.departments}
          columns={columns}
          expandedRowRender={record => <div>
            <p style={{ margin: 0 }}> 【描述】  {record.description}</p>
          </div>}
        >
        </Table>
      </div>
    );
  }
}
export default DepartmentList;