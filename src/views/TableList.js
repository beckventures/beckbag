import React , { forwardRef } from "react";
import firebaseinit from '../credentials';
import {Helmet} from "react-helmet";
import { Spin } from 'antd';
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
import './Tabs.css';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
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

class TableList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {merchantorderslist : [], added: false};
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

  componentDidUpdate(prevProps, prevState) {
    if (!prevState.added && this.state.added) {
    
    }
  }

  render() {
    const merchantorderslist = this.state.merchantorderslist.reverse();
    return (
      <>
        <div className="content" style={{ padding: '25px', paddingLeft: '50px', paddingTop: '40px', textAlign: 'center' }}>
        <Helmet title="Pending | BeckBags"
          meta={[
            { name: 'description', content: 'Travel Meets Logistics' },
            { property: 'og:description', content: 'Travel Meets Logistics' },
            { property: 'og:title', content: 'Pending | BeckBags' },
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
                  <CardTitle tag="h4" style={{ fontSize: '1.5em', fontWeight: '800' }}>List Of Confirmed Travelers</CardTitle>
                  <p className="category" style={{ fontSize: '1em' }}>All travelers across various routes</p>
                </CardHeader>
                <CardBody>
                  
                  {this.state.added && <MaterialTable
                    options={{
      filtering: true,
      actionsColumnIndex: -1,
      exportButton: true,
      rowStyle: {
            backgroundColor: '#1e1e2f',
            color: 'white',
            fontWeight: '600'
          },
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
            { title: "PNR", field: "pnr" },
            { title: "Airline", field: "flightnumber" },
            { title: "From", field: "from" },
            { title: "To", field: "to" },
            { title: "Weight", field: "weight" },
            { title: "Travel Date", field: "traveldate", sorting: false }
          ]}
          data={merchantorderslist}
          detailPanel={[
        {
          tooltip: 'Show Details',
          render: rowData => {
            return (
              <div
                style={{
                  fontSize: '1.2em',
                  fontWeight: '800',
                  textAlign: 'center',
                  color: 'white',
                  padding: '1em',
                  backgroundColor: '#27293d',
                }}
              >
              <Row>
                <Col md="3">
                Booking Date<br/>
                <br/>{rowData.booking_date}<br/>
                </Col>
                <Col md="3">
                Discount<br/>
                <br/>{rowData.discount}<br/>
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
          
          title="Confirmed Travelers"
        />}
                </CardBody>
              </Card>
            </Col>
          </Row>
          {!this.state.added && <Spin size="large" />}
        </div>
      </>
    );
  }
}

export default TableList;
