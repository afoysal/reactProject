import React, { Component } from 'react';
import Auth from '../services/Auth'
//import { Router, Route, Link, IndexRoute, hashHistory, browserHistory, Redirect } from 'react-router-dom'
//import { Route, Redirect } from 'react-router'
//import Dashboard from 'Dashboard.js';
import { withRouter, NavLink } from "react-router-dom";
import axios from 'axios';

class Login extends Component {

	state = {
		email: '',
		password:'',
		toggle:false,
		error:false,
	};
	
    handleChange = event => {
      	this.setState({[event.target.name]: event.target.value});
    }

    login = () => {
		this.setState({toggle: true});

		if(this.state.email === '' || this.state.password === '')
		{
			this.setState({toggle: false,error:true});
			return false;
		}

    	var data = {
            client_id: 2,
            client_secret: 'ispGH4SmkEeV4i5Tz9NoI0RSzid5mciG5ecw011f',
            grant_type: 'password',
            username: this.state.email,
            password: this.state.password
        }

		var self = this;
		axios.post('/oauth/token',data,{
			headers: {
		    	'Accept': 'application/json',
		    	'Content-Type': 'application/json',
		  	}})
		.then(function (response) {			
		   	Auth.setToken(response.data.access_token,response.data.expires_in+ Date.now());
		    self.props.history.push("/dashboard");
		})
		.catch(function (error) {
			//console.log(error);
			self.setState({toggle: false,error:true});
		});
	}
	render = () => {
	    return (	    
	        <div className="login ui middle aligned center aligned grid">
		        <div className="column">
		            <h2 className="ui teal image header">
		                <div className="content">
		                    Log-in to your account
		                </div>
		            </h2>
					{this.state.error ? <div className="ui red message">Your credentials are wrong.</div> : null}
		            <form className="ui large form">
		                <div className="ui segment">
		                    <div className="field">
		                        <div className="ui left icon input">
		                            <i className="mail outline icon"></i>
									<input 
										type="text" 
										placeholder="E-mail" 
										name="email" 
										onChange={this.handleChange} 
									/>
		                        </div>
		                    </div>
		                    <div className="field">
		                        <div className="ui left icon input">
		                            <i className="unlock icon"></i>
									<input 
										type="password" 
										placeholder="Password" 
										name="password" 
										onChange={this.handleChange} 
									/>
		                        </div>
		                    </div>
		                    <div className={this.state.toggle ? 'ui fluid large teal submit button loading' : 'ui fluid large teal submit button'} onClick={this.login}>Login</div>
		                </div>
		            </form>
		            <div className="ui message">
		                New to us ?<NavLink to="/register" id="sign_up">Sign Up</NavLink>                
		            </div>
		        </div>
		    </div>	    
	    );
	}
}

export default withRouter(Login);