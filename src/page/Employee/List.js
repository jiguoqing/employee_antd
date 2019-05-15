
import { Table, message } from 'antd';
import React, { Component } from 'react';
import * as  EmployeeService from '../../services/EmployeeService.js';
const dataSource = [
  {
    key: '1',
    name: '胡彦斌',
    age: 32,
    address: '西湖区湖底公园1号',
  },
  {
    key: '2',
    name: '胡彦祖',
    age: 42,
    address: '西湖区湖底公园1号',
  },
];

const columns = [
  {
    title: '姓名',
    dataIndex: 'code',
    key: 'code',
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '住址',
    dataIndex: 'description',
    key: 'description',
  },
];
class EmployeeList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      visible: false,   // 对话框显示状态
      loadTemplate: true,
      solutions: [{ "code": "RD001", "description": "这是一个测试1", "effectiveness": 1, "gmtCreate": 1481275775000, "gmtModified": 1481888333000, "id": 1, "owner": "zhendi.ck", "subType": "PERFORMANCE", "type": "REALTIME", "weight": 3 }, { "code": "RA001", "description": "这是一个测试3", "effectiveness": 0, "gmtCreate": 1481278805000, "gmtModified": 1481278807000, "id": 3, "owner": "zhendi.ck", "subType": "MONITOR", "type": "ASYN", "weight": 5 }, { "code": "rrr", "description": "rrr", "effectiveness": 1, "gmtCreate": 1481375379000, "gmtModified": 1481807384000, "id": 4, "owner": "", "subType": "MONITOR", "type": "ASYN", "weight": 0 }],
      solutions: null,
      currentTypeKey: "REALTIME",
      currentSubTypeKey: "DATA",
      currentPage: 1,
      pageSize: 10,
      status: null,
    };

  }

  getSolutions(currentTypeKey, currentSubTypeKey, page, status) {
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
          solutions: resp.pageModel.resultList,
          pageSize: resp.pageModel.pageSize,
          currentPage: page,
          total: resp.pageModel.totalRows,

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

    this.getSolutions(this.state.currentTypeKey, this.state.currentSubTypeKey, 1, null);

  }

  render() {
    return (
      <Table dataSource={dataSource} columns={columns} >
      </Table>
    );
  }
}
export default EmployeeList;