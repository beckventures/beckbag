import React , { forwardRef } from 'react';
import firebaseinit from '../credentials';
import IconButton from '@material-ui/core/IconButton';
import Skeleton from '@material-ui/lab/Skeleton';
import MaterialTable from "material-table";
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
import AddBox from '@material-ui/icons/AddBox';
import Highlighter from 'react-highlight-words';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import { Table, Input, Button, Space, Tag } from 'antd';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import CancelIcon from '@material-ui/icons/Cancel';
import Search from '@material-ui/icons/Search';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ViewColumn from '@material-ui/icons/ViewColumn';
import { SearchOutlined } from '@ant-design/icons';
import { ListGroupItem, Collapse, Row,
  Modal, ModalHeader, ModalBody, ModalFooter, Card, CardBody, CardText, CardFooter,
  Col, Media } from 'reactstrap';
import FlightIcon from '@material-ui/icons/Flight';
import { DeliveredProcedureOutlined, FundViewOutlined, AppleOutlined, AndroidOutlined } from '@ant-design/icons';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import EventNoteIcon from '@material-ui/icons/EventNote';
import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff';
import FlightLandIcon from '@material-ui/icons/FlightLand';
import NotificationAlert from "react-notification-alert";


const database = firebaseinit.database();
var packageslist = [];
var packageidlist = [];

var ball = null;

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

