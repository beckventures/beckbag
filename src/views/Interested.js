import React , { forwardRef } from "react";
import firebaseinit from '../credentials';
import {Helmet} from "react-helmet";
import Papa from "papaparse";
import ReactFileReader from 'react-file-reader';
import IconButton from '@material-ui/core/IconButton';
import Skeleton from '@material-ui/lab/Skeleton';
import MaterialTable from "material-table";
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import './Tabs.css';
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
import { Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col
} from "reactstrap";
const database = firebaseinit.database();

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

class Interested extends React.Component {

  constructor(props) {
    super(props);
    this.state = {merchantorderslist : [], added: false};
  }

  componentDidMount() { 
  const that = this;
    
  
    database.ref('beckbag').child('carrier').child('indigo').child('interested')
        .orderByChild('timestamp')
        .limitToLast(20)
        .once('value')
        .then((snapshot) => {
          
          snapshot.forEach((chSnapshot) => {
            database.ref('beckbag').child('carriertrips').child('interested').child(chSnapshot.key).once('value').then(function(childSnapshot) {
              that.setState({ added : true });
            
            var trip = childSnapshot.val();
            var bookingtimestamp = childSnapshot.val().bookingtimestamp;
            var traveltimestamp = childSnapshot.val().traveldatetimestamp;
            trip.booking_date = new Date(bookingtimestamp).toDateString();
            trip.traveldate = new Date(traveltimestamp).toDateString();
            var followuptimestamp = childSnapshot.val().followuptimestamp;
            if( followuptimestamp === 'NA' )
            {
              var followupdate= 'NA';
            }
            else
            {
              var followupdate= new Date(followuptimestamp).toDateString();
            }
            trip.followupdate = followupdate;
            console.log(trip);
            merchantorders.push(trip);
            that.setState({
            merchantorderslist: merchantorders
            });
            });
            
          });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevState.added && this.state.added) {
    
    }
  }

  handleFiles = files => {
    var that = this;
    var reader = new FileReader();
    reader.onload = function(e) {
        // Use reader.result
        //alert(reader.result);
        Papa.parse(e.target.result, {
      header: true,
      complete: function(results) {
        var data = results.data;
        var travel = 'Travel Timestamp';
        //console.log(data[1].PNR);
        for (var i=1;i<data.length;i++)
        {
          var pnr = data[i]['PNR'];
          var traveltimestamp = parseInt(data[i]['Travel'], 10);
          var d = new Date(traveltimestamp);
          var monthtravel = d.getMonth()+1;
          if (monthtravel === 1) monthtravel = 'January';
          if (monthtravel === 2) monthtravel = 'February';
          if (monthtravel === 3) monthtravel = 'March';
          if (monthtravel === 4) monthtravel = 'April';
          if (monthtravel === 5) monthtravel = 'May';
          if (monthtravel === 6) monthtravel = 'June'; 
          if (monthtravel === 7) monthtravel = 'July';
          if (monthtravel === 8) monthtravel = 'August';
          if (monthtravel === 9) monthtravel = 'September';
          if (monthtravel === 10) monthtravel = 'October';
          if (monthtravel === 11) monthtravel = 'November';
          if (monthtravel === 12) monthtravel = 'December';
          var traveldate = d.getDate() + ' ' + monthtravel + ' ' + d.getFullYear();
          //console.log(traveldatetimestamp);
          var bookingtimestamp = data[i]['Booking'];
          var bd = new Date(bookingtimestamp);
          var monthbooking = bd.getMonth()+1;
          if (monthbooking === 1) monthbooking = 'January';
          if (monthbooking === 2) monthbooking = 'February';
          if (monthbooking === 3) monthbooking = 'March';
          if (monthbooking === 4) monthbooking = 'April';
          if (monthbooking === 5) monthbooking = 'May';
          if (monthbooking === 6) monthbooking = 'June'; 
          if (monthbooking === 7) monthbooking = 'July';
          if (monthbooking === 8) monthbooking = 'August';
          if (monthbooking === 9) monthbooking = 'September';
          if (monthbooking === 10) monthbooking = 'October';
          if (monthbooking === 11) monthbooking = 'November';
          if (monthbooking === 12) monthbooking = 'December';
          var bookingdate = d.getDate() + ' ' + monthtravel + ' ' + d.getFullYear();
          var from = data[i]['From'];
          var to = data[i]['To'];
          var number = data[i]['Number'];
          var classoption = data[i]['Class'];
          var flightnumber = data[i]['Flight'];
          var tripid = pnr;
          var followups = 0;
          var followuptimestamp = 'NA';
          var followupdate = 'NA';
          var sourceid = 'indigo';
          database.ref('beckbag/carriertrips/interested/' + tripid).set({
          flightnumber: flightnumber,
          from: from,
          to: to,
          number: number,
          traveldate: traveldate,
          traveldatetimestamp: traveltimestamp,
          class: classoption,
          tripid: tripid,
          pnr: pnr,
          sourceid: sourceid,
          followups: 0,
          followuptimestamp: followuptimestamp,
          bookingtimestamp: bookingtimestamp
          });
          var trip = {};
          trip.booking_date = bookingdate;
          trip.bookingtimestamp = bookingtimestamp;
          trip.class = classoption;
          trip.flightnumber = flightnumber;
          trip.followupdate = followupdate;
          trip.followups = followups;
          trip.followuptimestamp = followuptimestamp
          trip.from = from;
          trip.to = to;
          trip.number = number;
          trip.pnr = pnr;
          trip.sourceid = sourceid;
          trip.traveldate = traveldate;
          trip.traveldatetimestamp = traveltimestamp;
          trip.tripid = tripid;
          database.ref('beckbag/carrier/' + sourceid + '/interested/' + tripid).set({
          tripid: tripid,
          timestamp: new Date().getTime()
          });
          database.ref('beckbag/carrier/' + sourceid + '/notification/' + tripid).set({
          tripid: tripid,
          status: 'Interested Traveler',
          timestamp: new Date().getTime()
          });
          merchantorders.push(trip);
            that.setState({
            merchantorderslist: merchantorders
            });
        }
      }
    });
    }
    reader.readAsText(files[0]);
  }

  render() {
    const merchantorderslist = this.state.merchantorderslist.reverse();
    return (
      <>
        <div className="content" style={{ padding: '50px', paddingLeft: '86px', paddingTop: '50px' }}>
          <Helmet title="Interested | BeckBags"
          meta={[
            { name: 'description', content: 'Travel Meets Logistics' },
            { property: 'og:description', content: 'Travel Meets Logistics' },
            { property: 'og:title', content: 'Interested | BeckBags' },
            { property: 'og:image', content: 'https://firebasestorage.googleapis.com/v0/b/beckfriends-2-a4131.appspot.com/o/beckicn.jpg?alt=media&token=f0384655-505a-4fdf-af5c-b01f5bb7198a' },
            { property: 'og:type', content: 'website' },
            { property: 'og:site_name', content: 'BeckBags' },
            { name: 'theme-color', content: '#ffffff' },
            { name: 'apple-mobile-web-app-status-bar-style', content: '#ffffff' },
            { name: 'msapplication-navbutton-color', content: '#ffffff' },
          ]} />
          <Row>
            <Col md="12">
              <Card style={{ background: 'transparent' }}>
                <CardHeader>
                  <CardTitle tag="h4" style={{ fontSize: '1.5em', fontWeight: '800', textAlign: 'center' }}>List Of Interested Travelers</CardTitle>
                  <p className="category" style={{ fontSize: '1em', textAlign: 'center' }}>All travelers who have shown interest</p>
                  
    <ReactFileReader handleFiles={this.handleFiles} fileTypes={'.csv'}>
    <Button style={{ position: 'absolute', top: '25px', right: '25px' }}>
      <UploadOutlined /> Upload CSV
    </Button>
    </ReactFileReader>
                </CardHeader>
                <CardBody>
                  
                  {this.state.added && <MaterialTable
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
            { title: "Airline", field: "flightnumber" },
            { title: "PNR", field: "pnr" },
            { title: "Travel Date", field: "traveldate", sorting: false },
            { title: "Booking Date", field: "booking_date", sorting: false },
            { title: "Sent", field: "followups" },
            { title: "Last Sent", field: "followupdate" },
          ]}
          data={merchantorderslist}
          detailPanel={[
        {
          tooltip: 'Show Name',
          render: rowData => {
            return (
              <div
                style={{
                  fontSize: '1.2em',
                  fontWeight: '800',
                  textAlign: 'center',
                  color: 'white',
                  padding: '1em',
                  backgroundColor: '#1e1e2f',
                }}
              >
              <Row>
                <Col md="3">
                From<br/>
                <br/>{rowData.from}<br/>
                </Col>
                <Col md="3">
                To<br/>
                <br/>{rowData.to}<br/>
                </Col>
                <Col md="3">
                Number of Passengers<br/>
                <br/>{rowData.number}<br/>
                </Col>
                <Col md="3">
                Class<br/>
                <br/>{rowData.class}<br/>
                </Col>
               </Row> 
              </div>
            )
          },
        },
      ]}
      actions={[
        {
          icon: () => <WhatsAppIcon />,
          tooltip: 'Send WhatsApp',
          onClick: (event, rowData) => { 
            var merchantorderslist = this.state.merchantorderslist;
            ///send whatsapp message with link
            var tripid = rowData.tripid;
            var followups = rowData.followups + 1;
            rowData.followups = followups;
            var followuptimestamp = new Date().getTime();
            for(var i=0;i<merchantorderslist.length;i++)
            {
              if(merchantorderslist[i].tripid === tripid)
              {
                merchantorderslist[i].followups = followups;
                merchantorderslist[i].followuptimestamp = new Date().getTime();
                this.setState({ merchantorderslist: merchantorderslist });
                database.ref('beckbag/carriertrips/interested/' + tripid).update({
                followups: followups,
                followuptimestamp: new Date().getTime()
                });
                return;
              }
            }
            
          }
        },
        {
          icon: () => <EmailIcon />,
          tooltip: 'Send Email',
          onClick: (event, rowData) => { 
            var merchantorderslist = this.state.merchantorderslist;
            ///send email with link
            var tripid = rowData.tripid;
            var followups = rowData.followups + 1;
            rowData.followups = followups;
            var followuptimestamp = new Date().getTime();
            for(var i=0;i<merchantorderslist.length;i++)
            {
              if(merchantorderslist[i].tripid === tripid)
              {
                merchantorderslist[i].followups = followups;
                merchantorderslist[i].followuptimestamp = new Date().getTime();
                this.setState({ merchantorderslist: merchantorderslist });
                database.ref('beckbag/carriertrips/interested/' + tripid).update({
                  followups: followups,
                  followuptimestamp: new Date().getTime()
                });                
                return;
              }
            }

          }
        },
        {
          icon: () => <SmsIcon />,
          tooltip: 'Send SMS',
          onClick: (event, rowData) => { 
            var merchantorderslist = this.state.merchantorderslist;
            ///send sms with link
            var tripid = rowData.tripid;
            var followups = rowData.followups + 1;
            rowData.followups = followups;
            var followuptimestamp = new Date().getTime();
            for(var i=0;i<merchantorderslist.length;i++)
            {
              if(merchantorderslist[i].tripid === tripid)
              {
                merchantorderslist[i].followups = followups;
                merchantorderslist[i].followuptimestamp = new Date().getTime();
                this.setState({ merchantorderslist: merchantorderslist });
                database.ref('beckbag/carriertrips/interested/' + tripid).update({
                  followups: followups,
                  followuptimestamp: new Date().getTime()
                });                
                return;
              }
            }

          }
        }
      ]}
          
          title="Confirmed Travelers"
        />}
                </CardBody>
              </Card>
            </Col>
          </Row>
          {!this.state.added && <Row style={{ paddingLeft: '15px', paddingRight: '15px' }}>
<Col md="12">            
<Skeleton variant="rect" height={25} style={{ borderRadius: '2px', background: '#f5f5f5', marginLeft: '100px', marginRight: '100px', marginBottom: '12px' }}/>
<Skeleton variant="rect" height={25} style={{ borderRadius: '2px', background: '#f5f5f5', marginLeft: '100px', marginRight: '100px', marginBottom: '12px' }}/>
<Skeleton variant="rect" height={25} style={{ borderRadius: '2px', background: '#f5f5f5', marginLeft: '100px', marginRight: '100px', marginBottom: '12px' }}/>
</Col>

</Row>}
        </div>
      </>
    );
  }
}

export default Interested;
