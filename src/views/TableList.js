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

  const columns = [
    {
      Header: 'PNR',
      accessor: 'uid'
    }, {
      Header: 'Number',
      accessor: 'number'
    }, {
      Header: 'From',
      accessor: 'from'
    }, {
      Header: 'To',
      accessor: 'to'
    }
  ];

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
                  
                  {this.state.added && <MaterialTable
                    options={{
      filtering: true,
      actionsColumnIndex: -1
    }}
                  icons={tableIcons}
          columns={[
            { title: "PNR", field: "uid" },
            { title: "From", field: "from" },
            { title: "To", field: "to" },
            { title: "Number", field: "number" },
            { title: "Weight", field: "weight" },
            { title: "Discount", field: "discount" },
            { title: "Class", field: "classoption" }
          ]}
          data={merchantorderslist}
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

export default Tables;
