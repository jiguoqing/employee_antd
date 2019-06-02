import { Form, Input, message, Button, InputNumber } from 'antd';

import * as  AssessService from '../../services/AssessService';

class AssessInput extends React.Component {
  static getDerivedStateFromProps(nextProps) {
    // Should be a controlled component.
    if ('value' in nextProps) {
      return {
        ...(nextProps.value || {}),
      };
    }
    return null;
  }

  constructor(props) {
    super(props);

    const value = props.value || {};
    this.state = {
      score: value.number || 0,
      percent: value.percent,
    };
  }

  handleNumberChange = e => {
    const score = parseInt(e.target.value || 0, 10);
    if (Number.isNaN(score)) {
      return;
    }
    if (!('value' in this.props)) {
      this.setState({ score });
    }
    this.triggerChange({ score });
  };

  handleInputNumberChange = percent => {
    if (!('value' in this.props)) {
      this.setState({ percent });
    }
    this.triggerChange({ percent });
  };

  triggerChange = changedValue => {
    // Should provide an event to pass value to Form.
    const onChange = this.props.onChange;
    if (onChange) {
      onChange(Object.assign({}, this.state, changedValue));
    }
  };

  render() {
    const { size } = this.props;
    const state = this.state;
    return (
      <span>
        <Input
          type="text"
          size={size}
          required={true}
          value={state.score}
          onChange={this.handleNumberChange}
          style={{ width: '45%', marginRight: '3%' }}
        />
        <InputNumber
          min={0}
          max={100}
          defaultValue={state.percent}
          formatter={value => `${value}%`}
          parser={value => value.replace('%', '')}
          style={{ width: '45%', marginRight: '3%' }}
          onChange={this.handleInputNumberChange}
        />
      </span>
    );
  }
}

class AssessOne extends React.Component {
  handleSubmit = e => {
    const self = this;
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }

      AssessService.save(values, {

        success: function (resp) {
          self.setState({
            loading: false,
            employees: resp
          });
          message.success("提交考核成功！");
          self.props.hideModal();
          self.props.getEmployees();
        },
        error: function () {
          message.error("提交考核失败！");
        },
        complete: function () {

        }
      })
    });
  };

  render() {
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 17 }
    };
    const hideModal =this.props.hideModal
    const { getFieldDecorator } = this.props.form;
    const employeeId = this.props.employee?this.props.employee.id:null;
    return (
      <Form layout="inline" onSubmit={this.handleSubmit} >
        <Form.Item>
          {getFieldDecorator('phase', {
            initialValue: 1
          })(<Input value={1} hidden />)}
          
          
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('employeeId', {
            initialValue: {employeeId}
          })(<Input value={employeeId} hidden />)}
          
        </Form.Item>
        <Form.Item label="工作能力" {...formItemLayout}>
          {getFieldDecorator('ability', {
            initialValue: { score: null, percent: 30 }
          })(<AssessInput />)}
        </Form.Item>
        <Form.Item label="业绩" {...formItemLayout}>
          {getFieldDecorator('performance', {
            initialValue: { score: null, percent: 30 }
          })(<AssessInput />)}
        </Form.Item>
        <Form.Item style={{ marginTop: 40, textAlign: "right" }} wrapperCol={{ span: 6, offset: 17 }}> 
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const PhaseOne = Form.create({ name: 'assess_phase_one' })(AssessOne);

export default PhaseOne;