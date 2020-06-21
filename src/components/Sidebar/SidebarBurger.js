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
    left: '36px',
    top: '95px',
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
        <Avatar src="https://firebasestorage.googleapis.com/v0/b/beckfriends-2-a4131.appspot.com/o/image_placeholder.png?alt=media&token=31765493-0c6f-478c-bc75-0ced33491d3d" style={{ width: '100px', height: '100px', paddingBottom: '1em', marginLeft: '6em' }} />
        <Menu.Item key="ekdum1" icon={<DashboardOutlined />} >
            Dashboard
            <Link
                    to='/admin/dashboard'
                    className="nav-link"
                    activeClassName="active"
                  ></Link>
        </Menu.Item>
        <Menu.Item key="ekdum2" icon={<i class="material-icons" style={{ marginRight: '10px', fontSize: '1.4em' }}>local_airport</i>}>
            All Trips
            <Link
                    to='/admin/trips'
                    className="nav-link"
                    activeClassName="active"
                  />
        </Menu.Item>
        <Menu.Item key="ekdum3" icon={<i class="material-icons" style={{ marginRight: '10px', fontSize: '1.6em' }}>merge_type</i>}>
            Matchmaking
            <Link
                    to='/admin/match'
                    className="nav-link"
                    activeClassName="active"
                  />
        </Menu.Item>
        <Menu.Item key="ekdum4" icon={<i class="material-icons" style={{ marginRight: '10px', fontSize: '1.4em' }}>flight_takeoff</i>}>
            Ongoing Trips
            <Link
                    to='/admin/ongoing'
                    className="nav-link"
                    activeClassName="active"
                  />
        </Menu.Item>
        <Menu.Item key="ekdum5" icon={<i class="material-icons" style={{ marginRight: '10px', fontSize: '1.4em' }}>airplanemode_inactive</i>}>
            Interested Travelers
            <Link
                    to='/admin/interestedtravelers'
                    className="nav-link"
                    activeClassName="active"
                  />
        </Menu.Item>
        <Menu.Item key="ekdum6" icon={<i class="material-icons" style={{ marginRight: '10px', fontSize: '1.4em' }}>chat</i>}>
            Messaging
            <Link
                    to='/admin/messaging'
                    className="nav-link"
                    activeClassName="active"
                  />
        </Menu.Item>
        <SubMenu key="sub2" icon={<i class="material-icons" style={{ marginRight: '10px', fontSize: '1.4em' }}>supervised_user_circle</i>} title="Roles">
          <Menu.Item key="10">Manage Roles</Menu.Item>
          <Menu.Item key="11">Invite</Menu.Item>
        </SubMenu>
      </Menu>
      </BubbleMenu>
    );
  }
}

export default SidebarBurger;