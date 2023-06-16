import React, { Component } from 'react';
import {
    Link,
    withRouter
} from 'react-router-dom';
import './AppHeader.css';
import { Container, Nav, Navbar } from 'react-bootstrap';
    
class AppHeader extends Component {
    constructor(props) {
        super(props);   
        this.handleMenuClick = this.handleMenuClick.bind(this);   
    }

    handleMenuClick(event,key) {
      event.preventDefault();
      if(key === "logout") {
        this.props.onLogout();
      }
    }

    render() {
      console.log(this.props.isAuthenticated);
      console.log(this.props.currentUser)
        let menuItems;
        if(this.props.currentUser) {
          let role = this.props.currentUser.role;
          if(role == "ADMIN"){
            menuItems = [
              <Nav.Link key="/users"><Link to={`/users`}>Users</Link></Nav.Link>,
              <Nav.Link key="/logout" onClick={(event) => this.handleMenuClick(event,"logout")}>Logout</Nav.Link>
            ];
          } else{
            menuItems = [
              <Nav.Link key="/account"><Link to={`/account`}>Account</Link></Nav.Link>,
              <Nav.Link key="/balance"><Link to={`/balance`}>Account Balance</Link></Nav.Link>,
              <Nav.Link key="/transfer"><Link to={`/transfer`}>Transfer Money</Link></Nav.Link>,
              <Nav.Link key="/logout" onClick={(event) => this.handleMenuClick(event,"logout")}>Logout</Nav.Link>,
            ]; 
          }
         
        } else {
          menuItems = [
            <Nav.Link key="/login">
              <Link to="/login">SignIn</Link>
            </Nav.Link>,
            <Nav.Link key="/signup">
              <Link to="/signup">Register</Link>
            </Nav.Link>                  
          ];
        }

        return (
            <Navbar className="app-header">
            <Container>
              <Navbar.Brand >
                <Link to="/">Open Banking</Link>
              </Navbar.Brand>
              <Nav
                className="me-auto"
                mode="horizontal"
                selectedKeys={[this.props.location.pathname]}
                style={{ lineHeight: '50px' }} >
                {menuItems}
              </Nav>
            </Container>
          </Navbar>
        );
    }
}


export default withRouter(AppHeader);