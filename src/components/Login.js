import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';


class Login extends Component{
    state = {
        toDashboard: false,
      }
      handleSubmit = () => {
    
          this.setState(() => ({
            toDashboard: true
          }))
      }
      render() {
        if (this.state.toDashboard === true) {
             let user = document.getElementById("login").value
             console.log(user);
          return <Redirect to='/mentee/$params.value'/>
        }
    
        return (
          <div>
            <h1>Register</h1>
            {/* <Form onSubmit={this.handleSubmit} /> */}
            <input id="login" name="login"/>
            <input type="submit" value="submit" onSubmit={this.handleSubmit.bind(this)} />
          </div>
        )
      }
}


export default Login;