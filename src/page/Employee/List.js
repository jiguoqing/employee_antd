import { Table, message, Button, Modal, Alert } from 'antd';
import React, { Component } from 'react';
import * as  EmployeeService from '../../services/EmployeeService.js';
import * as DateUtil from '../../utils/DateUtil';
import * as StringUtil from '../../utils/StringUtil';
import Actions from '../actions/Actions'
import EmployeeEditor from './EmployeeEditor';

class EmployeeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,   // 对话框显示状态
      loadTemplate: true,
      employees: null,
      currentTypeKey: "REALTIME",
      currentSubTypeKey: "DATA",
      currentPage: 1,
      pageSize: 10,
      status: null,
    };
  }

  getEmployee(currentTypeKey, currentSubTypeKey, page, status) {
    var currentPage = null;
    if (page == null) {
      currentPage = this.state.currentPage;
    } else {
      currentPage = page;
    }
    const self = this;

    const formData = { "type": currentTypeKey, "subType": currentSubTypeKey };
    EmployeeService.findByPageModel(this.state.pageSize, this.state.currentPage, formData, {

      success: function (resp) {
        self.setState({
          loading: false,
          employees: resp
        });
      },
      error: function () {
        message.error("加载指标列表失败！");
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
  setAction(action) {
    this.action = action;
  }

  /**
  * 表单元素重置
  * @param e
  */
  handleReset(e) {
    e.preventDefault();
    this.props.form.resetFields();
  }
  handleEditorSubmit(formData) {
    const self = this;

    StringUtil.trimObject(formData);    // 去除所有空格

    EmployeeService.save(formData, {
      success() {
        message.success("保存成功");
        self.hideModal();
        self.loadSolution();
      },
      error() {
        message.error("保存失败");
      },
      complete() {
        self.conn = null;
      }
    });
  }
  /**
   * 显示对话框
   */
  showModal() {
    this.setState({
      visible: true
    });
  }

  /**
   * 隐藏对话框
   */
  hideModal() {
    this.setState({
      visible: false
    });
  }

  getWidthByAction() {
    switch (this.action) {
      case Actions.ADD:
        return 600;
      case Actions.EDIT:
        return 600;
      case Actions.DELETE:
        return 400;
    }
  }
  /**
   * 根据具体的操作是否显示内容
   * @returns {boolean}
   */
  getFooterByAction() {
    switch (this.action) {
      case Actions.ADD:
        this.action = Actions.ADD;
        return false;
      case Actions.EDIT:
        this.action = Actions.EDIT;
        return false;
      case Actions.DELETE:
        this.action = Actions.DELETE;
        return <span><Button onClick={this.clickCancelButton} type="ghost">取消</Button>&nbsp;&nbsp;<Button onClick={this.handleOK} type="primary">确定</Button></span>;

    }
  }

  /**
   * 对话框标题
   *
   * @returns {*}
   */
  getTitleByAction() {
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
  getContentByAction() {
    switch (this.action) {
      case Actions.ADD:
        return this.state.visible ? <EmployeeEditor data={null} onSubmit={this.handleEditorSubmit} onCancel={this.clickCancelButton} /> : null;
      case Actions.EDIT:
        return this.state.visible ? <EmployeeEditor data={this.state.solution} onSubmit={this.handleEditorSubmit} onCancel={this.clickCancelButton} /> : null;
      case Actions.DELETE:
        return <Alert
          message="确定要删除当前员工吗？"
          type="warning"
          showIcon
        />;
    }
  }
  //生命周期
  componentDidMount() {

    this.getEmployee(this.state.currentTypeKey, this.state.currentSubTypeKey, 1, null);

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
        title: "操作",
        width: '140px',
        render(value, data) {
          return <span>
            <Button type="primary" size="small" onClick={self.clickEditEmployeeButton} >编辑</Button> &nbsp;&nbsp;
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
        <Table style={{ marginTop: '8px' }} dataSource={this.state.employees} columns={columns} >
        </Table>
      </div>
    );
  }
}
export default EmployeeList;