import React, { Component } from 'react';
import ShowTasks from './ShowTasks';
import SubmittedTasks from './SubmittedTasks';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
let teamMembers=[];


class Mentor extends Component {
    constructor(props,{match}){
        super(props,{match});
        this.state={
          add : false,
          mem:[],
          edit: false,
          delete: false,
          show: false,
          done: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleadd(){
      // e.preventDefault();
      this.setState(prevState => ({
        add: !prevState.add
      }));
    }
    handleEdit(){
      // e.preventDefault();
      this.setState(prevState => ({
        edit: !prevState.edit
      }));
    }
    handleDelete(){
      // e.preventDefault();
      this.setState(prevState => ({
        delete: !prevState.delete
      }));
    }
    addMembers(){
      console.log(document.getElementById("member").value);
      let member = document.getElementById("member").value;
      fetch('http://localhost:4000/mentee/add?member='+member,{
        method:"post"
      })
      // .then(function (response) {
      //     return response.json();
      // })
      .then(response => {
          console.log(response);
      })
      .catch(function (err) {
          console.log('Fetch Error :-S', err);
      })
    }
    handleSubmit(){
        // console.log("working");
        // e.preventDefault();
      //  console.log( document.getElementById("taskName").value);
       let task=  document.getElementById("taskName").value
      //  console.log(document.getElementById("date").value);
       let date = document.getElementById("date").value
      //  console.log(document.getElementsByName("teamMember")[0].value);
       let member = document.getElementsByName("teamMember")[0].value
       fetch("http://localhost:4000/mentor/task/create?task="+task+'&date='+date+'&member='+member,{
            method:'POST'
        })
        .then(function(response) {
            return response.json();
        })
        .then(response => {
            console.log(response);
           
            this.getUpdatedTask()
        }) 
        .catch(function(err) {
            console.log('Fetch Error :-S', err);
        })

       
    }

    getUpdatedTask(){
      this.setState({
        show: true
      });
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
    componentDidMount(){
      fetch('http://localhost:4000/addMembers')
                  .then(function (response) {
                      return response.json();
                  })
                  .then(response => {
                      console.log(response);
                      this.getMembers(response);
                  })
                  .catch(function (err) {
                      console.log('Fetch Error :-S', err);
                  })
                  
    }
    getMembers(res){
      console.log(res);
                  res.map((item,i)=>{
                     teamMembers.push({ value: item.member, label: item.member })
                  })
                  console.log(teamMembers);
      this.setState({
        mem:teamMembers
      })
      
    }
    render() {
      const { selectedOption } = this.state;
      return (
        <div className="container">
          <div className="header"><span>Mentors Dashboard</span></div>
          <div className="mentorName"><span>{this.props.match.params.user}</span></div>
          <div>
            {/* <form  > */}
              <input className="taskName" id="taskName" type="text" name="taskName"  placeholder="Enter a new task.." required />
              <input id="date" type="date" name="date" required/>
                            
              <Select required
                name="teamMember"
                id="selectedMember"
                value={selectedOption}
                onChange={this.handleChange}
                options={this.state.mem}
              />
              <input className="submit" type="button" value="submit" onClick ={this.handleSubmit.bind(this)}  />
            {/* </form> */}
            <div className="addMembers">
              <input id="member" type="text" placeholder="add member"/>
              <input type="button" value="Add Members" onClick={this.addMembers.bind(this)} />
            </div>
          </div>
          <div className="lists">
            <div className="taskList">Assigned Tasks</div>
            <div className="review">Tasks ready for review</div>
          </div>
         <div>
          <div className="allTasks">
              <ShowTasks func={this.handleadd} show={this.state.show} editFunc={this. handleEdit} deleteFunc={this.handleDelete} />
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