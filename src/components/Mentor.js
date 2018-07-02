import React, { Component } from 'react';
import ShowTasks from './ShowTasks';
import SubmittedTasks from './SubmittedTasks';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

class Mentor extends Component {
    constructor(props,{match}){
        super(props,{match});
        this.state={
            show: false,
            done: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
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
          <div className="header"><span>Mentor Dashboard</span></div>
          <div className="mentorName"><span>{this.props.match.params.user}</span></div>
          <div>
            <form className = "assignForm" onSubmit={this.handleSubmit.bind(this)} method="post" action="http://localhost:4000/mentor/task/create">
              <input className="taskName" type="text" name="taskName"  placeholder="Enter a new task.." required />
              <input className="date"id="date" type="date" name="date" required/>
              <Select required
                className = "teamMember"
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
              <input className="assignTask" type="submit" value="Assign Task" />
            </form>
          </div>
          <div className="listHeadings">
            <div className="listHeading">Assigned Tasks</div>
            <div className="listHeading">Tasks ready for review</div>
          </div>

         <div className="lists">
          <div className="tasksContainer">
              <ShowTasks />
          </div>
            <div className="tasksContainer">
            <SubmittedTasks func={this.handleComplete}/>
            </div>
         </div>
        </div>
      )
    }
  }
  
  export default Mentor;