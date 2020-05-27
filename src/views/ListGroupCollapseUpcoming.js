import React , { forwardRef } from 'react';
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

class ListGroupCollapseUpcoming extends React.Component {
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
    this.state = {collapse: false, modal: false, modalapprove: false, data: null, ball: ball};
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
    
    return (
      <ListGroupItem style={{ background: 'red' }}>
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
                <p onClick={this.toggle} style={{ fontSize: '1.1em', fontWeight: '800', color: 'white' }}>
                  <strong>{this.state.ball.flightnumber}</strong>
                </p>
              </Row>
            </Col>
            <Col md="4">
              <Row style={{ textAlign: 'center' }}>
                <FlightTakeoffIcon fontSize="large" style={{ color: 'white', fontSize: 23, marginRight: 5, fontWeight: '800', marginTop: 3, marginLeft: 10 }}/>
                <p onClick={this.toggle} style={{ fontSize: '1.1em', fontWeight: '800', color: 'white', float: 'right' }}>
                <strong>{this.state.ball.from}</strong>
              </p>
              </Row>
            </Col>
            <Col md="4">
              <Row style={{ textAlign: 'center' }}>
                <EventNoteIcon fontSize="large" style={{ color: 'white', fontSize: 23, marginRight: 5, fontWeight: '800', marginTop: 3, marginLeft: 10 }}/>
                <p onClick={this.toggle} style={{ fontSize: '1.1em', fontWeight: '800', color: 'white', float: 'right' }}>
                <strong>{this.state.ball.travel_date}</strong>
              </p>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col md="4">
              <Row style={{ textAlign: 'center' }}>
                <BusinessCenterIcon fontSize="large" style={{ color: 'white', fontSize: 23, marginRight: 5, fontWeight: '800', marginTop: 3, marginLeft: 10 }}/>
                <p onClick={this.toggle} style={{ fontSize: '1.1em', fontWeight: '600', color: 'white' }}>
               
                Available {this.state.ball.weight} kgs
              </p> 
              </Row>
            </Col>
            <Col md="4">
              <Row style={{ textAlign: 'center' }}>
                <FlightLandIcon fontSize="large" style={{ color: 'white', fontSize: 23, marginRight: 5, fontWeight: '800', marginTop: 3, marginLeft: 10 }}/>
                <p onClick={this.toggle} style={{ fontSize: '1.1em', fontWeight: '800', color: 'white', float: 'right' }}>
                <strong>{this.state.ball.to}</strong>
              </p>
              </Row>
            </Col>
          </Row>  
          
           
        <Collapse isOpen={this.state.collapse}><br /><br />
        <p style={{ fontSize: '1.1em', fontWeight: '800', color: 'white', textAlign: 'center' }}>Recommended Packages</p><br />
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

export default ListGroupCollapseUpcoming