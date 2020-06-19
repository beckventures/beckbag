import React , { forwardRef } from 'react';
import firebaseinit from '../credentials';
import { Steps, Divider, Select, List, Typography, Result } from 'antd';
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
import { ListGroupItem, Collapse, Row,
  Modal, ModalHeader, ModalBody, ModalFooter, Button, Card, CardBody, CardText, CardFooter,
  Col, Media } from 'reactstrap';
import FlightIcon from '@material-ui/icons/Flight';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import EventNoteIcon from '@material-ui/icons/EventNote';
import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff';
import FlightLandIcon from '@material-ui/icons/FlightLand';
import NotificationAlert from "react-notification-alert";
import { DeliveredProcedureOutlined, FundViewOutlined } from '@ant-design/icons';

const database = firebaseinit.database();
var packageslist = [];
var packageidlist = [];

const { Step } = Steps;
const { Option } = Select;

var ball = null;

var inputtext = 'NA';

var active = 0;
    var inputstage = 'NA';
    var inputstatus = 'NA';
    var stageonetext = 'Pending';
    var stagetwotext = 'Pending';
    var stagethreetext = 'Pending';
    var stagefourtext = 'Pending';
    var stagefivetext = 'Pending';

    var stageonedate = 'NA';
    var stagetwodate = 'NA';
    var stagethreedate = 'NA';
    var stagefourdate = 'NA';
    var stagefivedate = 'NA';

    var stageonewaiting = 'NA';
    var stageoneprogress = 'NA';
    var stageonecompleted = 'NA';
    var stagetwowaiting = 'NA';
    var stagetwoprogress = 'NA';
    var stagetwocompleted = 'NA';
    var stagethreewaiting = 'NA';
    var stagethreeprogress = 'NA';
    var stagethreecompleted = 'NA';
    var stagefourwaiting = 'NA';
    var stagefourprogress = 'NA';
    var stagefourcompleted = 'NA';
    var stagefivewaiting = 'NA';
    var stagefiveprogress = 'NA';
    var stagefivecompleted = 'NA';

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

class ListGroupCollapseOngoing extends React.Component {
  constructor(props) {
    super(props);
    this.findFee = this.findFee.bind(this);
    this.handleChange = this.handleChange.bind(this);  
    this.toggle = this.toggle.bind(this);
    this.toggleTracking = this.toggleTracking.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.updateStatus = this.updateStatus.bind(this);
    this.toggleModalApprove = this.toggleModalApprove.bind(this);
    ball = this.props.ball;
    this.state = {feecalc: 0, collapse: false, collapsetracking: false, modal: false, modalapprove: false, data: null, ball: ball, inputtext: '', hideTracking: false};
  }

