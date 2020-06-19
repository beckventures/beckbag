import React , { forwardRef } from "react";
import firebaseinit from '../credentials';
import { List, Steps, Divider, Select, Typography, Result, Input, Spin, DatePicker } from 'antd';
import IconButton from '@material-ui/core/IconButton';
import ListGroupCollapseCompleted from './ListGroupCollapseCompleted';
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
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import CancelIcon from '@material-ui/icons/Cancel';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import EmailIcon from '@material-ui/icons/Email';
import DeleteIcon from '@material-ui/icons/Delete';
import SmsIcon from '@material-ui/icons/Sms';
import ViewColumn from '@material-ui/icons/ViewColumn';
import Skeleton from '@material-ui/lab/Skeleton';
import {
  Container,
  Collapse,
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
  Modal, ModalHeader, ModalBody, ModalFooter
} from "reactstrap";
import Button from '@material-ui/core/Button';
import FlightIcon from '@material-ui/icons/Flight';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import EventNoteIcon from '@material-ui/icons/EventNote';
import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff';
import FlightLandIcon from '@material-ui/icons/FlightLand';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import NotificationAlert from "react-notification-alert";
import './PaginationCustom.css';
import { DeliveredProcedureOutlined, FundViewOutlined } from '@ant-design/icons';

const database = firebaseinit.database();
var packageslist = [];
var feeslist = [];
var trackinglist = [];
var packageidlist = [];

const merchantorders = [];

const { Step } = Steps;
const { Option } = Select;
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

class Completed extends React.Component {

  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onDateChange = this.onDateChange.bind(this);
    this.toggle = this.toggle.bind(this);
    this.search = this.search.bind(this);
    this.onClear = this.onClear.bind(this);
    this.checkFee = this.checkFee.bind(this);
    this.onShowSizeChange = this.onShowSizeChange.bind(this);
    this.state = {textvalue: 'Search', collapse: false, airlinelist : [], added: false, totalweight: 0, cancheck: false, datechange: false, searching: false};
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  

