import { Table,Pagination, message, Button, Modal, Row ,Col ,Form ,Input ,Select ,Icon} from 'antd';
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

class PhoseOne extends Component {
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
  onChangePhase=(phase)=>{

    this.setState({
      phase: phase
    });
  }
  onChangeMonth=(month)=>{

    this.setState({  
      month: month,
    });
  }
  handleExport = () => {
    var phase = this.state.phase;
    var month = this.state.month;

    let url = "/oa/employee/assess/exportExcel?phase="+phase+"&month="+month;
    window.open(url,"_blank").location;
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
      formData: formData
    });
    EmployeeService.findByCondition( formData, {

      success: function (resp) {
        self.setState({
          loading: false,
          employees: resp,
          currentPage:1
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
          employees: resp,
          currentPage:currentPage
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
      title: '考核内容',
      dataIndex: 'content',
      render: (value, row, index) => {
        const obj = {
          children: value,
          props: {},
        };
        if (index === 1) {
          obj.props.rowSpan = 4;
        }
        // These two are merged into above cell
        if (index ===2 ||index ===3 ||index === 4) {
          obj.props.rowSpan = 0;
        }
        return obj;
      },
    },
    {
      title: '评估要点',
      dataIndex: 'point',
    },
    {
      title: '评估标准',
      dataIndex: 'standard',
    },
    {
      title: '比例',
      dataIndex: 'percent',
    },
    {
      title: '评分',
      dataIndex: 'score',
    },
    {
      title: '点评',
      dataIndex: 'description',
    },
    {
      title: '分项统计',
      dataIndex: 'partScore',
    },
  ];
  const data = [
    {
      key: '1',
      content: '工作态度',
      point: '认真和积极的学习、工作态度',
      standard: '按时按量保质的发送每日学习报告，Shadow Daily Report，Shadow Summary Report 和阶段性总结报告',
      percent: '0571-22098909',
      phone: 18889898989,
    },
    {
      key: '1',
      content: '工作态度',
      point: '认真和积极的学习、工作态度',
      standard: 'Shadow过程中Leader对工作态度的评估分数',
      percent: '0571-22098909',
      phone: 18889898989,
    },
    {
      key: '2',
      content: '胜任能力',
      point: '学习能力',
      percent: '0571-22098333',
      phone: 18889898888,
    },
    {
      key: '3',
      content: '胜任能力',
      point: '表达能力',
      percent: '0575-22098909',
      phone: 18900010002,
    },
    {
      key: '4',
      content: '胜任能力',
      point: '处理问题能力',
      percent: '0575-22098909',
      phone: 18900010002,
    },
    {
      key: '5',
      content: 'Jake White',
      point: 18,
      percent: '0575-22098909',
      phone: 18900010002,
    },
  ];  
    return (
      <div >
        <Table
          onRowClick={self.handleRowClick}
          style={{ marginTop: '8px' }}
          pagination={false}
          dataSource={data}
          columns={columns}
          bordered
          size="middle"
        >
        </Table>
      </div>
    );
  }
}
PhoseOne = Form.create()(PhoseOne);
export default PhoseOne;