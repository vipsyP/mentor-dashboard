import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Mentee extends Component {
    constructor(props,{match}){
        super(props,{match});
        this.state={
            menteeTasks : [],
            submit: false,
            user : props.match.params.user
        }
    }
    handleClick(id){
        console.log(id);
        fetch('http://localhost:4000/mentee/tasks/sub?id='+id)
        .then(function(response) {
            return response.json();
        })
        .then(response => {
             console.log(response);
             this.fetchFunc()
        }) 
        .catch(function(err) {
            console.log('Fetch Error :-S', err);
        })
        this.setState(prevState => ({
            submit: !prevState.submit
          }));
    }
    fetchFunc(){
        fetch('http://localhost:4000/mentee/tasks?user='+this.props.match.params.user)
        .then(function(response) {
            return response.json();
        })
        .then(response => {
            // console.log(response);
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
        let menteeTaskList = this.state.menteeTasks;
      return (
        <div className="container">
          <div className="header"><span>Mentee Dashboard</span></div>
          <div className="mentorName"><span>{this.props.match.params.user}</span></div>
          <div className="menteeListHeadings">
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