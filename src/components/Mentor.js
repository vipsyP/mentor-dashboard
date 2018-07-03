import React, { Component } from 'react';
import ShowTasks from './ShowTasks';
import SubmittedTasks from './SubmittedTasks';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
// import LoginSignup from './Login-Signup'; 
import {Redirect,Link} from 'react-router-dom';
import Router from 'react-router-dom';

class Mentor extends Component {
    constructor(props,{match}){
        super(props,{match});
        this.state={
            show: false,
            done: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
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
    handleSubmit(){
        // console.log("working");
        // e.preventDefault();
        this.setState(prevState => ({
          show: !prevState.show
        }));
    }
    handleComplete(){
      this.setState({
        done: true
      });
    }
    state = {
      selectedOption: '',
    }
    handleChange = (selectedOption) => {
      this.setState({ selectedOption });
      // selectedOption can be null when the `x` (close) button is clicked
      if (selectedOption) {
        console.log(`Selected: ${selectedOption.label}`);
      }
    }
    render() {
      const { selectedOption } = this.state;
      return (
        <div className="container">
        {this.state.logoutStatus ?  <Redirect to = {
                        {
                            pathname: "/" 
                        }}/>:""} 
          <div className="header"><span>Mentors Dashboard</span></div>
          <div className="mentorName"><span className="mentor-name">{this.props.match.params.user}</span></div>
          <button className="logout-button" onClick={this.logOut} type = "button"> Log Out</button>
          <div>
            <form  onSubmit={this.handleSubmit.bind(this)} method="post" action="http://localhost:4000/mentor/task/create">
              <input className="taskName" type="text" name="taskName"  placeholder="Enter a new task.." required />
              <input id="date" type="date" name="date" required/>
              <Select required
                name="teamMember"
                value={selectedOption}
                onChange={this.handleChange}
                options={[
                  { value: 'megha', label: 'megha' },
                  { value: 'prabha', label: 'prabha' },
                  { value: 'vimal', label: 'vimal' },
                  { value: 'vignesh', label: 'vignesh' },
                ]}
              />
              <input className="submit" type="submit" value="submit" />
            </form>
          </div>
          <div className="lists">
            <div className="taskList">Assigned Tasks</div>
            <div className="review">Tasks ready for review</div>
          </div>
         <div>
          <div className="allTasks">
              <ShowTasks />
          </div>
            <div className="submittedTasks">
            <SubmittedTasks func={this.handleComplete}/>
            </div>
         </div>
        </div>
      )
    }
  }
  
  export default Mentor;