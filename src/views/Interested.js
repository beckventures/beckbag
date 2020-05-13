import React , { forwardRef } from "react";
import firebaseinit from '../credentials';
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
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import EmailIcon from '@material-ui/icons/Email';
import Search from '@material-ui/icons/Search';
import SmsIcon from '@material-ui/icons/Sms';
import ViewColumn from '@material-ui/icons/ViewColumn';
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col
} from "reactstrap";
import Button from '@material-ui/core/Button';
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
            var followupdate= new Date(followuptimestamp).toDateString();
            trip.followupdate = followupdate;
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

  render() {
    const merchantorderslist = this.state.merchantorderslist.reverse();
    return (
      <>
        <div className="content">
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4" style={{ fontSize: '1.5em', fontWeight: '800' }}>List Of Interested Travelers</CardTitle>
                  <p className="category" style={{ fontSize: '1em' }}>All travelers who have shown interest</p>
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
<Col md="4">            
<Skeleton variant="rect" height={40} style={{ borderRadius: '2px', background: '#f5f5f5' }}/>
</Col>
<Col md="4">            
<Skeleton variant="rect" height={40} style={{ borderRadius: '2px', background: '#f5f5f5' }}/>
</Col>
<Col md="4">            
<Skeleton variant="rect" height={40} style={{ borderRadius: '2px', background: '#f5f5f5' }}/>
</Col>
</Row>}
        </div>
      </>
    );
  }
}

export default Interested;
