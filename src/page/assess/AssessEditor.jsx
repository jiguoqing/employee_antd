import React, { Component } from 'react';
import { Tabs } from 'antd';
import PhaseOne from './PhaseOne'
import PhaseTwo from './PhaseTwo'

const TabPane = Tabs.TabPane;

class Assess extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div >
        <Tabs defaultActiveKey="1">
          <TabPane tab="阶段一" key="1">
            <PhaseOne></PhaseOne>
          </TabPane>
          <TabPane tab="阶段二" key="2">
            <PhaseTwo></PhaseTwo>
          </TabPane>
          <TabPane tab="阶段三" key="3">
            3
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default Assess;