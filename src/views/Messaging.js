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
import {Helmet} from "react-helmet";
import Chat from './Chat';
import './App.css';
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
        <Helmet title="Messaging | BeckBags"
          meta={[
            { name: 'description', content: 'Travel Meets Logistics' },
            { property: 'og:description', content: 'Travel Meets Logistics' },
            { property: 'og:title', content: 'Messaging | BeckBags' },
            { property: 'og:image', content: 'https://firebasestorage.googleapis.com/v0/b/beckfriends-2-a4131.appspot.com/o/beckicn.jpg?alt=media&token=f0384655-505a-4fdf-af5c-b01f5bb7198a' },
            { property: 'og:type', content: 'website' },
            { property: 'og:site_name', content: 'BeckBags' },
            { name: 'theme-color', content: '#ffffff' },
            { name: 'apple-mobile-web-app-status-bar-style', content: '#ffffff' },
            { name: 'msapplication-navbutton-color', content: '#ffffff' },
          ]} />
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
