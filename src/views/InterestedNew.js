import React , { forwardRef } from "react";
import firebaseinit from '../credentials';
import {Helmet} from "react-helmet";
import { Spin, DatePicker, Input } from 'antd';
import IconButton from '@material-ui/core/IconButton';
import ListGroupCollapseInterested from './ListGroupCollapseInterested';
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
import SmsIcon from '@material-ui/icons/Sms';
import './Tabs.css';
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
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
const database = firebaseinit.database();
var packageslist = [];
var packageidlist = [];

const merchantorders = [];

const { Search } = Input;
const { RangePicker } = DatePicker;

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
var actuallist = [];
var airlinelist = [];
var tripslist = [];

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

class InterestedNew extends React.Component {

  constructor(props) {
    super(props);
    this.onDateChange = this.onDateChange.bind(this);
    this.search = this.search.bind(this);
    this.onClear = this.onClear.bind(this);
    this.state = {airlinelist : [], added: false, totalweight: 0, datechange: false, searching: false};
  }

  componentDidMount() { 
  const that = this;
    
  
   database.ref('beckbag').child('carrier').child('indigo').child('interestedtravelers')
        .once('value')
        .then((snapshot) => {
          
            
          snapshot.forEach((chSnapshot) => {
            var flightnumber = chSnapshot.key;
            console.log(flightnumber);
            var travel_date = '';
            var from = '';
            var to = '';
            var count = 0;
             var timestamp = 0;
             var tripslist = [];
            var childrencount = chSnapshot.numChildren();
            console.log(flightnumber);
            chSnapshot.forEach((chchSnapshot) => {
              var tripid = chchSnapshot.val().tripid;
               
               
              database.ref('beckbag').child('carriertrips').child('interested').child(tripid)
              .once('value')
              .then((snapshotpackage) => { 
                count++;
                timestamp = snapshotpackage.val().traveldatetimestamp;
                var todate=new Date(timestamp).getDate();
                var tomonth=new Date(timestamp).getMonth()+1;
                var toyear=new Date(timestamp).getFullYear();
                travel_date=todate+'/'+tomonth+'/'+toyear;
                
                from=snapshotpackage.val().from;
                to=snapshotpackage.val().to;
                var trip = snapshotpackage.val();
                var bookingtimestamp = snapshotpackage.val().bookingtimestamp;
                var followuptimestamp = snapshotpackage.val().followuptimestamp;
                if( followuptimestamp === 'NA' )
                {
                var followupdate= 'NA';
                }
                else
                {
                var followupdate= new Date(followuptimestamp).toDateString();
                }
                trip.followupdate = followupdate;
                trip.bookingdate = new Date(bookingtimestamp).toDateString();
                tripslist.push(trip);
                console.log(childrencount);
                console.log(count);
                if(childrencount === count)
              {
                actuallist.push({
                travel_date: travel_date,
                flightnumber: flightnumber,
                from: from,
                to: to,
                trips: tripslist
              });

              }
                that.setState({
              added: true,
              actuallist: actuallist
            });
              });


            });
              
          });
          //console.log(actuallist);
          
          }); 

  }

    onDateChange(dates, dateStrings) {
  var fromdate = dateStrings[0];
  fromdate = fromdate.split("-");
  var fromtimestamp = new Date(fromdate).getTime();
  var todate = dateStrings[1];
  todate = todate.split("-");
  var totimestamp = new Date(todate).getTime();

  this.setState({
      added: false
    });
    var list = [];
    if( this.state.searching){
      list = this.state.airlinelist;
    }
    else
    {
      list = this.state.notmodifiedlist;
    }
    var searchlist = [];
    var length = list.length;
    var searchlistcount = 0;
    var i = 0;
    for(i; i<length; i++)
    { 
      console.log(list[i])
      var timestamp = list[i].timestamp;
      var fromdiff = timestamp - fromtimestamp;
      var todiff = totimestamp - timestamp;
      if (( fromdiff >= 0 ) && ( todiff >= 0 ))
      {
        console.log('entered');
        searchlist[searchlistcount] = list[i];
        searchlistcount++;
      }
    }
    if(i === length){
      this.setState({
      added: true,
      airlinelist: searchlist,
      datechange: true
    });
    }
    
  }  

  search(value) {
    this.setState({
      added: false
    });
    var list = [];
    if( this.state.datechange){
      list = this.state.airlinelist;
    }
    else
    {
      list = this.state.notmodifiedlist;
    }
    var searchlist = [];
    var length = list.length;
    var searchlistcount = 0;
    var i = 0;
    for(i; i<length; i++)
    { 
      console.log(list[i])
      var flightnumber = list[i].flightnumber;
      var from = list[i].from;
      var to = list[i].to;
      console.log('from '+from+' to '+to+' value '+value)
      if (( from === value ) || ( to === value ) || ( flightnumber === value ))
      {
        console.log('entered');
        searchlist[searchlistcount] = list[i];
        searchlistcount++;
      }
    }
    console.log(i);
    if(i === length){
      this.setState({
      added: true,
      airlinelist: searchlist,
      searching: true
    });
    }
    
  } 

  componentWillUnmount() {
        console.log('unmounted');
        actuallist = [];
    }
  

  componentDidUpdate(prevProps, prevState) {
    if (!prevState.added && this.state.added) {
    
    }
  }

  onClear() {
    console.log('cleared');
    var airlinelist = this.state.notmodifiedlist;
    this.setState({
      airlinelist: airlinelist,
      value: 'Search',
      datechange: false,
      searching: false
    });
  }

  render() {
    const airlinelist = this.state.actuallist;
    console.log(airlinelist);
    return (
      <>
       <div className="content"  style={{ padding: '25px', paddingLeft: '50px', paddingTop: '40px' }}>
       <Helmet title="Interested Travelers | BeckBags"
          meta={[
            { name: 'description', content: 'Travel Meets Logistics' },
            { property: 'og:description', content: 'Travel Meets Logistics' },
            { property: 'og:title', content: 'Interested Travelers | BeckBags' },
            { property: 'og:image', content: 'https://firebasestorage.googleapis.com/v0/b/beckfriends-2-a4131.appspot.com/o/beckicn.jpg?alt=media&token=f0384655-505a-4fdf-af5c-b01f5bb7198a' },
            { property: 'og:type', content: 'website' },
            { property: 'og:site_name', content: 'BeckBags' },
            { name: 'theme-color', content: '#ffffff' },
            { name: 'apple-mobile-web-app-status-bar-style', content: '#ffffff' },
            { name: 'msapplication-navbutton-color', content: '#ffffff' },
          ]} />
          <Row>
            <Col md="12">
            <Card className="customcard" style={{ backgroundColor: 'transparent', boxShadow: 'none !important' }}>
                <CardHeader style={{ display: 'flex', justifyContent: 'center' }}>
                  <CardTitle tag="h4" style={{ fontSize: '1.5em', fontWeight: '800', textAlign: 'center' }}>Interested Travelers</CardTitle>
                  <p className="category" style={{ fontSize: '1em' }}></p>
                </CardHeader>

              <CardBody style={{ textAlign: 'center' }}>
              {!this.state.added && <Spin size="large" style={{ marginTop: '70px' }}/>}
              {this.state.added && <Container className="py-4" style={{ padding: '0' }}>
              {this.state.actuallist.map((airline) =>
              <ListGroupCollapseInterested key={airline} cat={airline} ball={airline} />
              )}
              </Container>}
              </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default InterestedNew;
