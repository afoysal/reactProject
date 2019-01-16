import React, { Component } from 'react';
//import { withRouter } from "react-router-dom";
//import Auth from '../services/Auth'
// import ReactTable from "react-table";
// import 'react-table/react-table.css'
//import '../css/DataTable.css';
import ModalBody from './ModalBody';
//import { Button, Header, Icon, Modal } from 'semantic-ui-react'
import Auth from '../services/Auth';
import swal from 'sweetalert';
import axios from 'axios';
import { withRouter } from "react-router-dom";

class DataTable extends Component {
    state = {
        modalOpen: false, 
        addressOject: null,
        modalComponent: null,
        userName: '',
    };
    changestate = () => {
        this.setState({modalOpen: !this.state.modalOpen})
    }

    delete = (id,name) => {
        var myhtml = document.createElement("div");
        myhtml.innerHTML = "<div>You are going to delete <b>"+name+"</b> address. </div>";
        swal({
            title: "Are you sure?",
            content: myhtml,
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((willDelete) => {
            if (willDelete) {
                var self = this;
                axios.delete('/api/addresses/'+ id,{
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + Auth.getToken(),
                    },})
                .then(function (response) {
                    swal({
                        title: "Thank You!",
                        text : "Address Deleted Successfully.",
                        icon : "success",
                        timer: 4000
                    });
                    self.props.getAddress();
                })
                .catch(function (error) {
                    console.log(error);
                });
            } 
        });     
    }

    view = value => {
        var self = this;
        axios.get('/api/addresses/show/' + value,{
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + Auth.getToken(),
            },})
        .then(function (response) {
            self.setState({ addressOject: response.data.data[0], modalOpen: true});
            //console.log(response.data.data[0]);
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    addAddress = () => {
        this.setState({ addressOject: null});
        this.changestate();
    }
    
    componentDidMount = () => {
        var self = this;
        axios.get('/api/addresses/userName',{
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + Auth.getToken(),
            },})
        .then(function (response) {
            self.setState({ userName: response.data.name,});
        })
        .catch(function (error) {
            console.log(error);
        });
    }
    logout = () => {
        Auth.destroyToken();
        this.props.history.push("/");
    }
    render() {
        let rows = this.props.addresses.map((item, index) => 
            (
                <tr key={"tr"+index}>
                    <td>{item['name']}</td>
                    <td>{item['address']}</td>
                    <td>{item['telephone_no']}</td>
                    <td>{item['email']}</td>
                    <td>
                        <button className="mini ui button" onClick={() => this.view(item['id'])}>
                            <i className="user icon"></i>
                            View
                        </button>
                        <button className="mini ui red button delete_icon" onClick={() => this.delete(item['id'],item['name'])}>
                            <i className="delete icon"></i>
                            Delete
                        </button>
                    </td>
                </tr>
            )
        );

        if (this.state.modalOpen) { 
            var modalComponent;
            if (this.state.addressOject) { 
                modalComponent = <ModalBody address = {this.props.getAddress} action={() => this.changestate()} modelStatus = {this.state.modalOpen} addresObj = {this.state.addressOject}/>;
            }
            else {                
                modalComponent = <ModalBody address = {this.props.getAddress} action={() => this.changestate()} modelStatus = {this.state.modalOpen}/>;
            }
        }

        return (
            <div className="data_table">
                <h1 className="ui attached warning message table">
                    <span id="address">Addresses</span>
                    <span id="user_details">
                        Welcome,  <b>{this.state.userName} </b>   |  <span id="logout" onClick={this.logout}>Logout</span>
                        <button className="ui teal button" onClick={this.addAddress}>
                            <i className="plus square icon"></i>
                            Add Address
                        </button>
                    </span>
                </h1>
                {this.props.addresses.length > 0 ?
                    (<div><table className="ui attached compact celled striped selectable table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Address</th>
                                <th>Telephone No</th>
                                <th>Email</th>
                                <th className ="extra"></th>
                            </tr>
                        </thead>
                        <tbody>{rows}</tbody>
                    </table>
                    <div className="ui pagination menu">
                        <span className={this.props.current_page === this.props.from ? 'disabled item pagination': 'item pagination'} onClick={() => {this.props.pagination(-1)}}>❮</span>
                            <div className="item">
                                Page {this.props.current_page} of {this.props.last_page}
                            </div>
                        <span className={this.props.current_page === this.props.last_page ? 'disabled item pagination': 'item pagination'} onClick={() => {this.props.pagination(1)}} >❯</span>
                    </div>
                    </div>) :
                    (<div className="ui attached compact center aligned segment big">
                        <div className="new_address">
                            You dont't have any Address
                        </div>
                        <div>
                            <button className="ui teal button" onClick={this.addAddress}>
                                <i className="plus square icon"></i>
                                Add Address
                            </button>
                        </div>
                    </div>)
                }
                {modalComponent}
            </div>
        );
    }
}
export default withRouter(DataTable);