import React , { forwardRef } from "react";
import firebaseinit from '../credentials';
import { Table, Input, Button, Space, Tag} from 'antd';
import {Helmet} from "react-helmet";
import { Spin } from 'antd';
import Highlighter from 'react-highlight-words';
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
import { SearchOutlined } from '@ant-design/icons';
import {
  CheckCircleOutlined,
  SyncOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  ClockCircleOutlined,
  MinusCircleOutlined,
} from '@ant-design/icons';
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
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

var trackinglist = [ 'Received At Airport', 'Ready for Loading', 'Loaded. Awaiting Departure', 'Unloaded. Awaiting Collection', 'Collected by BECKFriends' ]

const topOptions = [
  { label: 'topLeft', value: 'topLeft' },
  { label: 'topCenter', value: 'topCenter' },
  { label: 'topRight', value: 'topRight' },
  { label: 'none', value: 'none' },
];

const bottomOptions = [
  { label: 'bottomLeft', value: 'bottomLeft' },
  { label: 'bottomCenter', value: 'bottomCenter' },
  { label: 'bottomRight', value: 'bottomRight' },
  { label: 'none', value: 'none' },
];

class OngoingPackages extends React.Component {

  constructor(props) {
    super(props);
    this.state = {merchantorderslist : [], added: false, searchText: '',
    searchedColumn: ''};
  }

    getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: text =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ) : (
        text
      ),
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };

  componentDidMount() { 
  const that = this;
  var countinside = 0;
  
    database.ref('beckbag').child('merchantorders').child('matched')
        .orderByChild('timestamp')
        .once('value')
        .then((snapshot) => {
          var count = snapshot.numChildren();
          snapshot.forEach((chSnapshot) => {
            countinside++;
            var packaged = chSnapshot.val();
            var index = Math.floor(Math.random() * 5);
            packaged.tracking = trackinglist[index];
            packaged.key = packaged.orderid;
            packaged.value = '₹  ' + packaged.value;
            packaged.fee = '₹  ' + packaged.basecharge + '  /kg';
            merchantorders.push(packaged);
            if( countinside === count )
            {
              console.log('yay '+count+' '+countinside);
              that.setState({
            added: true,
            merchantorderslist: merchantorders
            });
            }
            
    });
  });        
}

  componentDidUpdate(prevProps, prevState) {
    if (!prevState.added && this.state.added) {
    
    }
  }

  render() {
    const columns = [
  {
    title: 'OrderID',
    dataIndex: 'orderid',
    key: 'orderid',
        ...this.getColumnSearchProps('orderid'),
  },
  {
    title: 'Flight',
    dataIndex: 'matched',
    key: 'matched',
        ...this.getColumnSearchProps('matched'),
        render: text => <Tag color="volcano" key={text}>
              {text}
            </Tag>,

  },
  {
    title: 'Status',
    dataIndex: 'tracking',
    key: 'tracking',
        ...this.getColumnSearchProps('status'),
        render: text => <Tag icon={<CheckCircleOutlined />} color="success">
        {text}
      </Tag>,

  },
  {
    title: 'Pickup',
    dataIndex: 'pickup',
    key: 'pickup',
    ...this.getColumnSearchProps('pickup'),
  },
  {
    title: 'Delivery',
    dataIndex: 'delivery',
    key: 'delivery',
    ...this.getColumnSearchProps('delivery'),
  },
  {
    title: 'Weight',
    dataIndex: 'weight',
    key: 'weight',
    ...this.getColumnSearchProps('weight'),
  },
  {
    title: 'Content',
    dataIndex: 'content',
    key: 'content',
    ...this.getColumnSearchProps('content'),
    render: text => <Tag color="gold" key={text}>
              {text}
            </Tag>,
  },
  {
    title: 'Value',
    dataIndex: 'value',
    key: 'value',
    ...this.getColumnSearchProps('value'),

  },
  {
    title: 'Fee',
    dataIndex: 'fee',
    key: 'fee',
    ...this.getColumnSearchProps('fee'),
    render: text => <Tag color="green" key={text}>
              {text}
            </Tag>,
  }
  
  
];
    const merchantorderslist = this.state.merchantorderslist.reverse();
    console.log(merchantorderslist);
    return (
      <>
        <div className="content" style={{ padding: '25px', paddingLeft: '50px', paddingTop: '40px', textAlign: 'center' }}>
        <Helmet title="Ongoing Packages | BeckBags"
          meta={[
            { name: 'description', content: 'Travel Meets Logistics' },
            { property: 'og:description', content: 'Travel Meets Logistics' },
            { property: 'og:title', content: 'Ongoing Packages | BeckBags' },
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
                  <CardTitle tag="h4" style={{ fontSize: '1.5em', fontWeight: '800', marginBottom: '25px' }}>List Of Ongoing Packages</CardTitle>
                </CardHeader>
                <CardBody>
                  
             
        <Table columns={columns} pagination={{ pageSize: 5 }} bordered dataSource={this.state.merchantorderslist} />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default OngoingPackages;
