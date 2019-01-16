import React, { Component } from 'react';
import '../css/DataTable.css'; 
import EditableRow from './EditableRow';
import AddAddressForm from './AddAddressForm';
import Auth from '../services/Auth'
import axios from 'axios';

class ModalElement extends Component {
	state = {
		address_element: { 
			name: false,
			email: false,
			address: false,
			telephone_no: false,
			image: false,
		},
		inputValue:'',
		percentCompleted: '',
		photostatus: 'input',
		photo: '', 
		errors: [],
	}
	cancle_photo = (value)=> {
		var file_data;
		if(value) {
			file_data = {
				fileName: value,
			}
		}
		else {
			file_data = {
				fileName: this.state.photo,
			}
		}

		if(this.props.element) {
			axios.post('/api/addresses/cancle_image/'+ this.props.element.id,file_data,{
				headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + Auth.getToken(),
				},})
			.then( response => {
				this.setState({photostatus: 'input'});
				//console.log(response);
			})
			.catch( error => {
				console.log(error);
			});
		}
		else {
			axios.post('/api/addresses/cancle_image/',file_data,{
				headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + Auth.getToken(),
				},})
			.then( response => {
				this.setState({photostatus: 'input'});
				//console.log(response);
			})
			.catch( error => {
				console.log(error);
			});
		}	
	}
	uploadPhoto = event => {
		this.setState({photostatus: 'bar',editableIamge:'bar'});  
		let formData = new FormData();
		formData.append('uploadImage', event.target.files[0]);
		var self = this;  
		var config = {
			onUploadProgress: function(progressEvent) {
				var percentCompleted = Math.round( (progressEvent.loaded * 100) / progressEvent.total );
				//console.log("Progress:-"+percentCompleted);
				self.setState({percentCompleted: percentCompleted});
				var elem = document.getElementById("myBar"); 
				elem.style.width = percentCompleted + '%';
				if(percentCompleted  === 100) {
					elem.innerHTML = 'Upload Completed'
				}
				else {
					elem.innerHTML = this.progress  + '%';
				} 
			},
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + Auth.getToken(),
			}
		};

		var element_id;
		if(this.props.element) {
			element_id = this.props.element.id;
		}
		else {
			element_id = '';
		}

		axios.post('/api/addresses/upload/'+ element_id ,formData,config)
		.then(function (response) {
			self.setState({photostatus: 'image',photo:response.data});
			self.props.update_state_photo(response.data);
		})
		.catch(error => {
			console.log(error);
		});
	}
	get_value = event => {
        this.setState({
            inputValue: event.target.value,
		});
		console.log(event.target.value);
	}
    update = value => event => {
		event.preventDefault();
        if(typeof(this.state.inputValue) !== 'undefined') {
            var address_data = {
                [value]:this.state.inputValue,
			}
			var self = this;
            axios.put('/api/addresses/'+ this.props.element.id,address_data,{
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + Auth.getToken(),
                },})
            .then( response => {
				self.props.address();
				self.props.action();
            })
            .catch( error => {
                //console.log(error);
            });            
        }
        else {
            return true;
        }
	}
    makeInputBox = value => {
		var address_element = {...this.state.address_element};
		Object.keys(address_element).map(item => {
                if(item === value){
                    return address_element[value]= true; 
                } else {
					return address_element[item]= false;
                }
            }
		);
		this.setState({address_element});
	}
	componentWillMount = () => {
		if(this.props.element) {
			this.setState({photostatus: 'image'});
		}
		else {
			this.setState({photostatus: 'input'});
		}
	}
	image_element = (image_name) => {
		//let image_elements;
		if (this.state.photostatus === 'bar') {
			var image_elements = (<div><div id="myProgress"><div id="myBar">{this.props.percentCompleted}%</div></div></div>);
			return image_elements;
		} 

		if (this.state.photostatus === 'image') {
			if(this.state.photo.length > 0) {
				return image_elements = (<div className="image_container">
					<span id="cancle_button_view" className="edit" onClick={()=> {this.cancle_photo(this.state.photo)}}>Edit</span>
					{/* <img alt="Address" src={this.state.photo.length > 0 ? 'http://localhost:8000/images/' + image_name : 'http://localhost:8000/images/dafult.jpg'} height="250" width="250" /> */}
					<img alt="Address" src={'http://localhost:8000/images/' + this.state.photo} height="250" width="250" />
					
					{/* <span className="edit" onClick={() => {this.cancle_photo(this.state.photo)}}>Edit</span> */}
				</div>);
			}
			else {
				return image_elements = (<div className="image_container">
					<span id="cancle_button_view" className="edit" onClick={()=> {this.cancle_photo(image_name)}}>Edit</span>
					{/* <img alt="Address" src={this.state.photo.length > 0 ? 'http://localhost:8000/images/' + image_name : 'http://localhost:8000/images/dafult.jpg'} height="250" width="250" /> */}
					<img alt="Address" src={'http://localhost:8000/images/' + image_name} height="250" width="250" />
					
					{/* <span className="edit" onClick={() => {this.cancle_photo(this.state.photo)}}>Edit</span> */}
				</div>);
			}
		}

		if (this.state.photostatus === 'input') {
			return image_elements = (<input type="file" onChange={this.uploadPhoto}/>);
		}
	}		
	render() {
		var modalelement;
		var rows;
		if(this.props.element) {
			rows = Object.keys(this.props.element)
			.filter(item => item !== "id")
			.map((item,index) => 
				(
					<EditableRow
						key={index} 
						index={index} 
						item={item} 
						element={this.props.element[item]}
						address_element = {this.state.address_element}
						makeInputBox = {this.makeInputBox}
						update = {this.update}
						get_value = {this.get_value}
						//cancle_photo={this.cancle_photo}
						//uploadPhoto={this.uploadPhoto}
						image_element={this.image_element}
						//editableIamge={this.state.editableIamge}
						percentCompleted = {this.props.percentCompleted} 
					/>
				));

			modalelement =  <table className="ui attached compact celled striped selectable table">
					            <tbody>
						           {rows}
					            </tbody>
					        </table>;
		}
		else {
			modalelement = 	<AddAddressForm  
								percentCompleted = {this.props.percentCompleted} 
								uploadPhoto={this.props.uploadPhoto} 
								onChange={this.props.update}
								errors ={this.state.errors}
								image_element={this.image_element}
							/>;
		}

		return (
			<div>
				{modalelement}
			</div>
		)
	}
}

export default ModalElement;