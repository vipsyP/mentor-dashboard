import React, { Component } from 'react';
import './App.css';
import Mentor from './components/Mentor';
import Mentee from './components/Mentee';
import Error from './components/Error';
import {BrowserRouter, Route, Switch,Redirect,Prompt} from 'react-router-dom';

class App extends Component {
  // render() {
  //   return (
  //    <Mentor   />
  //   )
  // }
  render() {
    return (
      <BrowserRouter>
          <Switch>
            <Route path="/" component={mentor} exact strict/>
            <Route path="/Contact" exact strict render = {()=>(
                this.state.loggedIn ? (<Contact />) : (<Redirect to="/"/>)
              )} /> />
            <Route component={Error} />
          </Switch>
          <input type="button" value={this.state.loggedIn?"log out" : "log in"} onClick={this.handleLogin.bind(this)} />
          <div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
