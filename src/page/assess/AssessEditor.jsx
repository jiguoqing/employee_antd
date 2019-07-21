import React, { Component  } from 'react';
import { Tabs ,Col,Row,Button,Modal,message} from 'antd';
import PhaseOne from './PhaseOne';
import PhaseTwo from './PhaseTwo';
import PhaseThree from './PhaseThree';
import AssessPersonEditor from './AssessPersonEditor';
import * as  AssessService from '../../services/AssessService';



const TabPane = Tabs.TabPane;

class Assess extends Component {
  constructor(props) {
    super(props);
    this.state = {
      assessPersionVisible:false,
      phase:"1"
    };
  }
  updateAssessPerson=()=>{
    this.showModal();
    console.log(this.props.employee);
  }

  showModal = () => {
    this.setState({
      assessPersionVisible: true,
    });
  };
  hideModal = () => {
    this.setState({
      assessPersionVisible: true,
    });
  };

  handleOk = e => {
    console.log(e);
    const employee = this.props.employee
    let assessPerson = {};
    assessPerson.name=e.name;
    assessPerson.employeeId=employee.id;
    assessPerson.phase=this.state.phase;
    const self = this;
    AssessService.saveAssessPerson(assessPerson,{
        success(resp) {
          message.success("保存成功");
          
          self.hideModal();
          //self.getDepartments(self.state.currentPage);
        },
        error(resp) {
          message.error("保存失败");
        },
        complete() {
        }
      });
    
  };
  onChangeTab=(key)=>{
    
    this.setState({
      phase: key,
    });
  }
  handleCancel = e => {
    console.log(e);
    this.setState({
      assessPersionVisible: false,
    });
  };
  render() {
    const gridStyle = {
    width: '20px',
    textAlign: 'center',
    };
    const employee = this.props.employee?this.props.employee:null;
    const name = employee!=null?employee.name:null;
    const englishName = employee!=null?employee.englishName:null;
    const department = employee!=null?employee.department:null;
    const departmentName = department!=null?department.name:null;
    const jobTitle = employee!=null?employee.jobTitle:null;
    const location = employee!=null?employee.location:null;
    const hideModal =this.props.hideModal;
    const getEmployees =this.props.getEmployees;
    return (
      <div >
        <Modal
          title="填写考核人"
          footer={null} 
          onCancel={this.handleCancel} 
          visible={this.state.assessPersionVisible}>
          <AssessPersonEditor 
          employee ={employee} 
          onSubmit={this.handleOk}
          onCancel={this.handleCancel} 
          ></AssessPersonEditor>

        </Modal>
    
        <Row>
          <Col span={3}  >
            姓名：{name}
					</Col>
          <Col span={3}  >
          英文名：{englishName}
					</Col>
          <Col span={3}  >
          部门：{departmentName}
					</Col>	
          <Col span={3} >
          岗位：{jobTitle}
					</Col>	
          <Col span={3}  >
          办公室：{location}
					</Col>	
          <Col span={4}  >
          考核人： <Button onClick={this.updateAssessPerson}>填写考核人</Button> 
					</Col>
         
          </Row>
        <Tabs defaultActiveKey="1" onChange ={this.onChangeTab}>
          <TabPane tab="阶段一" key="1">
            <PhaseOne employee={employee} hideModal={hideModal}  getEmployees={getEmployees}>

            </PhaseOne>
          </TabPane>
          <TabPane tab="阶段二" key="2">
            <PhaseTwo  employee={employee} hideModal={hideModal} getEmployees={getEmployees}
            ></PhaseTwo>
          </TabPane>
          <TabPane  employee={employee} hideModal={hideModal} tab="阶段三" key="3">
            <PhaseThree  employee={employee} hideModal={hideModal} getEmployees={getEmployees}>

            </PhaseThree>
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default Assess;