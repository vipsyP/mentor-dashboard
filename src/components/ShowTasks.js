import React, { Component } from 'react';

class ShowTasks extends Component {
    constructor(props){
        super(props);
        this.state={
            tasks: [],
            members : []
        }
       
    }
    componentWillMount(){
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
        var taskList=[],members=[];
        res.forEach((item,i)=>{
            taskList.push(item.task);
            members.push(item.member)
        })
        console.log(taskList);
        console.log(members);
        this.setState({
            tasks : taskList,
            members : members
        })
        console.log(this.state.tasks);
    }
  render() {
    let taskList = this.state.tasks;
    let members = this.state.members;
    console.log(taskList);
        return(
            <div>{
                taskList.map((item,i)=>{
                    console.log("inside map"+item);
                    return <div className="assignedTasks">{item + "- Assigned to "+members[i]}</div>
                })

            }
            </div>            
        )
  }
}

export default ShowTasks;
