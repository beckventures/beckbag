import React from "react";
import { NavLink, Link } from "react-router-dom";
import { pushRotate as BubbleMenu } from 'react-burger-menu';
import { Menu, Avatar } from 'antd';
import {
  AppstoreOutlined,
  SettingOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
  MailOutlined,
  DashboardOutlined,
} from '@ant-design/icons';
import "antd/dist/antd.css";

var styles = {
  bmBurgerButton: {
    position: 'fixed',
    width: '30px',
    height: '25px',
    left: '15px',
    top: '20px',
  },
  bmBurgerBars: {
    background: '#fff'
  },
  bmBurgerBarsHover: {
    background: '#a90000'
  },
  bmCrossButton: {
    height: '24px',
    width: '24px'
  },
  bmCross: {
    background: '#bdc3c7'
  },
  bmMenuWrap: {
    position: 'fixed',
    height: '100%'
  },
  bmMenu: {
    background: 'transparent',
    fontSize: '1.15em',
    zIndex: 9999
  },
  bmMorphShape: {
    fill: 'transparent'
  },
  bmItemList: {
    color: '#b8b7ad',
    padding: '0.8em',
    paddingLeft: '0em'
  },
  bmItem: {
    color: '#b8b7ad'
  },
  bmOverlay: {
    background: 'rgba(0, 0, 0, 0.3)'
  }
}

const { SubMenu } = Menu;

class SidebarBurger extends React.Component {

  rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];

  state = {
    openKeys: ['sub1'],
  };

  showSettings (event) {
    event.preventDefault();
  }

  handleMenuClick = e => {
    console.log('click ', e);
    window.open("/admin/match", "_self");
  };

  onOpenChange = openKeys => {
    const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
    if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys });
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : [],
      });
    }
  };

  render () {
    return (
      <BubbleMenu styles={ styles } pageWrapId={ "page-wrap" } outerContainerId={ "wrapper" }>
        <Menu
        theme="dark"
        style={{ width: '100%', height: '100%', paddingTop: '1em' }}
        defaultOpenKeys={['ekdum1']}
        openKeys={this.state.openKeys}
        onOpenChange={this.onOpenChange}
        mode="inline"
      > 
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '50px' }}>
          <Avatar src="https://firebasestorage.googleapis.com/v0/b/beckfriends-2-a4131.appspot.com/o/indigo.png?alt=media&token=996799ba-b19e-4041-8008-62c55e2ba146" style={{ width: '75px', height: '75px', marginRight: '20px', marginLeft: '3em' }} />
          <div>
            <p style={{ fontWeight: '500' }}>View Settings</p>
          </div>
        </div>
          <Menu.Item key="ekdum1">  
            <Link
                    to='/admin/dashboard'
                    className="nav-link"
                    activeClassName="active"
                    style={{ display: 'flex', padding: '0px 20px', alignItems: 'center' }}
                  ><i class="material-icons" style={{ marginRight: '12px', fontSize: '1.6em', color: 'white' }}>apps</i> <p style={{ color: 'white', fontWeight: '500', fontSize: '14px' }}>Dashboard</p></Link>
        </Menu.Item>
        <SubMenu key="sub1" style={{ paddingLeft: '20px' }} icon={<i class="material-icons" style={{ marginRight: '12px', fontSize: '1.4em', color: 'white' }}>local_airport</i>} title="All Trips">
            <Menu.Item key="5" style={{ paddingLeft: '88px' }}>
             <Link
                    to='/admin/pending'
                    className="nav-link"
                    activeClassName="active"
                    style={{ display: 'flex', padding: '0px 20px', alignItems: 'center' }}
                  ><i class="material-icons" style={{ marginRight: '12px', fontSize: '1.6em', color: 'white' }}>pending</i> <p style={{ color: 'white', fontWeight: '500', fontSize: '14px' }}>Pending</p></Link>
            </Menu.Item>
            <Menu.Item key="7" style={{ paddingLeft: '88px' }}>
            <Link
                    to='/admin/match'
                    className="nav-link"
                    activeClassName="active"
                    style={{ display: 'flex', padding: '0px 20px', alignItems: 'center' }}
                  ><i class="material-icons" style={{ marginRight: '12px', fontSize: '1.7em', color: 'white' }}>merge_type</i> <p style={{ color: 'white', fontWeight: '500', fontSize: '14px' }}>Matchmaking</p></Link>
            </Menu.Item>
            <Menu.Item key="6" style={{ paddingLeft: '88px' }}>
            <Link
                    to='/admin/inprocess'
                    className="nav-link"
                    activeClassName="active"
                    style={{ display: 'flex', padding: '0px 20px', alignItems: 'center' }}
                  ><i class="material-icons" style={{ marginRight: '12px', fontSize: '1.6em', color: 'white' }}>schedule</i> <p style={{ color: 'white', fontWeight: '500', fontSize: '14px' }}>In Process</p></Link>
            </Menu.Item>
            <Menu.Item key="8" style={{ paddingLeft: '88px' }}>
            <Link
                    to='/admin/ongoing'
                    className="nav-link"
                    activeClassName="active"
                    style={{ display: 'flex', padding: '0px 20px', alignItems: 'center' }}
                  ><i class="material-icons" style={{ marginRight: '12px', fontSize: '1.6em', color: 'white' }}>gps_fixed</i> <p style={{ color: 'white', fontWeight: '500', fontSize: '14px' }}>Ongoing</p></Link>
            </Menu.Item>
            <Menu.Item key="9" style={{ paddingLeft: '88px' }}>
            <Link
                    to='/admin/completed'
                    className="nav-link"
                    activeClassName="active"
                    style={{ display: 'flex', padding: '0px 20px', alignItems: 'center' }}
                  ><i class="material-icons" style={{ marginRight: '12px', fontSize: '1.6em', color: 'white' }}>check_circle_outline</i> <p style={{ color: 'white', fontWeight: '500', fontSize: '14px' }}>Completed</p></Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" style={{ paddingLeft: '20px' }} icon={<i class="material-icons" style={{ marginRight: '12px', fontSize: '1.4em', color: 'white' }}>local_mall</i>} title="All Packages">
            <Menu.Item key="15" style={{ paddingLeft: '88px' }}>
             <Link
                    to='/admin/packages/pending'
                    className="nav-link"
                    activeClassName="active"
                    style={{ display: 'flex', padding: '0px 20px', alignItems: 'center' }}
                  ><i class="material-icons" style={{ marginRight: '12px', fontSize: '1.6em', color: 'white' }}>pending</i> <p style={{ color: 'white', fontWeight: '500', fontSize: '14px' }}>Pending</p></Link>
            </Menu.Item>
            <Menu.Item key="16" style={{ paddingLeft: '88px' }}>
            <Link
                    to='/admin/packages/inprocess'
                    className="nav-link"
                    activeClassName="active"
                    style={{ display: 'flex', padding: '0px 20px', alignItems: 'center' }}
                  ><i class="material-icons" style={{ marginRight: '12px', fontSize: '1.6em', color: 'white' }}>schedule</i> <p style={{ color: 'white', fontWeight: '500', fontSize: '14px' }}>In Process</p></Link>
            </Menu.Item>
            <Menu.Item key="18" style={{ paddingLeft: '88px' }}>
            <Link
                    to='/admin/packages/ongoing'
                    className="nav-link"
                    activeClassName="active"
                    style={{ display: 'flex', padding: '0px 20px', alignItems: 'center' }}
                  ><i class="material-icons" style={{ marginRight: '12px', fontSize: '1.6em', color: 'white' }}>gps_fixed</i> <p style={{ color: 'white', fontWeight: '500', fontSize: '14px' }}>Ongoing</p></Link>
            </Menu.Item>
            <Menu.Item key="19" style={{ paddingLeft: '88px' }}>
            <Link
                    to='/admin/packages/completed'
                    className="nav-link"
                    activeClassName="active"
                    style={{ display: 'flex', padding: '0px 20px', alignItems: 'center' }}
                  ><i class="material-icons" style={{ marginRight: '12px', fontSize: '1.6em', color: 'white' }}>check_circle_outline</i> <p style={{ color: 'white', fontWeight: '500', fontSize: '14px' }}>Completed</p></Link>
            </Menu.Item>
          </SubMenu>
        <Menu.Item key="ekdum5">  
            <Link
                    to='/admin/interestedtravelers'
                    className="nav-link"
                    activeClassName="active"
                    style={{ display: 'flex', padding: '0px 20px', alignItems: 'center' }}
                  ><i class="material-icons" style={{ marginRight: '12px', fontSize: '1.6em', color: 'white' }}>tour</i> <p style={{ color: 'white', fontWeight: '500', fontSize: '14px' }}>Interested Travelers</p></Link>
        </Menu.Item>
        <Menu.Item key="ekdum6">  
            <Link
                    to='/admin/messaging'
                    className="nav-link"
                    activeClassName="active"
                    style={{ display: 'flex', padding: '0px 20px', alignItems: 'center' }}
                  ><i class="material-icons" style={{ marginRight: '12px', fontSize: '1.6em', color: 'white' }}>chat</i> <p style={{ color: 'white', fontWeight: '500', fontSize: '14px' }}>Messaging</p></Link>
        </Menu.Item>
        <Menu.Item key="ekdum7">  
            <Link
                    to='/admin/messaging'
                    className="nav-link"
                    activeClassName="active"
                    style={{ display: 'flex', padding: '0px 20px', alignItems: 'center' }}
                  ><i class="material-icons" style={{ marginRight: '12px', fontSize: '1.6em', color: 'white' }}>supervised_user_circle</i> <p style={{ color: 'white', fontWeight: '500', fontSize: '14px' }}>Roles</p></Link>
        </Menu.Item>
      </Menu>
      </BubbleMenu>
    );
  }
}

export default SidebarBurger;