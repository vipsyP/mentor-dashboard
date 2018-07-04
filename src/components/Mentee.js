import React, { Component } from 'react';
// import { withRouter } from 'react-router';
import ReactDOM from 'react-dom';
import LoginSignup from './Login-Signup'; 
import {Redirect,Link} from 'react-router-dom';
import Router from 'react-router-dom';
class Mentee extends Component {
    constructor(props,{match}){
        super(props,{match});
        this.state={
            menteeTasks : [],
            submit: false,
            user : props.match.params.user,
            logoutStatus:false,
            authState:true
        }
        this.logOut = this.logOut.bind(this);
    }

    logOut(event){
        console.log("event in logout points to -",event);
        const self=this;
        fetch("http://localhost:4000/logout", {
                method: "GET",
                credentials: "include",
                headers: {
                    "content-type": "application/json"
                },
                // body: JSON.stringify(signupdata)
            }).then(function (response) {
                console.log('data in logout', response);
                return response.json();
            }).then(response => {
                self.setState({
                    logoutStatus: response.status    
                });
            }).catch(err => {
                console.log(err);
            })
    }
    
    handleClick(id){
        const self=this;
        console.log(id);
        fetch('http://localhost:4000/mentee/tasks/sub?id='+id,{
            method: "GET",
            credentials: "include",
            headers: {
                "content-type": "application/json"
            }

        })
        .then(function(response) {
            return response.json();
        })
        .then(response => {
             console.log(response);
             this.fetchFunc()
             self.setState({
                authState:response.status 
              });
        }) 
        .catch(function(err) {
            console.log('Fetch Error :-S', err);
        })
        this.setState(prevState => ({
            submit: !prevState.submit
          }));
    }
    fetchFunc(){
        const self=this;
        fetch('http://localhost:4000/mentee/tasks?user='+this.props.match.params.user,{
            method: "GET",
            credentials: "include",
            headers: {
                "content-type": "application/json"
            }
        })
        .then(function(response) {
            return response.json();
        })
        .then(response => {
            // console.log(response);
            // self.setState({
            //     authState:response.status 
            //   });
            this.getMenteeTasks(response)
        }) 
        .catch(function(err) {
            console.log('Fetch Error :-S', err);
        })
    }
    componentDidMount(){
        this.fetchFunc()
    }
    getMenteeTasks(res){
        let menteeTasks = res.filter(item => item.done === false);
        this.setState({
            menteeTasks : menteeTasks
        })
    }
    render() {
        if(this.state.authState==false){
            return <Redirect to = "/" />
          }
        let menteeTaskList = this.state.menteeTasks;
      return (
        <div className="container">
        {this.state.logoutStatus ?  <Redirect to = {
                        {
                            pathname: "/" 
                        }}/>:""} 
          <div className="header"><span>Mentee Dashboard</span></div>
          <div className="mentorName"><span className="mentee-name">{this.props.match.params.user}</span>
          <button className="logout-button" onClick={this.logOut} type = "button"> Log Out</button>
          </div>
          
          <div className="menteeListHeadings">
          {/* <div className="lists"> */}
          <div className="menteeListHeading">Assigned Tasks</div>
          </div>
          <div className="menteeTasksContainer">{
              menteeTaskList.map((item,i)=>{
                return (
                <div className="menteeTaskContainer">
                    <div class="menteeTask">
                        <div className="menteeTaskName">{item.task}</div>
                        <div className="dueDate">{item.dueDate}</div>
                    </div>
                    <input class="submitForReview" type="button"  value = {item.submitted? "Submitted" : "Submit for review"} onClick = {this.handleClick.bind(this,item._id)} /> 
                </div>
                )
              })
          }</div>
        </div>
      )
    }
  }
  
  export default Mentee;