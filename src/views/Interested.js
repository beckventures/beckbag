import React from "react";
import firebaseinit from '../credentials';
import IconButton from '@material-ui/core/IconButton';
import Skeleton from '@material-ui/lab/Skeleton';
import SmsIcon from '@material-ui/icons/Sms';
import MailIcon from '@material-ui/icons/Mail';
import DeleteIcon from '@material-ui/icons/Delete';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import FilterIcon from '@material-ui/icons/Filter';
import {
  useTable,
  useGroupBy,
  useFilters,
  useSortBy,
  useExpanded,
  usePagination
} from 'react-table'
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col
} from "reactstrap";
import { Calendar, DateRangePicker } from 'react-date-range';
import Button from '@material-ui/core/Button';
import 'react-date-range/dist/styles.css'; 
import 'react-date-range/dist/theme/default.css'; 

const database = firebaseinit.database();

const merchantorders = [];

class Interested extends React.Component {

  constructor(props) {
    super(props);
    this.state = {merchantorderslist : [], added: false, showCalendar: false};
  }

  componentDidMount() { 
  const that = this;
  
  
    database.ref('admin').child('travelers')
        .orderByChild('timestamp')
        .once('value')
        .then((snapshot) => {
          
          snapshot.forEach((childSnapshot) => {
            that.setState({ added : true });
            merchantorders.push(childSnapshot.val());
            this.setState({
            merchantorderslist: merchantorders
            });
          });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevState.added && this.state.added) {
    
    }
  }

  handleSelect(ranges){
    console.log(ranges);
  }
  showCalendarState = () => {
    this.setState({ showCalendar: !this.state.showCalendar });
  }

  render() {
    const merchantorderslist = this.state.merchantorderslist;
    const selectionRange = {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    };
    return (
      <>
        <div className="content">
          <Row>
            <Col md="12">
              <Card>
                <CardHeader className="row" style={{ padding: '25px 25px 5px' }}>
                  <Col md="9">
                    <CardTitle tag="h4" style={{ fontSize: '1.5em', fontWeight: '800' }}>List Of Interested Travelers</CardTitle>
                    <p className="category" style={{ fontSize: '1em' }}>All travelers who have shown interest</p>
                  </Col>
                  <Col md="3">
                    <IconButton style={{ float: 'right' }} onClick={this.showCalendarState}>
                      <FilterIcon style={{ color: 'white' }}/>
                    </IconButton>
                  </Col>
                </CardHeader>
                <CardBody>
                  {this.state.showCalendar && <DateRangePicker
                      className={'forfloat'}
                      style={{ float: 'right' }}
                      ranges={[selectionRange]}
                      onChange={this.handleSelect}
                    />}
                  {this.state.added && <Table striped size="sm" className="tablesorter" responsive>
                    <thead className="text-primary">
                      <tr style={{ textAlign: 'center' }}>
                        <th>PNR</th>
                        <th>Flight No</th>
                        <th>From</th>
                        <th>To</th>
                        <th>Number</th>
                        <th>Class</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody style={{ textAlign: 'center' }}>
                      {merchantorderslist.length ? 
                        merchantorderslist.map(merchantorder => (
                          <tr key={merchantorder.uid}>
                            <td>{merchantorder.uid}</td>
                            <td>BA 96</td>
                            <td>{merchantorder.from}</td>
                            <td>{merchantorder.to}</td>
                            <td>{merchantorder.number}</td>
                            <td>{merchantorder.classoption}</td>
                            <td><IconButton>
   <SmsIcon style={{ color: 'green' }}/>
</IconButton>
<IconButton>
   <MailIcon style={{ color: 'green' }}/>
</IconButton>
<IconButton>
   <WhatsAppIcon style={{ color: 'green' }}/>
</IconButton>
<IconButton>
   <DeleteIcon style={{ color: '#ffcccb' }}/>
</IconButton>
</td>
                          </tr>
                        ))
                        : 
                        (<tr>
                          <td>-</td>
                          <td>-</td>
                          <td>-</td>
                          <td>-</td>
                        </tr>)
                      }
                      
                    </tbody>
                  </Table>}
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