  componentDidMount() { 

     this.findFee();
     stageonewaiting = this.state.ball.trackinglist[0].stageonewaiting;
     stageoneprogress = this.state.ball.trackinglist[0].stageoneprogress;
     stageonecompleted = this.state.ball.trackinglist[0].stageonecompleted;
     stagetwowaiting = this.state.ball.trackinglist[0].stagetwowaiting;
     stagetwoprogress = this.state.ball.trackinglist[0].stagetwoprogress;
     stagetwocompleted = this.state.ball.trackinglist[0].stagetwocompleted;
     stagethreewaiting = this.state.ball.trackinglist[0].stagethreewaiting;
     stagethreeprogress = this.state.ball.trackinglist[0].stagethreeprogress;
     stagethreecompleted = this.state.ball.trackinglist[0].stagethreecompleted;
     stagefourwaiting = this.state.ball.trackinglist[0].stagefourwaiting;
     stagefourprogress = this.state.ball.trackinglist[0].stagefourprogress;
     stagefourcompleted = this.state.ball.trackinglist[0].stagefourcompleted;
     stagefivewaiting = this.state.ball.trackinglist[0].stagefivewaiting;
     stagefiveprogress = this.state.ball.trackinglist[0].stagefiveprogress;
     stagefivecompleted = this.state.ball.trackinglist[0].stagefivecompleted;


    if(stagetwowaiting != 'NA')
    {
      active = 1;
    }
    if(stagethreewaiting != 'NA')
    {
      active = 2;
    }
    if(stagefourwaiting != 'NA')
    {
      active = 3;
    }
    if(stagefivewaiting != 'NA')
    {
      active = 4;
    }
    if(stagefivecompleted != 'NA')
    {
      active = 5;
      this.setState({
        hideTracking: true
      });
    }

    if(stageonewaiting != 'NA')
    {
      stageonetext = 'Waiting';
      stageonedate = new Date(stageonewaiting).toDateString() + ' ' + new Date(stageonewaiting).getHours() + ':' +new Date(stageonewaiting).getMinutes() + ':' + new Date(stageonewaiting).getSeconds();
    }
    if(stageoneprogress != 'NA')
    {
      stageonetext = 'In Progress';
      stageonedate = new Date(stageoneprogress).toDateString() + ' ' + new Date(stageoneprogress).getHours() + ':' +new Date(stageoneprogress).getMinutes() + ':' + new Date(stageoneprogress).getSeconds();
    }
    if(stageonecompleted != 'NA')
    {
      stageonetext = 'Completed';
      stageonedate = new Date(stageonecompleted).toDateString() + ' ' + new Date(stageonecompleted).getHours() + ':' +new Date(stageonecompleted).getMinutes() + ':' + new Date(stageonecompleted).getSeconds();
    }
    if(stagetwowaiting != 'NA')
    {
      stagetwotext = 'Waiting';
      stagetwodate = new Date(stagetwowaiting).toDateString() + ' ' + new Date(stagetwowaiting).getHours() + ':' +new Date(stagetwowaiting).getMinutes() + ':' + new Date(stagetwowaiting).getSeconds();
    }
    if(stagetwoprogress != 'NA')
    {
      stagetwotext = 'In Progress';
      stagetwodate = new Date(stagetwoprogress).toDateString() + ' ' + new Date(stagetwoprogress).getHours() + ':' +new Date(stagetwoprogress).getMinutes() + ':' + new Date(stagetwoprogress).getSeconds();
    }
    if(stagetwocompleted != 'NA')
    {
      stagetwotext = 'Completed';
      stagetwodate = new Date(stagetwocompleted).toDateString() + ' ' + new Date(stagetwocompleted).getHours() + ':' +new Date(stagetwocompleted).getMinutes() + ':' + new Date(stagetwocompleted).getSeconds();
    }
    if(stagethreewaiting != 'NA')
    {
      stagethreetext = 'Waiting';
      stagethreedate = new Date(stagethreewaiting).toDateString() + ' ' + new Date(stagethreewaiting).getHours() + ':' +new Date(stagethreewaiting).getMinutes() + ':' + new Date(stagethreewaiting).getSeconds();
    }
    if(stagethreeprogress != 'NA')
    {
      stagethreetext = 'In Progress';
      stagethreedate = new Date(stagethreeprogress).toDateString() + ' ' + new Date(stagethreeprogress).getHours() + ':' +new Date(stagethreeprogress).getMinutes() + ':' + new Date(stagethreeprogress).getSeconds();
    }
    if(stagethreecompleted != 'NA')
    {
      stagethreetext = 'Completed';
      stagethreedate = new Date(stagethreecompleted).toDateString() + ' ' + new Date(stagethreecompleted).getHours() + ':' +new Date(stagethreecompleted).getMinutes() + ':' + new Date(stagethreecompleted).getSeconds();
    }
    if(stagefourwaiting != 'NA')
    {
      stagefourtext = 'Waiting';
      stagefourdate = new Date(stagefourwaiting).toDateString() + ' ' + new Date(stagefourwaiting).getHours() + ':' +new Date(stagefourwaiting).getMinutes() + ':' + new Date(stagefourwaiting).getSeconds();
    }
    if(stagefourprogress != 'NA')
    {
      stagefourtext = 'In Progress';
      stagefourdate = new Date(stagefourprogress).toDateString() + ' ' + new Date(stagefourprogress).getHours() + ':' +new Date(stagefourprogress).getMinutes() + ':' + new Date(stagefourprogress).getSeconds();
    }
    if(stagefourcompleted != 'NA')
    {
      stagefourtext = 'Completed';
      stagefourdate = new Date(stagefourcompleted).toDateString() + ' ' + new Date(stagefourcompleted).getHours() + ':' +new Date(stagefourcompleted).getMinutes() + ':' + new Date(stagefourcompleted).getSeconds();
    }
    if(stagefivewaiting != 'NA')
    {
      stagefivetext = 'Waiting';
      stagefivedate = new Date(stagefivewaiting).toDateString() + ' ' + new Date(stagefivewaiting).getHours() + ':' +new Date(stagefivewaiting).getMinutes() + ':' + new Date(stagefivewaiting).getSeconds();
    }
    if(stagefiveprogress != 'NA')
    {
      stagefivetext = 'In Progress';
      stagefivedate = new Date(stagefiveprogress).toDateString() + ' ' + new Date(stagefiveprogress).getHours() + ':' +new Date(stagefiveprogress).getMinutes() + ':' + new Date(stagefiveprogress).getSeconds();
    }
    if(stagefivecompleted != 'NA')
    {
      stagefivetext = 'Completed';
      stagefivedate = new Date(stagefivecompleted).toDateString() + ' ' + new Date(stagefivecompleted).getHours() + ':' +new Date(stagefivecompleted).getMinutes() + ':' + new Date(stagefivecompleted).getSeconds();
    }

    if( active == 0)
    {
      inputstage = 'Received At Airport';
      if( stageonewaiting != 'NA')
      {
        inputstatus = 'Waiting';
      }
      if( stageoneprogress != 'NA')
      {
        inputstatus = 'In Progress';
      }
      if( stageonecompleted != 'NA')
      {
        inputstatus = 'Completed';
      }
    }
    if( active == 1)
    {
      inputstage = 'Ready for Loading';
      if( stagetwowaiting != 'NA')
      {
        inputstatus = 'Waiting';
      }
      if( stagetwoprogress != 'NA')
      {
        inputstatus = 'In Progress';
      }
      if( stagetwocompleted != 'NA')
      {
        inputstatus = 'Completed';
      }
    }
    if( active == 2)
    {
      inputstage = 'Loaded. Awaiting Departure';
      if( stagethreewaiting != 'NA')
      {
        inputstatus = 'Waiting';
      }
      if( stagethreeprogress != 'NA')
      {
        inputstatus = 'In Progress';
      }
      if( stagethreecompleted != 'NA')
      {
        inputstatus = 'Completed';
      }
    }
    if( active == 3)
    {
      inputstage = 'Unloaded. Awaiting Collection';
      if( stagefourwaiting != 'NA')
      {
        inputstatus = 'Waiting';
      }
      if( stagefourprogress != 'NA')
      {
        inputstatus = 'In Progress';
      }
      if( stagefourcompleted != 'NA')
      {
        inputstatus = 'Completed';
      }
    }
    if( active == 4)
    {
      inputstage = 'Collected by BECKFriends';
      if( stagefivewaiting != 'NA')
      {
        inputstatus = 'Waiting';
      }
      if( stagefiveprogress != 'NA')
      {
        inputstatus = 'In Progress';
      }
      if( stagefivecompleted != 'NA')
      {
        inputstatus = 'Completed';
      }
    }
    if( active == 5)
    {
      
    }

    inputtext = inputstage+' - '+inputstatus;
    this.setState({
      active: active,
      inputtext: inputtext,
      stageonetext: stageonetext,
      stageonedate: stageonedate,
      stagetwotext: stagetwotext,
      stagetwodate: stagetwodate,
      stagethreetext: stagethreetext,
      stagethreedate: stagethreedate,
      stagefourtext: stagefourtext,
      stagefourdate: stagefourdate,
      stagefivetext: stagefivetext,
      stagefivedate: stagefivedate
    });
    console.log('inputtext '+inputtext);
  }

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

