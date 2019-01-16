import React, { Component } from 'react'
import { Button, Modal } from 'semantic-ui-react'
import ModalElement from './ModalElement'
import Auth from '../services/Auth'
import axios from 'axios';


class ModalBody extends Component {

  state = {
      name: '',
      email:'',
      address:'',
      telephone_no:'',
      photo_name:'',
  };

  update = event => {
    this.setState({[event.target.name]: event.target.value});
  }

  insertAddress = () => {
    var address_data = {      
      email       :this.state.email,
      name        :this.state.name,                    
      address     :this.state.address,
      telephone_no:this.state.telephone_no,
      image       :this.state.photo_name,
    }

    var self = this;

    axios.post('/api/addresses/store/',address_data,{
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + Auth.getToken(),
      },})
      .then(function (response) {
        self.props.address();
        self.props.action();
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  update_state_photo = value => {
    this.setState({photo_name: value});
	}
  render() {
    return (
      <Modal
        open={this.props.modelStatus}
        onClose={this.props.action}
      >
          { this.props.addresObj ? <Modal.Header>Address Details</Modal.Header> : <Modal.Header>Insert Address</Modal.Header> } 
            <Modal.Content>
                <ModalElement 
                    // photostatus = {this.state.photostatus} 
                    update={this.update} 
                    //uploadPhoto={this.uploadPhoto} 
                    element={this.props.addresObj} 
                    //percentCompleted={this.state.percentCompleted}
                    //errors = {this.state.errors}
                    update_state_photo = {this.update_state_photo}
                    // update_photostatus = {this.update_photostatus}
                    address = { this.props.address } 
                    action={ this.props.action }
                />
            </Modal.Content>
          
          <Modal.Actions>
            { this.props.addresObj ?
              <Button 
                positive icon='checkmark' 
                labelPosition='right' 
                onClick={this.props.action} 
                content='OK' 
              /> : 
              <Button 
                positive icon='checkmark' 
                labelPosition='right' 
                //onClick={props.action} 
                onClick={this.insertAddress}
                content='Save' 
              />
            }
          </Modal.Actions>
      </Modal>
    )
  }
}

export default ModalBody