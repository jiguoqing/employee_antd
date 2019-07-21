import { Table, message ,Form ,Input } from 'antd';
import React, { Component } from 'react';
import * as StringUtil from '../../utils/StringUtil';
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
    let value = StringUtil.trim(this.input.state.value);
    let field =this.props.dataIndex;
    if(StringUtil.isBlank(value)){
      message.warning("空内容不会被记录，请继续填写");
      return;
    }
    if(field === "score"){
      record.score=value;
    }
    if(field === "description"){
      record.description=value;
    }
    this.form.validateFields((error, values) => {
      if (error && error[e.currentTarget.id]) {
        return;
      }
      this.toggleEdit();
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
  getAssessOne=()=>{
    const employee = this.props.employee;
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

  handleSave = row => {
    const newData = [...this.state.assessOne];
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
    this.getAssessOne();
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
      width:'100px',
      render: (value, row, index) => {
        const obj = {
          children: value,
          props: {},
        };
        if (index === 1) {
          obj.props.rowSpan =3;
        }
        if (index === 2 || index === 3) {
          obj.props.rowSpan = 0;
        }
        
        if (index === 4) {
          obj.props.rowSpan =3;
        }
        if (index === 5||index === 6) {
          obj.props.rowSpan = 0;
        }
        return obj;
      },
    },
    {
      title: '评估要点',
      dataIndex: 'point',
      width:'120px',
      render: (value, row, index) => {
        const obj = {
          children: value,
          props: {},
        };
        if (index === 5) {
          obj.props.rowSpan = 2;
        }
        if (index === 6) {
          obj.props.rowSpan = 0;
        }
        return obj;
      },
    },
    {
      title: '评估标准',
      dataIndex: 'standard',
      width:'300px'
    },
    {
      title: '比例',
      dataIndex: 'percent',
      width:'40px',
      render: (value, row, index) => {
        if(null!=value){
          return value+"%";
        }
      }
    },
    {
      title: '评分',
      dataIndex: 'score',
      width:'50px',
      editable: true,
      render: (value, row, index) => {
        if(index===10){
          return;
        }
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
      editable: true,
      render: (value, row, index) => {
        if(value){
          return value;
        }else{
          return "请输入点评";
        }
      }
    },
    {
      title: '分项统计',
      dataIndex: 'summaryScore',
      width:'50px',
      render: (value, row, index) => {
        const obj = {
          children: value,
          props: {},
        };
        if (index === 1) {
          obj.props.rowSpan =3;
        }
        if (index === 2 || index === 3) {
          obj.props.rowSpan = 0;
        }
        
        if (index === 4) {
          obj.props.rowSpan =3;
        }
        if (index === 5||index === 6) {
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
          
          dataSource={this.state.assessOne}
          columns={columnnew}
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