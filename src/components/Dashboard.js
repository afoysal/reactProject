import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import Auth from '../services/Auth'
// import ReactTable from "react-table";
// import 'react-table/react-table.css'
import DataTable from './DataTable';
import axios from 'axios';

class Dashboard extends Component {
    state = {
		result:[],
		page:1,
		last_page:'',
		current_page:'',
		from:'',
		dataAvailable: false,
    };
	pagination = (value) => {
		var page;
		page = this.state.page + value;
		if(page >= 1 &&  page <= this.state.last_page) {
			this.setState({page: page},()=> {this.getAddress()});
		}
	}
	getAddress = () => {
		var self = this;
		axios.get('/api/addresses?page=' + this.state.page,{
			headers: {
		    	'Accept': 'application/json',
		    	'Content-Type': 'application/json',
		    	'Authorization': 'Bearer ' + Auth.getToken(),
		  	},})
		.then(function (response) {
		    self.setState(
				{
					result: response.data.data,
					last_page: response.data.meta.last_page,
					current_page: response.data.meta.current_page,
					from: response.data.meta.from,
					dataAvailable: true
				}
			);

		})
		.catch(function (error) {
		    console.log(error);
		});
	}
	componentDidMount = () => {
		this.getAddress();
	}
	render() {		
    	return (
			this.state.dataAvailable ?  
				<DataTable 
					getAddress={this.getAddress} 
					addresses={this.state.result} 
					pagination={this.pagination} 
					current_page = {this.state.current_page}
					last_page = {this.state.last_page}
					from = {this.state.from}
				/> : null
	    );
	}
}

export default withRouter(Dashboard);