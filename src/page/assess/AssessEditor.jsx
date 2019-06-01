import React, { Component } from 'react';
import { Tabs } from 'antd';
import PhaseOne from './PhaseOne';
import PhaseTwo from './PhaseTwo';
import PhaseThree from './PhaseThree';


const TabPane = Tabs.TabPane;

class Assess extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const employee = this.props.employee?this.props.employee:null;
    const hideModal =this.props.hideModal;
    return (
      <div >
        <Tabs defaultActiveKey="1">
          <TabPane tab="阶段一" key="1">
            <PhaseOne employee={employee} hideModal={hideModal}></PhaseOne>
          </TabPane>
          <TabPane tab="阶段二" key="2">
            <PhaseTwo  employee={employee} hideModal={hideModal}></PhaseTwo>
          </TabPane>
          <TabPane  employee={employee} hideModal={hideModal} tab="阶段三" key="3">
            <PhaseThree  employee={employee} hideModal={hideModal}></PhaseThree>
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default Assess;