import React, { Component } from 'react';
import { activateUser, getAllUsers, getUserDetails } from '../util/APIUtils';
import { Link, withRouter } from 'react-router-dom';
import './UserList.css';
import User from './User';
import { Button, Table } from 'react-bootstrap';

class UserList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: []
        };
        this.loaduserList = this.loaduserList.bind(this);
    }

    loaduserList() {
        let promise;
        promise = getAllUsers();
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
                users: response,
                isLoading: false
            })
        }).catch(error => {
            if(error.status==401){
                this.props.handleLogout();
              }
        });  
        
    }

    componentDidMount() {
        this.loaduserList();
    }

    componentDidUpdate(nextProps) {
        if(this.props.isAuthenticated !== nextProps.isAuthenticated) {
            // Reset State
            this.setState({
                users: [],
                isLoading: false
            });    
            this.loaduserList();
        }
    }

    activateUser(event,id) {
        let userRequest ={
            "userId":id
        }
        event.preventDefault();
        activateUser(userRequest)
        .then(response => {
            if(response) {
                alert("Activated User. Sucessfully. ");
                this.loaduserList();
            } else {
                alert("Failed to Activate User. Please try again.");
            }
        }).catch(error => {
            alert("Failed to Activate User. Please try again.");
        });
    }

    render() {
        return (
            <div className="users-container">
                <h3>User List</h3>           
                <div className="new-guest-content">
                    {this.state.users.length > 0 ? ( 
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <td>Name</td>
                                <td>Email</td>
                                <td>Status </td>
                            </tr></thead>
                        <tbody>
                        {this.state.users.map(item => (
                            <tr>
                                <td>{item.name}</td>
                                <td>{item.emailId}</td>
                                {item.active ?(
                                    <td>Active</td>
                                ):<td> <Button type="primary" 
                                htmlType="submit" 
                                size="large" onClick={(event) => this.activateUser(event,item.id)}
                                className="create-guest-form-button">Activate User</Button> </td>

                                }
                            </tr>
                          ))}
                        </tbody> 
                    </Table>  
                    ): null
                }
                {this.state.users.length === 0 ? (
                        <div className="no-guest-found">
                            <span>No Users found.</span>
                        </div>    
                    ): null
                }
                </div>
            </div>
        );
    }
}

export default withRouter(UserList);