  componentDidMount() { 
  const that = this;
    
  
   database.ref('beckbag').child('completedflights')
        .once('value')
        .then((snapshot) => {
          var timestamp = 0;
          var copy = 0;
          var weightcalc = 0;
          var feecalc = 0;
          var flightnumber = '';
          var travel_date = '';
          var from = '';
          var to = '';  
          packageslist = [];
          snapshot.forEach((chSnapshot) => {
              var flightnumber = '';
              chSnapshot.child('data').child('snapshot').child('trips').forEach((childSnapshot) => {
                var weight = childSnapshot.val().weight;
                var tripno = childSnapshot.key;
                //console.log(tripno);
                timestamp = childSnapshot.val().timestamp;
                var todate=new Date(timestamp).getDate();
                var tomonth=new Date(timestamp).getMonth()+1;
                var toyear=new Date(timestamp).getFullYear();
                travel_date=todate+'/'+tomonth+'/'+toyear;
                weightcalc = weight + weightcalc;
                flightnumber = chSnapshot.key;
                from=childSnapshot.val().from;
                to=childSnapshot.val().to;
              });
               
               actuallist.push({
                weight: weightcalc,
                timestamp: 1592464069000,
                travel_date: travel_date,
                flightnumber: 'AI 9088',
                from: from,
                to: 'Chennai',
              });

              actuallist.push({
                weight: weightcalc,
                timestamp: timestamp,
                travel_date: travel_date,
                flightnumber: flightnumber,
                from: 'Kolkata',
                to: to,
              });
              actuallist.push({
                weight: weightcalc,
                timestamp: 1592464069000,
                travel_date: travel_date,
                flightnumber: flightnumber,
                from: from,
                to: 'Chennai',
              });
              actuallist.push({
                weight: weightcalc,
                timestamp: timestamp,
                travel_date: travel_date,
                flightnumber: 'AI 9128',
                from: 'Kolkata',
                to: to,
              });
              actuallist.push({
                weight: weightcalc,
                timestamp: timestamp,
                travel_date: travel_date,
                flightnumber: flightnumber,
                from: from,
                to: to,
              });
              actuallist.push({
                weight: weightcalc,
                timestamp: timestamp,
                travel_date: travel_date,
                flightnumber: flightnumber,
                from: 'New Delhi',
                to: to,
              });
              actuallist.push({
                weight: weightcalc,
                timestamp: timestamp,
                travel_date: travel_date,
                flightnumber: flightnumber,
                from: from,
                to: to,
              });
              actuallist.push({
                weight: weightcalc,
                timestamp: timestamp,
                travel_date: travel_date,
                flightnumber: flightnumber,
                from: from,
                to: to,
              });
              weightcalc = 0;

              var stageonewaiting = chSnapshot.child('tracking').child('stageone').child('Waiting').child('timestamp').val();
                var stageoneprogress = chSnapshot.child('tracking').child('stageone').child('In Progress').child('timestamp').val();
                var stageonecompleted = chSnapshot.child('tracking').child('stageone').child('Completed').child('timestamp').val();

                if( stageoneprogress === null)
                {
                  stageoneprogress = 'NA';
                }
                if( stageonecompleted === null)
                {
                  stageonecompleted = 'NA';
                }

                var stagetwowaiting = chSnapshot.child('tracking').child('stagetwo').child('Waiting').child('timestamp').val();
                var stagetwoprogress = chSnapshot.child('tracking').child('stagetwo').child('In Progress').child('timestamp').val();
                var stagetwocompleted = chSnapshot.child('tracking').child('stagetwo').child('Completed').child('timestamp').val();

                if( stagetwowaiting === null)
                {
                  stagetwowaiting = 'NA';
                }
                if( stagetwoprogress === null)
                {
                  stagetwoprogress = 'NA';
                }
                if( stagetwocompleted === null)
                {
                  stagetwocompleted = 'NA';
                }

                var stagethreewaiting = chSnapshot.child('tracking').child('stagethree').child('Waiting').child('timestamp').val();
                var stagethreeprogress = chSnapshot.child('tracking').child('stagethree').child('In Progress').child('timestamp').val();
                var stagethreecompleted = chSnapshot.child('tracking').child('stagethree').child('Completed').child('timestamp').val();

                if( stagethreewaiting === null)
                {
                  stagethreewaiting = 'NA';
                }
                if( stagethreeprogress === null)
                {
                  stagethreeprogress = 'NA';
                }
                if( stagethreecompleted === null)
                {
                  stagethreecompleted = 'NA';
                }

                var stagefourwaiting = chSnapshot.child('tracking').child('stagefour').child('Waiting').child('timestamp').val();
                var stagefourprogress = chSnapshot.child('tracking').child('stagefour').child('In Progress').child('timestamp').val();
                var stagefourcompleted = chSnapshot.child('tracking').child('stagefour').child('Completed').child('timestamp').val();

                if( stagefourwaiting === null)
                {
                  stagefourwaiting = 'NA';
                }
                if( stagefourprogress === null)
                {
                  stagefourprogress = 'NA';
                }
                if( stagefourcompleted === null)
                {
                  stagefourcompleted = 'NA';
                }

                var stagefivewaiting = chSnapshot.child('tracking').child('stagefive').child('Waiting').child('timestamp').val();
                var stagefiveprogress = chSnapshot.child('tracking').child('stagefive').child('In Progress').child('timestamp').val();
                var stagefivecompleted = chSnapshot.child('tracking').child('stagefive').child('Completed').child('timestamp').val();

                if( stagefivewaiting === null)
                {
                  stagefivewaiting = 'NA';
                }
                if( stagefiveprogress === null)
                {
                  stagefiveprogress = 'NA';
                }
                if( stagefivecompleted === null)
                {
                  stagefivecompleted = 'NA';
                }


                trackinglist.push({
                  stageonewaiting: stageonewaiting,
                  stageoneprogress: stageoneprogress,
                  stageonecompleted: stageonecompleted,
                  stagetwowaiting: stagetwowaiting,
                  stagetwoprogress: stagetwoprogress,
                  stagetwocompleted: stagetwocompleted,
                  stagethreewaiting: stagethreewaiting,
                  stagethreeprogress: stagethreeprogress,
                  stagethreecompleted: stagethreecompleted,
                  stagefourwaiting: stagefourwaiting,
                  stagefourprogress: stagefourprogress,
                  stagefourcompleted: stagefourcompleted,
                  stagefivewaiting: stagefivewaiting,
                  stagefiveprogress: stagefiveprogress,
                  stagefivecompleted: stagefivecompleted
                });
                trackinglist.push({
                  stageonewaiting: stageonewaiting,
                  stageoneprogress: stageoneprogress,
                  stageonecompleted: stageonecompleted,
                  stagetwowaiting: stagetwowaiting,
                  stagetwoprogress: stagetwoprogress,
                  stagetwocompleted: stagetwocompleted,
                  stagethreewaiting: stagethreewaiting,
                  stagethreeprogress: stagethreeprogress,
                  stagethreecompleted: stagethreecompleted,
                  stagefourwaiting: stagefourwaiting,
                  stagefourprogress: stagefourprogress,
                  stagefourcompleted: stagefourcompleted,
                  stagefivewaiting: stagefivewaiting,
                  stagefiveprogress: stagefiveprogress,
                  stagefivecompleted: stagefivecompleted
                });
                trackinglist.push({
                  stageonewaiting: stageonewaiting,
                  stageoneprogress: stageoneprogress,
                  stageonecompleted: stageonecompleted,
                  stagetwowaiting: stagetwowaiting,
                  stagetwoprogress: stagetwoprogress,
                  stagetwocompleted: stagetwocompleted,
                  stagethreewaiting: stagethreewaiting,
                  stagethreeprogress: stagethreeprogress,
                  stagethreecompleted: stagethreecompleted,
                  stagefourwaiting: stagefourwaiting,
                  stagefourprogress: stagefourprogress,
                  stagefourcompleted: stagefourcompleted,
                  stagefivewaiting: stagefivewaiting,
                  stagefiveprogress: stagefiveprogress,
                  stagefivecompleted: stagefivecompleted
                });
                trackinglist.push({
                  stageonewaiting: stageonewaiting,
                  stageoneprogress: stageoneprogress,
                  stageonecompleted: stageonecompleted,
                  stagetwowaiting: stagetwowaiting,
                  stagetwoprogress: stagetwoprogress,
                  stagetwocompleted: stagetwocompleted,
                  stagethreewaiting: stagethreewaiting,
                  stagethreeprogress: stagethreeprogress,
                  stagethreecompleted: stagethreecompleted,
                  stagefourwaiting: stagefourwaiting,
                  stagefourprogress: stagefourprogress,
                  stagefourcompleted: stagefourcompleted,
                  stagefivewaiting: stagefivewaiting,
                  stagefiveprogress: stagefiveprogress,
                  stagefivecompleted: stagefivecompleted
                });
                trackinglist.push({
                  stageonewaiting: stageonewaiting,
                  stageoneprogress: stageoneprogress,
                  stageonecompleted: stageonecompleted,
                  stagetwowaiting: stagetwowaiting,
                  stagetwoprogress: stagetwoprogress,
                  stagetwocompleted: stagetwocompleted,
                  stagethreewaiting: stagethreewaiting,
                  stagethreeprogress: stagethreeprogress,
                  stagethreecompleted: stagethreecompleted,
                  stagefourwaiting: stagefourwaiting,
                  stagefourprogress: stagefourprogress,
                  stagefourcompleted: stagefourcompleted,
                  stagefivewaiting: stagefivewaiting,
                  stagefiveprogress: stagefiveprogress,
                  stagefivecompleted: stagefivecompleted
                });
                trackinglist.push({
                  stageonewaiting: stageonewaiting,
                  stageoneprogress: stageoneprogress,
                  stageonecompleted: stageonecompleted,
                  stagetwowaiting: stagetwowaiting,
                  stagetwoprogress: stagetwoprogress,
                  stagetwocompleted: stagetwocompleted,
                  stagethreewaiting: stagethreewaiting,
                  stagethreeprogress: stagethreeprogress,
                  stagethreecompleted: stagethreecompleted,
                  stagefourwaiting: stagefourwaiting,
                  stagefourprogress: stagefourprogress,
                  stagefourcompleted: stagefourcompleted,
                  stagefivewaiting: stagefivewaiting,
                  stagefiveprogress: stagefiveprogress,
                  stagefivecompleted: stagefivecompleted
                });
                trackinglist.push({
                  stageonewaiting: stageonewaiting,
                  stageoneprogress: stageoneprogress,
                  stageonecompleted: stageonecompleted,
                  stagetwowaiting: stagetwowaiting,
                  stagetwoprogress: stagetwoprogress,
                  stagetwocompleted: stagetwocompleted,
                  stagethreewaiting: stagethreewaiting,
                  stagethreeprogress: stagethreeprogress,
                  stagethreecompleted: stagethreecompleted,
                  stagefourwaiting: stagefourwaiting,
                  stagefourprogress: stagefourprogress,
                  stagefourcompleted: stagefourcompleted,
                  stagefivewaiting: stagefivewaiting,
                  stagefiveprogress: stagefiveprogress,
                  stagefivecompleted: stagefivecompleted
                });

                //console.log(trackinglist);

             

              chSnapshot.child('data').child('snapshot').child('packages').forEach((packagesnapshot) => {
              var packageid = packagesnapshot.val().package;
              var statuscode = packagesnapshot.val().statuscode;
              if(statuscode === 'approved')
              {
                database.ref('beckbag').child('merchantorders').child('matched').child(packageid)
              .once('value')
              .then((snapshotpackage) => { 
              var content = snapshotpackage.val().content;
              var value = '$ '+snapshotpackage.val().value;
              var weight = snapshotpackage.val().weight+' kgs';
              var orderid = snapshotpackage.val().orderid;
              var fee = '₹ '+snapshotpackage.val().basecharge;
              feecalc = parseInt(snapshotpackage.val().basecharge + feecalc);
              //console.log(feecalc);
              var matched = snapshotpackage.val().matched;
              packageslist.push(
              {
              content: content,
              value: value,
              weight: weight,
              orderid: orderid,
              fee: fee,
              status: 'Approved',
              matched: matched,
              approvalbtn: 'no',
              rejectbtn: 'yes'
              });
              packageslist.push(
              {
              content: content,
              value: value,
              weight: weight,
              orderid: orderid,
              fee: fee,
              status: 'Approved',
              matched: matched,
              approvalbtn: 'no',
              rejectbtn: 'yes'
              });
              packageslist.push(
              {
              content: content,
              value: value,
              weight: weight,
              orderid: orderid,
              fee: fee,
              status: 'Approved',
              matched: matched,
              approvalbtn: 'no',
              rejectbtn: 'yes'
              });
              packageslist.push(
              {
              content: content,
              value: value,
              weight: weight,
              orderid: orderid,
              fee: fee,
              status: 'Approved',
              matched: matched,
              approvalbtn: 'no',
              rejectbtn: 'yes'
              });
              packageslist.push(
              {
              content: content,
              value: value,
              weight: weight,
              orderid: orderid,
              fee: fee,
              status: 'Approved',
              matched: matched,
              approvalbtn: 'no',
              rejectbtn: 'yes'
              });
              packageslist.push(
              {
              content: content,
              value: value,
              weight: weight,
              orderid: orderid,
              fee: fee,
              status: 'Approved',
              matched: matched,
              approvalbtn: 'no',
              rejectbtn: 'yes'
              });
              packageslist.push(
              {
              content: content,
              value: value,
              weight: weight,
              orderid: orderid,
              fee: fee,
              status: 'Approved',
              matched: matched,
              approvalbtn: 'no',
              rejectbtn: 'yes'
              });
              console.log(feeslist.push(feecalc));
              this.setState({
              cancheck: true,
              }, () => {
              this.checkFee(feeslist,flightnumber);
              })
              });

              }  

              

              var index = actuallist.map(function (x) { return x.flightnumber; }).indexOf(flightnumber);
              actuallist[index].packageslist = packageslist;
              actuallist[index].trackinglist = trackinglist;
              actuallist[index].feeslist = feeslist;
              console.log('value '+that.state.cancheck);
              if(that.state.cancheck)
              {
                console.log('value '+feeslist.length);
              }
              actuallist[index+1].packageslist = packageslist;
              actuallist[index+1].trackinglist = trackinglist;
              actuallist[index+2].packageslist = packageslist;
              actuallist[index+2].trackinglist = trackinglist;
              actuallist[index+3].packageslist = packageslist;
              actuallist[index+3].trackinglist = trackinglist;
              actuallist[index+4].packageslist = packageslist;
              actuallist[index+4].trackinglist = trackinglist;
              actuallist[index+5].packageslist = packageslist;
              actuallist[index+5].trackinglist = trackinglist;
              actuallist[index+6].packageslist = packageslist;
              actuallist[index+6].trackinglist = trackinglist;
              //console.log(actuallist);
              });
            });
          that.setState({
              airlinelist: actuallist
            });
          }); 

  }

