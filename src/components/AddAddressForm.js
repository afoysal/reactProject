import React, { Component } from 'react';
import '../css/Login.css'; 
//import axios from 'axios';
//import Auth from '../services/Auth'

class AddAddressForm extends Component {
	render() {
		return (
			<form className="ui form">
				{ this.props.errors.length > 0 ? <div className="ui red message">
                    <ul>
                        {this.props.errors}
                    </ul>
                </div> : null}
				<table className="ui attached compact celled striped selectable table">
					<tbody>
			            <tr>
			                <td className="ui header data_type">Name</td>
			                <td>
			                    <input type="text" name="name" placeholder="Name" onChange={this.props.onChange}/>
			                </td>
			            </tr>
			            <tr>
			                <td className="ui header">Address</td>
			                <td>
			                    <input type="text" name="address" placeholder="Address" onChange={this.props.onChange}/>
			                </td>
			            </tr>
			            <tr>
			                <td className="ui header">Telephone No</td>
			                <td>
			                    <input type="text" name="telephone_no" placeholder="Telephone No" onChange={this.props.onChange}/>
			                </td>
			            </tr>
			            <tr>
			                <td className="ui header">Email</td>
			                <td>
			                    <input type="text" name="email" placeholder="Email" onChange={this.props.onChange}/>
			                </td>
			            </tr>
			            <tr>
			                <td className="ui header">Photo</td>
			                <td>
			                   	<div>
			                   		{this.props.image_element()} 
			                   	</div> 
			                </td>
			            </tr>
		            </tbody>
	            </table>
	        </form>
		);
	}
}
export default AddAddressForm; 