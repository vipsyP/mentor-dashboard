import React, { Component } from 'react';
import ShowTasks from './ShowTasks';
import SubmittedTasks from './SubmittedTasks';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

class Mentor extends Component {
    // constructor(props){
    //     super(props);
    //     this.state={
    //         show: false
    //     }
    //     this.handleSubmit = this.handleSubmit.bind(this);
    // }
    // handleSubmit(e){
    //     console.log("working");
    //     // e.preventDefault();
    //     this.setState({
    //         show: true
    //     })
    // }
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
          <div className="header"><span>Mentors Dashboard</span></div>
          <div className="mentorName"><span>Hi Vignesh!</span></div>
          <div>
            <form  method="post" action="http://localhost:4000/mentor/task/create">
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
            <SubmittedTasks />
            </div>
         </div>
        </div>
      )
    }
  }
  
  export default Mentor;