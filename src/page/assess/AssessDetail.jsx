import { Table,Pagination, message, Button, Modal, Alert } from 'antd';
import React, { Component } from 'react';
import * as  EmployeeService from '../../services/EmployeeService.js';
import * as  AssessService from '../../services/AssessService';

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
      assesses: []
    };
  }

  getAssessOne=(employee)=>{
    AssessService.findByEmployeeIdAndPhase(employee.id,"1", {

      success: function (resp) {
        self.setState({
          assessOne: resp
        });
      },
      error: function () {
        message.error("获取考核信息失败！");
      },
      complete: function () {

      }
  })
  }
  
  getAssessTwo=(employee)=>{
    AssessService.findByEmployeeIdAndPhase(employee.id,"2", {

      success: function (resp) {
        self.setState({
          assessTwo: resp
        });
      },
      error: function () {
        message.error("获取考核信息失败！");
      },
      complete: function () {

      }
  })
  }
  
  getAssessThree=(employee)=>{
    AssessService.findByEmployeeIdAndPhase(employee.id,"3", {

      success: function (resp) {
        self.setState({
          assessThree: resp
        });
      },
      error: function () {
        message.error("获取考核信息失败！");
      },
      complete: function () {

      }
  })
  }
  
  //生命周期
  componentDidMount() {
    const employee = this.props.employee;
    
    this.getAssessOne(employee);
    this.getAssessTwo(employee);
    this.getAssessThree(employee);
  }

  render() {
    self = this;
    const columns = [
      {
        title: '指标',
        dataIndex: 'type',
        key: 'type',
      },
      {
        title: '分数',
        dataIndex: 'score',
        key: 'score',
      },
      {
        title: '权重',
        dataIndex: 'percent',
        key: 'percent',
      },
      {
        title: '描述',
        dataIndex: 'description',
        key: 'description',
      }
      ,
      
    ];
    return (
      <div >
        考核阶段一
        <Table
          style={{ marginTop: '8px' }}
          pagination={false}
          bordered
          dataSource={this.state.assessOne}
          columns={columns}
        >
        </Table>
        考核阶段二
        <Table
          style={{ marginTop: '8px' }}
          pagination={false}
          bordered
          dataSource={this.state.assessTwo}
          columns={columns}
        >
        </Table>
        考核阶段三
        <Table
          style={{ marginTop: '8px' }}
          pagination={false}
          bordered
          dataSource={this.state.assessThree}
          columns={columns}
        >
        </Table>
      </div>
    );
  }
}
export default EmployeeList;