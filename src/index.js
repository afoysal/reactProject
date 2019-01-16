import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './css/Login.css';
import './css/DataTable.css';

import Auth from './services/Auth';
import Dashboard from './components/Dashboard.js';
import Login from './components/Login.js';
import Register from './components/Register.js';
import { BrowserRouter as Router, Route, Switch,Redirect} from "react-router-dom";
import registerServiceWorker from './registerServiceWorker';

//ReactDOM.render(<App />, document.getElementById('root'));

import axios from 'axios';

axios.defaults.baseURL = 'http://127.0.0.1:8000';

const PrivateRoute = ({ component: Component }) => (
	<Route
	  render={props =>
			(Auth.isAuthenticated() ? ( <Component {...props} />) : (<Redirect to={{ pathname: '/',}}/>))
	  }
	/>
);


// const PrivateRoute = ({ component: Component, ...rest }) => (
// 	<Route
// 	  {...rest}
// 	  	render={props =>
// 			(Auth.isAuthenticated() ? ( <Component {...props} />) : (<Redirect to={{ pathname: '/',}}/>))
// 	  }
// 	/>
// );


ReactDOM.render(
	<Router>
	  <Switch>
	    <Route exact path="/" component={Login} />
			<Route exact path="/register" component={Register} />
			<PrivateRoute path="/dashboard" exact component={Dashboard} />
	  </Switch>
  </Router>, 
	document.getElementById('root'));
	
registerServiceWorker();