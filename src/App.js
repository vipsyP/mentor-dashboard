import React, { Component } from 'react';
// import Router from 'react-router-dom';
// import { Switch, Route } from 'react-router-dom';
// import { Redirect } from 'react-router'
import './App.css';
import './Mentor.css';
import './Mentee.css';
import './ShowTasks.css';
import './LoginSignup.css';
import Mentor from './components/Mentor';
import Mentee from './components/Mentee';
import Error from './components/Error';
import LoginSignup from './components/Login-Signup'; 
import EditForm from './components/EditForm';
// import { withRouter } from 'react-router';
import {BrowserRouter, Route, Switch,Redirect,Prompt} from 'react-router-dom';
 
// import LoginSignup from './components/Login-Signup';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
          <Switch>
            <Route path="/" component={LoginSignup} exact strict>

            </Route>
            <Route path="/mentee/:user" component={Mentee} exact strict/>
            <Route path="/mentor/:user" component={Mentor} exact strict/>
            <Route path="/tasks/edit/:id" component={EditForm} exact strict/>
            <Route component={Error} />
          </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
