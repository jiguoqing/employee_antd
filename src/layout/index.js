import { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
const { Header, Footer, Sider, Content } = Layout;
import Link from 'umi/link';

// 引入子菜单组件
const SubMenu = Menu.SubMenu;

export default class BasicLayout extends Component {
  render() {
    return (
      <Layout>
        <Sider width={256} style={{ minHeight: '100vh' }}>
          <div style={{ height: '32px', background: 'rgba(255,255,255,.2)', margin: '16px' }} />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1">
              <Link to="/employee/list">
                <Icon type="pie-chart" />
                <span>employee</span>
              </Link>
            </Menu.Item>
            <SubMenu
              key="daily"
              title={<span><Icon type="dashboard" /><span>日常管理</span></span>}
            >
              <Menu.Item key="2"><Link to="/assess/assesslist">员工考核</Link></Menu.Item>
              <Menu.Item key="3"><Link to="/project/list">项目管理</Link></Menu.Item>
            </SubMenu>
            <SubMenu
              key="admin"
              title={<span><Icon type="dashboard" /><span>管理员</span></span>}
            >
              <Menu.Item key="4"><Link to="/employee/list">员工管理</Link></Menu.Item>
              <Menu.Item key="5"><Link to="/department/list">部门管理</Link></Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout >
          <Header style={{ background: '#fff', textAlign: 'center', padding: 0 }}>石基信息</Header>
          <Content style={{ margin: '24px 16px 0' }}>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              {this.props.children}
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      </Layout>
    )
  }
}