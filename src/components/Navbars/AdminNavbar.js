import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
import firebaseinit from '../../credentials';
// reactstrap components
import {
  Button,
  Collapse,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Input,
  InputGroup,
  NavbarBrand,
  Navbar,
  NavLink,
  Nav,
  Container,
  Modal
} from "reactstrap";
import { Layout, Menu, Breadcrumb, Dropdown, message } from 'antd';
import { DownOutlined, NotificationFilled, UserOutlined } from '@ant-design/icons';


const { Header, Content, Footer } = Layout;

const onClick = ({ key }) => {
  message.info(`Click on item ${key}`);
};

const menu = (
  <Menu onClick={onClick}>
    <Menu.Item key="1">1st notification</Menu.Item>
    <Menu.Item key="2">2nd notification</Menu.Item>
  </Menu>
);

const menuuser = (
  <Menu onClick={onClick}>
    <Menu.Item key="1">View Profile</Menu.Item>
    <Menu.Item key="2">Settings</Menu.Item>
  </Menu>
);

class AdminNavbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapseOpen: false,
      modalSearch: false,
      color: "navbar-transparent"
    };
  }
  componentDidMount() {
    window.addEventListener("resize", this.updateColor);
    firebaseinit.auth().onAuthStateChanged(function(user) {
  if (user) {
    console.log('loggedin ya bish');
  } else {
    // No user is signed in.
  }
});
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateColor);
  }
  // function that adds color white/transparent to the navbar on resize (this is for the collapse)
  updateColor = () => {
    if (window.innerWidth < 993 && this.state.collapseOpen) {
      this.setState({
        color: "bg-white"
      });
    } else {
      this.setState({
        color: "navbar-transparent"
      });
    }
  };
  // this function opens and closes the collapse on small devices
  toggleCollapse = () => {
    if (this.state.collapseOpen) {
      this.setState({
        color: "navbar-transparent"
      });
    } else {
      this.setState({
        color: "bg-white"
      });
    }
    this.setState({
      collapseOpen: !this.state.collapseOpen
    });
  };
  // this function is to open the Search modal
  toggleModalSearch = () => {
    this.setState({
      modalSearch: !this.state.modalSearch
    });
  };
  render() {
    return (
      <>
        <Header style={{ padding: '0 50px' }}>
      <div className="logo" />
      <Menu theme="dark" mode="horizontal">

        <Menu.Item key="4" style={{ padding: '0px' }}><img src="https://firebasestorage.googleapis.com/v0/b/beckfriends-2-a4131.appspot.com/o/transmodifiedsmallalt.png?alt=media&token=7a9f3d6d-86a0-4626-a2db-5dc7d085e770" alt="Girl in a jacket" style={{ width: '40%' }} /></Menu.Item>
        <Dropdown overlay={menu} style={{ float: 'right' }}>
    <a style={{ float: 'right' }} className="ant-dropdown-link" onClick={e => e.preventDefault()}>
     <NotificationFilled style={{ fontSize: '1.6em', color: 'white' }}/><DownOutlined style={{ color: 'white' }}/>
    </a>
  </Dropdown>
  <a style={{ float: 'right', marginRight: '30px' }} className="ant-dropdown-link" href="/admin/user-profile">
     <UserOutlined style={{ fontSize: '1.6em', color: 'white' }}/>
    </a>
      </Menu>
    </Header>
      </>
    );
  }
}

export default AdminNavbar;
