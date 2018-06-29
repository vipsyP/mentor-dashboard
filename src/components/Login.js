import React, { Component } from 'react';
import {Redirect,Link} from 'react-router-dom';


class Login extends Component{
  constructor(props){
    super(props);
    this.state={
      toDashboard: false,
      toMentorDashboard: false,
      
    }
  }
  handleLogin() {
    this.setState (prevState =>({
      toDashboard : !prevState.toDashboard
  }))}

  handleMentorLogin() {
    this.setState (prevState =>({
      toMentorDashboard : !prevState.toMentorDashboard
  }))}

  render() {
    if (this.state.toDashboard === true) {
          let user = document.getElementById("login").value
          console.log(user);
          return <Redirect
          to={{
            pathname: "/mentee/"+document.getElementById("login").value,
          }}
        />
        }
        if (this.state.toMentorDashboard === true) {
          let user = document.getElementById("login").value
          console.log(user);
          return <Redirect
                  to={{
                      pathname: "/mentor/"+document.getElementById("login").value,
                    }} />
        }
    
        return (
          <div>
            <h1>Register</h1>
            {/* <Form onSubmit={this.handleSubmit} /> */}
            <input id="login" type="text"/>
            <input type="button" value={this.state.toDashboard?"log out" : "log in as a mentee"} onClick={this.handleLogin.bind(this)} />
            <input type="button" value={this.state.toMentorDashboard?"log out" : "log in as a mentor"} onClick={this.handleMentorLogin.bind(this)} />
            
            {/* <Link to={{
      pathname: '/mentee/'+document.getElementById("login"),
    //   search: con,
    //   hash: '#the-hash',
    //   state: { fromDashboard: true }
    }}>log in</Link> */}
    </div>
    )
  }
}


export default Login;

