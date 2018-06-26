import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Mentee extends Component {
    constructor(props){
        super(props);
        this.state={
            menteeTasks : [],
            dueDate : [],
            submitted : false,
            btn : ''
            
        }
    }
    handleSubmit(item){
        // e.preventDefault();
        this.setState(prevState => ({
            submitted : !prevState.submitted,
            btn : item
          }));
    }
    componentWillMount(){
        fetch('http://localhost:4000/mentee/tasks')
        .then(function(response) {
            return response.json();
        })
        .then(response => {
            console.log(response);
            this.getMenteeTasks(response)
        }) 
        .catch(function(err) {
            console.log('Fetch Error :-S', err);
        })
    }
    getMenteeTasks(res){
        console.log(res);
        var menteeTasks=[],dueDate=[];
        res.forEach((item,i)=>{
            menteeTasks.push(item.task);
            dueDate.push(item.dueDate);
        })
        console.log(menteeTasks);
        this.setState({
            menteeTasks : menteeTasks,
            dueDate : dueDate
        })
        
        // ReactDOM.render(menteeTasks,document.getElementById(menteeTasks))
        // this.setState({
        //     tasks : taskList,
        //     members : members
        // })
        // console.log(this.state.tasks);
    }
    render() {
        let menteeTaskList = this.state.menteeTasks;
        let dueDate = this.state.dueDate;
        console.log(menteeTaskList);
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
                    <input type="button" value = {this.state.btn === item && this.state.submitted? "Submitted" : "Submit for review"} onClick = {this.handleSubmit.bind(this,item)} /> 
                </div>
                )
              })
          }</div>
        </div>
      )
    }
  }
  
  export default Mentee;