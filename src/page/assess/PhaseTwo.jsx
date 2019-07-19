import { Table,Pagination, message, Button, Modal, Row ,Col ,Form ,Input ,Select ,Icon} from 'antd';
import React, { Component } from 'react';
const FormItem = Form.Item;
const Option = Select.Option;
import * as  AssessService from '../../services/AssessService';
const splitCode = "##_";

const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component {
  state = {
    editing: false,
  };

  toggleEdit = () => {
    const editing = !this.state.editing;
    this.setState({ editing }, () => {
      if (editing) {
        this.input.focus();
      }
    });
  };

  save = e => {
    const { record, handleSave } = this.props;
    let score = this.input.state.value;
    this.form.validateFields((error, values) => {
      if (error && error[e.currentTarget.id]) {
        return;
      }
      this.toggleEdit();
      record.score=score;
      handleSave({ ...record, ...values });
    });
  };

  renderCell = form => {
    this.form = form;
    const { children, dataIndex, record, title } = this.props;
    const { editing } = this.state;
    return editing ? (
      <Form.Item style={{ margin: 0 }}>
        {form.getFieldDecorator(dataIndex, {
          rules: [
            {
              required: true,
              message: `${title} is required.`,
            },
          ],
          initialValue: record[dataIndex],
        })(<Input ref={node => (this.input = node)} onPressEnter={this.save} onBlur={this.save} />)}
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{ paddingRight: 24 }}
        onClick={this.toggleEdit}
      >
        {children}
      </div>
    );
  };

  render() {
    const {
      editable,
      dataIndex,
      title,
      record,
      index,
      handleSave,
      children,
      ...restProps
    } = this.props;
    return (
      <td {...restProps}>
        {editable ? (
          <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>
        ) : (
          children
        )}
      </td>
    );
  }
}

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

  handleSave = row => {
    const newData = [...this.state.assessTwo];
    const index = newData.findIndex(item => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    this.setState({ dataSource: newData });

    //save to database
    AssessService.save(row, {

      success: function (resp) {
        message.success("提交考核成功");
      },
      error: function () {
        message.error("提交考核失败");
      },
      complete: function () {

      }
  })
    
  };
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
        if (index === 3) {
          obj.props.rowSpan = 0;
        }
        if (index === 4) {
          obj.props.rowSpan = 2;
        }
        if (index === 5) {
          obj.props.rowSpan = 0;
        }
        if (index === 8) {
          obj.props.rowSpan = 2;
        }
        if (index === 9) {
          obj.props.rowSpan = 0;
        }
        if (index === 10) {
          obj.props.rowSpan = 4;
        }
        // These two are merged into above cell
        if (index ===11 ||index ===12 ||index === 13) {
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
      editable: true,
      render: (value, row, index) => {
        if(value){
          return value;
        }else{
          return "--";
        }
      }
    },
    {
      title: '点评',
      dataIndex: 'description',
    },
    {
      title: '分项统计',
      dataIndex: 'summaryScore',
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
  const components = {
    body: {
      row: EditableFormRow,
      cell: EditableCell,
    },
  };
  const columnnew = columns.map(col => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: record => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave: this.handleSave,
      }),
    };
  });
    return (
      <div >
        <Table
          style={{ marginTop: '8px' }}
          pagination={false}
          components={components}
          rowClassName={() => 'editable-row'}
          
          dataSource={this.state.assessTwo}
          columns={columnnew}
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