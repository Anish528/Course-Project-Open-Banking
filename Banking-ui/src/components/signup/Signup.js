import React, { Component } from 'react';
import { signup, checkUsernameAvailability } from '../util/APIUtils';
import './Signup.css';
import { Link } from 'react-router-dom';
import { 
    NAME_MIN_LENGTH, NAME_MAX_LENGTH, 
    USERNAME_MIN_LENGTH, USERNAME_MAX_LENGTH,
    PASSWORD_MIN_LENGTH, PASSWORD_MAX_LENGTH, EMAIL_MAX_LENGTH
} from '../constants';

import { Form, Button} from 'react-bootstrap';
const FormItem = Form.Item;

class Signup extends Component {    
    constructor(props) {
        super(props);
        this.state = {
            name: {
                value: ''
            },
            emailId: {
                value: ''
            },
            password: {
                value: ''
            },
            role: {
                value: 'USER'
            },
            contactNumber:{
                value:''
            },
            address:{
                value:''
            }
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validateUsernameAvailability = this.validateUsernameAvailability.bind(this);
        this.isFormInvalid = this.isFormInvalid.bind(this);
        this.handleGenderChange = this.handleGenderChange.bind(this);
    }

    handleInputChange(event, validationFun) {
        const target = event.target;
        const inputName = target.name;        
        const inputValue = target.value;
        console.log(inputValue)
        this.setState({
            [inputName] : {
                value: inputValue,
                ...validationFun(inputValue)
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();
    
        const signupRequest = {
            name: this.state.name.value,
            emailId: this.state.emailId.value,
            password: this.state.password.value,
            mobileNumber: this.state.contactNumber.value,
            address:this.state.address.value,
            role: this.state.role.value
        };
        signup(signupRequest)
        .then(response => {
                   
            this.props.history.push("/login");
        }).catch(error => {
           
        });
    }

    isFormInvalid() {
        return !(this.state.name.isValid === 'success' &&
            this.state.emailId.isValid === 'success' &&
            this.state.password.isValid === 'success' &&
            this.state.contactNumber.isValid === 'success' &&
            this.state.address.isValid === 'success'
        );
    }

    render() {
        return (
            <div className="signup-container">
                <h1 className="page-title">Register</h1>
                <div className="signup-content">
                    <Form onSubmit={this.handleSubmit} className="signup-form">
                        
                        <Form.Group className="mb-3" controlId="signup-form.name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" name="name" isValid={this.state.name.isValid}
                            autoComplete="off" value={this.state.name.value} 
                            onChange={(event) => this.handleInputChange(event, this.validateName)} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="signup-form.emailId">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" name="emailId" isValid={this.state.emailId.isValid}
                            autoComplete="off" value={this.state.emailId.value} onBlur={this.validateUsernameAvailability}
                            onChange={(event) => this.handleInputChange(event, this.validateUsername)} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="signup-form.password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" name="password" isValid={this.state.password.isValid}
                            autoComplete="off" value={this.state.password.value}
                            onChange={(event) => this.handleInputChange(event, this.validatePassword)} />
                        </Form.Group>

                        
                        <Form.Group className="mb-3" controlId="signup-form.contactNumber">
                            <Form.Label>Mobile Number</Form.Label>
                            <Form.Control type="text" name="contactNumber" isValid={this.state.contactNumber.isValid}
                            autoComplete="off" value={this.state.contactNumber.value}
                            onChange={(event) => this.handleInputChange(event, this.validateContactNumber)} />
                        </Form.Group>
                        
                        
                        <Form.Group className="mb-3" controlId="signup-form.address">
                            <Form.Label>Address</Form.Label>
                            <Form.Control type="text" name="address" isValid={this.state.address.isValid}
                            autoComplete="off" value={this.state.address.value}
                            onChange={(event) => this.handleInputChange(event, this.validateAddress)} />
                        </Form.Group>

                        <Form.Group>
                            <Button type="primary" 
                                htmlType="submit" 
                                size="large" 
                                className="signup-form-button"
                                disabled={this.isFormInvalid()}>Register</Button>
                            Already registred? <Link to="/login" className='link'>SignIn now!</Link>
                        </Form.Group>
                    </Form>
                </div>
            </div>
        );
    }

    // Validation Functions

    validateName = (name) => {
        if(name.length < NAME_MIN_LENGTH) {
            return {
                isValid: 'error',
                errorMsg: `Name is too short (Minimum ${NAME_MIN_LENGTH} characters needed.)`
            }
        } else if (name.length > NAME_MAX_LENGTH) {
            return {
                isValid: 'error',
                errorMsg: `Name is too long (Maximum ${NAME_MAX_LENGTH} characters allowed.)`
            }
        } else {
            return {
                isValid: 'success',
                errorMsg: null,
              };            
        }
    }

    
    validateContactNumber = (value) => {
        var numbers = /^[0-9]+$/;
      if(!value.match(numbers)){
        return {
            isValid: 'error',
            errorMsg: `Contact number must be digits only.`
        }
      }else  if(value.length != 10) {
            return {
                isValid: 'error',
                errorMsg: `Contact number must be 10 digits.`
            }
        } else {
            return {
                isValid: 'success',
                errorMsg: null,
            };            
        }
    }

    validateAddress = (text) => {
        if(text.length < PASSWORD_MIN_LENGTH) {
            return {
                isValid: 'error',
                errorMsg: `Address is too short (Minimum ${PASSWORD_MIN_LENGTH} characters needed.)`
            }
        } else {
            return {
                isValid: 'success',
                errorMsg: null,
            };            
        }
    }


    validateUsername = (emailId) => {
        if(emailId.length < USERNAME_MIN_LENGTH) {
            return {
                isValid: 'error',
                errorMsg: `Username is too short (Minimum ${USERNAME_MIN_LENGTH} characters needed.)`
            }
        } else if (emailId.length > EMAIL_MAX_LENGTH) {
            return {
                isValid: 'error',
                errorMsg: `Username is too long (Maximum ${EMAIL_MAX_LENGTH} characters allowed.)`
            }
        } else {
            return {
                isValid: null,
                errorMsg: null
            }
        }
    }

    handleGenderChange(value) {
        console.log(value)
        this.setState({
            gender: {
                value: value
              }
        });
    }

    validateUsernameAvailability() {
        // First check for client side errors in emailId
        const emailIdValue = this.state.emailId.value;
        const emailIdValidation = this.validateUsername(emailIdValue);

        if(emailIdValidation.isValid === 'error') {
            this.setState({
                emailId: {
                    value: emailIdValue,
                    ...emailIdValidation
                }
            });
            return;
        }

        this.setState({
            emailId: {
                value: emailIdValue,
                isValid: 'validating',
                errorMsg: null
            }
        });

        checkUsernameAvailability(emailIdValue)
        .then(response => {
            if(response.available) {
                this.setState({
                    emailId: {
                        value: emailIdValue,
                        isValid: 'success',
                        errorMsg: null
                    }
                });
            } else {
                this.setState({
                    emailId: {
                        value: emailIdValue,
                        isValid: 'error',
                        errorMsg: 'This emailId is already taken'
                    }
                });
            }
        }).catch(error => {
            // Marking isValid as success, Form will be recchecked at server
            this.setState({
                emailId: {
                    value: emailIdValue,
                    isValid: 'success',
                    errorMsg: null
                }
            });
        });
    }


    validatePassword = (password) => {
        if(password.length < PASSWORD_MIN_LENGTH) {
            return {
                isValid: 'error',
                errorMsg: `Password is too short (Minimum ${PASSWORD_MIN_LENGTH} characters needed.)`
            }
        } else if (password.length > PASSWORD_MAX_LENGTH) {
            return {
                validationStatus: 'error',
                errorMsg: `Password is too long (Maximum ${PASSWORD_MAX_LENGTH} characters allowed.)`
            }
        } else {
            return {
                isValid: 'success',
                errorMsg: null,
            };            
        }
    }

    
    validateRole = (password) => {
        if(password.length ==0) {
            return {
                isValid: 'error',
                errorMsg: 'Invalid Role'
            }
        } else {
            return {
                isValid: 'success',
                errorMsg: null,
            };            
        }
    }

}

export default Signup;