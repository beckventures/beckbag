import React , { forwardRef } from "react";
import firebaseinit from '../credentials';
import IconButton from '@material-ui/core/IconButton';
import ListGroupCollapse from './ListGroupCollapse';
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
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import EmailIcon from '@material-ui/icons/Email';
import Search from '@material-ui/icons/Search';
import SmsIcon from '@material-ui/icons/Sms';
import ViewColumn from '@material-ui/icons/ViewColumn';
import {
  Container,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardImg, CardText,
  CardSubtitle,
  Table,
  Row,
  Col,
  UncontrolledCollapse,
  Toast, ToastBody, ToastHeader,
  TabContent, TabPane, Nav, NavItem, NavLink
} from "reactstrap";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Button from '@material-ui/core/Button';
import classnames from 'classnames';
import TableList from './TableList';
import Upcoming from './Upcoming';
import Completed from './Completed';
const database = firebaseinit.database();
var packageslist = [];
var packageidlist = [];

const merchantorders = [];

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
var matches = [];
var actuallist = [];
var airlinelist = [];

const things = {
  idk: {
    createdAt: new Date(),
    title: 'Flight Number A010',
    weight: 80
  },
  another: {
    createdAt: new Date('2010-10-10'),
    title: 'Flight Number A010',
    weight: 100
  },
  more: {
    createdAt: new Date('2011-11-11'),
    title: 'Flight Number A010',
    weight: 120
  }
}

class Matching extends React.Component {

  constructor(props) {
    super(props);
    this.state = {merchantorderslist : [], airlinelist : [], added: false, totalweight: 0,activeTab: '1'};
  }

  componentDidMount() { 
  const that = this;
    
  
    database.ref('beckbag').child('carrier').child('airindia').child('trips').child('added')
        .orderByChild('timestamp')
        .limitToLast(20)
        .once('value')
        .then((snapshot) => {
          
          snapshot.forEach((chSnapshot) => {
            database.ref('beckbag').child('carriertrips').child('added').child(chSnapshot.key).once('value').then(function(childSnapshot) {
              that.setState({ added : true });
            
            var trip = childSnapshot.val();
            var bookingtimestamp = childSnapshot.val().bookingtimestamp;
            var todate=new Date(bookingtimestamp).getDate();
            var tomonth=new Date(bookingtimestamp).getMonth()+1;
            var toyear=new Date(bookingtimestamp).getFullYear();
            var booking_date=todate+'/'+tomonth+'/'+toyear;
            trip.booking_date = booking_date;
            merchantorders.push(trip);
            that.setState({
            merchantorderslist: merchantorders
            });
            });
            
          });
    });
  }


  

  toggle = (tab) => {
     if(this.state.activeTab !== tab) 
     {
      this.setState({
        activeTab: tab
      });
     }
  }

  

  componentDidUpdate(prevProps, prevState) {
    if (!prevState.added && this.state.added) {
    
    }
  }

  render() {
    //const airlinelist = this.state.airlinelist;
    const merchantorderslist = this.state.merchantorderslist.reverse();
    return (
      <>
        <div className="content" style={{ padding: '50px' }}>
          <Row>
            <Col>
              <p style={{ fontWeight: '800', fontSize: '1.2em', padding: '24px 15px 0'}}></p>
              <div style={{ textAlign: 'center' }}>
                <Tabs>
    <TabList style={{ borderWidth: '0px' }}>
      <Tab style={{ paddingRight: '30px', paddingLeft: '30px', paddingTop: '15px', paddingBottom: '15px', fontSize: '1.2em', borderRadius: '50px' }}>PENDING</Tab>
      <Tab style={{ paddingRight: '30px', paddingLeft: '30px', paddingTop: '15px', paddingBottom: '15px', fontSize: '1.2em', borderRadius: '50px' }}>UPCOMING</Tab>
      <Tab style={{ paddingRight: '30px', paddingLeft: '30px', paddingTop: '15px', paddingBottom: '15px', fontSize: '1.2em', borderRadius: '50px' }}>COMPLETED</Tab>
    </TabList>
 
    <TabPanel style={{ textAlign: 'center' }}>
      <TableList />
    </TabPanel>
    <TabPanel>
      <Upcoming />
    </TabPanel>
    <TabPanel>
      <Completed />
    </TabPanel>
  </Tabs>
              </div>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default Matching;
