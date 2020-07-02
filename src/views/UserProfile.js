/*!

=========================================================
* Black Dashboard React v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import {Helmet} from "react-helmet";
import { Switch } from 'antd';
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardText,
  FormGroup,
  Form,
  Input,
  Row,
  Col
} from "reactstrap";

class UserProfile extends React.Component {

  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange(checked) {
  console.log(`switch to ${checked}`);
  }

  render() {
    return (
      <>
        <div className="content" style={{ padding: '25px', paddingLeft: '50px', paddingTop: '60px' }}>
        <Helmet title="User Profile | BeckBags"
          meta={[
            { name: 'description', content: 'Travel Meets Logistics' },
            { property: 'og:description', content: 'Travel Meets Logistics' },
            { property: 'og:title', content: 'User Profile | BeckBags' },
            { property: 'og:image', content: 'https://firebasestorage.googleapis.com/v0/b/beckfriends-2-a4131.appspot.com/o/beckicn.jpg?alt=media&token=f0384655-505a-4fdf-af5c-b01f5bb7198a' },
            { property: 'og:type', content: 'website' },
            { property: 'og:site_name', content: 'BeckBags' },
            { name: 'theme-color', content: '#ffffff' },
            { name: 'apple-mobile-web-app-status-bar-style', content: '#ffffff' },
            { name: 'msapplication-navbutton-color', content: '#ffffff' },
          ]} />
          <Row>
            <Col md="4">
              <Card className="card-user">
                <CardBody>
                  <CardText />
                  <div className="author">
                    <a href="#pablo" onClick={e => e.preventDefault()}>
                      <img
                        alt="..."
                        className="avatar"
                        src='https://firebasestorage.googleapis.com/v0/b/beckfriends-2-a4131.appspot.com/o/image_placeholder.png?alt=media&token=31765493-0c6f-478c-bc75-0ced33491d3d'
                      />
                      <h5 className="title">Indigo Employee</h5>
                    </a>
                    <p className="description">Admin</p>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col md="8">
              <Card>
                <CardHeader>
                  <h5 className="title">Edit Settings</h5>
                </CardHeader>
                <CardBody>
                  <Form>
                    <Row>
                      <Col className="pr-md-1" md="5">
                        <FormGroup>
                          <label>Company</label>
                          <Input
                            defaultValue="Indigo"
                            disabled
                            placeholder="Company"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col className="px-md-1" md="3">
                        <FormGroup>
                          <label>Name</label>
                          <Input
                            defaultValue="Indigo Employee"
                            placeholder="Username"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-md-1" md="4">
                        <FormGroup>
                          <label htmlFor="mayukh@beckme.com">
                            Email address
                          </label>
                          <Input placeholder="mayukh@beckme.com" type="email" />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="4">
                        <FormGroup>
                          <label>Current Role</label>
                          <Input
                            defaultValue="Admin Privileges"
                            placeholder="Home Address"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="4">
                        <FormGroup>
                          <label style={{ marginRight: '25px' }}>Enable Push Notifications</label>
                          <Switch defaultChecked onChange={this.onChange} />
                        </FormGroup>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default UserProfile;