class ListGroupCollapseConfirmed extends React.Component {
  constructor(props) {
    super(props);
    this.checkifFilled = this.checkifFilled.bind(this);  
    this.updateArray = this.updateArray.bind(this);  
    this.approve = this.approve.bind(this);  
    this.toggle = this.toggle.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.toggleModalApprove = this.toggleModalApprove.bind(this);
    ball = this.props.ball;
    console.log('comeon');
    console.log(ball);
    this.state = {collapse: false, modal: false, modalapprove: false, data: null, ball: ball,searchText: '',
    searchedColumn: ''};
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

  notify = place => {
    var packagedetails = this.state.data;
    var flightnumber = packagedetails.recommended;
    var orderid = packagedetails.orderid;
    var color = Math.floor(Math.random() * 5 + 1);
    var type = 'primary';
    var options = {};
    var optionscomplete = {};
    options = {
      place: place,
      message: (
        <div>
          <div>
            You have accepted package {orderid}!
          </div>
        </div>
      ),
      type: type,
      icon: "tim-icons icon-bell-55",
      autoDismiss: 4
    };
    this.refs.notificationAlert.notificationAlert(options);
  };
  notifyComplete = place => {
    var packagedetails = this.state.data;
    var flightnumber = packagedetails.recommended;
    var orderid = packagedetails.orderid;
    var color = Math.floor(Math.random() * 5 + 1);
    var type = 'info';
    var optionscomplete = {};
    optionscomplete = {
      place: place,
      message: (
        <div>
          <div>
            Flight number {flightnumber} is now full!
          </div>
        </div>
      ),
      type: type,
      icon: "tim-icons icon-bell-55",
      autoDismiss: 4
    };
    this.refs.notificationAlert.notificationAlert(optionscomplete);
  };

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  toggleModal() {
    this.setState({ modal: !this.state.modal  });
  }

  toggleModalApprove() {
    this.setState({ modalapprove: !this.state.modalapprove  });
  }

  approve() {
    var that = this;
    var packagedetails = this.state.data;
    var flightnumber = packagedetails.recommended;
    var orderid = packagedetails.orderid;

    this.notify("tl");

    ///change statuscode to 'approved'

    database.ref('beckbag').child('flights').child(flightnumber).child('packages').child(orderid)
              .update({
                statuscode: 'approved'
              });

    //shift package from 'added' to 'matched'
    
    database.ref('beckbag').child('merchantorders').child('added').child(orderid)
              .once('value')
              .then((snapshot) => {
                var shiftpackage = snapshot.val();
                that.shift(shiftpackage,orderid);
              });

  }

  shift(shiftpackage,orderid) {
    database.ref('beckbag').child('merchantorders').child('matched').child(orderid)
              .set({
                basecharge: shiftpackage.basecharge,
                bookingtimestamp: shiftpackage.bookingtimestamp,
                content: shiftpackage.content,
                customcharge: shiftpackage.customcharge,
                delivery: shiftpackage.delivery,
                deliverydate: shiftpackage.deliverydate,
                deliverydatetimestamp: shiftpackage.deliverydatetimestamp,
                number: shiftpackage.number,
                orderid: shiftpackage.orderid,
                pickup: shiftpackage.pickup,
                matched: shiftpackage.recommended,
                uid: shiftpackage.uid,
                value: shiftpackage.value,
                weight: shiftpackage.weight
              });
    
    //delete data from 'added' here

    //var packageaddedref = database.ref('beckbag').child('merchantorders').child('added').child(orderid).remove();

    //update data in state

    this.updateArray(orderid);

  }

  updateArray(orderid) {
    var ball = this.state.ball;
    var packageslist = this.state.ball.packageslist;
    for(var i=0;i<ball.packageslist.length;i++)
    {
      if(ball.packageslist[i].orderid === orderid)
      {

        ball.packageslist[i].approvalbtn = 'no';
        ball.packageslist[i].status = 'Approved';
        this.setState({
          ball : ball,
          modalapprove: !this.state.modalapprove 
        });
        this.checkifFilled();
        return;
      }
    }
    
  }

  checkifFilled() {
    console.log('entered bish');
    var ball = this.state.ball;
    var packageslist = this.state.ball.packageslist;
    console.log(packageslist);
    for(var i=0;i<ball.packageslist.length;i++)
    {
      if(ball.packageslist[i].status !== 'Approved')
      {
        console.log('not approved');
        
        return;
      }
      else
      {
        console.log('approved');
        console.log(i);
        var count = i+1;
        if(count == ball.packageslist.length)
        {
          this.notifyComplete("tr");
        }
        
      }
    }
  }
  
  render() {
    const columns = [
  {
    title: 'PNR',
    dataIndex: 'pnr',
    key: 'pnr',
    ...this.getColumnSearchProps('pnr'),
  },
  {
    title: 'From',
    dataIndex: 'from',
    key: 'from',
    ...this.getColumnSearchProps('from'),
  },
  {
    title: 'To',
    dataIndex: 'to',
    key: 'to',
    ...this.getColumnSearchProps('to'),
  },
  {
    title: 'Travel Date',
    dataIndex: 'traveldate',
    key: 'traveldate',
    ...this.getColumnSearchProps('traveldate'),
  },
  {
    title: 'Weight',
    dataIndex: 'weight',
    key: 'weight',
    ...this.getColumnSearchProps('weight'),
  },
  {
    title: 'Discount',
    dataIndex: 'discount',
    key: 'discount',
    ...this.getColumnSearchProps('discount'),
    render: text => <Tag color="gold" key={text}>
              {text}
            </Tag>,
  },
  {
    title: 'Passengers',
    dataIndex: 'number',
    key: 'number',
    ...this.getColumnSearchProps('number'),

  },
  {
    title: 'Class',
    dataIndex: 'class',
    key: 'class',
    ...this.getColumnSearchProps('class'),
    render: text => <Tag color="green" key={text}>
              {text}
            </Tag>,
  }
  
  
];
    return (
      <ListGroupItem style={{ background: '#1e1e2f' }}>
        <div className="react-notification-alert-container">
            <NotificationAlert ref="notificationAlert" />
        </div>
         <div className="react-notification-alert-container">
            <NotificationAlert ref="notificationAlertComplete" />
        </div>
        <div>
          <Row>
            <Col md="4">
              <Row>
                <FlightIcon fontSize="large" style={{ color: 'white', fontSize: 23, marginRight: 5, fontWeight: '800', marginTop: 3, marginLeft: 10 }}/>
                <p style={{ fontSize: '1.1em', fontWeight: '800', color: 'white' }}>
                  <strong>{this.state.ball.flightnumber}</strong>
                </p>
              </Row>
            </Col>
            <Col md="4">
              <Row style={{ textAlign: 'center' }}>
                <FlightTakeoffIcon fontSize="large" style={{ color: 'white', fontSize: 23, marginRight: 5, fontWeight: '800', marginTop: 3, marginLeft: 10 }}/>
                <p style={{ fontSize: '1.1em', fontWeight: '800', color: 'white', float: 'right' }}>
                <strong>{this.state.ball.from}</strong>
              </p>
              </Row>
            </Col>
            <Col md="4">
              <Row style={{ textAlign: 'center' }}>
                <EventNoteIcon fontSize="large" style={{ color: 'white', fontSize: 23, marginRight: 5, fontWeight: '800', marginTop: 3, marginLeft: 10 }}/>
                <p style={{ fontSize: '1.1em', fontWeight: '800', color: 'white', float: 'right' }}>
                <strong>{this.state.ball.travel_date}</strong>
              </p>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col md="4">
              <Row style={{ textAlign: 'center' }}>
                <BusinessCenterIcon fontSize="large" style={{ color: 'white', fontSize: 23, marginRight: 5, fontWeight: '800', marginTop: 3, marginLeft: 10 }}/>
                <p style={{ fontSize: '1.1em', fontWeight: '600', color: 'white' }}>
               
                Monetized {this.state.ball.weight} kgs
              </p> 
              </Row>
            </Col>
            <Col md="4">
              <Row style={{ textAlign: 'center' }}>
                <FlightLandIcon fontSize="large" style={{ color: 'white', fontSize: 23, marginRight: 5, fontWeight: '800', marginTop: 3, marginLeft: 10 }}/>
                <p style={{ fontSize: '1.1em', fontWeight: '800', color: 'white', float: 'right' }}>
                <strong>{this.state.ball.to}</strong>
              </p>
              </Row>
            </Col>
            <Col md="4">
              <Row style={{ textAlign: 'center' }}>
                <FundViewOutlined style={{ color: 'white', fontSize: 23, marginRight: 5, fontWeight: '800', marginTop: 3, marginLeft: 10 }}/>
                <p onClick={this.toggle} style={{ fontSize: '1.1em', fontWeight: '600', color: 'white' }}>
               
                View Trips
              </p> 
              </Row>
            </Col>
          </Row>  
          
           
        <Collapse isOpen={this.state.collapse}><br /><br />
        <p style={{ fontSize: '1.1em', fontWeight: '800', color: 'white', textAlign: 'center' }}>Confirmed Trips</p><br />
            <Table columns={columns} pagination={{ pageSize: 5 }} bordered dataSource={this.state.ball.trips} />
</Collapse>
        </div>
      </ListGroupItem>
    );
  }
}

export default ListGroupCollapseConfirmed