  handleChange(value) {
  //console.log(`selected ${value}`);
  this.setState({
    updatedstatus: value
  });
  }

  
  findFee() {
    
    var timestamp = this.state.ball.timestamp;  
    

    var weight = this.state.ball.weight;
    var flightnumber = this.state.ball.flightnumber;


    var feecalc = 0;
    var numpackages = 0;
    database.ref('beckbag').child('ongoingflights/'+flightnumber+'/snapshot')
        .once('value')
        .then((snapshot) => {
          snapshot.child('packages').forEach((packagesnapshot) => {
      var packageid = packagesnapshot.val().package;
      var statuscode = packagesnapshot.val().statuscode;
      numpackages++;
              if(statuscode === 'pending')
              {
                
                database.ref('beckbag').child('merchantorders').child('added').child(packageid)
                .once('value')
                .then((snapshotpackage) => { 
                  console.log(snapshotpackage.val().basecharge);
                  console.log(feecalc);
                  feecalc =  parseInt(snapshotpackage.val().basecharge + feecalc);
                  this.setState({
                    feecalc: feecalc,
                    numpackages: numpackages
                  });
                });

              }

               if(statuscode === 'approved')
              {
              
                database.ref('beckbag').child('merchantorders').child('matched').child(packageid)
                .once('value')
                .then((snapshotpackage) => { 
                  console.log(feecalc);
                  feecalc =  parseInt(snapshotpackage.val().basecharge + feecalc);
                  this.setState({
                    feecalc: feecalc,
                    numpackages: numpackages
                  });  
                });

            }
      console.log(feecalc);      
    });
        });
      
  }


  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  toggleTracking() {
    this.setState({ collapsetracking: !this.state.collapsetracking });
  }

