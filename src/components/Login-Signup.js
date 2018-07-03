import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Router from 'react-router-dom';
// import {Route,Redirect} from 'react-router'
import Mentee from './Mentee.js';
import Mentor from './Mentor.js';
import {Redirect,Link} from 'react-router-dom';

class LoginSignup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // userLogin:{
            loginEmail: "",
            loginPassword: "",
            loginAs: "",
            // },

            // userSignUp:{
            signupUsername: "",
            signupEmail: "",
            signupAs: "",
            signupPassword: "",
            signupConfirmPassword: "",
            // },
            loginStatus: false,
            signupStatus: false,
            userName:"",
            role:"",
            signupUserName:"",
            signupRole:""
            // result:{}
        }

        this.setLoginEmail = this.setLoginEmail.bind(this);
        this.setLoginPassword = this.setLoginPassword.bind(this);
        this.setLoginAs = this.setLoginAs.bind(this);

        this.setSignupUsername = this.setSignupUsername.bind(this);
        this.setSignupEmail = this.setSignupEmail.bind(this);
        this.setSignupAs = this.setSignupAs.bind(this);
        this.setSignupPassword = this.setSignupPassword.bind(this);
        this.setSignupConfirmPassword = this.setSignupConfirmPassword.bind(this);

        this.validateLogin = this.validateLogin.bind(this);
        this.validateSignup = this.validateSignup.bind(this);

    }
     
    setLoginEmail(event) {
        this.setState({
            loginEmail: event.target.value
        })
    }

    setLoginPassword(event) {
        this.setState({
            loginPassword: event.target.value
        })
    }

    setLoginAs(event) {
        this.setState({
            loginAs: event.target.value
        })
    }

    setSignupUsername(event) {
        this.setState({
            signupUsername: event.target.value
        })
    }

    setSignupEmail(event) {
        this.setState({
            signupEmail: event.target.value
        })
    }

    setSignupAs(event) {
        this.setState({
            signupAs: event.target.value
        })
    }

    setSignupPassword(event) {
        this.setState({
            signupPassword: event.target.value
        })
    }

    setSignupConfirmPassword(event) {
        this.setState({
            signupConfirmPassword: event.target.value
        })
    }


    validateLogin(event) {
        if (this.state.loginEmail.indexOf('@') == -1 || this.state.loginEmail.length == 0 || this.state.loginEmail.indexOf('.') == -1) {
            alert("Please ensure your E-mail id is correct!");
            // return false;
        } else if (this.state.loginPassword.length < 6) {
            alert("Please ensure your Password is correct!");
            // return false;
        }
        else {
             console.log("this.state.setLoginAs",this.state.loginAs);
            let logindata = {
                username: this.state.loginEmail,
                password: this.state.loginPassword,
                role:this.state.loginAs
            }
            console.log('logindata',logindata);
            // let username=this.state.loginEmail;
            // let password=this.state.loginPassword
            const self = this;
            fetch("http://localhost:4000/login", {
                method: "POST",
                credentials: "include",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(logindata)
            }).then(function (response) {
                console.log('data', response);
                return response.json();
            }).then(response => {
                console.log("inside login response.json =",response);
                self.setState({
                    loginStatus: response.status,
                    userName:response.name,
                    role:response.role
                });
            }).catch(err => {
                console.log(err);
            })
        }
    }


    validateSignup(event) {

        if (this.state.signupUsername.length == 0) {
            alert("Please enter a valid username!");
            // return false;
        } else if (this.state.signupEmail.indexOf('@') == -1 || this.state.signupEmail.length == 0 || this.state.signupEmail.indexOf('.') == -1) {
            alert("Please ensure your E-mail id is correct!");
            // return false;
        } else if (this.state.signupPassword.length < 6) {
            alert("Please ensure your Password contains atleast 6 characters!");
            // return false;
        } else if (this.state.signupConfirmPassword != this.state.signupPassword) {
            alert("Please re-enter the password correctly!");
            // return false;
        }
        else {
            //  console.log("this.state.setLoginAs",this.state.loginAs);
            let signupdata = {
                username: this.state.signupUsername,
                email:this.state.signupEmail,
                role:this.state.signupAs,
                password: this.state.signupPassword,
                confirmPassword:this.state.signupConfirmPassword
                
            }
            console.log('signupdata',signupdata);
            // let username=this.state.loginEmail;
            // let password=this.state.loginPassword
            const self = this;
            fetch("http://localhost:4000/signup", {
                method: "POST",
                credentials: "include",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(signupdata)
            }).then(function (response) {
                console.log('data in signup', response);
                return response.json();
            }).then(response => {
                // window.location.href="http://localhost:3000"
                // self.setState({
                //     signupStatus: response.status,
                //     signupUserName:response.name,
                //     signupRole:response.role
                // });

                
                self.setState({
                    signupStatus:response.status,
                    loginEmail:this.state.signupEmail,
                    loginPassword: this.state.signupPassword,
                    loginAs:this.state.signupAs,
                    });
                    self.state.signupStatus? self.validateLogin():"";
                // self.validateLogin();
                

            }).catch(err => {
                console.log(err);
            })
        }


        // return (true);
    }

    render() {
        // if(this.state.data==true){
        //     <Mentee />
        // }
        return (
            <div className = "rootContainer">
            <div className = "topBar">
            <h1 className = "topBarHeading"> MyTeam </h1> 
            {/* <form className = "login"onSubmit = {this.validateLogin} action = "http://localhost:4000/login" method = "post">   */}
            {/* < form className = "login"onSubmit = {this.validateLogin} >*/ } 
            <form className = "login" >
           
            <input id = "username" className = "login-field username" type = "text"value = {this.state.loginEmail} name = "username" onChange = {this.setLoginEmail} placeholder = "E-mail" / >
            <br/>
            

            <input id = "password" className = "login-field password" type = "password" value = {this.state.loginPassword} name = "password" onChange = {this.setLoginPassword} placeholder = "Password" / >


            <select name = "role" className = "login-dropdown" onChange = {this.setLoginAs} placeholder="As a" >
                <option value = "Mentee" > I 'm a Mentee</option>
                <option value = "Mentor" > I 'm a Mentor</option> 
             </select >

            <div>
            <button className = "login-button" type = "button" onClick = {this.validateLogin} > Log In </button> 
            {/* <input className = "login-button" type = "submit" value = "Log in" / > */} 
            </div>

            </form> 
            </div> 
            {this.state.loginStatus ? (this.state.role=="Mentor"?<Redirect to = {
                    {
                        pathname: "/mentor/" + this.state.userName
                    } }/> : <Redirect to = {
                        {
                            pathname: "/mentee/" + this.state.userName
                        }}/>):""} 
                 
                
                
                <div className = "body" >
                <h1 className = "subtitle" > Everything is on track with myTeam! </h1> 
                {/* <form className = "signup" action = "http://localhost:4000/signup" onSubmit = {this.validateSignup} method = "post" > */}
                <form className="signup">
                <h3 className = "signup-text" > Create a free account </h3> <div >
                <input className = "signup-field"
                type = "text" onChange = { this.setSignupUsername} name = "username" placeholder = "Username" / >
                <br />
                </div>

                <div >
                <input className = "signup-field" type = "text" onChange = {this.setSignupEmail} name = "email" placeholder = "E-mail" / >
                </div>

                <select onChange = {this.setSignupAs} name = "role" className = "signup-dropdown" >
                <option value = "Mentee" > I 'm a Mentee</option> 
                <option value = "Mentor" > I 'm a Mentor</option> </select>

                <div>
                <input className = "signup-field" type = "password" onChange = { this.setSignupPassword} name = "password" placeholder = "Password" / >
                <br />
                </div>

                <div>

                < input className = "signup-field" type = "password" onChange = { this.setSignupConfirmPassword} name = "confirmPassword" placeholder = "Confirm Password" / >
                </div>

                < div>
                {/* <input className = "signup-button" type = "submit" value = "Sign up" /> */}
                <button className = "signup-button" type = "button" onClick = {this.validateSignup} > Sign Up </button> 
           
                </div>

                </form>
                {/* {this.state.signupStatus ? (this.state.signupRole=="Mentor"?<Redirect to = {
                    {
                        pathname: "/mentor/" + this.state.signupUserName
                    } }/> : <Redirect to = {
                        {
                            pathname: "/mentee/" + this.state.signupUserName
                        }}/>):""}  */}

                </div> 
                </div>
            )
        }
    }

    export default LoginSignup;