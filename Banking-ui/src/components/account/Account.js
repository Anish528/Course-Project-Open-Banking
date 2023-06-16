import React, { Component } from 'react';
import { generateAccountNumber,getCurrentUser,generateBill, getUserDetails } from '../util/APIUtils';
import { Link, withRouter } from 'react-router-dom';
import { Form, Button, Table, Col, Row} from 'react-bootstrap';
import './Billing.css'

class Account extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {}
        };
        this.loaduserDetails = this.loaduserDetails.bind(this);
    }

    loaduserDetails(user) {
        console.log(user)
        let promise;
        promise = getUserDetails(user.id)
        if(!promise) {
            return;
        }
        this.setState({
            isLoading: true
        });
        promise            
        .then(response => {
            console.log(response);
            this.setState({
                user: response,
                isLoading: false
            })
        }).catch(error => {
            if(error.status==401){
                this.props.handleLogout();
              }
        });  
        
    }

    componentDidMount() {
        this.loadCurrentUser();
    }

    componentDidUpdate(nextProps) {
        if(this.props.isAuthenticated !== nextProps.isAuthenticated) {
            // Reset State
            this.setState({
                users: [],
                isLoading: false
            });    
        }
    }

    loadCurrentUser() {
        getCurrentUser()
        .then(response => {
          this.setState({
            currentUser: response
          });
          this.loaduserDetails(response);
        }).catch(error => {
          this.setState({
            isLoading: false
          });  
        });
      }

    generateAccountNumber(event,id) {
        let userRequest ={
            "userId":id
        }
        event.preventDefault();
        generateAccountNumber(userRequest)
        .then(response => {
            if(response) {
                alert("AccountNumber generated. Sucessfully. ");
                this.loadCurrentUser();
            } else {
                alert("Failed to generate Account number. Please try again.");
            }
        }).catch(error => {
            alert("Failed to generate Account number. Please try again.");
        });
    }

    render() {
        return (
            <div className="users-container">
                <h3>Account Details</h3>           
                <div className="new-guest-content">
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label column sm="3">Name : </Form.Label>
                        <Form.Label column sm="6">{this.state.user.name}</Form.Label>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label column sm="3">Email address : </Form.Label>
                        <Form.Label column sm="6">{this.state.user.emailId}</Form.Label>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label column sm="3">Contact Number : </Form.Label>
                        <Form.Label column sm="6">{this.state.user.mobileNumber}</Form.Label>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label column sm="3">Account Number : </Form.Label>
                        <Form.Label column sm="6"> {this.state.user.accountNumber != null?(
                                    <span>{this.state.user.accountNumber}</span>
                                ):<td> <Button type="primary" 
                                htmlType="submit" 
                                size="large" onClick={(event) => this.generateAccountNumber(event,this.state.user.id)}
                                className="create-guest-form-button">Generate Account Number</Button> </td>

                                }</Form.Label>
                    </Form.Group>
                </Form>

                </div>
            </div>
        );
    }
}

export default withRouter(Account);