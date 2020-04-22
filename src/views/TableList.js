import React from "react";
import firebaseinit from '../credentials';
import IconButton from '@material-ui/core/IconButton';
import Skeleton from '@material-ui/lab/Skeleton';
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
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

class Tables extends React.Component {

  constructor(props) {
    super(props);
    this.state = {merchantorderslist : [], added: false};
  }

  componentDidMount() { 
  const that = this;
  
  
    database.ref('admin').child('travelers')
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

  render() {
    const merchantorderslist = this.state.merchantorderslist;
    return (
      <>
        <div className="content">
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">List Of Confirmed Travelers</CardTitle>
                  <p className="category">All travelers across various routes</p>
                </CardHeader>
                <CardBody>
                  {this.state.added && <Table className="tablesorter" responsive>
                    <thead className="text-primary">
                      <tr style={{ textAlign: 'center' }}>
                        <th>PNR</th>
                        <th>Flight No</th>
                        <th>From</th>
                        <th>To</th>
                        <th>Number</th>
                        <th>Weight</th>
                        <th>Discount</th>
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
                            <td>{merchantorder.weight}</td>
                            <td>{merchantorder.discount}</td>
                            <td><a href="#">{merchantorder.classoption}</a></td>
                            <td><IconButton>
   <AccessAlarmIcon style={{ color: 'green' }}/>
</IconButton></td>
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

export default Tables;
