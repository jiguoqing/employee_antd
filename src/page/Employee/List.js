
import { Table, message, Tooltip, Icon } from 'antd';
import React, { Component } from 'react';
import * as  EmployeeService from '../../services/EmployeeService.js';
import * as DateUtil from '../../utils/DateUtil';
import * as StringUtil from '../../utils/StringUtil';

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
    title: '地址',
    dataIndex: 'location',
    key: 'location',
  },
  {
    title: "操作",
    width: 10,
    render(value, data) {
      return <span>
        <Tooltip title="删除">
          <Icon type="delete" className={`ft-danger fn-cursor`} />
        </Tooltip>
      </span>;
    }
  }

];
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
  componentDidMount() {

    this.getEmployee(this.state.currentTypeKey, this.state.currentSubTypeKey, 1, null);

  }

  render() {
    return (
      <Table dataSource={this.state.employees} columns={columns} >
      </Table>
    );
  }
}
export default EmployeeList;