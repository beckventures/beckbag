import React , { forwardRef } from "react";
import firebaseinit from '../credentials';
import { Spin } from 'antd';
import IconButton from '@material-ui/core/IconButton';
import ListGroupCollapseOngoing from './ListGroupCollapseOngoing';
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
import Skeleton from '@material-ui/lab/Skeleton';
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
var feeslist = [];
var packageslist = [];
var trackinglist = [];
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

class Ongoing extends React.Component {

  constructor(props) {
    super(props);
    this.state = {airlinelist : [], added: false, totalweight: 0, cancheck: false, };
  }

  componentDidMount() { 
  const that = this;
    
  
   database.ref('beckbag').child('ongoingflights')
        .once('value')
        .then((snapshot) => {
          var timestamp = 0;
          var feecalc = 0;
          var weightcalc = 0;
          var flightnumber = '';
          var travel_date = '';
          var from = '';
          var to = '';  
          packageslist = [];
          snapshot.forEach((chSnapshot) => {
              var flightnumber = '';
              chSnapshot.child('snapshot').child('trips').forEach((childSnapshot) => {
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

                console.log(trackinglist);

              chSnapshot.child('tracking').forEach((trackingsnapshot) => {


              });
              
              chSnapshot.child('snapshot').child('packages').forEach((packagesnapshot) => {
              
              var packageid = packagesnapshot.val().package;
              var statuscode = packagesnapshot.val().statuscode;
              if(statuscode === 'pending')
              {
                
                database.ref('beckbag').child('merchantorders').child('added').child(packageid)
              .once('value')
              .then((snapshotpackage) => { 
              var content = snapshotpackage.val().content;
              var value = '$ '+snapshotpackage.val().value;
              var weight = snapshotpackage.val().weight+' kgs';
              var orderid = snapshotpackage.val().orderid;
              var fee = '₹ '+snapshotpackage.val().basecharge;
              feecalc = parseInt(snapshotpackage.val().basecharge + feecalc);
              var recommended = snapshotpackage.val().recommended;
              packageslist.push(
              {
              content: content,
              value: value,
              weight: weight,
              orderid: orderid,
              fee: fee,
              status: 'Pending Approval',
              recommended: recommended,
              approvalbtn: 'yes',
              rejectbtn: 'yes'
              });
              });
              } 

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
              });
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
                this.setState({
                   added: true,
                   airlinelist: actuallist
                });
              }
              
  }

  componentWillUnmount() {
        console.log('unmounted');
        actuallist = [];
        trackinglist = [];
        packageslist = [];
    }
  
  render() {
    //const airlinelist = this.state.airlinelist;
    return (
      <>
        <div className="content" style={{ padding: '50px', paddingLeft: '86px', paddingTop: '70px' }}>
          <Row>
            <Col md="12">
            <Card style={{ backgroundColor: 'transparent', boxShadow: 'none !important' }}>
                <CardHeader>
                  <CardTitle tag="h4" style={{ fontSize: '1.5em', fontWeight: '800', textAlign: 'center' }}>List Of Ongoing Flights</CardTitle>
                  <p className="category" style={{ fontSize: '1em' }}></p>
                </CardHeader>

              <CardBody style={{ textAlign: 'center' }}>
              {!this.state.added && <Spin size="large" />}
              {this.state.added && <Container className="py-4">
              {this.state.airlinelist.map((airline) =>
              <ListGroupCollapseOngoing key={airline} cat={airline} ball={airline} />
              )}
              </Container> }
              </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default Ongoing;
