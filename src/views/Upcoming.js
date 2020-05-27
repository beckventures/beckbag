import React , { forwardRef } from "react";
import firebaseinit from '../credentials';
import IconButton from '@material-ui/core/IconButton';
import ListGroupCollapseUpcoming from './ListGroupCollapseUpcoming';
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
  Toast, ToastBody, ToastHeader
} from "reactstrap";
import Button from '@material-ui/core/Button';
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

class Upcoming extends React.Component {

  constructor(props) {
    super(props);
    this.state = {airlinelist : [], added: false, totalweight: 0};
  }

  componentDidMount() { 
  const that = this;
    
  
   database.ref('beckbag').child('upcomingflights')
        .once('value')
        .then((snapshot) => {
          var timestamp = 0;
          var weightcalc = 0;
          var flightnumber = '';
          var travel_date = '';
          var from = '';
          var to = '';  
          packageslist = [];
          snapshot.forEach((chSnapshot) => {
              console.log(chSnapshot.key);
              database.ref('beckbag').child('upcomingflights').child(chSnapshot.key).child('shifted')
              .once('value')
              .then((newsnapshot) => {
                newsnapshot.child('trips').forEach((childSnapshot) => {
                var weight = childSnapshot.val().weight;
                var tripno = childSnapshot.key;
                console.log(tripno);
                timestamp = childSnapshot.val().timestamp;
                var todate=new Date(timestamp).getDate();
                var tomonth=new Date(timestamp).getMonth()+1;
                var toyear=new Date(timestamp).getFullYear();
                travel_date=todate+'/'+tomonth+'/'+toyear;
                weightcalc = weight + weightcalc;
                flightnumber = chSnapshot.key;
                from=childSnapshot.val().from;
                to=childSnapshot.val().to;
                console.log(from+' '+to+' '+weightcalc);
              });
                actuallist.push({
                weight: weightcalc,
                travel_date: travel_date,
                flightnumber: flightnumber,
                from: from,
                to: to,
              });
              weightcalc = 0;
              console.log(actuallist);
              });
              
              
            });
          that.setState({
              airlinelist: actuallist
            })
          console.log(actuallist);
          console.log(this.state.airlinelist);
          }); 

  }

  

  componentDidUpdate(prevProps, prevState) {
    if (!prevState.added && this.state.added) {
    
    }
  }

  render() {
    //const airlinelist = this.state.airlinelist;
    return (
      <>
        <div className="content">
          <Row>
            <Col>
              <p style={{ fontWeight: '800', fontSize: '1.2em', padding: '24px 15px 0'}}>UPCOMING FLIGHTS</p>
              <Container className="py-4">
              {this.state.airlinelist.map((airline) =>
              <ListGroupCollapseUpcoming key={airline} cat={airline} ball={airline} />
              )}
              </Container>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default Upcoming;
