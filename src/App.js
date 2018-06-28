import React, { Component } from 'react';
import './App.css';
import Mentor from './components/Mentor';
import Mentee from './components/Mentee';
import Error from './components/Error';
import Login from './components/Login'; 
import {BrowserRouter, Route, Switch,Redirect,Prompt} from 'react-router-dom';
 const user =({match}) =>{
   return (<h1> welcome user {match.params.username}</h1>)
 }

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
            <Route path="/" component={Login} exact strict/>
            {/* <Route path="/login" exact strict render = {()=>(
                this.state.loggedIn ? (<Contact />) : (<Redirect to="/"/>)
              )} /> /> */}
            <Route path="/mentee/:user" component={Mentee} exact strict/>
            
            <Route component={Error} />
          </Switch>
          {/* <input type="button" value={this.state.loggedIn?"log out" : "log in"} onClick={this.handleLogin.bind(this)} /> */}
         
      </BrowserRouter>
    );
  }
}

export default App;
