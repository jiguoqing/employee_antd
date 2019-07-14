import { Table,Pagination, message, Button, Modal, Row ,Col ,Form ,Input ,Select ,Icon} from 'antd';
import React, { Component } from 'react';
const FormItem = Form.Item;
const Option = Select.Option;
import * as  AssessService from '../../services/AssessService';
const splitCode = "##_";

class PhoseTwo extends Component {
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
  getAssessTwo=()=>{
    const employee = this.props.employee;
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


  //生命周期
  componentDidMount() {
    this.getAssessTwo();
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
        if (index === 0) {
          obj.props.rowSpan = 2;
        }
        if (index === 1) {
          obj.props.rowSpan = 0;
        }
        if (index === 2) {
          obj.props.rowSpan = 8;
        }
        
        if (index ===3 ||index ===4 ||index === 5||index === 6 || index === 7|| index === 8|| index === 9) {
          obj.props.rowSpan = 0;
        }
        if (index === 10) {
          obj.props.rowSpan = 4;
        }
        if (index ===11 ||index ===12 ||index === 13) {
          obj.props.rowSpan = 0;
        }
        return obj;
      },
    },
    {
      title: '评估要点',
      dataIndex: 'point',
      render: (value, row, index) => {
        const obj = {
          children: value,
          props: {},
        };
        if (index === 0) {
          obj.props.rowSpan = 2;
        }
        if (index === 1) {
          obj.props.rowSpan = 0;
        }
        if (index === 2) {
          obj.props.rowSpan = 2;
        }
        // These two are merged into above cell
        if (index ===3 ||index ===4 ||index === 5||index === 6||index === 7) {
          obj.props.rowSpan = 0;
        }
        return obj;
      },
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
      render: (value, row, index) => {
        const obj = {
          children: value,
          props: {},
        };
        if (index === 0) {
          obj.props.rowSpan = 2;
        }
        if (index === 1) {
          obj.props.rowSpan = 0;
        }
        if (index === 2) {
          obj.props.rowSpan = 2;
        }
        // These two are merged into above cell
        if (index ===3 ||index ===4 ||index === 5||index === 6||index === 7) {
          obj.props.rowSpan = 0;
        }
        return obj;
      },
    },
  ];
  const data = [
    {
      key: '1',
      content: '工作态度',
      point: '认真和积极的学习、工作态度',
      standard: '按时按量保质的发送每日学习报告，Shadow Daily Report，Shadow Summary Report 和阶段性总结报告',
      percent: 5,
      score: 2,
    },
    {
      key: '1',
      content: '工作态度',
      point: '认真和积极的学习、工作态度',
      standard: 'Shadow过程中Leader对工作态度的评估分数',
      percent: 5,
      score: 3,
    },
    {
      key: '2',
      content: '胜任能力',
      point: '学习能力',
      standard:"",
      percent: 3,
      score: 3,
    },
    {
      key: '3',
      content: '胜任能力',
      point: '表达能力',
      standard:"",
      percent: 3,
      score: 4,
    },
    {
      key: '4',
      content: '胜任能力',
      point: '处理问题能力',
      standard:"",
      percent: 6,
      score: 5,
    },
    {
      key: '5',
      content: 'Jake White',
      point: 18,
      standard:"",
      percent: 5,
      score: 4,
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
PhoseTwo = Form.create()(PhoseTwo);
export default PhoseTwo;