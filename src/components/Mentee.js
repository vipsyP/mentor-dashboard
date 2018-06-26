import React, { Component } from 'react';
import ReactDOM from 'react-dom';
let change ='';

class Mentee extends Component {
    constructor(props){
        super(props);
        this.state={
            menteeTasks : [],
            dueDate : [],
            btn : '',
            submit: []
        }
    }
    handleClick(ev){
         ev.preventDefault();
         document.getElementById("submitButton").setAttribute("disabled","disabled")
        // console.log(ev);
        change = ev.target.parentNode.firstChild.firstChild.innerText
        // console.log(change);
        fetch('http://localhost:4000/mentor/tasks')
        .then(function(response) {
            return response.json();
        })
        .then(response => {
            // console.log(response);
            this.getTasks(response)
        }) 
        .catch(function(err) {
            console.log('Fetch Error :-S', err);
        })
       
    }
    componentDidMount(){
        fetch('http://localhost:4000/mentee/tasks')
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
    getMenteeTasks(res){
        // console.log(res);
        var menteeTasks=[],dueDate=[],submit=[];
        res.forEach((item,i)=>{
            menteeTasks.push(item.task);
            dueDate.push(item.dueDate);
            submit.push(item.submitted);
           
        })
        // console.log(menteeTasks);
        this.setState({
            menteeTasks : menteeTasks,
            dueDate : dueDate,
            submit : submit
        })
        
        // ReactDOM.render(menteeTasks,document.getElementById(menteeTasks))
        // this.setState({
        //     tasks : taskList,
        //     members : members
        // })
        // console.log(this.state.tasks);
    }
    getTasks(res){
        let id = '',submit=[];
        res.map((item,i)=>{
            if(item.member==="megha"){
             submit.push(item.submitted);
            }
            if(res[i].task === change){
                id = res[i]._id;
                fetch('http://localhost:4000/mentee/tasks/sub?id='+id)
        .then(function(response) {
            return response.json();
        })
        // .then(response => {
        //     // console.log(response);
        // }) 
        .catch(function(err) {
            console.log('Fetch Error :-S', err);
        })
            }
        });
        // console.log(id);
        this.setState({
            submit : submit
        });
    }
    render() {
        let menteeTaskList = this.state.menteeTasks;
        let dueDate = this.state.dueDate;
        let submittedTasks = this.state.submit;
        // console.log(menteeTaskList);
      return (
        <div className="container">
          <div className="header"><span>Mentee Dashboard</span></div>
          <div className="mentorName"><span>Hi Prabha!</span></div>
          <div className="lists">
            <div className="menteeTaskList">Assigned Tasks</div>
          </div>
          <div>{
              menteeTaskList.map((item,i)=>{
                return (
                <div className="menteeTasks">
                    <div id="menteeTasks">
                        <span>{item}</span>
                        <span className="due_date">{dueDate[i]}</span>
                    </div>
                    <input id="submitButton" type="button"  value = {submittedTasks[i]? "Submitted" : "Submit for review"} onClick = {(e) => this.handleClick(e)} /> 
                </div>
                )
              })
          }</div>
        </div>
      )
    }
  }
  
  export default Mentee;