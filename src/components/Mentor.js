import React, { Component } from 'react';
import ShowTasks from './ShowTasks.js'

class Mentor extends Component {
    constructor(props){
        super(props);
        this.state={
          show: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(e){
        console.log("working");
        // e.preventDefault();
        this.setState({
            show: true
        })
    }
    render() {
      return (
        <div className="container">
          <div className="header"><span>Mentors Dashboard</span></div>
          <div className="mentorName"><span>Hi Vignesh!</span></div>
          <div>
            <form onSubmit={this.handleSubmit} method="post" action="http://localhost:4000/addTask">
              <input className="taskName" type="text" name="taskName"  placeholder="Enter a new task.." />
              <input className="teamMember" type="text" name="teamMember" placeholder="Team Member.." />
              <input className="submit" type="submit" value="submit" />
            </form>
          </div>
          <div className="lists">
            <div className="taskList">Assigned Tasks</div>
            <div className="review">Tasks ready for review</div>
          </div>
          <ShowTasks/>
        </div>
      )
    }
  }
  
  export default Mentor;