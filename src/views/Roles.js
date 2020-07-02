import React , { forwardRef } from "react";
import firebaseinit from '../credentials';
import { Table, Input, Button, Space, Tag, Menu } from 'antd';
import {Helmet} from "react-helmet";
import { Spin } from 'antd';
import Highlighter from 'react-highlight-words';
import IconButton from '@material-ui/core/IconButton';
import Skeleton from '@material-ui/lab/Skeleton';
import MaterialTable from "material-table";
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import './Tabs.css';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import { PlusOutlined, SearchOutlined, DownOutlined } from '@ant-design/icons';
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
  Modal, ModalHeader, ModalBody, ModalFooter, CardText,
  Dropdown, DropdownMenu, DropdownToggle, DropdownItem
} from "reactstrap";
const database = firebaseinit.database();

const userslist = [];



const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };


const topOptions = [
  { label: 'topLeft', value: 'topLeft' },
  { label: 'topCenter', value: 'topCenter' },
  { label: 'topRight', value: 'topRight' },
  { label: 'none', value: 'none' },
];

const bottomOptions = [
  { label: 'bottomLeft', value: 'bottomLeft' },
  { label: 'bottomCenter', value: 'bottomCenter' },
  { label: 'bottomRight', value: 'bottomRight' },
  { label: 'none', value: 'none' },
];

class Roles extends React.Component {

  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.changeRole = this.changeRole.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.addUser = this.addUser.bind(this);
    this.state = {merchantorderslist : [], added: false, searchText: '',
    searchedColumn: '', modal: false, someVal: 'Name', someValemail: 'Email',dropdownOpen: false, someValRole: 'Select Role'};
  }

  addUser () {

    var name = this.state.someVal;
    var email = this.state.someValemail;
    var role = this.state.someValRole;

    var privilege = 'All';

    if( role === 'Marketing' )  privilege = 'Traveler Invites';
    if( role === 'Operation' )  privilege = 'Ongoing, Upcoming'; 
    if( role === 'Operations - Matchmaking' )  privilege = 'Package Approval';

    var userslist = this.state.userslist;

    userslist.push({
      name: name,
      email: email,
      company: 'Indigo',
      role: role,
      privilege: privilege
    });

    database.ref('beckbag').child('carrier').child('indigo').child('users').child('adhafhbkajfbka')
              .update({
               name: name,
      email: email,
      company: 'Indigo',
      role: role,
      privilege: privilege
              });

    this.toggleModal();

    this.setState({
      userslist: userslist
    });


  }

  changeRole = (e) => {
    this.setState({someValRole: e.currentTarget.textContent});
  console.log(e.currentTarget.textContent);
  this.toggle();
  }

  onChange = (e) => {
  this.setState({someVal: e.target.value});
  console.log(e.target.value);
}

onChangeEmail = (e) => {
  this.setState({someValemail: e.target.value});
  console.log(e.target.value);
}

toggle () {
  this.setState({
    dropdownOpen: !this.state.dropdownOpen
  })
}

    getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: text =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ) : (
        text
      ),
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };

  toggleModal() {
    this.setState({ modal: !this.state.modal  });
  }

  componentDidMount() { 
  const that = this;
  var countinside = 0;
  
    database.ref('beckbag').child('carrier').child('indigo').child('users')
        .once('value')
        .then((snapshot) => {
          snapshot.forEach((chSnapshot) => {

            console.log(chSnapshot.val());
            var name = chSnapshot.val().name;
            var company = chSnapshot.val().company;
            var email = chSnapshot.val().email;
            var role = chSnapshot.val().role;
            console.log(chSnapshot.val().name);
            if( role === 'Admin')
            {
              var privilege = 'All';
            }
            userslist.push({
            name: name,
            email: email,
            company: company,
            role: role,
            privilege: privilege});
            
    });
    that.setState({
      userslist: userslist
    });
  });        
}

  componentDidUpdate(prevProps, prevState) {
    if (!prevState.added && this.state.added) {
    
    }
  }

  render() {
    const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    ...this.getColumnSearchProps('name'),
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
    ...this.getColumnSearchProps('email'),
  },
  {
    title: 'Role',
    dataIndex: 'role',
    key: 'role',
    ...this.getColumnSearchProps('role'),
    render: text => <Tag color="gold" key={text}>
              {text}
            </Tag>,
  },
  {
    title: 'Privilege',
    dataIndex: 'privilege',
    key: 'privilege',
    ...this.getColumnSearchProps('privilege'),
    render: text => <Tag color="gold" key={text}>
              {text}
            </Tag>,
  },  
];
    const userslist = this.state.userslist;
    console.log(userslist);
    return (
      <>
        <div className="content" style={{ padding: '25px', paddingLeft: '50px', paddingTop: '40px', textAlign: 'center' }}>
        <Helmet title="Roles | BeckBags"
          meta={[
            { name: 'description', content: 'Travel Meets Logistics' },
            { property: 'og:description', content: 'Travel Meets Logistics' },
            { property: 'og:title', content: 'Roles | BeckBags' },
            { property: 'og:image', content: 'https://firebasestorage.googleapis.com/v0/b/beckfriends-2-a4131.appspot.com/o/beckicn.jpg?alt=media&token=f0384655-505a-4fdf-af5c-b01f5bb7198a' },
            { property: 'og:type', content: 'website' },
            { property: 'og:site_name', content: 'BeckBags' },
            { name: 'theme-color', content: '#ffffff' },
            { name: 'apple-mobile-web-app-status-bar-style', content: '#ffffff' },
            { name: 'msapplication-navbutton-color', content: '#ffffff' },
          ]} />
          <Row>
            <Col md="12">
              <Card className="customcard" style={{ backgroundColor: 'transparent' }}>
                <CardHeader>
                  <CardTitle tag="h4" style={{ fontSize: '1.5em', fontWeight: '800', marginBottom: '25px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <h3>Set Team Member's Roles</h3>
                    <Button onClick={this.toggleModal} type="primary" shape="circle" icon={<PlusOutlined />} />
                  </div>
                  </CardTitle>
                </CardHeader>
                <CardBody>
                  
             
        <Table columns={columns} pagination={{ pageSize: 5 }} bordered dataSource={this.state.userslist} />
                </CardBody>
              </Card>
            </Col>
            <Modal isOpen={this.state.modal} toggle={this.toggleModal} backdrop="static" style={{ display: 'flex' }} >
        <ModalHeader toggle={this.toggleModal} style={{ textAlign: 'center', color: 'black' }} charCode="X"></ModalHeader>
        <ModalBody style={{ textAlign: 'center' }}>
          <Col md="12">
          <Input value={this.state.someVal || ''}
     onChange={this.onChange} />
                    <Input style={{ marginTop: '15px' }} value={this.state.someValemail || ''}
     onChange={this.onChangeEmail} />
                    <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle} style={{ marginTop: '15px' }}>
      <DropdownToggle caret
      >
        {this.state.someValRole}
      </DropdownToggle>
      <DropdownMenu>
        <div onClick={this.changeRole}>Admin</div>
        <div onClick={this.changeRole}>Marketing</div>
        <div onClick={this.changeRole}>Operation</div>
        <div onClick={this.changeRole}>Operations - Matchmaking</div>
      </DropdownMenu>
    </Dropdown>
            </Col>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={this.addUser}>Confirm</Button>{' '}
          <Button color="secondary" onClick={this.toggleModal}>Cancel</Button>
        </ModalFooter>
      </Modal>
          </Row>
        </div>
      </>
    );
  }
}

export default Roles;
