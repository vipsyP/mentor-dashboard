import React, { Component } from 'react';

class SubmittedTasks extends Component {
    constructor(props){
        super(props);
        this.state={
            tasks: [],
            done: false,
            func : this.props.func
        }
        
       console.log(props);
       
    }
    componentDidMount(){
        this.fetchData()
    }
    fetchData(){
        fetch('http://localhost:4000/mentor/tasks')
        .then(function(response) {
            return response.json();
        })
        .then(response => {
            console.log(response);
            this.getTasks(response)
        }) 
        .catch(function(err) {
            console.log('Fetch Error :-S', err);
        })
    }
    getTasks(res){
        console.log(res);
        // var taskList=[],members=[],date=[];
        var groups = {};
        for (var i = 0; i < res.length; i++) {
            if(res[i].submitted && !res[i].done){
                var groupName = res[i].member;
                if (!groups[groupName]) {
                     groups[groupName] = [];
                }
             groups[groupName].push({task: res[i].task , dueDate: res[i].dueDate, ids: res[i]._id});
            }
        }   
        let myArray=[];
        for (groupName in groups) {
            myArray.push({member: groupName, tasks: groups[groupName]});
        }
    
        console.log(myArray);
        this.setState({
            tasks : myArray
        })
    }
    handleSubmit(id){
        // console.log(id);
        fetch('http://localhost:4000/mentee/tasks/complete?id='+id)
        .then(function(response) {
            return response.json();
        })
        .then(response => {
            console.log(response);
            this.fetchData()
             
        }) 
        .catch(function(err) {
            console.log('Fetch Error :-S', err);
        })
        this.props.func
    }
    handleReassign(id){
        console.log(id);
        fetch('http://localhost:4000/mentee/tasks/reassign?id='+id)
        .then(function(response) {
            return response.json();
        })
        .then(response => {
            console.log(response);
            this.fetchData()
             
        }) 
        .catch(function(err) {
            console.log('Fetch Error :-S', err);
        })
        this.props.func
    }    
  render() {
    let taskList = this.state.tasks;
    // let members = this.state.members;
    // let date = this.state.date;
    console.log(taskList);
    return (
    <div className= "tasks">
    {
    taskList.map((item,i)=>{
        return(
            <div className="tasksPerUser">
                <div className="member">{item.member}</div>

                        {
                        item.tasks.map((val,i)=>{

                           return ( 
                           <div className = "task">

                                <div className="buttons">
                                    <input className="button one" type="button" onClick={this.handleReassign.bind(this,val.ids)} value="improvement needed"/>
                                    <input className="button two" type="button" onClick={this.handleSubmit.bind(this,val.ids)} value="completed"/>

                                </div>

                                <div className = "taskNameContainer">
                                    <span>{val.task}</span>
                                </div>

                                <div className="dueDateContainer">
                                    <span className="dueDate">Due date: {val.dueDate}</span>
                                </div>
                           </div>)  

                        })
                        }

                    


            
            </div>            
        )
    })
    }
    </div>
)
  }
}

export default SubmittedTasks;
