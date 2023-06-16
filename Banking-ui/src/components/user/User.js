import React, { Component } from 'react';
import './User.css';
import {Modal, Table,Button } from 'antd';
import { activateUser } from '../util/APIUtils';
const { confirm } = Modal;

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
        users: []
    };
    this.showConfirm = this.showConfirm.bind(this);
}

    showConfirm(id,userId) {
      confirm({
        title: 'Do you want to activate user?',
        content: 'When clicked the OK button, this user ( ' + userId+ ' ) will get activated',
        onOk() {
          let promise;
          promise = activateUser(id);
          if(!promise) {
            console.log(promise)
              return;
          }
          promise            
          .then(response => {
              console.log(response);
              alert("user activated sucessfully");
             window.location ="/";
          }).catch(error => {
            console.log(error)
          });  
        },
        onCancel() {},
      });
    }

    render() {
        const columns = [
          {
            title: 'Product Code',
            dataIndex: 'userCode',
            key: 'userCode',
          },{
              title: 'user Name',
              dataIndex: 'name',
              key: 'name',
            },
            {
              title: 'EmailId',
              dataIndex: 'emailId',
              key: 'emailId',
             },
             {
               title: 'Action',
               dataIndex: '',
              key: 'id',
               render: (text,record) => <Button onClick={() => this.showConfirm(record.id,record.name)} size="small" style={{ width: 90 }}>
               Delete
             </Button>,
            }
          ];

        return (
          <div>

            <Table columns={columns} dataSource={this.props.user} />
            
          </div>
            
        );
    }
}

export default User;