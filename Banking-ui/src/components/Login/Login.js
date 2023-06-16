import React, { Component } from 'react';
import { login } from '../util/APIUtils';
import './Login.css';
import { Link } from 'react-router-dom';
import { ACCESS_TOKEN } from '../constants';

import { Form, Button, Row, Col} from 'react-bootstrap';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            emailId: {
                value: ''
            },
            password: {
                value: ''
            },
            error:''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
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
        
        
        const loginRequest = {
            emailId: this.state.emailId.value,
            password: this.state.password.value
        };
        login(loginRequest)
        .then(response => {
            localStorage.setItem(ACCESS_TOKEN, response.accessToken);
            this.props.onLogin();
        }).catch(error => {
            if(error.status === 401) {
                this.setState({error:"Invalid credentials, Please try again"})
            } else {
                this.setState({error:"Failed to Login, Please try again"})
            }
        });
       
    }

    
    validateUsername = (emailId) => {
        if(emailId.length == 0) {
            return {
                isValid: 'error',
                errorMsg: 'Please enter Username'
            }
        }  else {
            return {
                isValid: null,
                errorMsg: null
            }
        }
    }

    
    validatePassword = (password) => {
        if(password.length == 0) {
            return {
                isValid: 'error',
                errorMsg: 'Please enter password.'
            }
        } else {
            return {
                isValid: 'success',
                errorMsg: null,
            };            
        }
    }

    
    render() {
        return (
            <div className="login-container">
                <h1 className="page-title">Log in</h1>
                <div className="login-content">
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <Form.Group  as={Row}  className="mb-3" controlId="signup-form.emailId">
                            <Form.Label column sm="3">Username</Form.Label>
                            <Col sm="9">

                            <Form.Control type="text" name="emailId" isValid={this.state.emailId.isValid}
                            autoComplete="off" value={this.state.emailId.value} onBlur={this.validateUsernameAvailability}
                            onChange={(event) => this.handleInputChange(event, this.validateUsername)} />
                            </Col>
                        </Form.Group>

                        <Form.Group  as={Row}  className="mb-3" controlId="signup-form.password">
                            <Form.Label column sm="3">Password</Form.Label>
                            <Col sm="9">

                            <Form.Control type="password" name="password" isValid={this.state.password.isValid}
                            autoComplete="off" value={this.state.password.value}
                            onChange={(event) => this.handleInputChange(event, this.validatePassword)} />
                            </Col>
                        </Form.Group>
                        <Form.Group  as={Row}  className="mb-3" controlId="signup-form.password">
                            <Form.Label column sm="9" className='error-msg'>{this.state.error}</Form.Label>
                        </Form.Group>
                <Form.Group as={Row} >
                    <Button type="primary" htmlType="submit" size="lg" className="login-form-button  btn btn-primary btn-large m-auto">Login</Button>
                    Or &nbsp;<Link to="/signup" className='link'> Register now!</Link>
                </Form.Group>
            </Form>
                </div>
            </div>
        );
    }
}

export default Login;