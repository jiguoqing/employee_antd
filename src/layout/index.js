import { Component } from 'react';
import { Layout, Menu, Icon ,Avatar,Button,Col} from 'antd';
const { Header, Footer, Sider, Content } = Layout;
import Link from 'umi/link';
import * as CookieUtil from '../utils/CookieUtil';

// 引入子菜单组件
const SubMenu = Menu.SubMenu;

export default class BasicLayout extends Component {
  login=()=>{
    window.location.href="/login";
  }
  logout=()=>{

    CookieUtil.clearCookie("username");
    CookieUtil.clearCookie("password");
    window.location.href="/login";
  }
  render() {
    return window.location.pathname.indexOf("login")===1?
    (
      <Layout  style={{minHeight: '100vh'}}  >
        <Header style={{ background: '#fff', textAlign: 'center', padding: 0 }}>
          石基信息
        </Header>
        <Content style={{ margin: '24px 16px 0'  }}>
          <div style={{ padding: 24, background: '#fff'}}>
            {this.props.children}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>)
    :
     (
      <Layout>
        <Sider width={256} style={{ minHeight: '100vh' }}>
          <div style={{ height: '32px', background: 'rgba(255,255,255,.2)', margin: '16px' }} />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <SubMenu
              key="daily"
              title={<span><Icon type="solution" /><span>日常管理</span></span>}
            >
              <Menu.Item key="2"><Link to="/assess/assesslist"><Icon type="eye" />员工考核</Link></Menu.Item>
              <Menu.Item key="3"><Link to="/project/list"><Icon type="project" />项目管理</Link></Menu.Item>
            </SubMenu>
            <SubMenu
              key="admin"
              title={<span><Icon type="key" /><span>管理员</span></span>}
            >
              <Menu.Item key="4"><Link to="/employee/list"><Icon type="team" />员工管理</Link></Menu.Item>
              <Menu.Item key="5"><Link to="/department/list"><Icon type="global" />部门管理</Link></Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout >
          <Header style={{ background: '#fff', textAlign: 'center', padding: 0 }}>
          
          <Col span={4} offset ={8}>石基信息</Col>
          <Col span={4} offset ={8}>
          
          <Avatar style={{ backgroundColor: '#87d068' }} icon="user" />
          <Button  onClick={this.login}>登录</Button>
          <Button onClick={this.logout}>登出</Button>
          </Col>
          </Header>
          
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