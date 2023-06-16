import React, { Component } from 'react';
import { getWalletDetails,getCurrentUser,sendMoney, makepayment } from '../util/APIUtils';
import { Link, withRouter } from 'react-router-dom';
import { Form, Button, Table, Col, Row} from 'react-bootstrap';
import './Billing.css'

class Payment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: {
                value: ''
            },walletBalance: {
                value: ''
            },
            transferAmount: {
                value:""
            },
            transferAccountNumber: {
                value: ''
            },
            transferAccountName: {
                value:""
            },transferAccountIfsc:{
                value:""

            },transferAccountbank:{
                value:""

            }

        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleCardNumberChange = this.handleCardNumberChange.bind(this);
        this.handleCardHolderNameChange = this.handleCardHolderNameChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getWalletDetails = this.getWalletDetails.bind(this);
    }

    handleInputChange(event, validationFun) {
        const target = event.target;
        const inputName = target.name;        
        const inputValue = target.value;

        this.setState({
            [inputName] : {
                value: inputValue,
                ...validationFun(inputValue)
            }
        });
    }

    validateCardNumber = (text) => {
        if(text.length === 0) {
            return {
                isValid: 'error',
                errorMsg: 'Please enter Card number'
            }
        } else {
            return {
                isValid: 'success',
                errorMsg: null
            }
        }
    }

    
    validateCardHolderName = (text) => {
        if(text.length === 0) {
            return {
                isValid: 'error',
                errorMsg: 'Please enter Name!'
            }
        } else {
            return {
                isValid: 'success',
                errorMsg: null
            }
        }
    }

    handleCardNumberChange(event) {
        const value = event.target.value;
        this.setState({
            taxes: {
                value: value,
                ...this.validateCardNumber(value)
            }
        });
    }

    handleCardHolderNameChange(event) {
        const value = event.target.value;
        this.setState({
            services: {
                value: value,
                ...this.validateServices(value)
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        const paymentRequest = {
            userId: this.state.userId.value,
            transferAmount: this.state.transferAmount.value,
            transferAccountNumber: this.state.transferAccountNumber.value,
            transferAccountName: this.state.transferAccountName.value,
            transferAccountIfsc: this.state.transferAccountIfsc.value,
            transferAccountbank: this.state.transferAccountbank.value,
        };
        sendMoney(paymentRequest)
        .then(response => {
            if( null != response  && null!=response.id) {
                alert("Payment made Sucessfully. ");
                this.props.history.push("/balance");
            } else {
                alert("Failed to make payment. Please try again.");
                this.props.history.push("/balance");
            }
        }).catch(error => {
            alert("Failed to make payment. Please try again.");
            this.props.history.push("/balance");
        });
    }

    isFormInvalid() {
            return true;
    }

    
loadCurrentUser() {
    getCurrentUser()
    .then(response => {
      this.setState({
        currentUser: response
      });
      this.getWalletDetails(response.id)
    }).catch(error => {
      this.setState({
        isLoading: false
      });  
    });
  }
  
  getWalletDetails(id){
    getWalletDetails(id)
    .then(response => {
        this.setState({
            userId: {
                value: response.userId
            }
        });
        this.setState({
            walletBalance: {
                value: response.walletBalance
            }
        });
        
      }).catch(error => {
        this.setState({
          isLoading: false
        });  
      });
  }

  componentDidMount() {
    this.loadCurrentUser();
  }


    render() {

        return (
            <div className="transfer-container">
                <h3>Send Money</h3>
                <div className="create-guest-content">
                    <Form onSubmit={this.handleSubmit} className="create-guest-form">
                        <Form.Group  as={Row} className="mb-3" controlId="signup-form.transferAmount">
                            <Form.Label column sm="2">Account Balance :</Form.Label>
                            <Col sm="6">
                            <Form.Label column sm="6">{this.state.walletBalance.value}</Form.Label>
                            </Col>
                        </Form.Group>
                        <Form.Group  as={Row} className="mb-3" controlId="signup-form.transferAmount">
                            <Form.Label column sm="3">Amount : </Form.Label>
                            <Col sm="6">
                                <Form.Control type="text" name="transferAmount" isValid={this.state.transferAmount.isValid}
                            autoComplete="off" value={this.state.transferAmount.value} 
                            onChange={(event) => this.handleInputChange(event, this.validateCardNumber)}/>
                                </Col>
                        </Form.Group>

                        <Form.Group  as={Row} className="mb-3" controlId="signup-form.transferAccountNumber">
                            <Form.Label column sm="3">Account Number : </Form.Label>
                            <Col sm="6">
                                <Form.Control type="text" name="transferAccountNumber" isValid={this.state.transferAccountNumber.isValid}
                            autoComplete="off" value={this.state.transferAccountNumber.value}
                            onChange={(event) => this.handleInputChange(event, this.validateCardNumber)} />
                                </Col>
                        </Form.Group>

                        <Form.Group  as={Row} className="mb-3" controlId="signup-form.transferAccountName">
                            <Form.Label column sm="3">Account Holder Name : </Form.Label>
                            <Col sm="6">
                                <Form.Control type="text" name="transferAccountName" isValid={this.state.transferAccountName.isValid}
                            autoComplete="off" value={this.state.transferAccountName.value} 
                            onChange={(event) => this.handleInputChange(event, this.validateCardHolderName)} />
                                </Col>
                        </Form.Group>

                        <Form.Group  as={Row} className="mb-3" controlId="signup-form.transferAccountIfsc">
                            <Form.Label column sm="3">Account IFSC Code : </Form.Label>
                            <Col sm="6">
                                <Form.Control type="text" name="transferAccountIfsc" isValid={this.state.transferAccountIfsc.isValid}
                            autoComplete="off" value={this.state.transferAccountIfsc.value} 
                            onChange={(event) => this.handleInputChange(event, this.validateCardHolderName)} />
                                </Col>
                        </Form.Group>
                        <Form.Group  as={Row} className="mb-3" controlId="signup-form.transferAccountbank">
                            <Form.Label column sm="3">Account Bank Name : </Form.Label>
                            <Col sm="6">
                                <Form.Control type="text" name="transferAccountbank" isValid={this.state.transferAccountbank.isValid}
                            autoComplete="off" value={this.state.transferAccountbank.value} 
                            onChange={(event) => this.handleInputChange(event, this.validateCardHolderName)} />
                                </Col>
                        </Form.Group>

                        <Form.Group className="guest-form-row">
                            <Button type="primary" 
                                htmlType="submit" 
                                size="large" 
                                className="create-guest-form-button">Send Money</Button>
                        </Form.Group>
                    </Form>
                   
                </div> 
                  
            </div>
        );
    }
}

export default withRouter(Payment);