  checkFee(feeslist, flightnumber){

              var index = actuallist.map(function (x) { return x.flightnumber; }).indexOf(flightnumber);
              //actuallist[index].feeslist = feeslist;
              var length = feeslist.length;
              if( length > 0)
              {
                actuallist[index].fees = feeslist[length-1];
                actuallist[index+1].fees = feeslist[length-1];
              actuallist[index+2].fees = feeslist[length-1];
              actuallist[index+3].fees = feeslist[length-1];
              actuallist[index+4].fees = feeslist[length-1];
              actuallist[index+5].fees = feeslist[length-1];
              actuallist[index+6].fees = feeslist[length-1];
                this.setState({
                   added: true,
                   notmodifiedlist: actuallist,
                   airlinelist: actuallist
                });
              }
              
  }

  onShowSizeChange(current, pageSize) {
  //console.log(current, pageSize);
}

  componentWillUnmount() {
        //console.log('unmounted');
        actuallist = [];
        trackinglist = [];
        packageslist = [];
    }

    onChange(e){
      console.log(e);
      this.setState({
        textvalue: e.target.value
      });
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
  
  render() {
    const airlinelist = this.state.airlinelist;
    return (
      <>
        <div className="content" style={{ marginRight: '-25px', marginLeft: '25px' }}>
          <Row>
            <Col md="12">
            <Card style={{ backgroundColor: 'transparent', boxShadow: 'none !important' }}>
                <CardHeader style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <CardTitle tag="h4" style={{ fontSize: '1.5em', fontWeight: '800', textAlign: 'center' }}>List Of Completed Flights</CardTitle>
                  <p className="category" style={{ fontSize: '1em' }}></p>
                  <div>
                  <RangePicker onChange={this.onDateChange} style={{ marginRight: '20px' }} />
                  <Search
      placeholder="Search"
      onSearch={this.search}
      style={{ width: 200 }}
    />
    <IconButton aria-label="delete" style={{ color: 'white' }} onClick={this.onClear}>
      <DeleteIcon />
    </IconButton>
    </div>
                </CardHeader>
              </Card>
            </Col>
          </Row>
          {!this.state.added && <Spin size="large" />}
          {this.state.added && <List
  pagination={{
    position: "bottom",
     pageSize: 5
  }}
  size="large"
  dataSource={this.state.airlinelist}
  renderItem={fabric => (
        <div style={{ padding: '10px', margin: '10px', border: '2px solid white', borderRadius: '10px' }}>
          <Row>
            <Col md="4">
              <Row>
                <FlightIcon fontSize="large" style={{ color: 'white', fontSize: 23, marginRight: 5, fontWeight: '800', marginTop: 3, marginLeft: 10 }}/>
                <p style={{ fontSize: '1.1em', fontWeight: '800', color: 'white' }}>
                  <strong>{fabric.flightnumber}</strong>
                </p>
              </Row>
            </Col>
            <Col md="4">
              <Row style={{ textAlign: 'center' }}>
                <FlightTakeoffIcon fontSize="large" style={{ color: 'white', fontSize: 23, marginRight: 5, fontWeight: '800', marginTop: 3, marginLeft: 10 }}/>
                <p style={{ fontSize: '1.1em', fontWeight: '800', color: 'white', float: 'right' }}>
                <strong>{fabric.from}</strong>
              </p>
              </Row>
            </Col>
            <Col md="4">
              <Row style={{ textAlign: 'center' }}>
                <EventNoteIcon fontSize="large" style={{ color: 'white', fontSize: 23, marginRight: 5, fontWeight: '800', marginTop: 3, marginLeft: 10 }}/>
                <p style={{ fontSize: '1.1em', fontWeight: '800', color: 'white', float: 'right' }}>
                <strong>{fabric.travel_date}</strong>
              </p>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col md="4">
              <Row style={{ textAlign: 'center' }}>
                <BusinessCenterIcon fontSize="large" style={{ color: 'white', fontSize: 23, marginRight: 5, fontWeight: '800', marginTop: 3, marginLeft: 10 }}/>
                <p style={{ fontSize: '1.1em', fontWeight: '600', color: 'white' }}>
               
                Monetized {fabric.weight} kgs
              </p> 
              </Row>
            </Col>
            <Col md="4">
              <Row style={{ textAlign: 'center' }}>
                <FlightLandIcon fontSize="large" style={{ color: 'white', fontSize: 23, marginRight: 5, fontWeight: '800', marginTop: 3, marginLeft: 10 }}/>
                <p style={{ fontSize: '1.1em', fontWeight: '800', color: 'white', float: 'right' }}>
                <strong>{fabric.to}</strong>
              </p>
              </Row>
            </Col>
            <Col md="4">
              <Row style={{ textAlign: 'center' }}>
                <LocalAtmIcon fontSize="large" style={{ color: 'white', fontSize: 23, marginRight: 5, fontWeight: '800', marginTop: 3, marginLeft: 10 }}/>
                <p style={{ fontSize: '1.1em', fontWeight: '800', color: 'white', float: 'right' }}>
                <strong>₹ {fabric.fees}</strong>
              </p>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col md="4">
              <Row style={{ textAlign: 'center' }}>
                <FundViewOutlined style={{ color: 'white', fontSize: 23, marginRight: 5, fontWeight: '800', marginTop: 3, marginLeft: 10 }}/>
                <p onClick={this.toggle} style={{ fontSize: '1.1em', fontWeight: '600', color: 'white' }}>
               
                View Packages
              </p> 
              </Row>
            </Col>
            <Col md="4">
              <Row style={{ textAlign: 'center' }}>
                <CancelIcon style={{ color: 'red', fontSize: 23, marginRight: 5, fontWeight: '800', marginTop: 3, marginLeft: 10 }}/>
                <p onClick={this.toggleTracking} style={{ fontSize: '1.2em', fontWeight: '600', color: 'red', float: 'right' }}>
                Payment    Pending
              </p>
              </Row>
            </Col>
          </Row>  
        <Collapse isOpen={this.state.collapse}><br /><br />
        <p style={{ fontSize: '1.1em', fontWeight: '800', color: 'white', textAlign: 'center' }}>Approved Packages</p><br />
        <Modal isOpen={this.state.modal} toggle={this.toggleModal} backdrop="static" style={{ display: 'flex' }} >
        <ModalHeader toggle={this.toggleModal} style={{ textAlign: 'center' }} charCode="X"></ModalHeader>
        <ModalBody style={{ textAlign: 'center' }}>
          <Col md="12">
              <Card className="card-user">
                <CardBody>
                  <CardText />
                  <div className="author">
                    <div className="block block-one" />
                    <div className="block block-two" />
                    <div className="block block-three" />
                    <div className="block block-four" />
                    <a href="#pablo" onClick={e => e.preventDefault()}>
                      <img
                        alt="..."
                        className="avatar"
                        src="https://firebasestorage.googleapis.com/v0/b/beckfriends-2-a4131.appspot.com/o/image_placeholder.png?alt=media&token=31765493-0c6f-478c-bc75-0ced33491d3d"
                      />
                      <h5 className="title" style={{ fontSize: '1em', fontWeight: '600', color: 'white', textAlign: 'center' }}>XYZ Private Ventures</h5>
                    </a>
                    <p className="description" style={{ fontSize: '1em', fontWeight: '600', color: 'white', textAlign: 'center' }}>Apparels and Footwear</p>
                  </div>
                  <div className="card-description">
                    <p style={{ fontSize: '1em', fontWeight: '600', color: 'white', textAlign: 'center' }}>Address - <span style={{ color: 'white', fontWeight: '700'}} >701, Malhotra Chambers, Deonar</span></p>
                    <p style={{ fontSize: '1em', fontWeight: '600', color: 'white', textAlign: 'center' }}>KYC - <span style={{ color: 'white', fontWeight: '700'}} >Verified</span>&nbsp;<CheckCircleOutlineIcon style={{ color: 'green' }}/></p>
                    <p style={{ fontSize: '1em', fontWeight: '600', color: 'white', textAlign: 'center' }}>Trust Rating - <span style={{ color: 'green', fontWeight: '700' }} >100%</span></p>
                    <p style={{ fontSize: '1em', fontWeight: '600', color: 'white', textAlign: 'center' }}>Packages Sent - <span style={{ color: 'white', fontWeight: '700'}} >128</span></p><br />
                  </div>
                </CardBody>
              </Card>
            </Col>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={this.toggleModal}>Confirm</Button>{' '}
          <Button color="secondary" onClick={this.toggleModal}>Cancel</Button>
        </ModalFooter>
      </Modal>
      <Modal isOpen={this.state.modalapprove} toggle={this.toggleModalApprove} backdrop={"static"} style={{ display: 'flex' }} >
        <ModalHeader toggle={this.toggleModalApprove} style={{ textAlign: 'center' }}></ModalHeader>
        <ModalBody style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '1.5em', fontWeight: '800', color: 'black', textAlign: 'center' }}>Are you sure you wish to approve this package?</p><br />
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={this.approve}>Yes</Button>{' '}
          <Button color="secondary" onClick={this.toggleModalApprove}>No</Button>
        </ModalFooter>
      </Modal>
            <MaterialTable
                    options={{
      filtering: true,
      actionsColumnIndex: -1,
      exportButton: true,
      headerStyle: {
            fontWeight: '800',
            textAlign: 'center'
          },
      cellStyle: {
            fontWeight: '500',
            textAlign: 'center'
          }    
    }}
                  icons={tableIcons}
          columns={[
            { title: "OrderID", field: "orderid"},
            { title: "Contents", field: "content" },
            { title: "Value", field: "value" },
            { title: "Weight", field: "weight" },
            { title: "Fee", field: "fee" },
            { title: "Status", field: "status" },
          ]}
          data={fabric.packageslist}          
          title="Package Details"
          actions={[
        {
          icon: () => <AccountCircleIcon style={{ color: '#5e72e4' }}/>,
          tooltip: 'Check Shipper Profile',
          onClick: (event, rowData) => { 
            this.toggleModal();
          }
        },
        rowData => ({
          icon: () => <CheckCircleOutlineIcon style={{ color: 'green' }}/>,
          tooltip: 'Approve Package',
          onClick: (event, rowData) => { 
            this.setState({
            modalapprove: true,
            data: rowData
           });
          },
          disabled: rowData.approvalbtn === 'no'
        }),
        {
          icon: () => <CancelIcon style={{ color: 'red' }}/>,
          tooltip: 'Reject Package',
          onClick: (event, rowData) => { 
            }
        }
      ]}
        />
</Collapse>
        </div>
)}
    />
  }
        </div>
      </>
    );
  }
}

export default Completed;