  toggleModal() {
    this.setState({ modal: !this.state.modal  });
  }

  updateStatus() {

    var flightnumber = this.state.ball.flightnumber;
    var status = this.state.updatedstatus;
    var active = this.state.active;
    
    var stageonetext = '';
    var stagetwotext = '';
    var stagethreetext = '';
    var stagefourtext = '';
    var stagefivetext = '';

    var stageonedate = '';
    var stagetwodate = '';
    var stagethreedate = '';
    var stagefourdate = '';
    var stagefivedate = '';

    console.log(status);

    if( status != 'Completed')
    {
      //////no change in stage required

      if( active == 0 )
      {
        inputstage = 'Received At Airport';
        inputstatus = status;
        inputtext = inputstage+' - '+inputstatus;
        stageonetext = status;
        stageonedate = new Date().toDateString() + ' ' + new Date().getHours() + ':' +new Date().getMinutes() + ':' + new Date().getSeconds();
        this.setState({
        stageonetext: stageonetext,
        stageonedate: stageonedate,
        inputtext: inputtext
        });
        database.ref('beckbag/ongoingflights/'+flightnumber+'/tracking/stageone/' + status).update({
                timestamp: new Date().getTime()
                });
      }
      if( active == 1 )
      {
        inputstage = 'Ready for Loading';
        inputstatus = status;
        inputtext = inputstage+' - '+inputstatus;
        stagetwotext = status;
        stagetwodate = new Date().toDateString() + ' ' + new Date().getHours() + ':' +new Date().getMinutes() + ':' + new Date().getSeconds();
        this.setState({
        stagetwotext: stagetwotext,
        stagetwodate: stagetwodate,
        inputtext: inputtext
      });
        database.ref('beckbag/ongoingflights/'+flightnumber+'/tracking/stagetwo/' + status).update({
                timestamp: new Date().getTime()
                });
      }
      if( active == 2 )
      {
        inputstage = 'Loaded. Awaiting Departure';
        inputstatus = status;
        inputtext = inputstage+' - '+inputstatus;
        stagethreetext = status;
        stagethreedate = new Date().toDateString() + ' ' + new Date().getHours() + ':' +new Date().getMinutes() + ':' + new Date().getSeconds();
        this.setState({
        stagethreetext: stagethreetext,
        stagethreedate: stagethreedate,
        inputtext: inputtext
      });
        database.ref('beckbag/ongoingflights/'+flightnumber+'/tracking/stagethree/' + status).update({
                timestamp: new Date().getTime()
                });
      }
      if( active == 3 )
      {
        inputstage = 'Unloaded. Awaiting Collection';
        inputstatus = status;
        inputtext = inputstage+' - '+inputstatus;
        stagefourtext = status;
        stagefourdate = new Date().toDateString() + ' ' + new Date().getHours() + ':' +new Date().getMinutes() + ':' + new Date().getSeconds();
        this.setState({
        stagefourtext: stagefourtext,
        stagefourdate: stagefourdate,
        inputtext: inputtext
      });
        database.ref('beckbag/ongoingflights/'+flightnumber+'/tracking/stagefour/' + status).update({
                timestamp: new Date().getTime()
                });
      }
      if( active == 4 )
      {
        inputstage = 'Collected by BECKFriends';
        inputstatus = status;
        inputtext = inputstage+' - '+inputstatus;
        stagefivetext = status;
        stagefivedate = new Date().toDateString() + ' ' + new Date().getHours() + ':' +new Date().getMinutes() + ':' + new Date().getSeconds();
        this.setState({
        stagefivetext: stagefivetext,
        stagefivedate: stagefivedate,
        inputtext: inputtext
      });
        database.ref('beckbag/ongoingflights/'+flightnumber+'/tracking/stagefive/' + status).update({
                timestamp: new Date().getTime()
                });
      }
      
    }
    else
    { 
      if( active == 0 )
      {
        stageonetext = status;
        stageonedate = new Date().toDateString() + ' ' + new Date().getHours() + ':' +new Date().getMinutes() + ':' + new Date().getSeconds();
        this.setState({
        stageonetext: 'Completed',
        stageonedate: stageonedate
        });
        database.ref('beckbag/ongoingflights/'+flightnumber+'/tracking/stageone/' + status).update({
                timestamp: new Date().getTime()
                });
      }
      if( active == 1 )
      {
        stagetwotext = status;
        stagetwodate = new Date().toDateString() + ' ' + new Date().getHours() + ':' +new Date().getMinutes() + ':' + new Date().getSeconds();
        this.setState({
        stagetwotext: 'Completed',
        stagetwodate: stagetwodate
      });
        database.ref('beckbag/ongoingflights/'+flightnumber+'/tracking/stagetwo/' + status).update({
                timestamp: new Date().getTime()
                });
      }
      if( active == 2 )
      {
        stagethreetext = status;
        stagethreedate = new Date().toDateString() + ' ' + new Date().getHours() + ':' +new Date().getMinutes() + ':' + new Date().getSeconds();
        this.setState({
        stagethreetext: 'Completed',
        stagethreedate: stagethreedate
      });
        database.ref('beckbag/ongoingflights/'+flightnumber+'/tracking/stagethree/' + status).update({
                timestamp: new Date().getTime()
                });
      }
      if( active == 3 )
      {
        stagefourtext = status;
        stagefourdate = new Date().toDateString() + ' ' + new Date().getHours() + ':' +new Date().getMinutes() + ':' + new Date().getSeconds();
        this.setState({
        stagefourtext: 'Completed',
        stagefourdate: stagefourdate
      });
        database.ref('beckbag/ongoingflights/'+flightnumber+'/tracking/stagefour/' + status).update({
                timestamp: new Date().getTime()
                });
      }
      if( active == 4 )
      {
        stagefivetext = status;
        stagefivedate = new Date().toDateString() + ' ' + new Date().getHours() + ':' +new Date().getMinutes() + ':' + new Date().getSeconds();
        this.setState({
        stagefivetext: 'Completed',
        stagefivedate: stagefivedate,
        hideTracking: true
      });
        database.ref('beckbag/ongoingflights/'+flightnumber+'/tracking/stagefive/' + status).update({
                timestamp: new Date().getTime()
                });

        ///shifting data to completed flights


        var flightnumber = this.state.ball.flightnumber;

        database.ref('beckbag').child('ongoingflights').child(flightnumber)
        .once('value')
        .then((snapshot) => {
          console.log(snapshot);
          var data = snapshot.val();
          database.ref('beckbag').child('completedflights').child(flightnumber)
                  .set({
                  data
                  });
        });

        /////add stats data to completedflights flightnumber

        var weight = this.state.ball.weight;
        var feecalc = this.state.feecalc;
        var numpackages = this.state.numpackages;
        var flighttimestamp = this.state.ball.timestamp;

        database.ref('beckbag').child('completedflights').child(flightnumber).child('data').child('stats')
                  .update({
                  weight: weight,
                  fee: feecalc,
                  package: numpackages,
                  timestamp: flighttimestamp
                  });

        
        

        ////delete data from ongoing flights          


      }
      var updatedactive = active+1;
      if( updatedactive == 1 )
      { 
        inputstage = 'Ready for Loading';
        inputstatus = 'Waiting';
        inputtext = inputstage+' - '+inputstatus;
        stagetwotext = 'Waiting';
        stagetwodate = new Date().toDateString() + ' ' + new Date().getHours() + ':' +new Date().getMinutes() + ':' + new Date().getSeconds();
        this.setState({
        stagetwotext: stagetwotext,
        stagetwodate: stagetwodate,
        inputtext: inputtext
        });
        database.ref('beckbag/ongoingflights/'+flightnumber+'/tracking/stagetwo/Waiting').update({
                timestamp: new Date().getTime()
                });
      }
      if( updatedactive == 2 )
      {
        inputstage = 'Loaded. Awaiting Departure';
        inputstatus = 'Waiting';
        inputtext = inputstage+' - '+inputstatus;
        stagethreetext = 'Waiting';
        stagethreedate = new Date().toDateString() + ' ' + new Date().getHours() + ':' +new Date().getMinutes() + ':' + new Date().getSeconds();
        this.setState({
        stagethreetext: stagethreetext,
        stagethreedate: stagethreedate,
        inputtext: inputtext
      });
        database.ref('beckbag/ongoingflights/'+flightnumber+'/tracking/stagethree/Waiting').update({
                timestamp: new Date().getTime()
                });
      }
      if( updatedactive == 3 )
      {
        inputstage = 'Unloaded. Awaiting Collection';
        inputstatus = 'Waiting';
        inputtext = inputstage+' - '+inputstatus;
        stagefourtext = 'Waiting';
        stagefourdate = new Date().toDateString() + ' ' + new Date().getHours() + ':' +new Date().getMinutes() + ':' + new Date().getSeconds();
        this.setState({
        stagefourtext: stagefourtext,
        stagefourdate: stagefourdate,
        inputtext: inputtext
      });
        database.ref('beckbag/ongoingflights/'+flightnumber+'/tracking/stagefour/Waiting').update({
                timestamp: new Date().getTime()
                });
      }
      if( updatedactive == 4 )
      {
        inputstage = 'Collected by BECKFriends';
        inputstatus = 'Waiting';
        inputtext = inputstage+' - '+inputstatus;
        stagefivetext = 'Waiting';
        stagefivedate = new Date().toDateString() + ' ' + new Date().getHours() + ':' +new Date().getMinutes() + ':' + new Date().getSeconds();
        this.setState({
        stagefivetext: stagefivetext,
        stagefivedate: stagefivedate,
        inputtext: inputtext
      });
        database.ref('beckbag/ongoingflights/'+flightnumber+'/tracking/stagefive/Waiting').update({
                timestamp: new Date().getTime()
                });
      }
       this.setState({
      active: updatedactive
    });
    }

   
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

  render() {
    var inputtextl = this.state.inputtext;
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
                <DeliveredProcedureOutlined style={{ color: 'white', fontSize: 23, marginRight: 5, fontWeight: '800', marginTop: 3, marginLeft: 10 }}/>
                <p onClick={this.toggleTracking} style={{ fontSize: '1.1em', fontWeight: '800', color: 'white', float: 'right' }}>
                Update Tracking
              </p>
              </Row>
            </Col>
          </Row>  
          
        <Collapse isOpen={this.state.collapsetracking}><br /><br />
        <p style={{ fontSize: '1.3em', fontWeight: '800', color: 'white', textAlign: 'center' }}>Tracking Details</p><br />
        <Card style={{ background: 'white' }}>
          <CardBody>
          {(this.state.hideTracking) && <Result
    status="success"
    title="Thank you for confirming!"
    subTitle="Awaiting confirmation from BECKFriends Agent"
  />}
         {(!this.state.hideTracking) &&  <Steps progressDot current={this.state.active}>
      <Step title={this.state.stageonetext} description="Received At Airport " />
      <Step title={this.state.stagetwotext} description="Ready for Loading" />
      <Step title={this.state.stagethreetext} description="Loaded. Awaiting Departure" />
      <Step title={this.state.stagefourtext} description="Unloaded. Awaiting Collection" />
      <Step title={this.state.stagefivetext} description="Collected by BECKFriends" />
    </Steps>}
    {(!this.state.hideTracking) && <div style={{  background: 'white', textAlign: 'center', color: 'black', fontWeight: '700', fontSize: '1.3em' }}>
    <div>
    <Select defaultValue={inputtextl} name="statusselect"
        key={`statusselect:${inputtextl}`} style={{ width: 'fit-content', marginTop: '20px' }} onChange={this.handleChange}>
      <Option value="In Progress">In Progress</Option>
      <Option value="Completed">Completed</Option>
      <Option value="error">Report Issue</Option>
    </Select>
    <Button color="primary" onClick={this.toggleModal} style={{ marginLeft: '15px' }} onClick={this.updateStatus}>Confirm</Button>
    <Divider plain style={{ color: 'red', fontSize: '18px', marginTop: '25px' }}>
      Previous Updates
    </Divider>
    <List
      dataSource={this.state.ball.trackinglist}
      renderItem={item => (
        <List.Item style={{ display: 'block' }}>
          {(this.state.active >= 4) && <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <Typography.Text mark>Collection Done</Typography.Text>
          <Typography.Text mark>{this.state.stagefivetext}</Typography.Text>
          <Typography.Text mark>{this.state.stagefivedate}</Typography.Text>
          </div>}
          {(this.state.active >= 4) && <Divider plain style={{ color: 'red', fontSize: '18px' }} />}
          {(this.state.active >= 3) && <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <Typography.Text mark>Awaiting Collection</Typography.Text>
          <Typography.Text mark>{this.state.stagefourtext}</Typography.Text>
          <Typography.Text mark>{this.state.stagefourdate}</Typography.Text>
          </div>}
          {(this.state.active >= 3) && <Divider plain style={{ color: 'red', fontSize: '18px' }} />}
          {(this.state.active >= 2) && <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <Typography.Text mark>Awaiting Departure</Typography.Text>
          <Typography.Text mark>{this.state.stagethreetext}</Typography.Text>
          <Typography.Text mark>{this.state.stagethreedate}</Typography.Text>
          </div>}
          {(this.state.active >= 2) && <Divider plain style={{ color: 'red', fontSize: '18px' }} />}
          {(this.state.active >= 1) && <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <Typography.Text mark>Ready for Loading</Typography.Text>
          <Typography.Text mark>{this.state.stagetwotext}</Typography.Text>
          <Typography.Text mark>{this.state.stagetwodate}</Typography.Text>
          </div>}
          {(this.state.active >= 1) && <Divider plain style={{ color: 'red', fontSize: '18px' }} />}
          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <Typography.Text mark>Received At Airport</Typography.Text>
          <Typography.Text mark>{this.state.stageonetext}</Typography.Text>
          <Typography.Text mark>{this.state.stageonedate}</Typography.Text>
          </div>
        </List.Item>
      )}
    />
    </div>
    </div>
  }
          </CardBody>
        </Card>
        </Collapse>
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
          data={this.state.ball.packageslist}          
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
      </ListGroupItem>
    );
  }
}

export default ListGroupCollapseOngoing