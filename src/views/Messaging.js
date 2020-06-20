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
import * as SendBird from "sendbird";
import Chat from './Chat/Index';
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

 var sb = new SendBird({appId: '4C12F38A-9FB0-4F34-BB1D-773FB83699C8'});

class Messaging extends React.Component {

  constructor(props) {
    super(props);
  }



  componentWillUnmount() {
        
    }


  render() {
    return (
      <>
        <div className="content" style={{ padding: '90px', paddingRight: '15px' }}>
       <Chat
              appId='4C12F38A-9FB0-4F34-BB1D-773FB83699C8'
              userId="beckfriendsindigo"
              nickname="indigo"
              theme="dark"
            />
        </div>  
      </>
    );
  }
}

export default Messaging;
