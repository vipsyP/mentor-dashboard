import React, { Component } from 'react';

class Mentor extends Component {
    // handleClick=(res)=> {
	// 	// fetch('http://localhost:4000/players?team='+team+'&year='+this.props.season)
	// 	// .then(function(response) {
	// 	// 	return response.json();
	// 	// })
	// 	// .then(response => {
	// 	// 	// this.setState({
	// 	// 	// 	showChart: true
	// 	// 	// }) 
	// 	// 	this.getPlayers(response,team)
	// 	// }) 
	// 	// .catch(function(err) {
	// 	// 	console.log('Fetch Error :-S', err);
    //     // });
    //     console.log(res.taskName);
	// }
    render() {
      return (
        <div className="container">
          <div className="header"><span>Mentors Dashboard</span></div>
          <div className="mentorName"><span>Hi Vignesh!</span></div>
          <div>
            <form method="post" action="http://localhost:4000/addTask">
              <input className="taskName" type="text" name="taskName"  placeholder="Enter a new task.." />
              <input className="teamMember" type="text" name="teamMember" placeholder="Team Member.." />
              <input className="submit" type="submit" value="submit" />
            </form>
          </div>
          <div className="lists">
            <div className="taskList">Assigned Tasks</div>
            <div className="review">Tasks ready for review</div>
          </div>
        </div>
      )
    }
  }
  
  export default Mentor;