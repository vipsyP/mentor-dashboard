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
          <div className="header"><span>Mentors Dashboard</span></div>
          <div className="mentorName"><span>{this.props.match.params.user}</span></div>
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