import React, { Component } from 'react';
import './App.css';
import './Mentor.css';
import './Mentee.css';
import './ShowTasks.css';
import Mentor from './components/Mentor';
import Mentee from './components/Mentee';
import Error from './components/Error';
import Login from './components/Login'; 
import EditForm from './components/EditForm';
import {BrowserRouter, Route, Switch,Redirect,Prompt} from 'react-router-dom';
 

class App extends Component {
  render() {
    return (
      <BrowserRouter>
          <Switch>
            <Route path="/" component={Login} exact strict/>
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
