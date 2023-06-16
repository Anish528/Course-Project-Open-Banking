import React, { Component } from 'react';
import { getWalletDetails,getCurrentUser,sendMoney, makepayment, addMoney, getTransactionDetails, testUser } from '../util/APIUtils';
import { Link, withRouter } from 'react-router-dom';
import { Form, Button, Table, Col, Row} from 'react-bootstrap';
import './Billing.css'

class AddMoney extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: {
                value: ''
            },
            walletBalance: {
                value: ''
            },
            amount: {
                value:""
            },
            transactions:[]

        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getWalletDetails = this.getWalletDetails.bind(this);
        this.loadtransactionsList = this.loadtransactionsList.bind(this);
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

    handleSubmit(event) {
        event.preventDefault();
        const paymentRequest = {
            userId: this.state.userId.value,
            amount: this.state.amount.value,
        };
        addMoney(paymentRequest)
        .then(response => {
            if( null != response  && null!=response.id) {
                alert("Money added Sucessfully. ");
                this.setState({
                    walletBalance:{
                        value:response.walletBalance
                    } 
                  });
                  this.setState({
                    amount: {
                        value:0
                    }
                  });
                  this.loadtransactionsList(this.state.userId.value)
            } else {
                alert("Failed to make payment. Please try again.");
                this.setState({
                    amount: {
                        value:0
                    }
                  });
            }
        }).catch(error => {
            alert("Failed to make payment. Please try again.");
            this.setState({
                amount: {
                    value:0
                }
              });
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
      this.getWalletDetails(response.id);
      this.loadtransactionsList(response.id);
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

  loadtransactionsList(id) {
    let promise;
    promise = getTransactionDetails(id)
    if(!promise) {
        return;
    }
    this.setState({
        isLoading: true
    });
    promise            
    .then(response => {
        console.log(response);
        const transactions = this.state.transactions.slice();
        this.setState({
            transactions: response,
            isLoading: false
        })
    }).catch(error => {
        if(error.status==401){
            this.props.handleLogout();
          }
    });  
    
}

  validateCardNumber = (text) => {
    if(text.length === 0) {
        return {
            isValid: 'error',
            errorMsg: 'Please enter Name'
        }
    } else {
        return {
            isValid: 'success',
            errorMsg: null
        }
    }
}

  componentDidMount() {
    this.loadCurrentUser();
  }


    render() {

        return (
            <div className="transfer-container">
                <h3>Add Money</h3>
                <div className="create-guest-content">
                    <Form onSubmit={this.handleSubmit} className="create-guest-form">
                        <Form.Group  as={Row} className="mb-3" controlId="signup-form.transferAmount">
                            <Form.Label column sm="2">Account Balance :</Form.Label>
                            <Col sm="6">
                            <Form.Label column sm="6">{this.state.walletBalance.value}</Form.Label>
                            </Col>
                        </Form.Group>
                        <Form.Group  as={Row} className="mb-3" controlId="signup-form.amount">
                            <Form.Label column sm="2">Amount : </Form.Label>
                            <Col sm="6">
                                <Form.Control type="text" name="amount" isValid={this.state.amount.isValid}
                            autoComplete="off" value={this.state.amount.value} 
                            onChange={(event) => this.handleInputChange(event, this.validateCardNumber)}/>
                                </Col>
                        </Form.Group>
                        <Form.Group className="guest-form-row">
                            <Button type="primary" 
                                htmlType="submit" 
                                size="large" 
                                className="create-guest-form-button">Add Money</Button>
                        </Form.Group>
                    </Form>
                   
                </div> 
                <h3>Transaction List</h3>           
                <div className="new-guest-content">
                    {this.state.transactions.length > 0 ? ( 
                    <Table >
                        <thead><tr>
                                <td>Transaction Amount</td>
                                <td>Transaction Type</td>
                                <td>Transfer AccountName</td>
                                <td>Transfer AccountNumber </td>
                                <td>Balance WalletAmount </td>
                                <td>Transaction Date </td>
                            </tr></thead>
                        <tbody>
                        {this.state.transactions.map(item => (
                            <tr>
                                <td>{item.transferAmount}</td>
                                <td>{item.transferType}</td>
                                <td>{item.transferAccountName}</td>
                                <td>{item.transferAccountNumber}</td>
                                <td>{item.balanceWalletAmount}</td>
                                <td>{item.paymentDate}</td>
                                
                            </tr>
                          ))}
                        </tbody> 
                    </Table>  
                    ): null
                }
                {this.state.transactions.length === 0 ? (
                        <div className="no-guest-found">
                            <span>No Transactions found.</span>
                        </div>    
                    ): null
                }
                </div>
            </div>
        );
    }
}

export default withRouter(AddMoney);